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

type LandingState = {}

class Landing extends Component<LandingProps, LandingState> {
  constructor(props: LandingProps) {
    super(props);
    this.state = { nextPage: false };
  }

  render = (): JSX.Element => {
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
                <h1 className="PEACE">PEACE</h1>
                <h2 className="subheader">where you <u>P</u>roactively <u>E</u>xplore and <u>A</u>nticipate <u>C</u>onsequences and <u>E</u>thics</h2>
                <p className="landingDescription">
                    The PEACE Initiative aims to support Allen school researchers to routinely and proactively address undesirable consequences of their research innovations. This initiative is funded by NSF Institutional Transformation fund.
                </p>
              </div>
              <div className="landingCards">
                <div className="card">
                    <div className="cardText">
                    {/* <h4 className="cardHeader">See Past Outcomes</h4> */}
                      <h4 className="cardHeader">Learn from the past</h4>
                      <h2 className="cardTitle">Learn how other researchers have addressed undesirable consequences in the past.</h2>
                    </div>
                    <button className="button" onClick={() => this.props.pageChange("Learn")}>Learn</button>
                </div>
                <div className="card">
                    <div className="cardText">
                    {/* <h4 className="cardHeader">Tarot Cards</h4> */}
                      <h4 className="cardHeader">Anticipate Consequences</h4>
                      <h2 className="cardTitle">Anticipate potential consequences of your project with the Tarot Cards of Tech.</h2>
                    </div>
                    <button className="button" onClick={() => this.props.pageChange("Anticipate")}>Anticipate</button>
                </div>
                <div className="card">
                    <div className="cardText">
                    {/* <h4 className="cardHeader">Advisory Board</h4> */}
                      <h4 className="cardHeader">Consult Experts</h4>
                      <h2 className="cardTitle">Talk to the PEACE ethics advisory board with experts across many disciplines.</h2>
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