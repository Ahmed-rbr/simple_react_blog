import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    data: blog,
    isPending,
    eroor,
  } = useFetch(
    `https://blogapp-8a667-default-rtdb.firebaseio.com/blogs/${id}.json`
  );

  const handleClick = () => {
    fetch(
      `https://blogapp-8a667-default-rtdb.firebaseio.com/blogs/${id}.json`,
      {
        method: "DELETE",
      }
    ).then(() => {
      history.push("/");
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {eroor && <div>{eroor}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
