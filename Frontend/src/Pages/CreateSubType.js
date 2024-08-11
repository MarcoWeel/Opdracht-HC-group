import axios from 'axios';
import { useState } from 'react';
import baseURL from '../Components/Api';
import { useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";


const CreateSubType = () => {
    const [subTypeName, setSubTypeName] = useState("");
    const [mainType, setMainTypes] = useState([]);
    const [mainTypeId, setMainTypeId] = useState("00000000-0000-0000-0000-000000000000")
    const navigate = useNavigate();
    const handleInput = (e) => {
        setSubTypeName(e.target.value);
    };

    useEffect(() => {
        axios.get(baseURL + "/api/MainType").then((data) => {
            setMainTypes(data?.data);
        });
    }, []);

    const submitForm = (e) => {
        // We don't want the page to refresh
        e.preventDefault()


        // POST the data to the URL of the form
        axios.post(baseURL + `/api/SubTypes?subTypeName=${subTypeName}&mainTypeId=${mainTypeId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {navigate("/")
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

    const mainTypeOptions = mainType.map((item, i) => ({
        key: item.mainTypeId,
        text: item.name,
        value: item.mainTypeId,
    }))

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);
    return (
        <div>
            <form style={{ maxWidth: "250px" }} method="POST" action="" onSubmit={submitForm}>
                <div>
                    <Dropdown placeholder='Filament type' fluid selection onChange={(e, data) => setMainTypeId(data.value)} options={mainTypeOptions} />
                    <button>Add new main type</button>
                </div>
                <div className="md:flex">
                    <label>sub type name</label>
                    <input className="text-black" name="brandname" onChange={handleInput}></input>
                </div>
                <button className="md:flex" type="submit">Create sub type</button>
            </form>
        </div>
    );
}


export default CreateSubType;