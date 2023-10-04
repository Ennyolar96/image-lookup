import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import randomImage from "./components/random";
import ScrollToTopButton from "./components/scroll-to-top";
import { RenderImages } from "./components/images";

const App = () => {
  // state variables
  const [page, setPage] = useState(1); // current page number
  const [img, setImg] = useState("");
  const [perPage] = useState(20); // number of items per page
  const [data, setData] = useState([]);

  const Access = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

  // fetch function
  const fetchData = async () => {
    try {
      // get data from API using page and perPage
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=${page}&query=${img}&client_id=${Access}&per_page=${perPage}`
      );
      // append new data to existing data
      setData((prevData) => [...prevData, ...response.data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    randomImage(Access).then((res) => setData(res));
  }, [Access]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchData();
  };

  const handleSubmit = () => {
    setData([]);
    setPage(1);
    fetchData();
  };

  return (
    <div className="container-fluid">
      <div className="position-relative shadow-sm my-2 rounded-pill">
        <input
          className="form-control shadow-none text-capitalize rounded-pill w-100"
          type="text"
          placeholder="Search your favorite images..."
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="btn bg-dark text-white position-absolute top-0 end-0 rounded-pill"
        >
          <i className="fa fa-search"></i>
        </button>
      </div>

      <RenderImages data={data} />

      {data.length > 0 && (
        <button
          disabled={img === "" ? true : ""}
          className="mb-5 btn btn-md fs-5 w-100 btn-dark"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
      <ScrollToTopButton />
    </div>
  );
};

export default App;
