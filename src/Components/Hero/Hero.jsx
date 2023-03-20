import React, { useState } from "react";
import "../../App.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../firebase-config";

function App() {
  const [imageUploads, setImageUploads] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleNameChange = () => {

  }
  const handleEmailChange = () => {

  }

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const previews = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        previews.push(reader.result);
      };
    });

    setImageUploads(
      files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        caption: '',
        credit: '',
        model: '',
      }))
    );
  };

  const handleDeleteClick = (index) => {
    const newImageUploads = [...imageUploads];
    newImageUploads.splice(index, 1);
    setImageUploads(newImageUploads);
  };

  const handleCaptionChange = (event, index) => {
    const newImageUploads = [...imageUploads];
    newImageUploads[index].caption = event.target.value;
    setImageUploads(newImageUploads);
  };

  const handleCreditChange = (event, index) => {
    const newImageUploads = [...imageUploads];
    newImageUploads[index].credit = event.target.value;
    setImageUploads(newImageUploads);
  };

  const handleModelChange = (event, index) => {
    const newImageUploads = [...imageUploads];
    newImageUploads[index].model = event.target.value;
    setImageUploads(newImageUploads);
  };

  const handleUploadClick = () => {
    setImageUploads([]);
    setUploadSuccess(false);

    Promise.all(
      imageUploads.map((image) => {
        const imageRef = ref(storage, `wmh/images/${image.file.name}`);
        return uploadBytes(imageRef, image.file)
          .then((snapshot) => {
            return getDownloadURL(snapshot.ref)
              .then((url) => {
                return {
                  url,
                  caption: image.caption,
                  credit: image.credit,
                  model: image.model,
                };
              });
          });
      })
    )
      .then((urls) => {
        console.log(urls);
        setUploadSuccess(true);

        // Upload data to Firestore
        const imageUploadsCollectionRef = collection(db, "imageUploads");
        urls.forEach((url) => {
          addDoc(imageUploadsCollectionRef, {
            url: url.url,
            caption: url.caption,
            credit: url.credit,
            model: url.model,
          })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        });

        // Show success message
        alert("Upload successful!");
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <>
      <div className='container bg-dark w-75 main-contianer'>
        <div className='row Pre p-5'>
          <div className='col-10 mx-auto'>
            <div className='row'>
              <div className='col-5'>
                <input className='form-control' value={""} onChange={handleNameChange} type="text" placeholder='Enter Your Name:' />
              </div>
              <div className='col-5'>
                <input className='form-control' value={""} onChange={handleEmailChange} type="text" placeholder='Enter Your Email:' />
              </div>
              <div className='col-2'>
                <input type="file" className='form-control btn-outline-danger w-75' multiple onChange={handleImageChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='container bg-light w-75 main-contianer'>
          <div className='row p-5'>
            <div className='col-10 mx-auto'>
              <div className='row'>
                <div className="App">
                  {imageUploads.length > 0 && (
                    <div>
                      <div className="previews">
                        {imageUploads.map((image, index) => (
                          <div key={index} className="preview">
                            <img src={image.preview} alt={image.file.name} />
                            <div>
                              <input
                                type="text"
                                placeholder="Caption"
                                value={image.caption}
                                onChange={(event) => handleCaptionChange(event, index)}
                              />
                              <input
                                type="text"
                                placeholder="Credit"
                                value={image.credit}
                                onChange={(event) => handleCreditChange(event, index)}
                              />
                              <input
                                type="text"
                                placeholder="Model"
                                value={image.model}
                                onChange={(event) => handleModelChange(event, index)}
                              />
                              <button onClick={() => handleDeleteClick(index)}>Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button onClick={handleUploadClick}>Upload</button>
                    </div>
                  )}
                  {uploadSuccess && (
                    <div>
                      <h2>Upload Successful!</h2>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default App;


