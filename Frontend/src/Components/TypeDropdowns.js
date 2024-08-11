import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import baseURL from './Api';
import { Dropdown } from 'semantic-ui-react'

const TypeDropdowns = ({ sendTypeDataToParent }) => {

    const [mainType, setMainTypes] = useState([]);
    const [subType, setSubType] = useState([]);

    useEffect(() => {
        axios.get(baseURL + "/api/MainType").then((data) => {
            setMainTypes(data?.data);
        });
    }, []);

    const setSubOptions = (id) => {
        axios.get(baseURL + "/api/SubTypes/GetByMainType/" + id).then((data) => {

            setSubType(data.data.map((item, i) => ({
                key: item.subTypeId,
                text: item.name,
                value: item.subTypeId,
            })))
        });
    }
    const mainTypeOptions = mainType.map((item, i) => ({
        key: item.mainTypeId,
        text: item.name,
        value: item.mainTypeId,
    }))
    return (<div>
        <div>
            <Dropdown placeholder='Filament type' fluid selection onChange={(e, data) => setSubOptions(data.value)} options={mainTypeOptions} />
            <a href='/createmaintype'>Add new main type</a>
        </div>
        <div>
            <Dropdown placeholder='Filament subtype' fluid selection onChange={(e, data) => sendTypeDataToParent(data.value)} options={subType} />
            <a href='/createsubtype'>Add new sub type</a>
        </div>
    </div>);
}

export default TypeDropdowns;