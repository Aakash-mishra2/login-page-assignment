import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Title, Heading, Wrapper, Input, TextArea, Section, Button } from '../styled_components';

const AddCarPage = () => {
    const carData = {
        title: '',
        description: '',
        tags: '',
    }
    const [car, setCar] = useState(carData);
    const [uploadImages, setUploadImages] = useState([]);
    const [previewImageUrls, setPreviewImageUrls] = useState([]);

    // Handle drag-and-drop or file selection for images
    // const handleFileDrop = (e) => {
    //     e.preventDefault();
    //     const newFiles = Array.from(e.dataTransfer.files);
    //     setPreviewImageUrls((prevImages) => [...prevImages, ...newFiles]); // Append new files
    // };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && typeof window !== "undefined" && file instanceof File) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewImageUrls((prev) => [...prev, objectUrl]);
        }
        const imageFile = Array.from(e.target.files);
        setUploadImages((prevImages) => [...prevImages, ...imageFile]); // Append new files
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCar((previnfo) => {
            return {
                ...previnfo,
                [name]: value
            };
        });
    }

    // Submit form data with images
    const handleSubmit = async (e) => {

        e.preventDefault();

        // Convert file to base64 using FileReader

        const formData = new FormData();
        formData.append('title', car.title);
        formData.append('description', car.description);
        formData.append('tags', car.tags);
        uploadImages.forEach((file) => formData.append('images', file));

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/car/newcar`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } catch (error) {
            console.error('Failed to upload car:', error);
        }
    };
    //console.log('images', images);
    return (
        <>
            <div id="upload_box" className="my-4 w-100 px-16 h-4/5 ">
                <h2 className="text-green-800 text-xl font-bold">Add New Car</h2>
                <form className="w-100 mt-4" onSubmit={handleSubmit}>
                    <div className='flex flex-row mb-2'>

                        <Input
                            type="text"
                            placeholder="Title"
                            value={car.title}
                            onChange={handleChange}
                            required
                        />

                        <TextArea
                            placeholder="Description"
                            value={car.description}
                            onChange={handleChange}
                            required
                        />

                    </div>
                    <Input
                        type="text"
                        placeholder="Tags (comma separated)"
                        value={car.tags}
                        style={{ width: '95%' }}
                        onChange={handleChange}
                    />

                    <div
                        onDragOver={(e) => { e.stopPropagation(); e.preventDefault(); }}
                        className="cursor-pointer border-2 border-blue-800 border-dashed mt-3 p-1 mx-4"
                    >
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="fileInput"
                        />
                        <label htmlFor="fileInput" style={{ cursor: 'pointer', margin: '0px 8px' }}>Select Images</label>
                    </div>

                    <button className="py-2 px-4 rounded-sm bg-blue-400 shadow-md mt-4" type="submit">Upload Car</button>
                </form>
            </div>
            <div id="preview_box" className="my-4 px-16 ">
                {
                    previewImageUrls?.length === 0 && <p className='text-2xl font-bold text-gray-700'> Preview Images</p>
                }
                <div className="flex flex-wrap gap-1 bg-gray-200 max-w-100 max-h-9/10 overflow-y-scroll overflow-hidden">
                    {
                        previewImageUrls?.length > 0 && previewImageUrls.map((imgUrl) => {
                            return (
                                <img src={imgUrl} alt="car_image" className='max-w-60 max-h-80' />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default AddCarPage;