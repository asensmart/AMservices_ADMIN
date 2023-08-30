import React, { useState, useEffect } from 'react';
import BrandTable from '../../../Components/Tables/brandsTable';
import Axios from 'axios';
import { Modal } from 'antd';

function ViewSubCategory() {

    const [data, setData] = useState([]);
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        Axios.get('/get/brands').then(res => {
            setData(res.data.data);
        });
    }, [refetch])

    return (
        <div className='white-container' >
            <BrandTable tableData={data} editPath={"/editBrand"} isBrand={true} refetch={refetch} setRefetch={setRefetch} />
        </div>
    );
}

export default ViewSubCategory;