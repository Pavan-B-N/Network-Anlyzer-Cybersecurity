import "./Home.css"
import AvailableHosts from "../../Components/AvailableHosts/AvailableHosts";
import NetworkDetails from "../../Components/NetworkDetails/NetworkDetails";
function Home() {
    return (
        <>
            <div className="home-screen">

                <NetworkDetails />
                <AvailableHosts/>

            </div>
        </>
    )
}

export default Home
