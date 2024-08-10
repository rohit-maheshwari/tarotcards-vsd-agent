import React, { Component } from "react";
import { pages } from '../../App';
import Projects from "../Projects/Projects";
import './Landing.css'
import ProjectDescription from "../ProjectDescription/ProjectDescription";

type LandingProps = {
    pageChange: (page: pages) => void,
    handleLogin: () => void;
    handleLogout: () => void;
    loggedIn: boolean,
    user: any,
    nextPage: boolean,
    updateNextPage: (_: boolean) => void;
}

type LandingState = {
  
}

class Landing extends Component<LandingProps, LandingState> {
  constructor(props: LandingProps) {
    super(props);

    this.state = { nextPage: false };
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
    console.log(this.state, this.props)
    return (
      this.props.nextPage ?
      (this.props.loggedIn ?
        <Projects user={this.props.user} returnToHomePage={() => this.props.updateNextPage(false)} />
      :
        <ProjectDescription returnToPrevPage={() => this.props.updateNextPage(false)} returnToHomePage={() => this.props.updateNextPage(false)} user={null} projectId={null}/>
      ):
        <div className="landingBody">
          <div className="container">
          <div className="menuButton" onClick={this.toggleMenu}>&#9776;</div>
            <div className="menu" id="menu">
                <ul>
                    <li onClick={() => this.props.pageChange("Landing")}>HOME</li>
                    <li onClick={() => this.props.pageChange("About")}>ABOUT</li>
                </ul>
            </div>
            <div className="landingheader">
              <h1 className="landingH1"><span className="PEACE">PEACE</span> is a place where you proactively explore and anticipate consequences and ethics.</h1>
              <p className="landingDescription">
                This is a system made for Allen school researchers to think about the potential unintended consequences of their research. 
                You can use a few short sentences about your project or abstract. The entire process is quick and should take approximately 
                10 minutes to complete and should ideally be done a few times, either at different stages in your project or with different projects.
              </p>
            </div>
            <div className="main">
              <div className="step">
                <h2 className="stepH2">Describe Project</h2>
                <div className="box"></div>
              </div>
              <div className="arrow">→</div>
              <div className="step">
                <h2 className="stepH2">Brainstorm Unintended Consequences</h2>
                <div className="box"></div>
              </div>
              <div className="arrow">→</div>
              <div className="step">
                <h2 className="stepH2">Review & Export</h2>
                <div className="box"></div>
              </div>
            </div>
            <div className="footer">
              <button className="googleButton" onClick={this.props.loggedIn ? this.props.handleLogout : this.props.handleLogin}>{this.props.loggedIn ? "Sign Out" : "Sign in with Google"}</button>
              <button className="guestButton" onClick={() => this.props.updateNextPage(true)}>Guest</button>
            </div>
          </div>
        </div>
    );
  };
}

export default Landing;