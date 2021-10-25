
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PdfForm from "./pdfForm";
import PdfList from "./pdfList";

function Pdf() {
    const [tab , setTab] = useState(1);
    const [isUpdate , setIsUpdate] = useState(false);
    const [data , setData] = useState(null);
 
    useEffect(() => {
        setData(null);
        setTab(1);
    }, [isUpdate])

    const handleForm = () => {
        setTab(0);
    }

    const handleList = () => {
        setTab(1);
    }

    const handleData = (data) => {
       setData(data);
       setTab(0);
    }

    return (
        <div className="p-4" >
            <h4 className="text-center">PDF</h4>
            
            {tab == 0 && (
                <>
                <Button variant="primary" onClick={handleList}>List</Button>
                <PdfForm setIsUpdate={setIsUpdate} isUpdate={isUpdate} data={data}/>
                </>
                )}
            {tab == 1 && (
                <>
                <Button variant="primary" onClick={handleForm}>Create</Button>
                <PdfList handleData={handleData} setIsUpdate={setIsUpdate} isUpdate={isUpdate}/>
                </>
            )}
        </div>
    );
}

export default Pdf;
