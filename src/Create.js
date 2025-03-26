import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [author, setAuthor] = useState("Unknown");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    setIsPending(true);
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then(() => {
        console.log("new blog");
        setIsPending(false);

history.push('/')
      })
      .catch((err) => {
        console.error("Error:", err);
        setIsPending(false);
      });
  };
  return (
    <div className="create">
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Blog title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>{" "}
        <label>
          Blog body
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </label>{" "}
        <label>
          Blog author
          <select value={author} onChange={(e) => setAuthor(e.target.value)}>
            <option value="Unknown">Unknown</option>
            <option value="Ahmed">Ahmed</option>
            <option value="Rabar">Rabar</option>
          </select>{" "}
        </label>{" "}
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Add Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
