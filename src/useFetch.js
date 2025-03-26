import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setPending] = useState(true);
  const [eroor, setEroor] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch data!");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setPending(false);
          setEroor(false);
        })
        .catch((err) => {
          setPending(false);
          setEroor(err.message);
        });
    }, 1000);
  }, [url]);
  return { data, isPending, eroor };
};

export default useFetch;
