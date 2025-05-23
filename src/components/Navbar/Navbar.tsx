import { Component } from 'react';
import { pages } from '../../App';
import './Navbar.css';

type NavbarProps = {
    pageChange: (page: pages) => void;
    updateNextPage: (bool: boolean) => void;
    loggedIn: boolean,
    user: any
}

type NavbarState = {

}

class Navbar extends Component<NavbarProps, NavbarState> {
    constructor(props: NavbarProps) {
        super(props);

        this.state = {  }
    }

    render() {
        console.log()
        return (
            <div className="custom-navbar">
                <ul className="custom-navbar-list">
                    <li className="custom-navbar-item" onClick={() => {this.props.pageChange("Landing"); this.props.updateNextPage(false)}}>PEACE</li>
                </ul>
                <ul className="custom-navbar-list">
                    <li className="custom-navbar-item" onClick={() => {this.props.pageChange("Landing"); this.props.updateNextPage(false)}}>Home</li>
                    <li className="custom-navbar-item" onClick={() => this.props.pageChange("Learn")}>Learn</li>
                    <li className="custom-navbar-item" onClick={() => this.props.pageChange("Anticipate")} >Anticipate</li>
                    <li className="custom-navbar-item" onClick={() => this.props.pageChange("Advise")}>Consult</li>
                    <li className="custom-navbar-item" onClick={() => this.props.pageChange("About")}>About</li>
                </ul>
            </div>
        )
    }
}

export default Navbar;