// import React from 'react';
// import "../Hero/Hero.css";
// import { Link } from 'react-router-dom';

// function Hero() {

//     return (
//         <div className='container bg-dark w-75 main-contianer'>
//             <div className='row Pre p-5'>
//                 <div className='col-10 mx-auto'>
//                     <div className='row'>
//                         <div className='col-5'>
//                             <input className='form-control' type="text" placeholder='Enter Your Name:' />
//                         </div>
//                         <div className='col-5'>
//                             <input className='form-control' type="text" placeholder='Enter Your Email:' />
//                         </div>
//                         <div className='col-2'>
//                             <Link to={"from"} className='btn btn-danger w-100'>Next</Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Hero;

import React, { useState } from 'react';
import "../Hero/Hero.css";

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [captions, setCaptions] = useState([]);
    const [modelNames, setModelNames] = useState([]);
    const [credits, setCredits] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

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

    const handleCaptionChange = (event, index) => {
        const newCaptions = [...captions];
        newCaptions[index] = event.target.value;
        setCaptions(newCaptions);
    };

    const handleModelNameChange = (event, index) => {
        const newModelNames = [...modelNames];
        newModelNames[index] = event.target.value;
        setModelNames(newModelNames);
    };

    const handleCreditChange = (event, index) => {
        const newCredits = [...credits];
        newCredits[index] = event.target.value;
        setCredits(newCredits);
    };

    return (
        <>
            <div className='container bg-dark w-75 main-contianer'>
                <div className='row Pre p-5'>
                    <div className='col-10 mx-auto'>
                        <div className='row'>
                            <div className='col-5'>
                                <input className='form-control' value={name} onChange={handleNameChange} type="text" placeholder='Enter Your Name:' />
                            </div>
                            <div className='col-5'>
                                <input className='form-control' value={email} onChange={handleEmailChange} type="text" placeholder='Enter Your Email:' />
                            </div>
                            <div className='col-2'>
                                <input type="file" className='form-control btn-outline-danger w-75' multiple onChange={handleImageUpload} />
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
                                        <div className='col-6 d-flex' key={index}>
                                            <img className='p-3 m-2 img-thumbnail' src={image} alt="preview" width="400" height="450" onLoad={() => setSelectedImage(image)} />
                                            {selectedImage === image && (
                                                <div className='col-6 w-100 m-5'>
                                                    <label>Caption:</label>
                                                    <input className='form-control p-2 mt-2' type="text" value={captions[index] || ''} onChange={(event) => handleCaptionChange(event, index)}/>
                                                    <label>Credits</label>
                                                    <input className='form-control p-2  mt-2' type="text" value={modelNames[index] || ''} onChange={(event) => handleModelNameChange(event, index)}/>
                                                    <label>Credits:</label> 
                                                    <input className='form-control p-2  mt-2' type="text" value={credits[index] || ''} onChange={(event) => handleCreditChange(event, index)} />
                                                    <label>Credits:</label>
                                                    <input className='form-control p-2  mt-2' type="text" value={credits[index] || ''} onChange={(event) => handleCreditChange(event, index)} />
                                                    <label>Credits:</label>
                                                    <input className='form-control p-2  mt-2' type="text" value={credits[index] || ''} onChange={(event) => handleCreditChange(event, index)} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
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


