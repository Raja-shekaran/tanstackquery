import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export const QueryExample = () => {
  const [load, setLoad] = useState(false);
  const fetchData = async (): Promise<User[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
  };
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchData,
    enabled: load,
  });
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      <button onClick={() => setLoad(true)}>Load Users</button>
      <button onClick={() => refetch()}>Refetch Users</button>
      {users && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
