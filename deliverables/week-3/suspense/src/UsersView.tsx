import { Suspense, use, useState } from "react";
import { User, fetchUsers } from "./api";
import { ErrorBoundary } from "./ErrorBoundary";
let usersCache: Promise<User[]> | undefined;

function getUsers(): Promise<User[]> {
  const usersPromise = usersCache ?? fetchUsers();
  usersCache = usersPromise;
  return usersPromise;
}

function clearUsersCache(setKey: React.Dispatch<React.SetStateAction<number>>) {
  usersCache = undefined;
  setKey((key) => key + 1);
}

function UsersList() {
  const users = use(getUsers());

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export function UsersView() {
  const [key, setKey] = useState(0);

  return (
    <ErrorBoundary
      fallback={
        <div>
          <p>Error loading users</p>
          <button onClick={() => clearUsersCache(setKey)}>Try again</button>
        </div>
      }
      key={key}
    >
      <Suspense fallback="Loading…">
        <UsersList></UsersList>
      </Suspense>
    </ErrorBoundary>
  );
}
