
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table , Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "../shared/modal";
import Pagination from "../shared/pagination";

function NewsList(props) {
    const{isUpdate , setIsUpdate , handleData} = props;
    const[id , setId] = useState(0);
    const [newsList, setNewsList] = useState([]);

    //modal states
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("Delete Record");
    const [message, setMessage] = useState("Are you sure you want to delete this record");

    //pagination
    const [count , setCount] = useState(0);
    const [limit , setLimit] = useState(5);
    const [offset , setOffset] = useState(0);

    useEffect(() => {
        callPersonApi();
    }, [isUpdate])

    const callPersonApi = (e) => {
        axios.post('http://localhost:9000/news/get_by_limit',{
            offset: offset,
            limit: limit,
        })
        .then((res) => {
            let data = res.data;
            console.log(data);
            setCount(data.count);
            setNewsList(data.rows);
        }).catch((err) => {
            console.log('FAILURE!!' + err);
        });
    }

    const handleShow = (id) => {
        setId(id);
        setShow(true);
    }

    const deleteType = () => {
        axios.delete('http://localhost:9000/news/delete/'+id)
        .then((res) => {
            console.log(res);
            setShow(false);
            setIsUpdate(!isUpdate);
        }).catch((err) => {
            console.log('FAILURE!!' + err);
        });
    }

    const getOneType = (id) => {
        axios.post('http://localhost:9000/news/get_by_id/'+id)
        .then((res) => {
            let data = res.data;
            console.log(data);
            handleData(data);
            // setIsUpdate(!isUpdate);
        }).catch((err) => {
            console.log('FAILURE!!' + err);
        });
    }

    return (
        <div >
            <h4>News List</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>description</th>
                    <th>expire</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        newsList.map((value)=>{
                           return(
                            <tr key={value.id}>
                            <td onClick={()=>getOneType(value.id)} >{value.id}</td>
                            <td onClick={()=>getOneType(value.id)} >{value.title}</td>
                            <td onClick={()=>getOneType(value.id)} >{value.description}</td>
                            <td onClick={()=>getOneType(value.id)} >{value.expire? "true":"false"}</td>
                            <td onClick={()=>getOneType(value.id)} >{value.createdAt}</td>
                            <td onClick={()=>getOneType(value.id)} >{value.updatedAt}</td>
                            <td><Button onClick={()=>handleShow(value.id)}>DELETE</Button></td>
                            </tr>
                           )
                        })
                    }
                </tbody>
            </Table>
            <Pagination isUpdate={isUpdate} setIsUpdate={setIsUpdate} count={count} offset={offset} setOffset={setOffset} limit={limit}/>
            <Modal show={show} setShow={setShow} message={message} title={title} handleYes={deleteType}/>
        </div>
    );
}

export default NewsList;
