import { useState } from "react";
import "./gitrandomrep.css";
function GitHubRandomRep() {
  let [language, setLanguage] = useState("Enter a Language");
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchRepo = async () => {
    setLoading(true);
    setError("");
    setRepo(null);

    try {
      const url = `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=100`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("GitHub API error");

      const data = await res.json();
      const items = data.items;

      if (!items || items.length === 0) {
        setError("No repositories found.");
        setLoading(false);
        return;
      }

      const randomRepo = items[Math.floor(Math.random() * items.length)];
      setRepo(randomRepo);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="app-container">
        <h1>GitHub Repository Finder</h1>

        <div className="controls">
          <select onChange={(e) => setLanguage(e.target.value)}>
            <option>{language}</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="php">PHP</option>
            <option value="go">Go</option>
            <option value="ruby">Ruby</option>
          </select>
          <button onClick={fetchRepo} disabled={loading}>
            {loading ? "Loading..." : "Find Repository"}
          </button>

          <button onClick={fetchRepo} disabled={loading || !repo}>
            Another Random Repo
          </button>
        </div>
        {repo && (
          <div className="repo-card">
            <h2>
              <a href={repo.html_url} target="_blank">
                {repo.full_name}
              </a>
            </h2>
            <p>{repo.description}</p>
            <div>
              ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count} | 🐞{" "}
              {repo.open_issues_count} | 👤 {repo.owner.login}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default GitHubRandomRep;
