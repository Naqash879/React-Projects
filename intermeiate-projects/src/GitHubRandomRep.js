import { useState } from "react";
import "./gitrandomrep.css";

function GitHubRandomRep() {
  const [language, setLanguage] = useState(""); // initially empty
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [loadingRandom, setLoadingRandom] = useState(false);
  const [repo, setRepo] = useState([]);
  const [randomRepo, setRandomRepo] = useState(null);
  const [error, setError] = useState("");

  // Fetch repositories based on selected language
  const getRepos = async () => {
    if (!language) {
      setError("Please select a language.");
      return;
    }

    setLoadingRepos(true);
    setError("");
    try {
      const url = `https://api.github.com/search/repositories?q=language:${language}&per_page=30`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("GitHub API Error");
      const data = await res.json();
      setRepo(data.items || []);
      setRandomRepo(null); // reset randomRepo when fetching new list
    } catch (err) {
      setError(err.message);
    }
    setLoadingRepos(false);
  };

  // Pick random repo from existing repo array
  const getRandomRepo = () => {
    if (repo.length === 0) {
      setError("No repositories loaded. Please fetch repositories first.");
      return;
    }
    setLoadingRandom(true);
    const random = repo[Math.floor(Math.random() * repo.length)];
    setRandomRepo(random);
    setLoadingRandom(false);
  };

  return (
    <div className="app-container">
      <h1>GitHub Repository Finder</h1>

      <div className="controls">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Enter a Language</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="php">PHP</option>
          <option value="go">Go</option>
          <option value="ruby">Ruby</option>
        </select>

        <button onClick={getRepos}>
          {loadingRepos ? "Loading..." : "Find Repositories"}
        </button>

        <button onClick={getRandomRepo}>
          {loadingRandom ? "Loading..." : "Find Random Repository"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {randomRepo && (
        <div
          className="repo-card"
          style={{ border: "2px solid red", margin: "10px" }}
        >
          <h2>
            <a href={randomRepo.html_url} target="_blank" rel="noreferrer">
              {randomRepo.full_name}
            </a>
          </h2>
          <p>{randomRepo.description}</p>
          <div>
            🟡 language: {language} | ⭐ {randomRepo.stargazers_count} | 🍴{" "}
            {randomRepo.forks_count} | 🐞 {randomRepo.open_issues_count} | 👤{" "}
            {randomRepo.owner?.login}
          </div>
        </div>
      )}
      {repo.map((item) => (
        <div className="repo-card" key={item.id}>
          <h2>
            <a href={item.html_url} target="_blank" rel="noreferrer">
              {item.full_name}
            </a>
          </h2>
          <p>{item.description}</p>
          <div>
            ⭐ {item.stargazers_count} | 🍴 {item.forks_count} | 🐞{" "}
            {item.open_issues_count} | 👤 {item.owner?.login}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GitHubRandomRep;
