import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import baseURL from './Api';
import { Dropdown } from 'semantic-ui-react'
import "../App.css"

const BrandsDropdown = ({ sendBrandDataToParent  }) => {

    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");

    const handleSelection = (data) => {
        setSelectedBrand(data)
        sendBrandDataToParent(data)
    }

    useEffect(() => {
        axios.get(baseURL + "/api/Brand").then((data) => {
            setBrands(data?.data);
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
        });;
    }, []);

    const deleteSelectedBrand = () => {
        axios.delete(baseURL + `/api/Brand/${selectedBrand}`).then(window.location.reload())
        
    }
    const brandOptions = brands.map((item, i) => ({
        key: item.brandId,
        text: item.name,
        value: item.brandId,
    }))
    return (<div class="grid-container">
        <Dropdown  placeholder='Brands' fluid selection onChange={(e, data) => handleSelection(data.value)} options={brandOptions} />
        <a href='/createbrand'>Add new brand</a> <button className="md:flex" onClick={deleteSelectedBrand}>Delete selected brand</button>
        </div>);
}

export default BrandsDropdown;