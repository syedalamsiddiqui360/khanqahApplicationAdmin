
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function TypeForm(props) {
    const{isUpdate , setIsUpdate , data} = props;
    const [title, setTitle] = useState("")
    const [isEdit , setIsEdit] = useState(false);

    useEffect(() => {
        console.log(data)
        if(data){
            setTitle(data.title);
            setIsEdit(true);
        }
    }, [isUpdate])

    const submit = () => {
        axios.post('http://localhost:9000/type/post', {
           'title': title
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

    const update = () => {
        axios.put('http://localhost:9000/type/update/'+data.id, {
            'title': title
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
            <h4>Type Form</h4>
            <Form>
                <Form.Group controlId="">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => handleTitle(e)} placeholder="" />
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

export default TypeForm;
