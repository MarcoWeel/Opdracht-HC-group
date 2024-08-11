import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import baseURL from '../Components/Api';
import BrandsDropdown from '../Components/BrandsDropdown';
import TypeDropdowns from '../Components/TypeDropdowns';
import { useNavigate } from "react-router-dom";


const CreateFilament = () => {

    const [diameter, setDiameter] = useState(1.75);
    const [subTypeId, setSubTypeId] = useState("00000000-0000-0000-0000-000000000000");
    const [brandId, setBrandId] = useState("00000000-0000-0000-0000-000000000000");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const receiveBrandData = (item) => {
        setBrandId(item);
    };

    const receiveTypeData = (item) => {
        setSubTypeId(item);
    };

    const handleDiameterInput = (e) => {
        console.log()
        setDiameter(Number(e.target.value));
    };

    const handleNameInput = (e) => {
        console.log()
        setName(e.target.value);
    };

    const submitForm = (e) => {
        // We don't want the page to refresh
        e.preventDefault()


        // POST the data to the URL of the form
        axios.post(baseURL + `/api/Filaments?diameter=${diameter}&brandId=${brandId}&subTypeId=${subTypeId}&name=${name}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((data) => {navigate("/")
        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }


    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);
    return (
        <div>
            <form style={{ maxWidth: "250px" }} method="POST" action="" onSubmit={submitForm}>
                <div className="md:flex">
                    <label>Name</label>
                    <input className="text-black" name="description" onChange={handleNameInput}></input>
                </div>
                <BrandsDropdown sendBrandDataToParent={receiveBrandData} />
                <TypeDropdowns sendTypeDataToParent={receiveTypeData} />
                <div className="md:flex">
                <label>Diameter</label>
                    <select onChange={handleDiameterInput}>
                        <option value={1.75}>1.75mm</option>
                        <option value={2.85}>2.85mm</option>
                    </select>
                </div>
                <button className="md:flex" type="submit">Create filament</button>
            </form>
        </div>
    );
}


export default CreateFilament;