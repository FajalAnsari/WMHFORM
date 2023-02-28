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
                            <input className='form-control' type="file" multiple onChange={handleImageUpload} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <div>

                <input type="text" value={name} onChange={handleNameChange} />
                <br />
                <br />
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} />
                <br />
                <br />
                <input type="file" multiple onChange={handleImageUpload} />
                <br />
                <br />
                {selectedImage && (
                    <img src={selectedImage} alt="preview" width="200" height="200" />
                )}
                <br />
                <br />
                {images.map((image, index) => (
                    <div key={index}>
                        <img
                            src={image}
                            alt="preview"
                            width="100"
                            height="100"
                            onClick={() => setSelectedImage(image)}
                        />
                        <br />
                        <br />
                        {selectedImage === image && (
                            <div>
                                <label>Caption:</label>
                                <input
                                    type="text"
                                    value={captions[index] || ''}
                                    onChange={(event) => handleCaptionChange(event, index)}
                                />
                                <br />
                                <br />
                                <label>Model Name:</label>
                                <input
                                    type="text"
                                    value={modelNames[index] || ''}
                                    onChange={(event) => handleModelNameChange(event, index)}
                                />
                                <br />
                                <br />
                                <label>Credits:</label>
                                <input
                                    type="text"
                                    value={credits[index] || ''}
                                    onChange={(event) => handleCreditChange(event, index)}
                                />
                                <br />
                                <br />
                            </div>
                        )}
                        <br />
                    </div>
                ))}
            </div>
        </>

    );
}

export default App;


