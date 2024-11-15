import React, { Component } from "react";
import { pages } from '../../App';
import Projects from "../Projects/Projects";
import './Landing.css'
import ProjectDescription from "../ProjectDescription/ProjectDescription";
import PageButtons from "../PageButtons/PageButtons";

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
              <div className="landingheader">
                <h1 className="landingH1"><span className="PEACE">PEACE</span> is a place where you proactively explore and anticipate consequences and ethics.</h1>
                <p className="landingDescription">
                    Our goal is to help researchers think about the potential unintended consequences of their research. Researchers can consult our experts, use our
                    anticipation tool, or learn about how unintended consequences were addressed in the past to explore the potential consequences of their research.
                </p>
              </div>
              <div className="landingCards">
                <div className="card">
                    <div className="cardText">
                      <h4 className="cardHeader">Advisory Board</h4>
                      <h2 className="cardTitle">Consult Experts</h2>
                      <p className="cardDescription">Talk to PEACE's advisory board of experts in many diferent fields about your project!</p>
                    </div>
                    <button className="button" onClick={() => this.props.pageChange("Advise")}>Consult</button>
                </div>
                <div className="card">
                    <div className="cardText">
                      <h4 className="cardHeader">Tarot Cards</h4>
                      <h2 className="cardTitle">Anticipate Consequences</h2>
                      <p className="cardDescription">Anticipate potential consequences with the Tarot Cards tool!</p>
                    </div>
                    <button className="button" /*onClick={() => this.props.pageChange("Anticipate")}*/>Anticipate</button>
                </div>
                <div className="card">
                    <div className="cardText">
                      <h4 className="cardHeader">See Past Outcomes</h4>
                      <h2 className="cardTitle">Learn from the Past</h2>
                      <p className="cardDescription">Learn ways to prevent consequences within your project from past researchers.</p>
                    </div>
                    <button className="button" onClick={() => this.props.pageChange("Advise")}>Consult</button>
                </div>
              </div>
            </div>
        </div>
    );
  };
}

export default Landing;