import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import randomImage from "./components/random";

const App = () => {
  // state variables
  const [page, setPage] = useState(1); // current page number
  const [img, setImg] = useState("");
  const [perPage] = useState(20); // number of items per page
  const [data, setData] = useState([]); // data from API

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
    fetchData();
  };

  return (
    <div className="container-fluid">
      <div className="position-relative shadow-sm my-2 rounded-pill">
        <input
          className="form-control shadow-none text-capitalize rounded-pill w-100"
          type="text"
          placeholder="Search any image..."
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

      <div className="row row-cols-md-4 row-cols-sm-3 row-cols-2 my-4">
        {data.map(({ id, links, urls, alt_description }) => (
          <div className="col" key={id}>
            <div className="position-relative">
              <div
                className="my-2 w-100 trigger-element"
                style={{ height: "250px" }}
              >
                <img
                  className="w-100 h-100 rounded"
                  src={urls.small}
                  alt={alt_description}
                />
              </div>
              <div className="rounded p-1 hidden-div">
                <a
                  className="d-block w-100"
                  href={links.download}
                  download={alt_description}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="btn btn-sm btn-primary w-100 shadow-none fs-6">
                    <i className="fa fa-download"></i> Download
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.length > 0 && (
        <button
          disabled={img === "" ? true : ""}
          className="mb-5 btn btn-md fs-5 w-100 btn-dark"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default App;
