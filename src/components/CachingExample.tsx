import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

const QueryEx = () => {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async (): Promise<User[]> => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      return response.json();
    },
    staleTime: 1000 * 60, // How frequent data fetches -- more priority
    gcTime: 1000 * 5, // How long data stays
    // refetchOnWindowFocus: true,
    // refetchOnReconnect: true, // Any network interruption
    // refetchInterval: 1000 * 3,
  });

  return (
    <div className="card">
      <div className="card-title">Users</div>

      <div className="status">
        {isLoading && "Loading..."}
        {isError && `Error: ${error.message}`}
      </div>

      <ul className="list">
        {users.map((user) => (
          <li className="list-item" key={user.id}>
            <strong>{user.name}</strong>
            <div className="status">{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const CachingExample = () => {
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ["users"],
    });
  };

  return (
    <div>
      <button className="button" onClick={invalidateQuery}>
        Invalidate Query
      </button>
      <button
        className="button"
        style={{ marginLeft: "10px" }}
        onClick={() => setShow(!show)}
      >
        {show ? "Unmount Component" : "Mount Component"}
      </button>
      {show && <QueryEx />}
    </div>
  );
};
