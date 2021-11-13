
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function AudioForm(props) {
    const{isUpdate , setIsUpdate , data} = props;
    const [isEdit , setIsEdit] = useState(false);

    const [file, setFile] = useState(null)
    const [id , setId] = useState();
    const [name, setName] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [place, setPlace] = useState()
    const [islamiDate, setIslamiDate] = useState()
    const [category, setCategory] = useState()
    const [categoryInput, setCategoryInput] = useState()
    const [categoryList, setCategoryList] = useState([])
    const [person, setPerson] = useState()
    const [personInput, setPersonInput] = useState()
    const [personList, setPersonList] = useState([])
    const [date, setDate] = useState()
    const [fileName , setFileName] = useState();

    useEffect(() => {
        if(data){
            setFileName(data.fileName);
            setId(data.id);
            setTitle(data.title);
            setName(data.name);
            setPerson(data.person_id);
            setPlace(data.place);
            setDate(new Date(data.date));
            setIslamiDate(new Date(data.islamiDate));
            setDescription(data.description);
            setCategory(data.category_id);
            setIsEdit(true);
        }
    }, [isUpdate])

    useEffect(() => {
        getPerson();
        getCategory();
    }, [])

    const getCategory = () => {
        let newList = [];
        axios.post('http://localhost:9000/category/get_all').then((res) => {
            let data = res.data;
            //    console.log(res.data);
            newList.push({ 'id': -1, 'title': "select category" })
            data.forEach((item) => {
                newList.push({ 'id': item.id, 'title': item.title })
            })
            setCategoryList(newList)
        }).catch((err) => {
            console.log('FAILURE!!' + err);
        });
    }

    const getPerson = (e) => {
        let newList = [];
        axios.post('http://localhost:9000/person/get_all')
        .then((res) => {
    //      console.log(res.data);
            newList.push({ 'id': -1, 'title': "select person" })
            res.data.forEach((item) => {
                newList.push({ 'id': item.id, 'title': item.title })
            })
            setPersonList(newList)
        }).catch((err) => {
            console.log('FAILURE!!' + err);
        });
    }

    const submit = () => {
        let formData = new FormData();

        formData.append('file', file);
        formData.append('name', name);
        formData.append('title', title);
        formData.append('date', date);
        formData.append('categoryId', category);
        formData.append('personId', person );
        formData.append('place', place);
        formData.append('description', description);
        formData.append('islamiDate', islamiDate);

        axios.post('http://localhost:9000/audio/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        ).then((res) => {
            console.log(res);
            setIsUpdate(!isUpdate);
        }).catch((err) => {
            console.log('FAILURE!!' + err);
        });
    }

    const update = () => {
        let formData = new FormData();

        formData.append('file', file);
        formData.append('name', name);
        formData.append('title', title);
        formData.append('date', date);
        formData.append('categoryId', category);
        formData.append('personId', person );
        formData.append('place', place);
        formData.append('description', description);
        formData.append('islamiDate', islamiDate);

        axios.put('http://localhost:9000/audio/update/'+id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res);
            setIsUpdate(!isUpdate);
        }).catch((err) => {
            console.log('FAILURE!!' + err);
        });
    }

    const handleFile = (e) => {
        setFile(e.target.files[0])
        //  this.selectedFiles = this.$refs.file.files;
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleDescription = (e) => {
        // console.log(e.target.value)
        setDescription(e.target.value)
    }
    const handleDate = (date) => {
        setDate(date)
    }

    const handleIslamiDate = (date) => {
        console.log(date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear())
        setIslamiDate(date)
    }
    const handlePlace = (e) => {
        setPlace(e.target.value)
    }

    const handlePerson = (value, index) => {
        setPerson(personList[index].id)
        setPersonInput(value)
        // getType(personList[index].id);
    }

    const handleCategory = (value, index) => {
        setCategoryInput(value)
        setCategory(categoryList[index].id)
    }

    return (
        <div >
              <h4>Person Form</h4>
            <Form>
                <Form.Group controlId="">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => handleTitle(e)} placeholder="" />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => handleName(e)} placeholder="" />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label>Place</Form.Label>
                    <Form.Control type="text" value={place} onChange={(e) => handlePlace(e)} placeholder="" />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label>Date</Form.Label>
                    <DatePicker selected={date}  onChange={date => handleDate(date)} />
                    {/* <Form.Control type="text" value={name} onChange={(e) => handleName(e)} placeholder="" /> */}
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label>Islami Date</Form.Label>
                    <DatePicker selected={islamiDate} openToDate={new Date("1442/09/28")} placeholderText="Cick to select a date" onChange={date => handleIslamiDate(date)} />
                    {/* <Form.Control type="text" value={name} onChange={(e) => handleName(e)} placeholder="" /> */}
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" value={description} onChange={(e) => handleDescription(e)} rows={3} />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label>Person</Form.Label>
                    <Form.Control as="select" value={personInput}  onChange={(e) => handlePerson(e.target.value, e.target.options.selectedIndex)} >
                    {
                        personList.map((item , index) => {
                                return (<option key={index} selected={item.id == person}> {item.title}</option>)
                        })
                    }
                    </Form.Control>
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" value={categoryInput} onChange={(e) => handleCategory(e.target.value, e.target.options.selectedIndex)} >
                    {
                        categoryList.map((item , index) => {
                            return (<option key={index} selected={item.id == category} > {item.title}</option>)
                        })
                    }
                    </Form.Control>
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group controlId="">
                    <Form.File id="exampleFormControlFile1" accept="audio/mpeg" onChange={(e) => handleFile(e)} label="File input" />
                    <Form.Text className="text-muted"></Form.Text>
                    {isEdit == true && (
                        <audio controls autoplay>
                            <source src={"http://localhost:9000/audio/get/"+fileName} type="audio/mpeg"/>
                        </audio>
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

export default AudioForm;












{/* <form >
<label>
    Name:
<input type="text" value={name} onChange={(e) => handleName(e)} />
</label>

<label>
    title:
<input type="text" name="title" value={title} onChange={(e) => handleTitle(e)} />
</label>

<label>
    place:
<input type="text" name="place" value={place} onChange={(e) => handlePlace(e)} />
</label>

<label>
    date:
</label>


<label>
    islamiDate:


</label>

<label>
    description:
<textarea name="description" value={description} onChange={(e) => handleDescription(e)} />
</label>


<label>
    person:
<select value={personInput} onChange={(e) => handlePerson(e.target.value, e.target.options.selectedIndex)}>
        {

            personList.map((item) => {
                return (<option > {item.title}</option>)
            })
        }
    </select>
</label>

<label>
    Category:
<select value={categoryInput} onChange={(e) => handleCategory(e.target.value, e.target.options.selectedIndex)}>
        {
            categoryList.map((item) => {
                return (<option>{item.title}</option>)
            })
        }
    </select>
</label>

</form>
<input type="file" onChange={(e) => handleFile(e)} />
<button onClick={submit}>click</button> */}