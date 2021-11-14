
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function ImageForm(props) {
    const{isUpdate , setIsUpdate , data} = props;
    const [title, setTitle] = useState("");
    const [slider, setSlider] = useState(0);
    const [isEdit , setIsEdit] = useState(false);
    const [sliderInput, setSliderInput] = useState()
    const [sliderList, setSliderList] = useState([])
    const [file, setFile] = useState([])
    const [fileName , setFileName] = useState();

    useEffect(() => {
        console.log(data)
        getSlider();
        if(data){
            setTitle(data.title);
            setSlider(data.sliderId);
            setFileName(data.imageName);
            setIsEdit(true);
        }
    }, [isUpdate])

    const getSlider = () => {
        let newList = [];
        axios.post('http://localhost:9000/slider/get_all')
        .then((res) => {
            let data = res.data;
            console.log(res.data);
            newList.push({ 'id': -1, 'title': "select slider" })
            data.forEach((item) => {
                newList.push({ 'id': item.id, 'title': item.title })
            })
            setSliderList(newList)
        }).catch((err) => {
            console.log('FAILURE!!' + err);
        });
    }

    const submit = () => {
        let formData = new FormData();
        for(let i=-1 ; i<file.length; i++){
            formData.append(`file`, file[i]);
        }
        formData.append('sliderId', slider);
        formData.append('title', title);
        
        axios.post('http://localhost:9000/image/post',formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
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

    const handleSlider = (value, index) => {
        setSliderInput(value)
        setSlider(sliderList[index].id)
    }

    const handleFile = (e) => {
        setFile(e.target.files)
        //  this.selectedFiles = this.$refs.file.files;
    }

    const update = () => {
        let formData = new FormData();
        for(let i=0 ; i<file.length; i++){
            formData.append('file', file[i]);
        }
        // formData.append('file', file);
        formData.append('sliderId', slider);
        formData.append('title', title);

        axios.put('http://localhost:9000/image/update/'+data.id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
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
            <h4>Image Form</h4>
            <Form>
                <Form.Group controlId="">
                    <Form.Label>Title</Form.Label>
                    <Form.Control slider="text" value={title} onChange={(e) => handleTitle(e)} placeholder="" />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group controlId="">
                    <Form.Label>Slider</Form.Label>
                    <Form.Control as="select" value={sliderInput} onChange={(e) => handleSlider(e.target.value, e.target.options.selectedIndex)} >
                    {
                        sliderList.map((item , index) => {
                            return (<option key={index} selected={item.id == slider} > {item.title}</option>)
                        })
                    }
                    </Form.Control>
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group controlId="">
                    <Form.File id="exampleFormControlFile1" accept="image/*" multiple={isEdit? false:true} onChange={(e) => handleFile(e)} label="File input" />
                    <Form.Text className="text-muted"></Form.Text>
                    {isEdit == true && (
                            <img src={"http://localhost:9000/pdf/get/"+fileName} style={{width:'100px' , height: '100px'}} />
                    )}
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

export default ImageForm;
