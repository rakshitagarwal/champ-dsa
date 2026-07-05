export type CompanyCategory =
  | "global-tech"
  | "high-comp"
  | "indian-product"
  | "fintech"
  | "cybersecurity"
  | "dev-tools"
  | "analytics"
  | "edtech"
  | "engineering"
  | "it-services";

export type Company = {
  id: string;
  name: string;
  description: string;
  careerUrl: string;
  websiteUrl: string;
  category: CompanyCategory;
};

export const CATEGORIES: { value: CompanyCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "global-tech", label: "Global Tech Majors" },
  { value: "high-comp", label: "High Comp Tier" },
  { value: "indian-product", label: "Indian Product" },
  { value: "fintech", label: "Fintech" },
  { value: "cybersecurity", label: "Cyber Security" },
  { value: "dev-tools", label: "Dev Tools & SaaS" },
  { value: "analytics", label: "Analytics / AI" },
  { value: "edtech", label: "EdTech & HealthTech" },
  { value: "engineering", label: "Engineering R&D" },
  { value: "it-services", label: "IT Services" },
];

export function getCategoryLabel(category: CompanyCategory): string {
  const found = CATEGORIES.find((c) => c.value === category);
  return found?.label ?? category;
}

const GLOBAL_TECH: Company[] = [
  { id: "microsoft", name: "Microsoft", description: "Windows, Azure, Office, GitHub. Enterprise software and cloud leader.", careerUrl: "https://careers.microsoft.com", websiteUrl: "https://www.microsoft.com", category: "global-tech" },
  { id: "google", name: "Google", description: "Search, cloud, AI, and Android. Top engineering culture.", careerUrl: "https://careers.google.com", websiteUrl: "https://www.google.com", category: "global-tech" },
  { id: "amazon", name: "Amazon", description: "E-commerce, AWS cloud, and devices.", careerUrl: "https://www.amazon.jobs", websiteUrl: "https://www.amazon.com", category: "global-tech" },
  { id: "salesforce", name: "Salesforce", description: "Enterprise CRM and cloud business software.", careerUrl: "https://careers.salesforce.com", websiteUrl: "https://www.salesforce.com", category: "global-tech" },
  { id: "adobe", name: "Adobe", description: "Creative and document software (Photoshop, PDF).", careerUrl: "https://careers.adobe.com", websiteUrl: "https://www.adobe.com", category: "global-tech" },
  { id: "oracle", name: "Oracle", description: "Enterprise database and cloud infrastructure.", careerUrl: "https://www.oracle.com/careers", websiteUrl: "https://www.oracle.com", category: "global-tech" },
  { id: "sap", name: "SAP Labs India", description: "Enterprise resource planning software.", careerUrl: "https://careers.sap.com", websiteUrl: "https://www.sap.com", category: "global-tech" },
  { id: "cisco", name: "Cisco", description: "Networking hardware and enterprise security.", careerUrl: "https://jobs.cisco.com", websiteUrl: "https://www.cisco.com", category: "global-tech" },
  { id: "vmware", name: "VMware / Broadcom", description: "Virtualization and cloud infrastructure.", careerUrl: "https://careers.broadcom.com", websiteUrl: "https://www.broadcom.com", category: "global-tech" },
  { id: "walmart", name: "Walmart Global Tech", description: "Retail tech, supply chain, and e-commerce.", careerUrl: "https://careers.walmart.com/global-tech", websiteUrl: "https://www.walmart.com", category: "global-tech" },
  { id: "target", name: "Target (India)", description: "Retail and omnichannel technology.", careerUrl: "https://jobs.target.com", websiteUrl: "https://www.target.com", category: "global-tech" },
  { id: "goldman-sachs", name: "Goldman Sachs", description: "Investment banking and financial services.", careerUrl: "https://www.goldmansachs.com/careers", websiteUrl: "https://www.goldmansachs.com", category: "global-tech" },
  { id: "jpmorgan", name: "JPMorgan Chase & Co", description: "Global banking and financial technology.", careerUrl: "https://careers.jpmorgan.com", websiteUrl: "https://www.jpmorgan.com", category: "global-tech" },
  { id: "morgan-stanley", name: "Morgan Stanley", description: "Wealth management and investment banking.", careerUrl: "https://www.morganstanley.com/careers", websiteUrl: "https://www.morganstanley.com", category: "global-tech" },
  { id: "visa", name: "Visa", description: "Digital payments and transaction processing.", careerUrl: "https://careers.visa.com", websiteUrl: "https://www.visa.com", category: "global-tech" },
  { id: "mastercard", name: "Mastercard", description: "Payment processing and fintech solutions.", careerUrl: "https://careers.mastercard.com", websiteUrl: "https://www.mastercard.com", category: "global-tech" },
  { id: "american-express", name: "American Express", description: "Charge cards, credit cards, and travel.", careerUrl: "https://www.americanexpress.com/careers", websiteUrl: "https://www.americanexpress.com", category: "global-tech" },
  { id: "paypal-global", name: "PayPal", description: "Digital payments and online payment platform.", careerUrl: "https://careers.paypal.com", websiteUrl: "https://www.paypal.com", category: "global-tech" },
  { id: "intuit", name: "Intuit", description: "Financial software (TurboTax, QuickBooks, Mint).", careerUrl: "https://www.intuit.com/careers", websiteUrl: "https://www.intuit.com", category: "global-tech" },
  { id: "linkedin", name: "LinkedIn", description: "Professional social network and recruitment.", careerUrl: "https://careers.linkedin.com", websiteUrl: "https://www.linkedin.com", category: "global-tech" },
  { id: "uber", name: "Uber", description: "Ride-sharing, food delivery, and freight.", careerUrl: "https://www.uber.com/careers", websiteUrl: "https://www.uber.com", category: "global-tech" },
  { id: "booking", name: "Booking.com", description: "Global travel and accommodation platform.", careerUrl: "https://careers.booking.com", websiteUrl: "https://www.booking.com", category: "global-tech" },
  { id: "expedia", name: "Expedia Group", description: "Travel booking and hospitality technology.", careerUrl: "https://careers.expediagroup.com", websiteUrl: "https://www.expedia.com", category: "global-tech" },
  { id: "autodesk", name: "Autodesk", description: "3D design, engineering, and CAD software.", careerUrl: "https://autodesk.careers", websiteUrl: "https://www.autodesk.com", category: "global-tech" },
  { id: "ansys", name: "ANSYS", description: "Engineering simulation software.", careerUrl: "https://careers.ansys.com", websiteUrl: "https://www.ansys.com", category: "global-tech" },
  { id: "synopsys", name: "Synopsys", description: "EDA and semiconductor design automation.", careerUrl: "https://careers.synopsys.com", websiteUrl: "https://www.synopsys.com", category: "global-tech" },
  { id: "cadence", name: "Cadence Design Systems", description: "Electronic design automation software.", careerUrl: "https://careers.cadence.com", websiteUrl: "https://www.cadence.com", category: "global-tech" },
  { id: "qualcomm", name: "Qualcomm", description: "Mobile processors and wireless technology.", careerUrl: "https://careers.qualcomm.com", websiteUrl: "https://www.qualcomm.com", category: "global-tech" },
  { id: "broadcom", name: "Broadcom", description: "Semiconductor and infrastructure software.", careerUrl: "https://careers.broadcom.com", websiteUrl: "https://www.broadcom.com", category: "global-tech" },
  { id: "nvidia", name: "NVIDIA", description: "GPU and AI computing leader.", careerUrl: "https://www.nvidia.com/en-us/about-nvidia/careers/", websiteUrl: "https://www.nvidia.com", category: "global-tech" },
  { id: "amd", name: "AMD", description: "CPU and GPU processor design.", careerUrl: "https://careers.amd.com", websiteUrl: "https://www.amd.com", category: "global-tech" },
  { id: "intel", name: "Intel", description: "Semiconductor and processor manufacturing.", careerUrl: "https://jobs.intel.com", websiteUrl: "https://www.intel.com", category: "global-tech" },
  { id: "ti", name: "Texas Instruments", description: "Analog and embedded semiconductor solutions.", careerUrl: "https://careers.ti.com", websiteUrl: "https://www.ti.com", category: "global-tech" },
  { id: "micron", name: "Micron Technology", description: "Memory and storage semiconductor solutions.", careerUrl: "https://careers.micron.com", websiteUrl: "https://www.micron.com", category: "global-tech" },
  { id: "western-digital", name: "Western Digital", description: "Data storage and HDD/SSD technology.", careerUrl: "https://careers.westerndigital.com", websiteUrl: "https://www.westerndigital.com", category: "global-tech" },
  { id: "arm", name: "Arm", description: "CPU architecture and semiconductor IP.", careerUrl: "https://careers.arm.com", websiteUrl: "https://www.arm.com", category: "global-tech" },
  { id: "samsung", name: "Samsung R&D Institute", description: "Consumer electronics, mobile, and semiconductors.", careerUrl: "https://www.samsung.com/in/careers/", websiteUrl: "https://www.samsung.com", category: "global-tech" },
  { id: "ge", name: "GE Healthcare / GE Digital", description: "Medical imaging, diagnostics, and industrial IoT.", careerUrl: "https://www.gecareers.com", websiteUrl: "https://www.ge.com", category: "global-tech" },
  { id: "honeywell", name: "Honeywell", description: "Industrial automation and aerospace technology.", careerUrl: "https://careers.honeywell.com", websiteUrl: "https://www.honeywell.com", category: "global-tech" },
  { id: "bosch", name: "Bosch Global Software Technologies", description: "Auto components, industrial tech, and software.", careerUrl: "https://www.bosch.in/careers/", websiteUrl: "https://www.bosch.in", category: "global-tech" },
  { id: "siemens", name: "Siemens", description: "Industrial automation, energy, and healthcare.", careerUrl: "https://jobs.siemens.com", websiteUrl: "https://www.siemens.com", category: "global-tech" },
  { id: "philips", name: "Philips", description: "Health technology and medical devices.", careerUrl: "https://www.careers.philips.com", websiteUrl: "https://www.philips.com", category: "global-tech" },
  { id: "schneider", name: "Schneider Electric", description: "Energy management and industrial automation.", careerUrl: "https://www.se.com/in/en/about-us/careers/", websiteUrl: "https://www.se.com", category: "global-tech" },
  { id: "dell", name: "Dell Technologies", description: "Computer hardware, servers, and storage.", careerUrl: "https://jobs.dell.com", websiteUrl: "https://www.dell.com", category: "global-tech" },
  { id: "hpe", name: "HPE (Hewlett Packard Enterprise)", description: "Enterprise servers, storage, and networking.", careerUrl: "https://careers.hpe.com", websiteUrl: "https://www.hpe.com", category: "global-tech" },
  { id: "ibm", name: "IBM", description: "Enterprise IT, cloud, and AI (Watson).", careerUrl: "https://www.ibm.com/careers", websiteUrl: "https://www.ibm.com", category: "global-tech" },
  { id: "citrix", name: "Citrix / Cloud Software Group", description: "Virtualization, VDI, and cloud networking.", careerUrl: "https://www.cloud.com/careers", websiteUrl: "https://www.cloud.com", category: "global-tech" },
  { id: "f5", name: "F5 Networks", description: "Application delivery and load balancing.", careerUrl: "https://www.f5.com/company/careers", websiteUrl: "https://www.f5.com", category: "global-tech" },
  { id: "juniper", name: "Juniper Networks", description: "Networking hardware and routing technology.", careerUrl: "https://careers.juniper.net", websiteUrl: "https://www.juniper.net", category: "global-tech" },
  { id: "arista", name: "Arista Networks", description: "Cloud networking and data center switches.", careerUrl: "https://careers.arista.com", websiteUrl: "https://www.arista.com", category: "global-tech" },
  { id: "netapp", name: "NetApp", description: "Cloud data management and storage solutions.", careerUrl: "https://careers.netapp.com", websiteUrl: "https://www.netapp.com", category: "global-tech" },
  { id: "pure-storage", name: "Pure Storage", description: "All-flash storage arrays and data platforms.", careerUrl: "https://www.purestorage.com/careers.html", websiteUrl: "https://www.purestorage.com", category: "global-tech" },
  { id: "commvault", name: "Commvault", description: "Data backup and recovery software.", careerUrl: "https://careers.commvault.com", websiteUrl: "https://www.commvault.com", category: "global-tech" },
  { id: "veritas", name: "Veritas Technologies", description: "Data protection and backup solutions.", careerUrl: "https://careers.veritas.com", websiteUrl: "https://www.veritas.com", category: "global-tech" },
  { id: "informatica", name: "Informatica", description: "Enterprise data integration and management.", careerUrl: "https://careers.informatica.com", websiteUrl: "https://www.informatica.com", category: "global-tech" },
  { id: "teradata", name: "Teradata", description: "Cloud analytics and data warehousing.", careerUrl: "https://careers.teradata.com", websiteUrl: "https://www.teradata.com", category: "global-tech" },
  { id: "cloudera", name: "Cloudera", description: "Big data and enterprise data cloud.", careerUrl: "https://www.cloudera.com/about/careers.html", websiteUrl: "https://www.cloudera.com", category: "global-tech" },
  { id: "databricks", name: "Databricks", description: "Unified data analytics and AI platform.", careerUrl: "https://www.databricks.com/company/careers", websiteUrl: "https://www.databricks.com", category: "global-tech" },
  { id: "cloudflare", name: "Cloudflare", description: "CDN, DNS, DDoS protection, and edge computing.", careerUrl: "https://www.cloudflare.com/careers/", websiteUrl: "https://www.cloudflare.com", category: "global-tech" },
  { id: "netflix", name: "Netflix", description: "Streaming entertainment and content production.", careerUrl: "https://jobs.netflix.com", websiteUrl: "https://www.netflix.com", category: "global-tech" },
  { id: "nokia", name: "Nokia", description: "Telecom infrastructure and 5G networking.", careerUrl: "https://www.nokia.com/careers/", websiteUrl: "https://www.nokia.com", category: "global-tech" },
  { id: "ericsson", name: "Ericsson", description: "Telecom equipment and mobile network infrastructure.", careerUrl: "https://www.ericsson.com/en/careers", websiteUrl: "https://www.ericsson.com", category: "global-tech" },
  { id: "yahoo", name: "Yahoo", description: "Internet services, media, and advertising.", careerUrl: "https://www.yahooinc.com/careers", websiteUrl: "https://www.yahoo.com", category: "global-tech" },
  { id: "ebay", name: "eBay", description: "Global e-commerce and online marketplace.", careerUrl: "https://careers.ebayinc.com", websiteUrl: "https://www.ebay.com", category: "global-tech" },
];

const HIGH_COMP: Company[] = [
  { id: "stripe", name: "Stripe", description: "Online payments infrastructure for businesses.", careerUrl: "https://stripe.com/jobs", websiteUrl: "https://stripe.com", category: "high-comp" },
  { id: "palantir", name: "Palantir", description: "Big data analytics for government and enterprise.", careerUrl: "https://www.palantir.com/careers/", websiteUrl: "https://www.palantir.com", category: "high-comp" },
  { id: "coinbase", name: "Coinbase", description: "Cryptocurrency exchange and Web3 platform.", careerUrl: "https://www.coinbase.com/careers", websiteUrl: "https://www.coinbase.com", category: "high-comp" },
  { id: "plaid", name: "Plaid", description: "Financial services API connecting banks and apps.", careerUrl: "https://plaid.com/careers/", websiteUrl: "https://plaid.com", category: "high-comp" },
  { id: "brex", name: "Brex", description: "Corporate credit cards and spend management.", careerUrl: "https://www.brex.com/careers", websiteUrl: "https://www.brex.com", category: "high-comp" },
  { id: "twilio", name: "Twilio", description: "Cloud communications APIs (SMS, voice, video).", careerUrl: "https://www.twilio.com/en-us/company/jobs", websiteUrl: "https://www.twilio.com", category: "high-comp" },
  { id: "elastic", name: "Elastic", description: "Search, logging, and observability (Elasticsearch).", careerUrl: "https://www.elastic.co/careers", websiteUrl: "https://www.elastic.co", category: "high-comp" },
  { id: "figma", name: "Figma", description: "Collaborative design and prototyping tool.", careerUrl: "https://www.figma.com/careers/", websiteUrl: "https://www.figma.com", category: "high-comp" },
  { id: "airbnb", name: "Airbnb", description: "Travel and hospitality marketplace.", careerUrl: "https://careers.airbnb.com", websiteUrl: "https://www.airbnb.com", category: "high-comp" },
  { id: "crowdstrike", name: "CrowdStrike", description: "Cloud-native endpoint security platform.", careerUrl: "https://www.crowdstrike.com/careers/", websiteUrl: "https://www.crowdstrike.com", category: "high-comp" },
  { id: "okta", name: "Okta", description: "Identity and access management solutions.", careerUrl: "https://www.okta.com/company/careers/", websiteUrl: "https://www.okta.com", category: "high-comp" },
  { id: "mongodb", name: "MongoDB", description: "Leading NoSQL document database platform.", careerUrl: "https://www.mongodb.com/careers", websiteUrl: "https://www.mongodb.com", category: "high-comp" },
  { id: "hashicorp", name: "HashiCorp", description: "Cloud infrastructure automation (Terraform, Vault).", careerUrl: "https://www.hashicorp.com/careers", websiteUrl: "https://www.hashicorp.com", category: "high-comp" },
  { id: "datadog", name: "Datadog", description: "Cloud application monitoring and observability.", careerUrl: "https://careers.datadoghq.com", websiteUrl: "https://www.datadoghq.com", category: "high-comp" },
  { id: "confluent", name: "Confluent", description: "Event streaming platform (Apache Kafka).", careerUrl: "https://careers.confluent.io", websiteUrl: "https://www.confluent.io", category: "high-comp" },
  { id: "servicenow", name: "ServiceNow", description: "IT service management and digital workflows.", careerUrl: "https://careers.servicenow.com", websiteUrl: "https://www.servicenow.com", category: "high-comp" },
  { id: "workday", name: "Workday", description: "Enterprise cloud HR and financial management.", careerUrl: "https://workday.wd5.myworkdayjobs.com/Workday", websiteUrl: "https://www.workday.com", category: "high-comp" },
  { id: "redis", name: "Redis", description: "In-memory data store and caching platform.", careerUrl: "https://redis.io/careers/", websiteUrl: "https://redis.io", category: "high-comp" },
  { id: "rubrik", name: "Rubrik", description: "Cloud data management and backup.", careerUrl: "https://www.rubrik.com/company/careers", websiteUrl: "https://www.rubrik.com", category: "high-comp" },
  { id: "zscaler", name: "Zscaler", description: "Cloud-native network security platform.", careerUrl: "https://www.zscaler.com/careers", websiteUrl: "https://www.zscaler.com", category: "high-comp" },
  { id: "postman", name: "Postman", description: "API development and testing platform.", careerUrl: "https://www.postman.com/careers/", websiteUrl: "https://www.postman.com", category: "high-comp" },
  { id: "browserstack", name: "BrowserStack", description: "Cloud-based browser testing infrastructure.", careerUrl: "https://www.browserstack.com/careers", websiteUrl: "https://www.browserstack.com", category: "high-comp" },
  { id: "snowflake", name: "Snowflake", description: "Cloud data warehouse and analytics platform.", careerUrl: "https://careers.snowflake.com", websiteUrl: "https://www.snowflake.com", category: "high-comp" },
  { id: "cohesity", name: "Cohesity", description: "Data management and backup as a service.", careerUrl: "https://www.cohesity.com/careers/", websiteUrl: "https://www.cohesity.com", category: "high-comp" },
  { id: "skyscanner", name: "Skyscanner", description: "Global travel search and comparison platform.", careerUrl: "https://careers.skyscanner.net", websiteUrl: "https://www.skyscanner.net", category: "high-comp" },
  { id: "nutanix", name: "Nutanix", description: "Hyper-converged infrastructure and cloud platform.", careerUrl: "https://www.nutanix.com/careers", websiteUrl: "https://www.nutanix.com", category: "high-comp" },
  { id: "akamai", name: "Akamai", description: "CDN and edge security solutions.", careerUrl: "https://www.akamai.com/careers", websiteUrl: "https://www.akamai.com", category: "high-comp" },
];

const INDIAN_PRODUCT: Company[] = [
  { id: "zoho", name: "Zoho", description: "Indian SaaS product suite for businesses.", careerUrl: "https://www.zoho.com/careers.html", websiteUrl: "https://www.zoho.com", category: "indian-product" },
  { id: "freshworks", name: "Freshworks", description: "Customer engagement and support SaaS.", careerUrl: "https://www.freshworks.com/company/careers/", websiteUrl: "https://www.freshworks.com", category: "indian-product" },
  { id: "razorpay", name: "Razorpay", description: "Payment gateway and banking suite for India.", careerUrl: "https://razorpay.com/jobs/", websiteUrl: "https://razorpay.com", category: "indian-product" },
  { id: "phonepe", name: "PhonePe", description: "UPI payments and financial services platform.", careerUrl: "https://www.phonepe.com/careers/", websiteUrl: "https://www.phonepe.com", category: "indian-product" },
  { id: "cred", name: "CRED", description: "Credit card management and rewards platform.", careerUrl: "https://careers.cred.club", websiteUrl: "https://cred.club", category: "indian-product" },
  { id: "groww", name: "Groww", description: "Investment platform for stocks and mutual funds.", careerUrl: "https://groww.in/careers", websiteUrl: "https://groww.in", category: "indian-product" },
  { id: "zerodha", name: "Zerodha", description: "India's largest stock broker, tech-first fintech.", careerUrl: "https://zerodha.com/careers/", websiteUrl: "https://zerodha.com", category: "indian-product" },
  { id: "chargebee", name: "Chargebee", description: "Subscription billing and revenue management SaaS.", careerUrl: "https://www.chargebee.com/careers/", websiteUrl: "https://www.chargebee.com", category: "indian-product" },
  { id: "innovaccer", name: "Innovaccer", description: "Healthcare data analytics and AI platform.", careerUrl: "https://innovaccer.com/careers", websiteUrl: "https://innovaccer.com", category: "indian-product" },
  { id: "highradius", name: "HighRadius", description: "Order-to-cash automation SaaS for enterprises.", careerUrl: "https://www.highradius.com/careers/", websiteUrl: "https://www.highradius.com", category: "indian-product" },
  { id: "darwinbox", name: "Darwinbox", description: "Cloud-based HR management platform.", careerUrl: "https://darwinbox.com/careers", websiteUrl: "https://darwinbox.com", category: "indian-product" },
  { id: "mindtickle", name: "MindTickle", description: "Sales readiness and enablement platform.", careerUrl: "https://www.mindtickle.com/careers/", websiteUrl: "https://www.mindtickle.com", category: "indian-product" },
  { id: "whatfix", name: "Whatfix", description: "Digital adoption and in-app guidance platform.", careerUrl: "https://whatfix.com/careers/", websiteUrl: "https://whatfix.com", category: "indian-product" },
  { id: "icertis", name: "Icertis", description: "Contract lifecycle management SaaS.", careerUrl: "https://www.icertis.com/company/careers/", websiteUrl: "https://www.icertis.com", category: "indian-product" },
  { id: "druva", name: "Druva", description: "SaaS-based data backup and protection.", careerUrl: "https://www.druva.com/careers/", websiteUrl: "https://www.druva.com", category: "indian-product" },
  { id: "moengage", name: "MoEngage", description: "Customer engagement and marketing automation.", careerUrl: "https://www.moengage.com/careers/", websiteUrl: "https://www.moengage.com", category: "indian-product" },
  { id: "clevertap", name: "CleverTap", description: "User retention and mobile analytics platform.", careerUrl: "https://clevertap.com/careers/", websiteUrl: "https://clevertap.com", category: "indian-product" },
  { id: "flipkart", name: "Flipkart", description: "India's largest e-commerce marketplace.", careerUrl: "https://www.flipkartcareers.com", websiteUrl: "https://www.flipkart.com", category: "indian-product" },
  { id: "swiggy", name: "Swiggy", description: "Food delivery and hyperlocal logistics.", careerUrl: "https://careers.swiggy.com", websiteUrl: "https://www.swiggy.com", category: "indian-product" },
  { id: "zomato", name: "Zomato / Eternal", description: "Restaurant discovery and food delivery.", careerUrl: "https://www.zomato.com/careers", websiteUrl: "https://www.zomato.com", category: "indian-product" },
  { id: "meesho", name: "Meesho", description: "Social commerce for Indian small businesses.", careerUrl: "https://careers.meesho.com", websiteUrl: "https://www.meesho.com", category: "indian-product" },
  { id: "ola", name: "Ola", description: "Ride-hailing and electric mobility platform.", careerUrl: "https://www.olacabs.com/careers", websiteUrl: "https://www.olacabs.com", category: "indian-product" },
  { id: "paytm", name: "Paytm", description: "Digital payments and financial services super app.", careerUrl: "https://paytm.com/careers", websiteUrl: "https://paytm.com", category: "indian-product" },
  { id: "dream11", name: "Dream11", description: "Fantasy sports platform with millions of users.", careerUrl: "https://www.dream11.com/careers", websiteUrl: "https://www.dream11.com", category: "indian-product" },
  { id: "games24x7", name: "Games24x7", description: "Skill-based online gaming (Rummy, Poker).", careerUrl: "https://games24x7.com/careers/", websiteUrl: "https://www.games24x7.com", category: "indian-product" },
  { id: "medianet", name: "Media.net", description: "Contextual advertising and ad-tech platform.", careerUrl: "https://media.net/careers/", websiteUrl: "https://www.media.net", category: "indian-product" },
  { id: "housing", name: "Housing.com / REA India", description: "Real estate discovery and property platform.", careerUrl: "https://housing.com/careers", websiteUrl: "https://housing.com", category: "indian-product" },
  { id: "urban-company", name: "Urban Company", description: "Home services marketplace (beauty, cleaning).", careerUrl: "https://www.urbancompany.com/careers", websiteUrl: "https://www.urbancompany.com", category: "indian-product" },
  { id: "nykaa", name: "Nykaa", description: "Beauty and wellness e-commerce platform.", careerUrl: "https://www.nykaa.com/careers", websiteUrl: "https://www.nykaa.com", category: "indian-product" },
  { id: "lenskart", name: "Lenskart", description: "Eyewear e-commerce and omnichannel retail.", careerUrl: "https://www.lenskart.com/careers.html", websiteUrl: "https://www.lenskart.com", category: "indian-product" },
  { id: "cardekho", name: "CarDekho", description: "Automotive marketplace and car research platform.", careerUrl: "https://www.cardekho.com/careers", websiteUrl: "https://www.cardekho.com", category: "indian-product" },
  { id: "policybazaar", name: "Policybazaar", description: "Insurance comparison and purchase platform.", careerUrl: "https://www.policybazaar.com/careers/", websiteUrl: "https://www.policybazaar.com", category: "indian-product" },
  { id: "makemytrip", name: "MakeMyTrip", description: "Online travel booking (flights, hotels, holidays).", careerUrl: "https://careers.makemytrip.com", websiteUrl: "https://www.makemytrip.com", category: "indian-product" },
  { id: "bigbasket", name: "BigBasket", description: "Online grocery delivery platform.", careerUrl: "https://www.bigbasket.com/careers/", websiteUrl: "https://www.bigbasket.com", category: "indian-product" },
];

const FINTECH: Company[] = [
  { id: "cashfree", name: "Cashfree Payments", description: "Indian payment gateway and digital payments.", careerUrl: "https://www.cashfree.com/careers/", websiteUrl: "https://www.cashfree.com", category: "fintech" },
  { id: "juspay", name: "Juspay", description: "Payment infrastructure for Indian businesses.", careerUrl: "https://juspay.in/careers", websiteUrl: "https://juspay.in", category: "fintech" },
  { id: "bharatpe", name: "BharatPe", description: "Merchant UPI payments and financial services.", careerUrl: "https://bharatpe.com/careers", websiteUrl: "https://bharatpe.com", category: "fintech" },
  { id: "slice", name: "Slice", description: "Credit card and fintech for young Indians.", careerUrl: "https://sliceit.com/careers", websiteUrl: "https://sliceit.com", category: "fintech" },
  { id: "jupiter", name: "Jupiter Money", description: "Neobanking and personal finance platform.", careerUrl: "https://jupiter.money/careers/", websiteUrl: "https://jupiter.money", category: "fintech" },
  { id: "fi-money", name: "Fi Money", description: "Digital banking and smart savings platform.", careerUrl: "https://fi.money/careers", websiteUrl: "https://fi.money", category: "fintech" },
  { id: "open-money", name: "Open Financial Technologies", description: "Neobanking platform for Indian SMEs.", careerUrl: "https://open.money/careers", websiteUrl: "https://open.money", category: "fintech" },
  { id: "simpl", name: "Simpl", description: "Buy-now-pay-later and checkout experience.", careerUrl: "https://getsimpl.com/careers", websiteUrl: "https://getsimpl.com", category: "fintech" },
];

const CYBERSECURITY: Company[] = [
  { id: "palo-alto", name: "Palo Alto Networks", description: "Network security and enterprise firewall.", careerUrl: "https://jobs.paloaltonetworks.com", websiteUrl: "https://www.paloaltonetworks.com", category: "cybersecurity" },
  { id: "fortinet", name: "Fortinet", description: "Cybersecurity appliances and network security.", careerUrl: "https://www.fortinet.com/corporate/careers/careers", websiteUrl: "https://www.fortinet.com", category: "cybersecurity" },
  { id: "check-point", name: "Check Point Software", description: "Enterprise network security and threat prevention.", careerUrl: "https://careers.checkpoint.com", websiteUrl: "https://www.checkpoint.com", category: "cybersecurity" },
  { id: "sentinelone", name: "SentinelOne", description: "Autonomous endpoint security with AI.", careerUrl: "https://www.sentinelone.com/careers/", websiteUrl: "https://www.sentinelone.com", category: "cybersecurity" },
  { id: "rapid7", name: "Rapid7", description: "Vulnerability management and incident detection.", careerUrl: "https://www.rapid7.com/careers/", websiteUrl: "https://www.rapid7.com", category: "cybersecurity" },
  { id: "tenable", name: "Tenable", description: "Vulnerability assessment and exposure management.", careerUrl: "https://www.tenable.com/careers", websiteUrl: "https://www.tenable.com", category: "cybersecurity" },
  { id: "qualys", name: "Qualys", description: "Cloud-based security and compliance platform.", careerUrl: "https://www.qualys.com/company/careers/", websiteUrl: "https://www.qualys.com", category: "cybersecurity" },
  { id: "splunk", name: "Splunk", description: "Machine data analytics and observability.", careerUrl: "https://www.splunk.com/en_us/careers.html", websiteUrl: "https://www.splunk.com", category: "cybersecurity" },
  { id: "grafana", name: "Grafana Labs", description: "Observability and visualization (Grafana, Loki).", careerUrl: "https://grafana.com/about/careers/", websiteUrl: "https://grafana.com", category: "cybersecurity" },
  { id: "new-relic", name: "New Relic", description: "Application performance monitoring and observability.", careerUrl: "https://newrelic.com/about/careers", websiteUrl: "https://newrelic.com", category: "cybersecurity" },
  { id: "pagerduty", name: "PagerDuty", description: "Incident management and digital operations.", careerUrl: "https://www.pagerduty.com/careers/", websiteUrl: "https://www.pagerduty.com", category: "cybersecurity" },
  { id: "sumo-logic", name: "Sumo Logic", description: "Cloud-native log management and analytics.", careerUrl: "https://www.sumologic.com/careers/", websiteUrl: "https://www.sumologic.com", category: "cybersecurity" },
  { id: "okta-india", name: "Okta India", description: "Identity and access management solutions.", careerUrl: "https://www.okta.com/company/careers/", websiteUrl: "https://www.okta.com", category: "cybersecurity" },
];

const DEV_TOOLS: Company[] = [
  { id: "atlassian", name: "Atlassian", description: "Team collaboration (Jira, Confluence, Bitbucket).", careerUrl: "https://www.atlassian.com/company/careers", websiteUrl: "https://www.atlassian.com", category: "dev-tools" },
  { id: "gitlab", name: "GitLab", description: "DevOps platform with built-in CI/CD.", careerUrl: "https://about.gitlab.com/jobs/", websiteUrl: "https://about.gitlab.com", category: "dev-tools" },
  { id: "github", name: "GitHub", description: "Code hosting, collaboration, and CI/CD.", careerUrl: "https://github.careers", websiteUrl: "https://github.com", category: "dev-tools" },
  { id: "canva", name: "Canva", description: "Online graphic design and visual communication.", careerUrl: "https://www.lifeatcanva.com", websiteUrl: "https://www.canva.com", category: "dev-tools" },
  { id: "notion", name: "Notion", description: "All-in-one workspace for docs, wikis, and projects.", careerUrl: "https://www.notion.so/careers", websiteUrl: "https://www.notion.so", category: "dev-tools" },
  { id: "discord", name: "Discord", description: "Voice and text chat for gaming communities.", careerUrl: "https://discord.com/careers", websiteUrl: "https://discord.com", category: "dev-tools" },
  { id: "vercel", name: "Vercel", description: "Frontend deployment and serverless platform.", careerUrl: "https://vercel.com/careers", websiteUrl: "https://vercel.com", category: "dev-tools" },
  { id: "linear", name: "Linear", description: "Issue tracking and project management for teams.", careerUrl: "https://linear.app/careers", websiteUrl: "https://linear.app", category: "dev-tools" },
  { id: "superhuman", name: "Superhuman", description: "AI-powered email client for professionals.", careerUrl: "https://superhuman.com/careers", websiteUrl: "https://superhuman.com", category: "dev-tools" },
  { id: "openai", name: "OpenAI", description: "Artificial intelligence research and deployment.", careerUrl: "https://openai.com/careers/", websiteUrl: "https://openai.com", category: "dev-tools" },
  { id: "anthropic", name: "Anthropic", description: "AI safety research and Claude assistant.", careerUrl: "https://www.anthropic.com/careers", websiteUrl: "https://www.anthropic.com", category: "dev-tools" },
  { id: "roblox", name: "Roblox", description: "Online gaming platform and game creation system.", careerUrl: "https://careers.roblox.com", websiteUrl: "https://www.roblox.com", category: "dev-tools" },
  { id: "pinterest", name: "Pinterest", description: "Visual discovery and bookmarking platform.", careerUrl: "https://www.pinterestcareers.com", websiteUrl: "https://www.pinterest.com", category: "dev-tools" },
  { id: "snap", name: "Snap Inc.", description: "Social media (Snapchat) and augmented reality.", careerUrl: "https://careers.snap.com", websiteUrl: "https://www.snap.com", category: "dev-tools" },
  { id: "thoughtspot", name: "ThoughtSpot", description: "AI-powered search analytics platform.", careerUrl: "https://www.thoughtspot.com/careers", websiteUrl: "https://www.thoughtspot.com", category: "dev-tools" },
  { id: "uptycs", name: "Uptycs", description: "Cloud security and compliance analytics.", careerUrl: "https://www.uptycs.com/careers", websiteUrl: "https://www.uptycs.com", category: "dev-tools" },
];

const ANALYTICS: Company[] = [
  { id: "fractal", name: "Fractal Analytics", description: "AI and analytics solutions for enterprises.", careerUrl: "https://fractal.ai/careers/", websiteUrl: "https://fractal.ai", category: "analytics" },
  { id: "mu-sigma", name: "Mu Sigma", description: "Decision science and analytics services.", careerUrl: "https://www.mu-sigma.com/careers", websiteUrl: "https://www.mu-sigma.com", category: "analytics" },
  { id: "latentview", name: "LatentView Analytics", description: "Data analytics and digital transformation.", careerUrl: "https://www.latentview.com/careers/", websiteUrl: "https://www.latentview.com", category: "analytics" },
  { id: "tiger-analytics", name: "Tiger Analytics", description: "AI and advanced analytics consulting.", careerUrl: "https://www.tigeranalytics.com/careers/", websiteUrl: "https://www.tigeranalytics.com", category: "analytics" },
];

const EDTECH: Company[] = [
  { id: "byjus", name: "BYJU'S", description: "Indian edtech with personalized learning apps.", careerUrl: "https://byjus.com/careers/", websiteUrl: "https://byjus.com", category: "edtech" },
  { id: "unacademy", name: "Unacademy", description: "Online learning platform for competitive exams.", careerUrl: "https://unacademy.com/careers", websiteUrl: "https://unacademy.com", category: "edtech" },
  { id: "vedantu", name: "Vedantu", description: "Live online tutoring platform.", careerUrl: "https://www.vedantu.com/careers", websiteUrl: "https://www.vedantu.com", category: "edtech" },
  { id: "upgrad", name: "upGrad", description: "Higher education and upskilling programs.", careerUrl: "https://www.upgrad.com/careers/", websiteUrl: "https://www.upgrad.com", category: "edtech" },
  { id: "physics-wallah", name: "Physics Wallah", description: "Affordable online education platform.", careerUrl: "https://www.pw.live/careers", websiteUrl: "https://www.pw.live", category: "edtech" },
  { id: "practo", name: "Practo", description: "Healthcare booking and telemedicine platform.", careerUrl: "https://www.practo.com/careers", websiteUrl: "https://www.practo.com", category: "edtech" },
  { id: "pharmeasy", name: "PharmEasy", description: "Online pharmacy and healthcare delivery.", careerUrl: "https://pharmeasy.in/careers/", websiteUrl: "https://pharmeasy.in", category: "edtech" },
  { id: "cultfit", name: "Cult.fit / Curefit", description: "Fitness and wellness platform with offline centers.", careerUrl: "https://www.cult.fit/careers", websiteUrl: "https://www.cult.fit", category: "edtech" },
];

const ENGINEERING: Company[] = [
  { id: "tata-elxsi", name: "Tata Elxsi", description: "Design and engineering services for auto, media, healthcare.", careerUrl: "https://www.tataelxsi.com/careers", websiteUrl: "https://www.tataelxsi.com", category: "engineering" },
  { id: "kpit", name: "KPIT Technologies", description: "Automotive engineering and mobility software.", careerUrl: "https://www.kpit.com/careers/", websiteUrl: "https://www.kpit.com", category: "engineering" },
  { id: "ltts", name: "L&T Technology Services", description: "Engineering R&D and product engineering services.", careerUrl: "https://www.ltts.com/careers", websiteUrl: "https://www.ltts.com", category: "engineering" },
  { id: "tata-technologies", name: "Tata Technologies", description: "Engineering and product development services.", careerUrl: "https://www.tatatechnologies.com/careers/", websiteUrl: "https://www.tatatechnologies.com", category: "engineering" },
  { id: "cyient", name: "Cyient", description: "Engineering, manufacturing, and geospatial solutions.", careerUrl: "https://www.cyient.com/careers", websiteUrl: "https://www.cyient.com", category: "engineering" },
];

const IT_SERVICES: Company[] = [
  { id: "nagarro", name: "Nagarro", description: "Digital engineering and technology services.", careerUrl: "https://www.nagarro.com/en/careers", websiteUrl: "https://www.nagarro.com", category: "it-services" },
  { id: "persistent", name: "Persistent Systems", description: "Product engineering and digital transformation.", careerUrl: "https://www.persistent.com/careers/", websiteUrl: "https://www.persistent.com", category: "it-services" },
  { id: "publicis-sapient", name: "Publicis Sapient", description: "Digital consulting and technology services.", careerUrl: "https://www.publicissapient.com/careers", websiteUrl: "https://www.publicissapient.com", category: "it-services" },
  { id: "thoughtworks", name: "Thoughtworks", description: "Agile software development and consulting.", careerUrl: "https://www.thoughtworks.com/careers", websiteUrl: "https://www.thoughtworks.com", category: "it-services" },
  { id: "epam", name: "EPAM Systems", description: "Digital platform engineering and services.", careerUrl: "https://www.epam.com/careers", websiteUrl: "https://www.epam.com", category: "it-services" },
  { id: "globant", name: "Globant", description: "Digital product engineering and IT services.", careerUrl: "https://www.globant.com/careers", websiteUrl: "https://www.globant.com", category: "it-services" },
  { id: "endava", name: "Endava", description: "Digital transformation and technology services.", careerUrl: "https://www.endava.com/careers", websiteUrl: "https://www.endava.com", category: "it-services" },
  { id: "globallogic", name: "GlobalLogic (Hitachi)", description: "Product engineering and experience design.", careerUrl: "https://www.globallogic.com/careers/", websiteUrl: "https://www.globallogic.com", category: "it-services" },
  { id: "ltimindtree", name: "LTIMindtree", description: "IT services and digital solutions.", careerUrl: "https://www.ltimindtree.com/careers/", websiteUrl: "https://www.ltimindtree.com", category: "it-services" },
  { id: "coforge", name: "Coforge", description: "IT services and business process outsourcing.", careerUrl: "https://www.coforge.com/careers", websiteUrl: "https://www.coforge.com", category: "it-services" },
  { id: "mphasis", name: "Mphasis", description: "IT services and cloud infrastructure solutions.", careerUrl: "https://careers.mphasis.com", websiteUrl: "https://www.mphasis.com", category: "it-services" },
  { id: "hexaware", name: "Hexaware Technologies", description: "IT services and business process services.", careerUrl: "https://hexaware.com/careers/", websiteUrl: "https://www.hexaware.com", category: "it-services" },
  { id: "zensar", name: "Zensar Technologies", description: "Digital transformation and IT services.", careerUrl: "https://www.zensar.com/careers", websiteUrl: "https://www.zensar.com", category: "it-services" },
  { id: "sonata", name: "Sonata Software", description: "Software services and technology solutions.", careerUrl: "https://www.sonata-software.com/careers", websiteUrl: "https://www.sonata-software.com", category: "it-services" },
  { id: "birlasoft", name: "Birlasoft", description: "IT consulting and digital services.", careerUrl: "https://www.birlasoft.com/careers", websiteUrl: "https://www.birlasoft.com", category: "it-services" },
  { id: "virtusa", name: "Virtusa", description: "Digital engineering and IT services.", careerUrl: "https://www.virtusa.com/careers/", websiteUrl: "https://www.virtusa.com", category: "it-services" },
  { id: "synechron", name: "Synechron", description: "Financial services technology and consulting.", careerUrl: "https://www.synechron.com/careers", websiteUrl: "https://www.synechron.com", category: "it-services" },
  { id: "capgemini", name: "Capgemini", description: "Global IT consulting and technology services.", careerUrl: "https://www.capgemini.com/careers/", websiteUrl: "https://www.capgemini.com", category: "it-services" },
  { id: "cognizant", name: "Cognizant", description: "IT services and business consulting.", careerUrl: "https://careers.cognizant.com", websiteUrl: "https://www.cognizant.com", category: "it-services" },
  { id: "infosys", name: "Infosys", description: "Global IT consulting and digital services.", careerUrl: "https://www.infosys.com/careers.html", websiteUrl: "https://www.infosys.com", category: "it-services" },
  { id: "tcs", name: "TCS", description: "India's largest IT services company.", careerUrl: "https://www.tcs.com/careers", websiteUrl: "https://www.tcs.com", category: "it-services" },
  { id: "wipro", name: "Wipro", description: "IT services, consulting, and business process.", careerUrl: "https://careers.wipro.com", websiteUrl: "https://www.wipro.com", category: "it-services" },
  { id: "hcl", name: "HCLTech", description: "IT services and technology solutions.", careerUrl: "https://www.hcltech.com/careers", websiteUrl: "https://www.hcltech.com", category: "it-services" },
  { id: "tech-mahindra", name: "Tech Mahindra", description: "IT services and digital transformation.", careerUrl: "https://careers.techmahindra.com", websiteUrl: "https://www.techmahindra.com", category: "it-services" },
  { id: "accenture", name: "Accenture", description: "Global IT consulting and professional services.", careerUrl: "https://www.accenture.com/in-en/careers", websiteUrl: "https://www.accenture.com", category: "it-services" },
  { id: "deloitte", name: "Deloitte (USI / Digital)", description: "Audit, consulting, and digital services.", careerUrl: "https://www.deloitte.com/global/en/careers.html", websiteUrl: "https://www.deloitte.com", category: "it-services" },
  { id: "ey", name: "EY GDS", description: "Global delivery services for audit, tax, consulting.", careerUrl: "https://www.ey.com/en_in/careers", websiteUrl: "https://www.ey.com", category: "it-services" },
  { id: "kpmg", name: "KPMG Global Services", description: "Professional services and business advisory.", careerUrl: "https://kpmg.com/in/en/careers.html", websiteUrl: "https://kpmg.com", category: "it-services" },
  { id: "pwc", name: "PwC (Acceleration Center)", description: "Professional services and technology consulting.", careerUrl: "https://www.pwc.in/careers.html", websiteUrl: "https://www.pwc.in", category: "it-services" },
  { id: "ibm-consulting", name: "IBM Consulting", description: "Enterprise IT consulting and transformation.", careerUrl: "https://www.ibm.com/careers/consulting", websiteUrl: "https://www.ibm.com", category: "it-services" },
  { id: "genpact", name: "Genpact", description: "Business process outsourcing and transformation.", careerUrl: "https://www.genpact.com/careers", websiteUrl: "https://www.genpact.com", category: "it-services" },
  { id: "wns", name: "WNS Global Services", description: "BPO and business process management.", careerUrl: "https://www.wns.com/careers", websiteUrl: "https://www.wns.com", category: "it-services" },
  { id: "247-ai", name: "[24]7.ai", description: "Customer engagement and conversational AI.", careerUrl: "https://www.247.ai/careers", websiteUrl: "https://www.247.ai", category: "it-services" },
  { id: "grid-dynamics", name: "Grid Dynamics", description: "Digital transformation and data engineering.", careerUrl: "https://www.griddynamics.com/careers", websiteUrl: "https://www.griddynamics.com", category: "it-services" },
  { id: "dxc", name: "DXC Technology", description: "IT services and enterprise technology solutions.", careerUrl: "https://dxc.com/us/en/careers", websiteUrl: "https://dxc.com", category: "it-services" },
];

export const COMPANIES: Company[] = [
  ...GLOBAL_TECH,
  ...HIGH_COMP,
  ...INDIAN_PRODUCT,
  ...FINTECH,
  ...CYBERSECURITY,
  ...DEV_TOOLS,
  ...ANALYTICS,
  ...EDTECH,
  ...ENGINEERING,
  ...IT_SERVICES,
];
