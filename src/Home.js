import BlogList from "./BlogList";
import useFetch from "./useFetch";
const Home = () => {
  const { data, isPending, eroor } = useFetch("http://localhost:8000/blogs");
  return (
    <div className="home">
      {eroor && <div>{eroor} </div>}
      {isPending && <div>Loading.... </div>}
      {data && <BlogList blogs={data} title="All Blogs!" />}{" "}
    </div>
  );
};

export default Home;
