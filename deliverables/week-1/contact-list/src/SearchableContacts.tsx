import { initialContacts } from "./types";
import { ContactList } from "./ContactList";
import { ContactForm } from "./ContactForm";
import { useState } from "react";
import { NewContact } from "./types";

export function SearchableContacts() {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchTerm, setSearchTerm] = useState("");

  const resultContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm),
  );

  return (
    <div>
      <label>
        Search contacts:
        <input
          type="text"
          name="search"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </label>
      <ContactList contacts={resultContacts} />
      <ContactForm
        onAdd={(newContact: NewContact) =>
          setContacts([
            ...contacts,
            { ...newContact, id: String(contacts[contacts.length - 1].id + 1) },
          ])
        }
      />
    </div>
  );
}
