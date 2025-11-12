import { useState, useEffect } from "react";
import "./redditclient.css";

function RedditClient() {
  const [subreddit, setSubReddit] = useState("");
  const [lanes, setLanes] = useState(() => {
    const stored = localStorage.getItem("subredditLanes");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (err) {
        console.error("Failed to parse localStorage:", err);
        return [];
      }
    }
    return [];
  });
  const [error, setError] = useState("");

  const addLane = async () => {
    let cleanSub = subreddit.trim().toLowerCase();
    if (!cleanSub) {
      setError("Subreddit name cannot be empty");
      return;
    }
    if (lanes.some((l) => l.subreddit === cleanSub)) {
      setError("Lane already exists");
      return;
    }
    // dsjskadhsja
    try {
      const url = "http://localhost:5000/reddit/" + cleanSub;
      const fetchData = await fetch(url);
      if (!fetchData.ok)
        throw new Error(
          "Subreddit not exist OR Api fetching data Failed,please enter a correct subreddit to fetching the data"
        );
      const data = await fetchData.json();
      const posts = data.data.children;

      const newLanes = posts.map((post) => ({
        id: post.data.id,
        subreddit: post.data.subreddit,
        title: post.data.title,
        author: post.data.author,
        url: post.data.url,
      }));

      setLanes((prev) => [...prev, ...newLanes]);
      setSubReddit("");
      setError("");
    } catch (er) {
      setError(er.message);
    }
  };

  const refreshLane = async (subName) => {
    try {
      const url = "http://localhost:5000/reddit/" + subName;
      const fetchData = await fetch(url);
      if (!fetchData.ok) throw new Error("API Failed");
      const data = await fetchData.json();
      const posts = data.data.children;
      const updatedLane = posts.map((post) => ({
        id: post.data.id,
        subreddit: post.data.subreddit,
        title: post.data.title,
        author: post.data.author,
        url: post.data.url,
      }));

      setLanes((prev) => [
        ...prev.filter((l) => l.subreddit !== subName),
        ...updatedLane,
      ]);
    } catch (er) {
      setError(er.message);
    }
  };
  const removeLane = (id) => {
    setLanes((prev) => prev.filter((l) => l.id !== id));
  };
  useEffect(() => {
    localStorage.setItem("subredditLanes", JSON.stringify(lanes));
  }, [lanes]);

  return (
    <div className="reddit-app">
      <h1>📰 Multi Subreddit Viewer</h1>

      <div className="add-lane">
        <input
          type="text"
          placeholder="Enter subreddit name"
          value={subreddit}
          onChange={(e) => setSubReddit(e.target.value)}
        />
        <button onClick={addLane}>Add Lane</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="lanes">
        {lanes.map((l) => (
          <div key={l.id} className="lane">
            <div className="lane-header">
              <h2>{l.subreddit}</h2>
              <div className="lane-buttons">
                <button onClick={() => refreshLane(l.subreddit)}>
                  Refresh
                </button>
                <button onClick={() => removeLane(l.id)}>Remove</button>
              </div>
            </div>
            <ul>
              <li key={l.id}>
                📄{" "}
                <a href={l.url} target="_blank" rel="noreferrer">
                  {l.title}
                </a>{" "}
                — {l.author}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RedditClient;
