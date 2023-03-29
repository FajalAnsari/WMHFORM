import React, { useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebase-config";
import Navbar from '../Navbar/Navbar';
import "../Dashboard/Dashboard.css";

function Dashboard() {

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
    <>
      <Navbar />
      <div className='container bg-dark w-75 main-contianer'>
        <div className='row Pre p-5'>
          <div className='col-10 mx-auto'>
            <div className='row text-center'>
              <h1 className='text-danger'>Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='container bg-light w-75 main-contianer'>
          <div className='row p-5'>
            <div className="col-md-12 mb-3 w-50 mx-auto">
              <div className="form-group">
                <label htmlFor="filter">Filter by:</label>
                <select className="form-control" id="filter" value={filter} onChange={handleFilterChange}>
                  <option value="all">All</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="lastweek">Last Week</option>
                </select>
                <button className="btn btn-primary mt-2 d-inline" onClick={handleLoadClick}>
                Load Images
              </button>
              </div>
              
            </div>
            <div className="row">
              {imageData.map((image, index) => (
                <div key={index} className="col-md-4 mb-3">
                  <div className="card-load-image bg-dark p-2 text-light">
                    <img className="load-image img-thumbnail" src={image.url} alt={image.caption} />
                    <div className="">
                      <p className="load-img-name"><strong>Name:</strong> {image.name}</p>
                      <p className="load-img-email">
                        <strong>Email:</strong> {image.email}
                      </p>
                      <p className="load-img-text2 ">
                        <strong>Model:</strong> {image.model}
                      </p>
                      <p className="load-img-text2 ">
                        <strong>Photo Grapher:</strong> {image.photographer}
                      </p>
                      <p className="load-img-text2 ">
                        <strong>Fashion Designer:</strong> {image.fashiondesigner}
                      </p>
                      <p className="load-img-text2 ">
                        <strong>Clothing Brand:</strong> {image.clothingbrand}
                      </p>
                      <p className="load-img-text2 ">
                        <strong>Makeup Artist:</strong> {image.makeupartist}
                      </p>
                      <p className="load-img-text2 ">
                        <strong>Lighting:</strong> {image.lighting}
                      </p>
                      <p className="load-img-text2 ">
                        <strong>Studio Credits:</strong> {image.studiocredit}
                      </p>
                      <p className="load-img-text2 ">
                        <strong>Other Credits:</strong> {image.othercredit}
                      </p>
                      <button
                        className="btn btn-danger w-100"
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
        </div>
      </div>
    </>
  );
}

export default Dashboard;