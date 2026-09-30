# AWS Interview Notes (Full Stack)

> Aimed at **2–3 YOE Node.js full stack** interviews (preferred skill on most JDs). You are not expected to be a Solutions Architect — show you can **deploy a Node/Next app**, store files, use a managed DB, and keep secrets safe. Related: [DevOps](/notes/devops), [Docker & CI/CD](/notes/advanced-topics), [Node](/notes/node), [Next](/notes/next).

---

## 1. What is AWS?

**Amazon Web Services (AWS)** is a cloud platform: on-demand compute, storage, databases, networking, and dozens of managed services. You pay for what you use instead of buying servers upfront.

**Why companies use it:** scale elastically, global regions, managed backups/HA options, and a large service catalog.

**Region vs Availability Zone (AZ):**
- **Region** — geographic area (e.g. `ap-south-1` Mumbai)
- **AZ** — isolated datacenter(s) inside a region — deploy across AZs for high availability

---

## 2. Core services map (what full-stack interviews expect)

| Need | AWS service | One-line |
|---|---|---|
| Virtual server | **EC2** | Rent a VM; you manage OS + app |
| Containers without K8s | **ECS** / **Fargate** | Run Docker images |
| Serverless functions | **Lambda** | Run code on events; pay per invoke |
| Object files (images, PDFs) | **S3** | Cheap durable object storage |
| CDN | **CloudFront** | Cache static content at edge |
| Managed Postgres/MySQL | **RDS** | Managed relational DB |
| Managed Mongo-like | **DocumentDB** | Mongo-compatible (or use Atlas on AWS) |
| In-memory cache | **ElastiCache** | Redis / Memcached |
| DNS | **Route 53** | Domains + health checks |
| Load balancer | **ALB / NLB** | Spread traffic across targets |
| HTTPS certs | **ACM** | Free public certs with ALB/CloudFront |
| Secrets | **Secrets Manager** / **SSM Parameter Store** | DB passwords, API keys |
| Logs / metrics | **CloudWatch** | Logs, metrics, alarms |
| Auth (optional) | **Cognito** | User pools / identity |
| Queue | **SQS** | Decouple producers/consumers |
| Pub/sub | **SNS** | Fan-out notifications |
| IaC | **CloudFormation** / CDK / Terraform | Infra as code |

---

## 3. Typical Node.js app architecture on AWS

```
User → Route 53 → CloudFront (optional)
                 → ALB → EC2 / ECS tasks (Node API)
                      → RDS (Postgres/MySQL)
                      → ElastiCache (Redis)
                 → S3 (uploads) via pre-signed URLs
```

**Simpler startup shape:**
- Frontend: **Vercel** or S3 + CloudFront (Next static / SSR elsewhere)
- API: **Elastic Beanstalk**, **ECS Fargate**, or **EC2** + PM2
- DB: **RDS**
- Files: **S3**

Say this out loud in interviews — it shows end-to-end thinking.

---

## 4. EC2 (compute)

**EC2** = virtual machines. You choose instance type (CPU/RAM), AMI (OS image), security group, and key pair / SSM for access.

**Interview points:**
- Put apps in **private subnets**; expose only via **ALB**
- **Security groups** = virtual firewall (allow 443 from internet to ALB; allow 3000 only from ALB to app)
- Use **IAM roles** on the instance — never bake long-lived AWS keys into the AMI
- Auto Scaling Group + ALB for horizontal scale

**EC2 vs Lambda:** long-running APIs / websocket → EC2/ECS. Short event work (image resize, webhooks) → Lambda.

---

## 5. S3 (storage) — very common in full-stack JDs

**S3** stores objects (files) in buckets. Not a filesystem or database.

**Use cases:** user avatars, invoices, static website assets, backups, build artifacts.

```js
// Node: upload with AWS SDK v3 (concept)
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({ region: "ap-south-1" });

// Better pattern: browser uploads via pre-signed URL — API never streams huge files
async function presignUpload(key) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ContentType: "image/jpeg",
  });
  return getSignedUrl(client, command, { expiresIn: 300 });
}
```

**Must-know:**
- Buckets are **private by default** — don't make them public unless it's a static site with intent
- **Pre-signed URLs** for secure upload/download
- Versioning, lifecycle rules (move old files to Glacier / delete)
- Block public access + bucket policies
- CloudFront in front of S3 for HTTPS + caching

---

## 6. RDS (MySQL / PostgreSQL)

**RDS** = managed relational DB (backups, patching, Multi-AZ option).

**Interview answer for this JD:**
> "I'd run PostgreSQL or MySQL on RDS, put it in a private subnet, allow only the app security group, use Secrets Manager for credentials, enable automated backups, and use a connection pool from Node."

| Feature | Why it matters |
|---|---|
| Automated backups | Point-in-time recovery |
| Multi-AZ | Failover for HA |
| Read replicas | Scale reads |
| Parameter groups | Tune engine settings |

**Do not** expose RDS to `0.0.0.0/0`.

---

## 7. VPC & networking (enough for 2–3 YOE)

**VPC** — your private network in AWS.

- **Public subnet** — has route to Internet Gateway (ALB, bastion)
- **Private subnet** — no direct internet; apps + DB live here; outbound via NAT if needed
- **Security Group** — stateful allow rules on ENIs
- **NACL** — subnet-level (less used day-to-day)

**Diagram to draw:**
```
Internet → IGW → Public subnet (ALB)
                      ↓
               Private subnet (Node)
                      ↓
               Private subnet (RDS)
```

---

## 8. IAM (security — interview favorite)

**IAM** controls who can do what.

| Concept | Meaning |
|---|---|
| **User** | Long-lived human/service identity (prefer roles) |
| **Role** | Temporary credentials assumed by EC2/Lambda/ECS |
| **Policy** | JSON permissions (`Allow`/`Deny` on actions/resources) |
| **Least privilege** | Only the actions needed |

**Never:**
- Commit `AWS_ACCESS_KEY_ID` / secret to Git
- Use root account for daily work
- Attach `AdministratorAccess` to app roles

**Good:** EC2/ECS task role with `s3:PutObject` on one bucket prefix only.

---

## 9. Lambda & API Gateway (serverless path)

**Lambda** — upload a function; AWS runs it on demand.

**API Gateway** — HTTP endpoints that invoke Lambda (or proxy to other backends).

**Fit for full stack:**
- Image thumbnail on S3 upload (S3 event → Lambda)
- Cron-like jobs (EventBridge → Lambda)
- Light APIs

**Limits to mention:** cold starts, 15-minute max duration, payload size limits — not ideal for heavy long websocket servers (use API Gateway WebSocket or ECS).

```js
export const handler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ok: true, echo: body }),
  };
};
```

---

## 10. Load balancing & scaling

- **ALB (Application Load Balancer)** — HTTP/HTTPS, path-based routing, ideal for Node APIs
- **Target Group** — EC2 instances or ECS tasks
- **Health checks** — ALB stops sending traffic to unhealthy targets
- **Auto Scaling** — add/remove instances on CPU or request count

---

## 11. CloudWatch (observability)

- **Logs** — ship Node `stdout` (ECS/EC2 agents) or use SDK
- **Metrics** — CPU, memory, 5xx count, latency
- **Alarms** — SNS email/Slack when error rate spikes
- Structured JSON logs + `requestId` make debugging possible

---

## 12. Deploying a Node / Next app (story to practice)

**Option A — EC2 classic (common in smaller companies):**
1. Build on CI (GitHub Actions)
2. SSH/SSM or pull image on EC2
3. `pm2 restart` or systemd
4. Nginx reverse proxy + Let's Encrypt / ACM via ALB

**Option B — Docker + ECS Fargate:**
1. Build image → push **ECR**
2. ECS service pulls new task definition
3. ALB rolling update

**Option C — Elastic Beanstalk:**
Upload zip / Docker; AWS manages load balancer + scaling — good "I used managed PaaS on AWS" answer.

**Option D — Frontend on S3 + CloudFront**, API on ECS/Beanstalk.

Pick one and be ready to explain **rollback** (previous image / previous Beanstalk version).

---

## 13. CI/CD with AWS

```
GitHub push → GitHub Actions
  → npm test
  → docker build
  → push to ECR
  → deploy ECS / update Beanstalk / SSM run command
```

Secrets: GitHub Actions OIDC → assume IAM role (no static keys) — strong interview answer.

---

## 14. Cost awareness (impresses hiring managers)

- Stop unused EC2 / use smaller types in non-prod
- S3 lifecycle + avoid accidental public data transfer surprises
- RDS right-sizing; stop/start non-prod where possible
- CloudWatch retention limits
- Prefer **S3 + CloudFront** for static assets over fat EC2 serving files

---

## 15. Full-stack JD interview Q&A

**Q: Have you used AWS? Which services?**  
A: "Yes — typically **EC2 or ECS** for the Node API, **RDS** for Postgres/MySQL, **S3** for uploads with pre-signed URLs, **ALB** for HTTPS, **CloudWatch** for logs, and **IAM roles** instead of keys in code. Optionally CloudFront for static assets."

**Q: How would you store user-uploaded images?**  
A: "S3 private bucket. API issues a short-lived **pre-signed PUT URL**. Client uploads directly to S3. We store only the object key in Mongo/Postgres. Downloads via pre-signed GET or CloudFront with signed URLs."

**Q: How do you keep DB credentials safe?**  
A: "Secrets Manager or SSM SecureString, injected at runtime into the task/instance. Rotate periodically. Never commit `.env` with real secrets."

**Q: EC2 vs Elastic Beanstalk vs ECS?**  
A: "EC2 = max control, more ops. Beanstalk = fastest path to deploy a Node zip with load balancing. ECS/Fargate = containers, cleaner CI, better for multiple services."

**Q: How do you make the API highly available?**  
A: "Multi-AZ: ALB across AZs, app Auto Scaling Group in private subnets, RDS Multi-AZ, health checks, and no single-instance SPOF."

**Q: Difference between Security Group and NACL?**  
A: "SG is stateful, attached to instances/ENIs, default deny inbound. NACL is subnet-level, stateless. Day-to-day we live in Security Groups."

**Q: What is an IAM role vs access key?**  
A: "Role gives temporary credentials via instance/task metadata — preferred. Access keys are long-lived secrets that leak easily."

**Q: How would you move a monolith Node app to AWS from a single VPS?**  
A: "Containerize → ECR → ECS or Beanstalk, migrate DB to RDS with dump/restore + cutover window, put ALB in front, S3 for uploads, CloudWatch alarms, then remove the VPS."

**Q: S3 vs EBS vs EFS?**  
A: "S3 = objects via API (files). EBS = disk attached to one EC2. EFS = shared network filesystem across instances."

**Q: How do you handle environment config?**  
A: "12-factor: `NODE_ENV`, DB URL, bucket name from env. Different Parameter Store paths or task defs per env (dev/staging/prod)."

---

## 16. Agile + cloud collaboration (JD soft overlap)

In standups you should be able to say:
- What you deployed (staging/prod)
- What is blocked (IAM, RDS migration)
- Risk (no rollback plan yet)

---

## 17. Practical checklist before the interview

- [ ] Explain Region / AZ / VPC / public vs private subnet
- [ ] Sketch ALB → Node → RDS + S3
- [ ] Pre-signed URL upload flow
- [ ] IAM least privilege + no keys in Git
- [ ] CloudWatch alarm on 5xx
- [ ] One deploy story (Beanstalk **or** EC2+PM2 **or** ECS)
- [ ] Difference RDS vs self-hosted MySQL on EC2

---

## 18. One-minute closing pitch

"For a Node full-stack app on AWS I'd put the API behind an **ALB** on **ECS or EC2**, data in **RDS**, uploads in **S3** with pre-signed URLs, secrets in **Secrets Manager**, and logs/alarms in **CloudWatch**. I'd keep the database private, use **IAM roles** instead of access keys, and deploy through CI so we can roll back to the previous artifact quickly."
