import type { Contact } from "./types";
import { ContactCard } from "./ContactCard";

export function ContactList({ contacts }: { contacts: Contact[] }) {
  return (
    <div>
      {contacts.length > 0
        ? contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        : "No contacts found"}
    </div>
  );
}
