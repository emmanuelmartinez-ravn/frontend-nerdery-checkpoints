import type { NewContact } from "./types";
import { useState } from "react";

function formToContact(formData: FormData): NewContact {
  return {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    role: formData.get("role") as string,
  };
}

function validateEmail(email: string) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email,
  );
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

export function ContactForm({
  onAdd,
}: {
  onAdd: (contact: NewContact) => void;
}) {
  const [error, setError] = useState("");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newContact = formToContact(formData);

    const errors = validateContact(newContact);

    setError(errors);

    if (errors !== "") {
      return;
    }

    onAdd(newContact);
  }

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <label>
        Name:
        <input
          type="text"
          name="name"
          onChange={() => {
            setError("");
          }}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          onChange={() => {
            setError("");
          }}
        />
      </label>
      {error && (
        <span role="alert" style={{ color: "red" }}>
          {error}
        </span>
      )}
      <label>
        Role:
        <input type="text" name="role"></input>
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
}
