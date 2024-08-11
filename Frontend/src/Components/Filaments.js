import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import baseURL from './Api';
import BrandsDropdown from './BrandsDropdown';
import TypeDropdowns from './TypeDropdowns';


function Filaments() {

    const [filaments, setFilaments] = useState([]);

    useEffect(() => {
        axios.get(baseURL + "/api/Filaments").then((data) => {
            setFilaments(data?.data);
        });
        console.log(filaments)
    }, []);


    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);
    return (
        <div>
            <BrandsDropdown />
            <TypeDropdowns />
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