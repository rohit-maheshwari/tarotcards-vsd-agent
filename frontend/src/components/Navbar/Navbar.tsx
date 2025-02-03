import { Component } from 'react';
import { pages } from '../../App';
import './Navbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

type NavbarProps = {
    pageChange: (page: pages) => void;
    updateNextPage: (bool: boolean) => void;
    loggedIn: boolean,
    user: any
    handleLogin: () => void, 
    handleLogout: () => void
}

type NavbarState = {

}

class Navbar extends Component<NavbarProps, NavbarState> {
    constructor(props: NavbarProps) {
        super(props);

        this.state = {  }
    }

    render() {
        return (
            <div className="navbar">
                <ul className="navbar-list">
                    <li className="navbar-item" onClick={() => {this.props.pageChange("Landing"); this.props.updateNextPage(false)}}>PEACE</li>
                </ul>
                <ul className="navbar-list">
                    {/* <li className="navbar-item" onClick={() => {this.props.pageChange("Landing"); this.props.updateNextPage(false)}}>Home</li> */}
                    <li className="navbar-item" onClick={() => this.props.pageChange("Learn")}>Learn</li>
                    <li className="navbar-item" onClick={() => {this.props.pageChange("Anticipate"); this.props.updateNextPage(false)}} >Anticipate</li>
                    <li className="navbar-item" onClick={() => this.props.pageChange("Advise")}>Consult</li>
                    <li className="navbar-item" onClick={() => this.props.pageChange("About")}>About</li>
                    <li className="navbar-item" onClick={this.props.loggedIn ? this.props.handleLogout : this.props.handleLogin}>
                        {this.props.loggedIn ? <LogoutIcon /> : <AccountCircleIcon />}
                    </li>
                </ul>
            </div>
        )
    }
}

export default Navbar;