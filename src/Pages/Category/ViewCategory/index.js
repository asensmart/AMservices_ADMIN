import React, { useState, useEffect } from 'react';
import BrandTable from '../../../Components/Tables/brandsTable';
import Axios from 'axios';


function ViewCategory() {

    const [data, setData] = useState([]);
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        Axios.get('/get/categories').then(res => {
            setData(res.data.data);
        });
    }, [refetch])

    return (
        <div className='white-container' >
            <BrandTable tableData={data} editPath={"/editCategory"} isBrand={false} refetch={refetch} setRefetch={setRefetch} />
        </div>
    );
}

export default ViewCategory;