
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function CategoryForm(props) {
    const{isUpdate , setIsUpdate , data} = props;
    const [title, setTitle] = useState("");
    const [type, setType] = useState()
    const [typeInput, setTypeInput] = useState()
    const [isEdit , setIsEdit] = useState(false);
    const [typeList, setTypeList] = useState([])

    useEffect(() => {
        console.log(data)
        getType();
        if(data){
            setTitle(data.title);
            setType(data.typeId)
            setIsEdit(true);
        }
    }, [isUpdate])

    const getType = () => {
        let newList = [];
        axios.post('http://localhost:9000/type/get_all')
        .then((res) => {
            let data = res.data;
            // console.log(res.data);
            newList.push({ 'id': -1, 'title': "select type" })
            data.forEach((item) => {
                newList.push({ 'id': item.id, 'title': item.title })
            })
            setTypeList(newList)
        }).catch((err) => {
            console.log('FAILURE!!' + err);
        });
    }

    const submit = () => {
        axios.post('http://localhost:9000/category/post', {
           'title': title,
           'typeId': type
        }).then((res) => {
            console.log(res);
            setIsUpdate(!isUpdate);
        }).catch((err) => {
            console.log('FAILURE!!' + err);
        });
    }

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleType = (value, index) => {
        setTypeInput(value)
        setType(typeList[index].id)
        // getCategory(typeList[index].id);
    }

    const update = () => {
        axios.put('http://localhost:9000/category/update/'+data.id, {
            'title': title,
            'typeId': type
         })
        .then((res) => {
            // let data = res;
            console.log(res);
            setIsUpdate(!isUpdate);
        }).catch((err) => {
            console.log('FAILURE!!' + err);
        });
    }

    return (
        <div >
            <h4>Category Form</h4>
            <Form>
                <Form.Group controlId="">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => handleTitle(e)} placeholder="" />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" value={typeInput} onChange={(e) => handleType(e.target.value, e.target.options.selectedIndex)} >
                    {
                        typeList.map((item , index) => {
                            return (<option key={index} selected={item.id == type} > {item.title}</option>)
                        })
                    }
                    </Form.Control>
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                
                {isEdit == false && (
                    <Button variant="primary" onClick={submit}>Submit</Button>
                )}
                {isEdit == true && (
                    <Button variant="primary" onClick={update}>Update</Button>
                )}
            </Form>
        </div>
    );
}

export default CategoryForm;
