import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebase-config";

function DownloadImages() {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const imageUploadsCollectionRef = collection(db, "imageUploads");
      const snapshot = await getDocs(imageUploadsCollectionRef);
      const data = [];

      await Promise.all(snapshot.docs.map(async (doc) => {
        const image = doc.data();
        const url = await getDownloadURL(ref(storage, image.url));
        data.push({ url, ...image });
      }));

      setImageData(data);
    };

    fetchImages();
  }, []);

  const handleDownloadClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="container">
      <div className="row">
        {imageData.map((image, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card">
              <img
                className="card-img-top"
                src={image.url}
                alt={image.caption}
              />
              <div className="card-body">
                <p className="card-title">
                  <strong>Username:</strong> {image.caption}</p>
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