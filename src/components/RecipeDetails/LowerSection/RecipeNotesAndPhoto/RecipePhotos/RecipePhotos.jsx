import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import './RecipePhotos.css';
function RecipePhotos({ imageList, setImageList }) {
    // State to manage modal visibility and selected image
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();

    // Function to handle image click
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const handleDeleteImage = (imageId) => {
        console.log(imageId);
        // Call the REMOVE_RECIPE_IMAGE saga with imageId as payload
        dispatch({ type: 'REMOVE_RECIPE_IMAGE', payload: imageId });
    };
    

    // Close modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleCloseModal();
            }
        };

        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isModalOpen]);

    return (
        <div className='recipe-photos__container display-flex flex-column justify-fe'>
            <p className='recipe-notes__subheader color-black mt-0 pb-0 bold'>RECIPE PHOTOS</p>
            <div className='recipe-details__user-photos display-flex flex-row flex-wrap align-center justify-fs of-cover'>
                {imageList.length > 0 ? (
                    imageList.map((image) => (
                        <div
                            key={image.id}
                            className='image-container'
                        >
                            <img
                                className='recipe-details__user-photo clickable-image'
                                src={image.path}
                                alt='Recipe photo'
                                onClick={() => handleImageClick(image)}
                            />
                            <div
                                className='delete-icon'
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering the modal
                                    handleDeleteImage(image.id);
                                }}
                            >
                                <DeleteIcon className='delete-icon' />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='recipe-details__p--no-images'>No images yet</p>
                )}
            </div>


            {/* Modal Overlay */}
            {isModalOpen && (
                <div className='modal-overlay' onClick={handleCloseModal}>
                    <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                        <img
                            src={selectedImage.path}
                            alt='Recipe photo'
                            className='modal-image'
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default RecipePhotos;
