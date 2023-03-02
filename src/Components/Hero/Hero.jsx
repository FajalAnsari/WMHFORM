

import React, { useState } from 'react';
import "../Hero/Hero.css";
import {dataref} from '../firebase';

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [captions, setCaptions] = useState([]);
    const [Credits, setCredits] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };


    const handleCaptionChange = (event, index) => {
        const newCaptions = [...captions];
        newCaptions[index] = event.target.value;
        setCaptions(newCaptions);
    };
    const handleCredtisChange = (event, index) => {
        const newCredits = [...Credits];
        newCredits[index] = event.target.value;
        setCredits(newCredits);
    };
   

     // Server Side codding 
     const handleSubmit = () => {
        dataref.ref("user").push().set({
            name : name,
            email : email,
            captions : captions,

        }).catch(alert);
        alert("Success Fully Submitted")

     }

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);

        const newImages = [];

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                newImages.push(reader.result);
                setImages((prevImages) => [...prevImages, reader.result]);
            };

            reader.readAsDataURL(file);
        });

        setSelectedImage(newImages[0]);
    };

    return (
        <>
            <div className='container bg-dark w-75 main-contianer'>
                <div className='row Pre p-5'>
                    <div className='col-10 mx-auto'>
                        <div className='row'>
                            <div className='col-5'>
                                <input className='form-control' value={name}  onChange={handleNameChange} type="text" placeholder='Enter Your Name:' />
                            </div>
                            <div className='col-5'>
                                <input className='form-control' value={email} onChange={handleEmailChange} type="text" placeholder='Enter Your Email:' />
                            </div>
                            <div className='col-2'>
                                <input type="file"  className='form-control btn-outline-danger w-75' multiple onChange={handleImageUpload}/>
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
                                <div className='col-10 mx-auto'>
                                    {images.map((image, index) => (
                                        <div className='col-6 col-xs-12 d-flex' key={index}>
                                            <>
                                            <img className='p-3 m-2 img-thumbnail' src={image} alt="preview" width="400" height="450" onLoad={() => setSelectedImage(image)} />
                                            {selectedImage === image && (
                                                <div className='col-6 w-100 m-5'>
                                                    <label>Caption:</label>
                                                    <input className='form-control p-2 mt-2' placeholder='Caption' type="text" value={captions[index] || ''} onChange={(event) => handleCaptionChange(event, index)}/>
                                                    <label>Credits:</label>
                                                    <input className='form-control p-2 mt-2' placeholder='Credits' type="text" value={Credits[index] || ''} onChange={(event) => handleCredtisChange(event, index)}/>
                                                    <button className='btn btn-outline-danger button mt-4'><i class="bi bi-trash"></i></button>
                                                </div>
                                            )}
                                            </>
                                        </div>
                                    ))}
                                     <button className='btn btn-success ms-2 w-100' onClick={handleSubmit}>Submit</button>
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


