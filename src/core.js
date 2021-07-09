import React from "react";
import FileUpload from "./FileUpload";
import Download from "./download";
import Audio from "./components/audio";
import Pdf from "./components/pdf";
import Images from "./components/images";
import Person from "./components/person/person";
import PersonForm from "./components/person/personForm";
import PersonList from "./components/person/personList";
import Type from "./components/type/type";
import TypeList from "./components/type/typeList";
import Category from "./components/category/category";
import CategoryForm from "./components/category/categoryForm";
import CategoryList from "./components/category/categoryList";
import Modal from "./components/shared/modal";
import "./App.css";

const Core = () => (
  <div className="container mt-4">
    {/* <Modal /> */}
    {/* <FileUpload /> */}
  <div>
    {/* <Download/> */}
  </div>
{/* <Pdf/> */}
<Images/>
{/* <Audio/> */}
 {/* <Category/> */}
{/* <CategoryForm/> */}
{/* <CategoryList/> */}
{/* <Type/> */}

 {/* <Person/> */}
{/* <PersonForm/>
<PersonList/> */}
  </div>
);

export default Core;