import "./NetworkDetails.css"
import React from "react";
import axios from "axios";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function NetworkDetails() {
    const [details, setDetails] = React.useState(null)
    
    async function getDetails() {
        try {
            const { data } = await axios.get("http://192.168.0.147:5000/ip-details");
            setDetails(data)
        } catch {
            return null
        }
    }

    React.useEffect(() => {
        const abortController = new AbortController();
        getDetails()
        return () => {
            abortController.abort();
            console.log("clear");
        };
    }, [])
    return (
        <div className="details-container">
            <div className="detail">
                <div className="detail-header" >Hostname </div>
                <div className="detail-content-box">
                    <div className="detail-content" >{details ? details.hostname : "Unknown"}</div>
                    <div className="copy-icon"><ContentCopyIcon style={{ fontSize: "1.2rem" }} /></div>
                </div>
            </div>
            <div className="detail">
                <div className="detail-header" >Public IP</div>
                <div className="detail-content-box">
                    <div className="detail-content" >{details ? details.public_ip : "-"}</div>
                    <div className="copy-icon"  ><ContentCopyIcon style={{ fontSize: "1.2rem" }} /></div>
                </div>
            </div>
            <div className="detail">
                <div className="detail-header" >Private IP</div>
                <div className="detail-content-box">
                    <div className="detail-content" >{details? details.private_ip : " - "}</div>
                    <div className="copy-icon"><ContentCopyIcon style={{ fontSize: "1.2rem" }} /></div>
                </div>
            </div>
        </div>
    )
}

export default NetworkDetails
