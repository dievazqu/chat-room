import React, { useRef, useEffect, useState } from "react";
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import socket from "./Socket";
import COLORS from "../colors";

const ImageTagger = ({token, image, onSubmit}) => {

    const [urlImageData, setUrlImageData] = useState([]);
    const [URLData, setURLData] = useState(null);
    const [load, setLoad] = useState(false);

    const onImageClick = (event) => {
        console.log("Click on image", event);
    }

    const handleMouseDown = (event) => {
        console.log("Mouse Down", event);
        setTaggingRect({x0:event.pageX, y0:event.pageY, x1:event.pageX, y1:event.pageY})
    }

    const handleMouseUp = (event) => {
        console.log("Mouse Up", event);
        setTaggingRect(null);
        setUrlImageData([...urlImageData, URLData]);
    }

    const handleMouseMove = (event) => {
        console.log("Mouse move", event);
        if (taggingRect != null ) {
            setTaggingRect({x0:taggingRect.x0, y0:taggingRect.y0, x1:event.clientX, y1:event.clientY})
        }
    }

    const [taggingRect, setTaggingRect] = useState(null);

    const modalStyle = makeStyles((theme) => ({
        paper: {
            position: "absolute",
            backgroundColor: COLORS.primaryBackground,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(4, 4, 4),
            top: "4%",
            left: "30%",
            right: "30%"
        },
    }));
    const classes = modalStyle();

    const canvasRef = useRef(null);

    useEffect(() => {
        console.log(canvasRef)
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        console.log(image);
        var img = new Image();
        img.onload = function() {

            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            console.log(canvas.width, img.width, img.height);
            const heightWithAspectRatio = (canvas.width / img.width) * img.height;

            console.log("Set height", heightWithAspectRatio);
            canvas.setAttribute("height", heightWithAspectRatio);
            //canvas.offsetHeight = heightWithAspectRatio;

            context.drawImage(img, 0, 0, canvas.width, heightWithAspectRatio);

            if (taggingRect != null) {
                console.log("CANVAS", canvas);
                const clientRect = canvas.getBoundingClientRect()

                const x = taggingRect.x0 - clientRect.left;
                const y = taggingRect.y0 - clientRect.top;
                const w = taggingRect.x1 - taggingRect.x0;
                const h = taggingRect.y1 - taggingRect.y0

                console.log(x, y, w, h);
                console.log("Draw RECT", taggingRect)
                context.beginPath();
                context.rect(x, y, w, h);
                context.stroke();
            }

            console.log("SETTING URL DATA");
            setURLData(canvas.toDataURL());
        }

        console.log(image)
        if (urlImageData.length > 0) {
            img.src = urlImageData[urlImageData.length - 1];
        } else {
            img.src = URL.createObjectURL(image);
        }

    }, [load, urlImageData, taggingRect]);

    const handleSend = () => {
        const data = {token: token.token, image: URLData};
        console.log("SEND", data);
        socket.emit("send_image", data)
        onSubmit();
    }

    const handleUndo = () => {
        if (urlImageData.length > 0) {
            setUrlImageData(urlImageData.slice(0, -1));
        }
    }

    return (<div className={classes.paper}>
        <Grid container direction={"column"} spacing={2}>
            <Grid item>
                <h2 id="simple-modal-title">Tagging photo</h2>
            </Grid>
            <Grid item>
                <canvas ref={canvasRef} style={{"width": "100%", "height": "100%"}}
                        onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}/>
            </Grid>
            <Grid item container alignItems={"center"} justify={"center"}>
                <Grid item xs={2}>
                    <Button variant="contained" style={{backgroundColor: COLORS.buttons}} onClick={handleUndo}>Undo</Button>
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={2}>
                    <Button variant="contained" style={{backgroundColor: COLORS.buttons}} onClick={handleSend}>Send</Button>
                </Grid>
            </Grid>

        </Grid>
    </div>);
}

export default ImageTagger;