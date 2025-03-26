import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setPending] = useState(true);
  const [eroor, setEroor] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
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
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setPending(false);
            setEroor(err.message);
          }
        });
    }, 1000);

    return () => abortCont.abort();
  }, [url]);
  return { data, isPending, eroor };
};

export default useFetch;
