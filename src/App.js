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

const App = () => (
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

export default App;





// import React, { useRef, useState } from 'react';
// import Form from './form.js';
// import axios from 'axios';


// function App() {

//   const inputRef = useRef(null);
//  const [file , setFile] = useState(null)

//   const c = () => {
//     let formData = new FormData();
//     formData.append('file', file);
//     console.log(file)
//     console.log(formData);

//     // You should have a server side REST API 
//     axios.post('http://localhost:9000/bayan/post',
//       formData
//       , {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     }
//     ).then((res) => {
//       console.log(res);
//     })
//       .catch((err) => {
//         console.log('FAILURE!!' + err);
//       });
//   }

//   const selectFile = (e) => {
//     console.log(e.target.files)
//     setFile(e.target.files)
//     //  this.selectedFiles = this.$refs.file.files;
//   }



//   return (
//     <div >
//       <form  action="#" enctype="multipart/form-data">
//         {/* <input type="file" name="file" /> */}
//       <input type="file" onChange={(e) => selectFile(e)} />
//       <button onClick={c}>upload</button>
        
//       </form>
//       {/* <input type="file" id="files" ref={inputRef} onChange={selectFile}/> */}
//       <input type="file" onChange={(e) => selectFile(e)} />
//       <button onClick={c}>click</button>
//     </div>
//   );
// }

// export default App;
