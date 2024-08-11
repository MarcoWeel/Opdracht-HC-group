import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import baseURL from './Api';
import BrandsDropdown from './BrandsDropdown';
import TypeDropdowns from './TypeDropdowns';


const Filaments = () => {

    const [filaments, setFilaments] = useState([]);
    const [diameter, setDiameter] = useState(1.75);
    const [subTypeId, setSubTypeId] = useState("00000000-0000-0000-0000-000000000000");
    const [brandId, setBrandId] = useState("00000000-0000-0000-0000-000000000000");

    const receiveBrandData = (item) => {
        setBrandId(item);
    };

    const receiveTypeData = (item) => {
        setSubTypeId(item);
    };

    const handleInput = (e) => {
        console.log()
        setDiameter(Number(e.target.value));
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
        axios.post(baseURL + `/api/Filaments/Filter?diameter=${diameter}&brandId=${brandId}&subTypeId=${subTypeId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((data) => {
            setFilaments(data?.data);
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
            <form style={{ maxWidth: "400px" }} method="POST" action="" onSubmit={submitForm}>
                <BrandsDropdown sendBrandDataToParent={receiveBrandData} />
                <TypeDropdowns sendTypeDataToParent={receiveTypeData} />
                <div className="md:flex">
                    <label>Diameter</label>
                    <select onChange={handleInput}>
                        <option value={1.75}>1.75mm</option>
                        <option value={2.85}>2.85mm</option>
                    </select>
                </div>
                <button className="md:flex" type="submit">Search</button>
            </form>
            <a href='/createfilament'>Add new filament</a>
            <ul>
                {filaments.length != 0 && filaments.map((item, i) => {
                    return (
                        <li key={i}>
                            <div>Name: {item?.name}</div>
                            <div>Brand: {item?.brand.name}</div>
                            <div>Main Type: {item?.subType.mainType.name}</div>
                            <div>Sub Type: {item?.subType.name}</div>
                            <div>Diameter: {item?.diameter}</div>
                        </li>
                    );
                })}
            </ul>
            {filaments.length == 0 && <div>No Filaments found</div>}
        </div>
    );
}


export default Filaments;