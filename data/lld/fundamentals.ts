import type { LldTopic } from "./types";

export const FUNDAMENTALS: LldTopic[] = [
  {
    slug: "what-is-lld",
    title: "What is LLD (Low Level Design)",
    tag: "Concept",
    body: `Low Level Design is the detailed, class-level blueprint of a system. While High Level Design talks about servers, databases, and load balancers, LLD talks about classes, interfaces, their relationships, and design patterns. An LLD interview usually asks you to design something like Parking Lot, Splitwise, or BookMyShow on a whiteboard in 45 minutes.

The expected flow is always the same. First clarify requirements and scope. Then list the core entities (nouns become classes). Then define relationships between them (inheritance, composition, association). Then apply SOLID principles and one or two design patterns where they genuinely fit. Finally walk through a use case to prove the design works.

\`\`\`java
// The LLD interview loop: Requirements -> Entities -> Relationships -> Patterns -> Walkthrough
class ParkingLot {
    List<Floor> floors;
    Ticket generateTicket(Vehicle v);   // use case entry point
    double checkout(Ticket t);          // walk through this end to end
}
\`\`\`

## Keep in mind

- HLD is about machines, LLD is about classes — state this line first in interviews.
- Follow the loop: requirements, entities, relationships, patterns, walkthrough.
- Nouns in the problem statement become classes, verbs become methods.
- Prefer composition over inheritance unless there is a true is-a relationship.
- A working simple design beats a fancy broken one — get the happy path running first.`,
  },
  {
    slug: "solid-principles",
    title: "SOLID Principles with Easy Examples",
    tag: "Concept",
    body: `SOLID is five design principles that keep object-oriented code maintainable. Single Responsibility: a class should have one reason to change — a Payment class should not also send emails. Open/Closed: open for extension, closed for modification — add new behavior with new classes, not by editing tested code. Liskov Substitution: a subclass must be usable wherever its parent is expected — if it breaks the parent contract, the hierarchy is wrong.

Interface Segregation: small focused interfaces beat one fat interface — a Robot should not be forced to implement an eat() method it never uses. Dependency Inversion: depend on abstractions, not concretions — a NotificationService should depend on a MessageSender interface, with SMS and Email as implementations.

\`\`\`java
// Dependency Inversion: high-level module depends on abstraction
interface MessageSender { void send(String to, String msg); }
class SmsSender implements MessageSender { /* ... */ }
class NotificationService {
    private final MessageSender sender; // injected, not new-ed
    NotificationService(MessageSender sender) { this.sender = sender; }
}
\`\`\`

## Keep in mind

- SRP: one reason to change per class — split email logic out of Payment.
- OCP: extend with new classes (Strategy is the classic implementation).
- LSP: subclass must honor the parent contract — Square/Rectangle is the famous violation.
- ISP: many small interfaces beat one fat one.
- DIP: depend on interfaces, inject implementations — enables testing and swapping.
- Name one violation and one fix per principle and the interviewer is convinced.`,
  },
];
