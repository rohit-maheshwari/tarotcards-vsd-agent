import React, { Component } from "react";
import { pages } from '../../App';
import Projects from "../Projects/Projects";
import './Anticipate.css'
import ProjectDescription from "../ProjectDescription/ProjectDescription";
import PageButtons from "../PageButtons/PageButtons";
import Describe from './describe.svg';
import drawCardLogo from './drawCardLogo.svg';
import Export from './export.svg';

type AnticipateProps = {
    pageChange: (page: pages) => void,
    handleLogin: () => void;
    handleLogout: () => void;
    loggedIn: boolean,
    user: any,
    nextPage: boolean,
    updateNextPage: (_: boolean) => void;
}

type AnticipateState = {
  
}

class Anticipate extends Component<AnticipateProps, AnticipateState> {
  constructor(props: AnticipateProps) {
    super(props);

    this.state = { nextPage: false };
  }

  render = (): JSX.Element => {
    console.log(this.state, this.props)
    return (
      <div className="min-vh-100 bg-light">
        <div className="container mt-0 tasks">
            <div className="page-header">
              <h3 className="page-header-title">Anticipate</h3>
              <h4 className="page-subheader">Brainstorm the social impact of your project using the Tarot Cards of Tech. You can export your result as a PDF in the end!</h4>
            </div>

            <div className="anticipate-overview">
                 <div className="anticipate-step">
                    
                    <div className="box">
                      <img src={Describe} alt="Describe your project" />
                    </div>&nbsp;
                    <h3 className="stepH2">1. Describe your project</h3>
                </div>
                <div className="arrow">→</div>
                <div className="anticipate-step">
                    
                    <div className="box">
                      <img src={drawCardLogo} alt="Tarot Card Logo" />
                    </div>&nbsp;
                    <h3 className="stepH2">2. Brainstorm consequences</h3>
                </div>
                <div className="arrow">→</div>
                <div className="anticipate-step">
                    
                    <div className="box">
                      <img src={Export} alt="Export" />
                    </div>
                    &nbsp;
                    <h3 className="stepH2">3. Review & Export the results</h3>
                </div>
            </div>
            <div className="login-buttons">
              <button className="button" onClick={this.props.loggedIn ? this.props.handleLogout : this.props.handleLogin}>{this.props.loggedIn ? "Sign Out" : "Sign in with Google"}</button>
              {!this.props.loggedIn && <button className="button" onClick={() => this.props.updateNextPage(true)}>Guest</button>}
            </div>
        </div>
      </div>
    )
    // return (
      // this.props.nextPage ?
      // (this.props.loggedIn ?
      //   <Projects user={this.props.user} returnToHomePage={() => this.props.updateNextPage(false)} />
      // :
      //   <ProjectDescription returnToPrevPage={() => this.props.updateNextPage(false)} returnToHomePage={() => this.props.updateNextPage(false)} user={null} projectId={null}/>
      // ):
      //   <div className="landingBody">
      //     <div className="container">
      //     <div className="aboutheader">
      //           <h1 className="aboutH1"><span className="ABOUTUS">Tarot Cards</span></h1>
      //           <p>
      //           The Tarot Cards tool is a system for Allen school researchers to think about the potential unintended consequences of their research. </p> 
      //           <p> 
      //             You can use a few short sentences about your project or abstract. The entire process is quick and should take approximately 
      //             10 minutes to complete. It should ideally be done a few times, either at different stages in your project or with different projects.
      //           </p>
      //       </div>
      //         <div className="main">
      //           <div className="step">
      //             <h2 className="stepH2">Describe Project</h2>
      //             <div className="box"></div>
      //           </div>
      //           <div className="arrow">→</div>
      //           <div className="step">
      //             <h2 className="stepH2">Brainstorm Unintended Consequences</h2>
      //             <div className="box"></div>
      //           </div>
      //           <div className="arrow">→</div>
      //           <div className="step">
      //             <h2 className="stepH2">Review & Export</h2>
      //             <div className="box"></div>
      //           </div>
      //         </div>
      //         <div className="footer">
      //           <button onClick={this.props.loggedIn ? this.props.handleLogout : this.props.handleLogin}>{this.props.loggedIn ? "Sign Out" : "Sign in with Google"}</button>
      //           {!this.props.loggedIn && <button onClick={() => this.props.updateNextPage(true)}>Guest</button>}
      //         </div>
      //       </div>
      //       {this.props.loggedIn && <PageButtons back={null} next={() => this.props.updateNextPage(true)} />}
      //   </div>
    // );
  };
}

export default Anticipate;