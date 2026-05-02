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
    <div className="card">
      <div className="card-title">Users</div>

      <div className="status">
        {isLoading && "Loading..."}
        {isError && `Error: ${error.message}`}
      </div>

      <button className="button" onClick={() => setLoad(true)}>
        Load Users
      </button>

      <button
        className="button"
        style={{ marginLeft: "10px" }}
        onClick={() => refetch()}
      >
        Refetch
      </button>

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
