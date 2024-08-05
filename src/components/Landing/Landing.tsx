import React, { Component } from "react";
import { pages } from '../../App';
import Projects from "../Projects/Projects";
import './Landing.css'
import ProjectDescription from "../ProjectDescription/ProjectDescription";
const env = require('../../environment.json');

type LandingProps = {
    pageChange: (page: pages) => void,
    updateUser: (loggedIn: boolean, user: any) => void,
    loggedIn: boolean,
    user: any,
}

type LandingState = {
  nextPage: boolean
}

class Landing extends Component<LandingProps, LandingState> {
  auth: gapi.auth2.GoogleAuth;
  GOOGLE_CLIENT_ID: string;
  constructor(props: LandingProps) {
    super(props);

    this.state = { nextPage: false };

    this.auth = {} as gapi.auth2.GoogleAuth;
    this.GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
  }

  componentDidMount() {
    // Load the Google API script and initialize the `gapi` client
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
        window.gapi.load('client:auth2', this.initClient);
    };
    document.body.appendChild(script);
  }

  initClient = () => {
    window.gapi.client.init({
        clientId: this.GOOGLE_CLIENT_ID,
        scope: 'email',
        plugin_name: 'TarotCardsVSD'
    }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();

        // Listen for sign-in state changes.
        this.auth.isSignedIn.listen(this.updateSigninStatus);

        // Handle initial sign-in state.
        this.updateSigninStatus(false);
    }).catch((error: any) => {
      // Handle the error here if initialization fails
      console.error('Error initializing the Google API client:', error);
    });
  }

  updateSigninStatus = (loggedIn: boolean) => {
    if (loggedIn) {
      // console.log('The user is signed in');
      // You can access user profile info with:
      // this.auth.currentUser.get().getBasicProfile();
      console.log(this.auth.currentUser.get().getBasicProfile());
      this.props.updateUser(true, this.props.user);
    } else {
      // console.log('The user is not signed in');
      this.props.updateUser(false, null);
    }
  }

  handleLogin = () => {
    this.auth.signIn().then(this.handleVerifyUser).catch((error: any) => console.log(error));
  }

  handleVerifyUser = () => {
    // should never send "this.auth.currentUser.get().getBasicProfile().getID()" to backend
    // instead, get idToken and then send that to backend
    const idToken = this.auth.currentUser.get().getAuthResponse().id_token;
    console.log(idToken);
    fetch(`/api/verify?idToken=${idToken}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => this.handleVerifiedUser(res))
    .catch(() => console.log("/get: Failed to connect to server"));
  }

  handleVerifiedUser = (res: any) => {
    res.json()
    .then((data: any) => {
      this.props.updateUser(true, data.userInfo);
    })
  }

  handleLogout = () => {
    this.auth.signOut().then(this.updateSigninStatus(false)).catch((error: any) => console.log(error));
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
      !this.props.loggedIn ? 
      !this.state.nextPage ?
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
              <button className="googleButton" onClick={this.handleLogin}>Sign in with Google</button>
              <button className="guestButton" onClick={() => this.setState({nextPage: true})}>Guest</button>
            </div>
          </div>
        </div>
      :
        <ProjectDescription returnToPrevPage={() => this.setState({nextPage: false})} />
      : 
        <Projects />
    );
  };
}

export default Landing;