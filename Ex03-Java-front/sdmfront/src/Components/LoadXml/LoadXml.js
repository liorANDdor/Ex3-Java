import React, { useState } from 'react'
import axios from '../../Utilities/Axios/Axios'


const LoadXml = prop => {

    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = (file) => {
        setSelectedFile(file.target.files[0]);
    };
    const onFileUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append(selectedFile.name, selectedFile);
            axios.post("http://localhost:8080/SDM/readxml", formData).then((res) => {
                console.log(res.data);
            });
        }
    };

    return (<div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
    </div>)
}

export default LoadXml