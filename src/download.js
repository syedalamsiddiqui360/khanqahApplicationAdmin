import React from "react";
import axios from "axios";

const Download = () => {

    const click = (e) => {
        console.log("click")
        const body = {
            fileName: "2020-11-8 0.8236919462615153 Mujh-ko-jeene-ka-MR.mp3"
        };
        axios.post("http://localhost:9000/audio/download", body, { responseType: 'blob' })
            .then((response) => {
                let data = response.data
                console.log(data.type)
                var myBlob = new Blob([data]);
                let url = window.URL.createObjectURL(myBlob);
                let a = document.createElement('a');
                a.href = url;
                //a.setAttribute('download', 'file.mp3'); //or any other extension
                a.download = 'file.mp3';
                document.body.appendChild(a);
                a.click();
            })
            .catch((err) => {
                console.log(err)
            })
    };

    return (
        <div className="container mt-4">
            <div>
            <audio src="http://localhost:9000/audio/get/2020-11-8 0.916708964583197 Ashar, Zamanat magfirat ki doston aqsh-e-nadamat h.mp3" preload="auto" controls></audio>
            </div>
            <h4 className="display-4 text-center mb-4">
                <i className="fab fa-react" /> React File download
    </h4>

            <button onClick={click}>Click</button>
        </div>
    )
};

export default Download;

