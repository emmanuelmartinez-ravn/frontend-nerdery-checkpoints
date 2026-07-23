import type { NewContact } from "./types";
import { useState } from "react";
import "./ContactForm.css";

function formToContact(formData: FormData): NewContact {
  return {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    role: formData.get("role") as string,
  };
}

function validateEmail(email: string) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(email);
}

function validateContact(contact: NewContact): string {
  const errors = [];

  if (!contact.name) {
    errors.push("Name is required");
  }

  if (!validateEmail(contact.email)) {
    errors.push("A valid email is required");
  }

  return errors.join(" & ");
}

function handleSubmit(
  event: React.SubmitEvent<HTMLFormElement>,
  onAdd: (contact: NewContact) => void,
  setError: React.Dispatch<React.SetStateAction<string>>,
) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const newContact = formToContact(formData);

  const error = validateContact(newContact);

  setError(error);

  if (error) {
    return;
  }

  onAdd(newContact);
}

export function ContactForm({
  onAdd,
}: {
  readonly onAdd: (contact: NewContact) => void;
}) {
  const [error, setError] = useState("");

  return (
    <form
      onSubmit={(event) => handleSubmit(event, onAdd, setError)}
      className="contact-form"
    >
      <h2>Add Contact</h2>
      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          onChange={() => {
            setError("");
          }}
          placeholder="John Doe"
        />
      </label>
      <div className="email-and-role">
        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            onChange={() => {
              setError("");
            }}
            placeholder="john@example.com"
          />
        </label>
        <label>
          <span>Role</span>
          <input type="text" name="role" placeholder="Engineer"></input>
        </label>
      </div>
      {error && (
        <span role="alert" style={{ color: "red" }}>
          {error}
        </span>
      )}
      <button type="submit">Add Contact</button>
    </form>
  );
}
