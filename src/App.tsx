import "./App.css";
import { CachingExample } from "./components/CachingExample";
import { MutationExample } from "./components/MutationExample";
import { QueryExample } from "./components/QueryExample";

export default function App() {
  return (
    <div className="app">
      <h1 className="app-title">Tanstack Query</h1>
      <div className="grid">
        {/* <QueryExample />
        <MutationExample /> */}
        <CachingExample />
      </div>
    </div>
  );
}
