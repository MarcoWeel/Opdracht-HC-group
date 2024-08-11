import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import baseURL from './Api';
import { Dropdown } from 'semantic-ui-react'
import "../App.css"

const BrandsDropdown = ({ sendBrandDataToParent  }) => {

    const [brands, setBrands] = useState([]);

    useEffect(() => {
        axios.get(baseURL + "/api/Brand").then((data) => {
            setBrands(data?.data);
        });
    }, []);
    const brandOptions = brands.map((item, i) => ({
        key: item.brandId,
        text: item.name,
        value: item.brandId,
    }))
    return (<div class="grid-container">
        <Dropdown  placeholder='Brands' fluid selection onChange={(e, data) => sendBrandDataToParent(data.value)} options={brandOptions} />
        <a href='/createbrand'>Add new brand</a>
        </div>);
}

export default BrandsDropdown;