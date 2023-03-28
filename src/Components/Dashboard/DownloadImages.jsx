import React, { useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebase-config";

function DownloadImages() {
  const [imageData, setImageData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState("all"); // Add state for filter

  useEffect(() => {
    if (loaded) {
      const fetchImages = async () => {
        let imageUploadsCollectionRef = collection(db, "imageUploads");
        let snapshot;

        // Filter by date based on selected filter
        if (filter === "today") {
          const start = new Date();
          start.setHours(0, 0, 0, 0); // Today's date start time
          const end = new Date();
          end.setHours(23, 59, 59, 999); // Today's date end time
          const q = query(imageUploadsCollectionRef, where("date", ">=", start), where("date", "<=", end));
          snapshot = await getDocs(q);
        } else if (filter === "yesterday") {
          const start = new Date();
          start.setDate(start.getDate() - 1);
          start.setHours(0, 0, 0, 0); // Yesterday's date start time
          const end = new Date();
          end.setDate(end.getDate() - 1);
          end.setHours(23, 59, 59, 999); // Yesterday's date end time
          const q = query(imageUploadsCollectionRef, where("date", ">=", start), where("date", "<=", end));
          snapshot = await getDocs(q);
        } else if (filter === "lastweek") {
          const start = new Date();
          start.setDate(start.getDate() - 7);
          start.setHours(0, 0, 0, 0); // Last week's start date start time
          const end = new Date();
          end.setHours(23, 59, 59, 999); // Last week's end date end time
          const q = query(imageUploadsCollectionRef, where("date", ">=", start), where("date", "<=", end));
          snapshot = await getDocs(q);
        } else {
          snapshot = await getDocs(imageUploadsCollectionRef);
        }

        const data = [];

        await Promise.all(snapshot.docs.map(async (doc) => {
          const image = doc.data();
          const url = await getDownloadURL(ref(storage, image.url));
          data.push({ url, ...image });
        }));

        setImageData(data);
      };

      fetchImages();
    }
  }, [loaded, filter]);

  const handleDownloadClick = (url) => {
    window.open(url, "_blank");
  };

  const handleLoadClick = () => {
    setLoaded(true);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mb-3">
          <div className="form-group">
            <label htmlFor="filter">Filter by:</label>
            <select className="form-control" id="filter" value={filter} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="lastweek">Last Week</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleLoadClick}>
            Load Images
          </button>
        </div>
        {imageData.map((image, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card">
              <img
                className="card-img-top"
                src={image.url}
                alt={image.caption}
              />
              <div className="card-body">
                <h5 className="card-title">{image.caption}</h5>
                <p className="card-text">
                  <strong>Credit:</strong> {image.credit}
                </p>
                <p className="card-text">
                  <strong>Model:</strong> {image.model}
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDownloadClick(image.url)}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DownloadImages;