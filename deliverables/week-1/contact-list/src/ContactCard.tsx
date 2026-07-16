import type { Contact } from "./types";

export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <div>
      <h1>{contact.name}</h1>
      <span>{contact.email}</span>
      <br />
      <span>{contact.role}</span>
    </div>
  );
}
