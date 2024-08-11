import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import baseURL from './Api';
import { Dropdown } from 'semantic-ui-react'

function BrandsDropdown() {

    const [brands, setBrands] = useState([]);

    useEffect(() => {
        axios.get(baseURL + "/api/Brand").then((data) => {
            setBrands(data?.data);
        });
    }, []);
    const brandOptions = brands.map((item, i) => ({
        key: i,
        text: item.name,
        value: item.id,
    }))
    return (<Dropdown placeholder='Brands' fluid multiple selection options={brandOptions} />);
}

export default BrandsDropdown;