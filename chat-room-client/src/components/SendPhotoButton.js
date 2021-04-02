import React, { useRef, useState, useEffect } from "react";
import { Button, Modal } from '@material-ui/core';
import ImageTagger from "./ImageTagger";

const SendPhotoButton = (token) => {

    const inputFile = useRef(null)
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null);

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };

    const handleFileSelected = event => {
        const files = Array.from(event.target.files)
        console.log("files:", files)
        if (files.length === 1) {
            setImage(event.target.files[0]);
            setShowModal(true);
        }
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (<div>
        <input type='file' id='file' ref={inputFile} onChange={handleFileSelected} style={{display: 'none'}}/>
        <Button variant="contained" color="secondary" type="submit" onClick={onButtonClick}>Send Photo</Button>
        <Modal open={showModal} onClose={closeModal}>
            <ImageTagger image={image} onSubmit={closeModal} token={token}>

            </ImageTagger>
        </Modal>
    </div>);
}

export default SendPhotoButton;