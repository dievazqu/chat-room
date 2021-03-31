import React, { useRef, useState, useEffect } from "react";
import { Button, Grid, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const SendPhotoButton = () => {

    const inputFile = useRef(null)
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null);


    const modalStyle = makeStyles((theme) => ({
        paper: {
            position: "absolute",
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            top: "10%",
            left: "10%",
        },
    }));
    const classes = modalStyle();

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };

    const handleFileSelected = event => {
        const files = Array.from(event.target.files)
        console.log("files:", files)
        if (files.length === 1) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
            setShowModal(true);
        }
    }

    const onImageClick = (event) => {
        console.log("Click on image", event);
    }

    const handleDragStart = (event) => {
        console.log("Drag start", event);
    }

    const handleDrag = (event) => {
        console.log("Drag", event);
    }

    const handleDragEnd = (event) => {
        console.log("Drag end", event);
    }

    return (<div>
        <input type='file' id='file' ref={inputFile} onChange={handleFileSelected} style={{display: 'none'}}/>
        <Button variant="contained" color="secondary" type="submit" onClick={onButtonClick}>Send Photo</Button>
        <Modal open={showModal} onClose={()=>setShowModal(false)}>
            <div className={classes.paper}>
                <Grid container direction={"column"} spacing={2}>
                    <Grid item>
                        <h2 id="simple-modal-title">Tagging photo</h2>
                    </Grid>
                    <Grid item>
                    {
                        image ? <img src={image} style={{ maxWidth: '400px', maxHeight: '400px' }}
                                     draggable={false}
                                     onClick={onImageClick}
                                     onDrag={handleDrag}
                                     onMouseDown={handleDragStart}
                                     onMouseUp={handleDragEnd}>
                        </img> : ""
                    }
                    </Grid>
                    <Grid item>
                        <Button>Send</Button>
                    </Grid>

                </Grid>
            </div>
        </Modal>
    </div>);
}

export default SendPhotoButton;