import React, { useState } from "react";
import "../../App.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../firebase-config";

function App() {
  const [imageUploads, setImageUploads] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

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

  const handlePhotoChange = (event, index) => {
    const newImageUploads = [...imageUploads];
    newImageUploads[index].photographer = event.target.value;
    setImageUploads(newImageUploads);
  };

  const handleModelChange = (event, index) => {
    const newImageUploads = [...imageUploads];
    newImageUploads[index].model = event.target.value;
    setImageUploads(newImageUploads);
  };

  const handleFashionChange = (event, index) => {
    const newImageUploads = [...imageUploads];
    newImageUploads[index].fashiondesigner = event.target.value;
    setImageUploads(newImageUploads);
  };

  const handleClothChange = (event, index) => {
    const newImageUploads = [...imageUploads];
    newImageUploads[index].clothingbrand = event.target.value;
    setImageUploads(newImageUploads);
  };

  const handleMakeupChange = (event, index) => {
    const newImageUploads = [...imageUploads];
    newImageUploads[index].makeupartist = event.target.value;
    setImageUploads(newImageUploads);
  };

  const handleLightChange = (event, index) => {
    const newImageUploads = [...imageUploads];
    newImageUploads[index].lighting = event.target.value;
    setImageUploads(newImageUploads);
  };

  const handleStudioChange = (event, index) => {
    const newImageUploads = [...imageUploads];
    newImageUploads[index].studiocredit = event.target.value;
    setImageUploads(newImageUploads);
  };

  const handleOtherChange = (event, index) => {
    const newImageUploads = [...imageUploads];
    newImageUploads[index].othercredit = event.target.value;
    setImageUploads(newImageUploads);
  };

  
  const handleUploadClick = () => {
    if (!name || !email) {
      alert("Please fill name and email before uploading.");
      return;
    }
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
                  model: image.model,
                  photographer: image.photographer,
                  fashiondesigner: image.fashiondesigner,
                  clothingbrand: image.clothingbrand,
                  makeupartist: image.makeupartist,
                  lighting: image.lighting,
                  studiocredit: image.studiocredit,
                  othercredit: image.othercredit,
                 
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
            model: url.model,
            photographer: url.photographer,
            fashiondesigner: url.fashiondesigner,
            clothingbrand: url.clothingbrand,
            makeupartist: url.makeupartist,
            lighting: url.lighting,
            studiocredit: url.studiocredit,
            othercredit: url.othercredit,
            name: name,
            email: email,
          })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        });

        // Show success message
        // alert("Upload successful!");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
   
      <div className='container bg-dark w-75 main-contianer'>
        <div className='row Pre p-5'>
          <div className='col-10 mx-auto'>
            <div className='row'>
              <div className='col-5'>
              <input className='form-control' value={name} onChange={handleNameChange} required type="text" placeholder='Enter Your Name:' />
              </div>
              <div className='col-5'>
              <input className='form-control' value={email} onChange={handleEmailChange} required type="text" placeholder='Enter Your Email:' />
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
              <div className='row mx-atuo img-form-container'>
                  {imageUploads.length > 0 && (
                    <div>
                      <div className="previews">
                        {imageUploads.map((image, index) => (
                          <div key={index} className="preview">
                            <img className="img-thumbnail m-3 " src={image.preview} alt={image.file.name} />
                            <div className="inputfields">
                              <p className="text-white ms-2">Caption:</p>
                              <input className="form-control m-2" type="text" placeholder="Caption" value={image.caption} onChange={(event) => handleCaptionChange(event, index)}/>
                              <p className="text-white ms-2">Credit:</p>
                              <input className="form-control m-2" type="text" placeholder="Photographer" value={image.photographer} onChange={(event) => handlePhotoChange(event, index)} />
                              <input className="form-control m-2" type="text" placeholder="Models" value={image.model} onChange={(event) => handleModelChange(event, index)}/>
                              <input className="form-control m-2" type="text" placeholder="Fashion designer" value={image.fashiondesigner} onChange={(event) => handleFashionChange(event, index)} />
                              <input className="form-control m-2" type="text" placeholder="Fashion/Clothing Brand" value={image.clothingbrand} onChange={(event) => handleClothChange(event, index)} />
                              <input className="form-control m-2" type="text" placeholder="Makeup Artist" value={image.makeupartist} onChange={(event) => handleMakeupChange(event, index)} />
                              <input className="form-control m-2" type="text" placeholder="Lightings" value={image.lighting} onChange={(event) => handleLightChange(event, index)} />
                              <input className="form-control m-2" type="text" placeholder="Set/Studio Credits" value={image.studiocredit} onChange={(event) => handleStudioChange(event, index)} />
                              <input className="form-control m-2" type="text" placeholder="Other Credits" value={image.othercredit} onChange={(event) => handleOtherChange(event, index)} />
                              <button className="btn btn-danger m-2 float-end delete-btn" onClick={() => handleDeleteClick(index)}><i className="bi bi-trash"></i></button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="btn btn-success float-end w-100" onClick={handleUploadClick}>Upload</button>
                    </div>
                  )}
                  
              </div>
              {uploadSuccess && (
                    <div>
                      <h2 className="text-success text-center">Upload Successful!</h2>
                    </div>
                  )}
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default App;




