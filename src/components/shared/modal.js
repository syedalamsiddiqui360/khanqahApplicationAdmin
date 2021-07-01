
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function TypeForm(props) {
    const {show , setShow , title , message , handleYes } = props;

    // const handleShow = () => {
    //     setShow(true);
    // }

    const handleClose = () => {
        setShow(false);
    }


    return (
        <div >
             {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>No</Button>
                    <Button variant="primary" onClick={handleYes}>Yes</Button>
                </Modal.Footer>
           </Modal>
        </div>
    );
}

export default TypeForm;
