import { useState } from "react";
import { EmptyArr } from "./utils";

export const RenderImages = ({ data }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  return (
    <>
      <div className="row row-cols-md-4 row-cols-sm-3 row-cols-2 my-4">
        {EmptyArr(data) ? (
          <p className="mx-auto mt-5">Loading images.....</p>
        ) : (
          data.map(({ id, links, urls, alt_description }) => (
            <div className="col" key={id} onClick={() => handleItemClick(id)}>
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

                <div
                  className={
                    id === selectedItemIndex
                      ? "rounded p-1 show-div"
                      : "hidden-div"
                  }
                >
                  <a
                    className="d-block w-100"
                    href={links.download}
                    download={alt_description}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="btn btn-sm btn-primary w-100 shadow-none fs-6">
                      <i className="fa fa-eye"></i> Preview
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

RenderImages.propTypes;
