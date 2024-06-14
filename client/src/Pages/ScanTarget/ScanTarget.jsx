import React,{ useState } from "react"
import { Button } from "@mui/material"
import "./ScanTarget.css"
import SearchIcon from '@mui/icons-material/Search';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";

function ScanTarget() {
    const [ip, setIp] = useState()

    const [services, setServices] = React.useState([])
    const [isFetching, setIsFetching] = React.useState(false)

    const TableHeaderColor = "white"

    async function scanDevice() {
        if(!ip){
            return;
        }
        try {
            setIsFetching(true)
            const { data } = await axios.get(`http://192.168.0.147:5000/scan-target/${ip}`);
            setIsFetching(false)
            console.log(data)
            setServices(data[0]?.services)
        } catch {
            setIsFetching(false)
            return []
        }
    }


    return (
        <div className="scan-target-screen">
            <div>
                <div className="input-ip">
                    <SearchIcon style={{ background: "#2d2b2b", marginRight: "10px" }} />
                    <input value={ip} onChange={(e) => setIp(e.target.value)} placeholder="Enter IP" />
                    <button className="scan-btn" onClick={scanDevice} >Scan</button>
                </div>
            </div>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                    <TableHead>
                        <TableRow  >
                            <TableCell style={{ color: TableHeaderColor }} >Port</TableCell>
                            <TableCell style={{ color: TableHeaderColor }} align="right">Service</TableCell>
                            <TableCell style={{ color: TableHeaderColor }} align="right">State</TableCell>
                        </TableRow>
                    </TableHead>

                    {
                        isFetching ?
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <p>Scanning the network</p>
                                    <p>Please wait..</p>
                                </TableCell>
                            </TableRow>

                            :
                            (
                                services.length == 0 ?
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            <p>No Result Found</p>
                                            <p>this might be due to firewall and other security mechanisms</p>
                                        </TableCell>
                                    </TableRow>
                                    :
                                    <TableBody>
                                        {


                                            services.map(service => (
                                                <TableRow  >
                                                    <TableCell style={{ color: TableHeaderColor }} >{service.port}</TableCell>
                                                    <TableCell style={{ color: TableHeaderColor }} align="right">{service.service}</TableCell>
                                                    <TableCell style={{ color: TableHeaderColor }} align="right">{service.state}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                            )

                    }


                </Table>
            </TableContainer>
        </div>
    )
}

export default ScanTarget
