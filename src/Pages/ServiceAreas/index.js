import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification, Spin } from 'antd';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BiEditAlt } from 'react-icons/bi';
import { MdOutlineDeleteOutline } from 'react-icons/md';

function ServiceAreas(props) {
    const [areaName, setAreaName] = useState("");
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [url, setUrl] = useState("");

    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        axios.get('/get/areaNames').then(res => {
            setTableData(res.data.data)
        })
    }, [refetch])

    const DeleteHandler = (row) => {
        axios.delete('/delete/areaName', { data: row }).then(res => {
            notification['success']({
                message: res.data.data
            })
            setRefetch(!refetch)
        }).catch(error => {
            notification['error']({
                message: 'Something went wrong!'
            })
        })
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        if (areaName.trim().length !== 0 && url.trim().length !== 0) {
            setLoading(true)
            axios.post('/post/createSerciceArea', { areaName, url }).then(res => {
                setLoading(false)
                notification['success']({
                    message: res.data.message,
                    duration: 1
                })
                setAreaName("")
                setUrl("");
                setRefetch(!refetch)

            }).catch(error => {
                setLoading(true)
                notification['error']({
                    message: 'Something went wrong!',
                    duration: 1
                })
            })
        } else {
            notification['error']({
                message: 'All field required!',
                duration: 1
            })
        }
    }
    return (
        <Spin spinning={loading} >
            <div className='white-container' >
                <form className='form-container' onSubmit={SubmitHandler} >
                    <div className='make-grid-container-3' >
                        <section>
                            <label>Service Area Name :</label>
                            <input type="text" value={areaName} onChange={(e) => setAreaName(e.target.value)} required />
                        </section>
                        <section>
                            <label>Service Area URL Name :</label>
                            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
                        </section>
                        <button className='submit-btn' >Add Area</button>
                    </div>
                </form>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell> S.No </TableCell>
                                <TableCell align="center">Area Name</TableCell>
                                <TableCell align="center">Url Name</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row, i) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell align="center">{row.areaName}</TableCell>
                                    <TableCell align="center">{row.url}</TableCell>
                                    <TableCell align="center">
                                        <div onClick={() => DeleteHandler(row)} >
                                            <MdOutlineDeleteOutline />
                                        </div>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </TableContainer>

            </div>
        </Spin>
    );
}

export default ServiceAreas;