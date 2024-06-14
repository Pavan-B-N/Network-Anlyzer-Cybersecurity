import "./NavBar.css"
import { Link } from "react-router-dom"
function NavBar() {
    return (
        <>
            <div >
                <div className='nav-bar'>
                    <div className='app-title'>Network Anlyzer</div>
                    <div className='navigations'>
                        <Link to="/" className="nav-link"  >Discover Host</Link>
                        <Link to="/scan-target" className="nav-link" >Scan Target</Link>
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}

export default NavBar
