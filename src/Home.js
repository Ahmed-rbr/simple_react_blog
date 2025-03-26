import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const { data, isPending, eroor } = useFetch(
    "https://blogapp-8a667-default-rtdb.firebaseio.com/blogs.json"
  );

  const blogs = data
    ? Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }))
    : [];

  return (
    <div className="home">
      {eroor && <div>{eroor}</div>}
      {isPending && <div>Loading...</div>}
      {blogs.length > 0 && <BlogList blogs={blogs} title="All Blogs!" />}
    </div>
  );
};

export default Home;
