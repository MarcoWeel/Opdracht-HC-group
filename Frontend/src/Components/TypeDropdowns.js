import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import baseURL from './Api';
import { Dropdown } from 'semantic-ui-react'

const TypeDropdowns = ({ sendTypeDataToParent }) => {

    const [mainType, setMainTypes] = useState([]);
    const [subType, setSubType] = useState([]);

    const [selectedSubType, setSelectedSubType] = useState([]);
    const [selectedMainType, setSelectedMainType] = useState([]);

    useEffect(() => {
        axios.get(baseURL + "/api/MainType").then((data) => {
            setMainTypes(data?.data);
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


    const handleSubTypeSelection = (data) => {
        setSelectedSubType(data)
        sendTypeDataToParent(data)
    }

    const deleteSelectedSubType = () => {
        axios.delete(baseURL + `/api/SubType/${selectedSubType}`).then(window.location.reload())
        
    }

    const deleteSelectedMainType = () => {
        axios.delete(baseURL + `/api/MainType/${selectedMainType}`).then(window.location.reload())
        
    }

    const setSubOptions = (id) => {
        setSelectedMainType(id)
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
            <a href='/createmaintype'>Add new main type</a> <button className="md:flex" onClick={deleteSelectedMainType}>Delete selected type</button>
        </div>
        <div>
            <Dropdown placeholder='Filament subtype' fluid selection onChange={(e, data) => handleSubTypeSelection(data.value)} options={subType} />
            <a href='/createsubtype'>Add new sub type</a> <button className="md:flex" onClick={deleteSelectedSubType}>Delete selected type</button>
        </div>
    </div>);
}

export default TypeDropdowns;