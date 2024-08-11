import axios from 'axios';
import { useState } from 'react';
import baseURL from '../Components/Api';
import { useNavigate } from "react-router-dom";


const CreateBrand = () => {
    const [brandName, setBrandName] = useState("");
    const navigate = useNavigate();
    const handleInput = (e) => {
        setBrandName(e.target.value);
    };

    // useEffect(() => {
    //     axios.get(baseURL + "/api/Filaments").then((data) => {
    //         setFilaments(data?.data);
    //     });
    //     console.log(filaments)
    // }, []);

    const submitForm = (e) => {
        // We don't want the page to refresh
        e.preventDefault()


        // POST the data to the URL of the form
        axios.post(baseURL + `/api/Brand?brandName=${brandName}`, {
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


    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);
    return (
        <div>
            <form style={{maxWidth:"250px"}} method="POST" action="" onSubmit={submitForm}>
                <div className="md:flex">
                    <label>Brand name</label>
                    <input className="text-black" name="brandname" onChange={handleInput}></input>
                </div>
                <button className="md:flex" type="submit">Create brand</button>
            </form>
        </div>
    );
}


export default CreateBrand;