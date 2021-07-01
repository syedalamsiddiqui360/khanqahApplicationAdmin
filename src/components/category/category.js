
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryForm from "./categoryForm";
import CategoryList from "./categoryList";

function Category() {
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
        <div >
            <h4 className="text-center">Category</h4>
            
            {tab == 0 && (
                <>
                <Button variant="primary" onClick={handleList}>List</Button>
                <CategoryForm setIsUpdate={setIsUpdate} isUpdate={isUpdate} data={data}/>
                </>
                )}
            {tab == 1 && (
                <>
                <Button variant="primary" onClick={handleForm}>Create</Button>
                <CategoryList handleData={handleData} setIsUpdate={setIsUpdate} isUpdate={isUpdate}/>
                </>
            )}
        </div>
    );
}

export default Category;
