import React, { Component } from "react";
import { pages } from '../../App';
import Projects from "../Projects/Projects";
import './About.css'
const env = require('../../environment.json');

type Props = {
    pageChange: (page: pages) => void
}

type LandingState = {

}

class Landing extends Component<Props, LandingState> {
  constructor(props: Props) {
    super(props);

    this.state = { };
  }

  toggleMenu = () => {
    const menu = document.getElementById('menu');
    if (!menu) {
        throw new Error("Menu does not exist")
    }
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
  }

  render = (): JSX.Element => {
    return (
    <div className="aboutBody">
        <div className="container">
            <div className="menuButton" onClick={this.toggleMenu}>&#9776;</div>
            <div className="menu" id="menu">
                <ul>
                    <li onClick={() => this.props.pageChange("Landing")}>HOME</li>
                    <li onClick={() => this.props.pageChange("About")}>ABOUT</li>
                </ul>
            </div>
            <div className="aboutheader">
                <h1 className="aboutH1"><span className="ABOUTUS">ABOUT US</span></h1>
                <p className="aboutDescription">
                This is an overview of our project
                </p>
            </div>
            <div className="main">
                <div className="person">
                    <h2 className="personH2">Person 1</h2>
                    <div className="box"></div>
                </div>
                <div className="person">
                    <h2 className="personH2">Person 2</h2>
                    <div className="box"></div>
                </div>
                <div className="person">
                    <h2 className="personH2">Person 3</h2>
                    <div className="box"></div>
                </div>
            </div>
        </div>
    </div>
    );
  };
}

export default Landing;