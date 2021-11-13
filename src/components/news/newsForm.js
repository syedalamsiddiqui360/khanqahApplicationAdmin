
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function NewsForm(props) {
    const{isUpdate , setIsUpdate , data} = props;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [expire, setExpire] = useState(false);
    const [isEdit , setIsEdit] = useState(false);

    useEffect(() => {
        console.log(data)
        if(data){
            setTitle(data.title);
            setExpire(data.expire);
            setDescription(data.description);
            setIsEdit(true);
        }
        else{
            setTitle("");
            setDescription("");
            setExpire(false);
        }
    }, [isUpdate])

    const submit = () => {
        axios.post('http://localhost:9000/news/post', {
           'title': title,
           'description': description,
           'expire': expire
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

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleExpire = (e) => {
        setExpire(!expire)
    }

    const update = () => {
        axios.put('http://localhost:9000/news/update/'+data.id, {
            'title': title,
            'description': description,
            'expire': expire
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
            <h4>News Form</h4>
            <Form>
                <Form.Group controlId="">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => handleTitle(e)} placeholder="" />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>  
                <Form.Group controlId="">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={description} onChange={(e) => handleDescription(e)} placeholder="" />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group controlId="">
                <Form.Label>Expire</Form.Label>
                    <div >
                        <Form.Check
                            inline
                            label="false"
                            value={false}
                            name="expire"
                            type="radio"
                            onChange={handleExpire}
                            checked={expire == false}
                        />
                        <Form.Check
                            inline
                            label="true"
                            value={true}
                            onChange={handleExpire}
                            name="expire"
                            type="radio"
                            checked={expire == true}
                        />
                    </div>
                </Form.Group>
                {/* <Form.Group controlId="">
                    <Form.Check 
                        value={true}
                        type="switch"
                        id="custom-switch"
                        onChange={handleExpire}
                        label="Check this switch"
                        // checked={expire}
                    />
                </Form.Group> */}

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

export default NewsForm;
