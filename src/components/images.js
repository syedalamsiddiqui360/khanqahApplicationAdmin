
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Audio() {

    const [file, setFile] = useState([])
    const [name, setName] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [place, setPlace] = useState()
    const [islamiDate, setIslamiDate] = useState()
    const [type, setType] = useState()
    const [typeInput, setTypeInput] = useState()
    const [typeList, setTypeList] = useState([])
    const [category, setCategory] = useState()
    const [categoryInput, setCategoryInput] = useState()
    const [categoryList, setCategoryList] = useState([])
    const [person, setPerson] = useState()
    const [personInput, setPersonInput] = useState()
    const [personList, setPersonList] = useState([])
    const [date, setDate] = useState()

    useEffect(() => {
        getPerson();
        getCategory();
        getType();
    }, [])

    const getType = () => {
        let newList = [];
        axios.post('http://localhost:9000/type/get')
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

    const getCategory = () => {
        let newList = [];
        axios.post('http://localhost:9000/category/get').then((res) => {
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
        axios.post('http://localhost:9000/person/get')
        .then((res) => {
            let data = res.data;
            //    console.log(res.data);
            newList.push({ 'id': -1, 'title': "select person" })
            data.forEach((item) => {
                newList.push({ 'id': item.id, 'title': item.title })
            })
            setPersonList(newList)
        }).catch((err) => {
            console.log('FAILURE!!' + err);
        });
    }

    const submit = () => {
        let formData = new FormData();
        console.log(file)

        for(let i=0;i<file.length;i++){
            formData.append('file', file[i]);
        }

        formData.append('slider_id', name);
        formData.append('title', title);
        // console.log(formData);
        axios.post('http://localhost:9000/images/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        ).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log('FAILURE!!' + err);
        });
    }

    const handleFile = (e) => {
        setFile(e.target.files)
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

    const handleType = (value, index) => {
        setTypeInput(value)
        setType(typeList[index].id)
        // getCategory(typeList[index].id);
    }

    const handleCategory = (value, index) => {
        setCategoryInput(value)
        setCategory(categoryList[index].id)
    }



    return (
        <div >
            <form >
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
                    <DatePicker selected={date}  onChange={date => handleDate(date)} />
                </label>
                

                <label>
                    islamiDate:
                    <DatePicker selected={islamiDate} openToDate={new Date("1442/09/28")} placeholderText="Cick to select a date" onChange={date => handleIslamiDate(date)} />

          {/* <input type="text" name="islamiDate" value={islamiDate} onChange={(e) => handleIslamiDate(e)} /> */}
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
                    Type:
          <select value={typeInput} onChange={(e) => handleType(e.target.value, e.target.options.selectedIndex)}>
                        {
                            typeList.map((item) => {
                                return (<option>{item.title}</option>)
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

                {/* <input type="submit" value="Submit" /> */}
            </form>
            <input type="file" onChange={(e) => handleFile(e)} multiple/>
            <button onClick={submit}>click</button>
        </div>
    );
}

export default Audio;
