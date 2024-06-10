import React, { Component } from "react";
import { pages } from '../../App';
import Projects from "../Projects/Projects";
const env = require('../../environment.json');

type Props = {
    pageChange: (page: pages) => void,
    updateUser: (loggedIn: boolean, user: any) => void,
    loggedIn: boolean,
    user: any
}

type LandingState = {

}

class Landing extends Component<Props, LandingState> {
  auth: gapi.auth2.GoogleAuth;
  GOOGLE_CLIENT_ID: string;
  constructor(props: Props) {
    super(props);

    this.state = { };

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



  render = (): JSX.Element => {
    return (
      !this.props.loggedIn ? 
        <>
          <h3>PEACE is a place where you proactively export and anticipate consequences and ethics.</h3>
          <button onClick={this.handleLogin}>Sign In with Google</button>
          <button onClick={() => this.props.pageChange("Projects")}>Guest</button>
        </>
      : 
        <Projects pageChange={this.props.pageChange}></Projects>
    );
  };
}

export default Landing;