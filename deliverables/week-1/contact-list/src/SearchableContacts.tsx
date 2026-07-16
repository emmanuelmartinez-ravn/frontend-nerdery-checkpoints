import { initialContacts } from "./types";
import { ContactList } from "./ContactList";
import { ContactForm } from "./ContactForm";
import { useState } from "react";
import { NewContact } from "./types";

export function SearchableContacts() {
  const [contacts, setContacts] = useState(initialContacts);
  return (
    <div>
      <label>
        Search contacts:
        <input
          type="text"
          name="search"
          onChange={(event) => {
            const searchTerm = event.currentTarget.value;
            const resultContacts = initialContacts.filter(
              (contact) =>
                contact.name.toLowerCase().includes(searchTerm) ||
                contact.email.toLowerCase().includes(searchTerm),
            );
            setContacts(resultContacts);
          }}
        />
      </label>
      <ContactList contacts={contacts} />
      <ContactForm
        onAdd={(newContact: NewContact) =>
          setContacts([
            ...contacts,
            { ...newContact, id: String(contacts.length + 1) },
          ])
        }
      />
    </div>
  );
}
