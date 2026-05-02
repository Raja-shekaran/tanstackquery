import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

export const MutationExample = () => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  const createPost = async (post: Post): Promise<Post> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    return response.json();
  };

  const {
    mutate,
    data: newPost,
    isPending,
  } = useMutation({
    mutationFn: createPost,
  });

  return (
    <div className="card">
      <div className="card-title">Create Post</div>

      <input
        className="input"
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="input"
        type="text"
        placeholder="Post body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <button
        className="button"
        onClick={() => mutate({ id: Date.now(), title, body })}
      >
        {isPending ? "Creating..." : "Create Post"}
      </button>

      {newPost && (
        <div className="success-box">
          <p>
            <strong>ID:</strong> {newPost.id}
          </p>
          <p>
            <strong>Title:</strong> {newPost.title}
          </p>
          <p>
            <strong>Body:</strong> {newPost.body}
          </p>
        </div>
      )}
    </div>
  );
};
