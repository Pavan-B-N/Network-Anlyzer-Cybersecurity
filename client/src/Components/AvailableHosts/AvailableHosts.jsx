import "./AvailableHosts.css"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
function AvailableHosts() {
    const TableHeaderColor = "white"
    const [devices, setDevices] = React.useState([])
    const [isFetching, setIsFetching] = React.useState(false)


    async function scanNetwork() {
        try {
            setIsFetching(true)
            const { data } = await axios.get("http://192.168.0.147:5000/list-all-devices");
            setIsFetching(false)
            setDevices(data)
        } catch {
            setIsFetching(false)
            return []
        }
    }

    React.useEffect(() => {
        const abortController = new AbortController();
        scanNetwork()
        return () => {
            abortController.abort();
            console.log("clear");
        };
    }, [])

    return (
        <div>
            <div className="available-hosts-title" >Available Hosts</div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow  >
                            <TableCell style={{ color: TableHeaderColor }} >Hostname</TableCell>
                            <TableCell style={{ color: TableHeaderColor }} align="right">IP</TableCell>
                            <TableCell style={{ color: TableHeaderColor }} align="right">MAC</TableCell>
                            <TableCell style={{ color: TableHeaderColor }} align="right">Status</TableCell>
                            <TableCell style={{ color: TableHeaderColor }} align="right">Reason</TableCell>
                            <TableCell style={{ color: TableHeaderColor }} align="right">Vendor</TableCell>
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
                                devices.length == 0 ?
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            <p>No Available Devices</p>
                                            <p>If devices are connected and still not able to see here,then this might be due to firewall and other security mechanisms</p>
                                        </TableCell>
                                    </TableRow>
                                    :
                                    <TableBody>
                                        {


                                            devices.map(device => (
                                                <TableRow  >
                                                    <TableCell style={{ color: TableHeaderColor }} >{device.hostnames[0].name}</TableCell>
                                                    <TableCell style={{ color: TableHeaderColor }} align="right">{device.ip}</TableCell>
                                                    <TableCell style={{ color: TableHeaderColor }} align="right">{device.mac}</TableCell>
                                                    <TableCell style={{ color: TableHeaderColor }} align="right">{device.status.state}</TableCell>
                                                    <TableCell style={{ color: TableHeaderColor }} align="right">{device.status.reason}</TableCell>
                                                    <TableCell style={{ color: TableHeaderColor }} align="right">{device.vendor[device.mac]}</TableCell>
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

export default AvailableHosts
