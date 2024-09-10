import { Component } from 'react';
import './App.css';
import Landing from './components/Landing/Landing';
import About from './components/About/About'
import Projects from './components/Projects/Projects';
import ProjectDescription from './components/ProjectDescription/ProjectDescription';
import SelectingTarotCards from './components/oldComponents/SelectingTarotCards/SelectingTarotCards';
import DrawTarotCards from './components/DrawTarotCards/DrawTarotCards';
import ReviewCards from './components/DrawTarotCards/ReviewCards/ReviewCards';
import ReorderCards from './components/ReorderCards/ReorderCards'
import Navbar from './components/Navbar/Navbar';

const env = require('./environment.json');
// const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
// const backendURL = env.BACKEND.URL + ":" + env.BACKEND.PORT

type Props = {
  
}

type TarotCardType = {
  title: string,
  image: string,
  questions: string[],
  color: string
}

export type pages = "Landing" | "About" | "Projects" | "ProjectDescription" | "DrawTarotCards" | "Reorder" | "Export";

type AppState = {
  loggedIn: boolean,
  user: any,
  page: pages,
  landingNextPage: boolean,
}

class App extends Component<Props, AppState> {

  auth: gapi.auth2.GoogleAuth;
  GOOGLE_CLIENT_ID: string;

  constructor(props: Props) {
    super(props);

    this.state = {loggedIn: false, user: null, page: "Landing", landingNextPage: false}

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
    }).catch((error) => {
      // Handle the error here if initialization fails
      console.error('Error initializing the Google API client:', error);
  });
  }

  updateSigninStatus = (loggedIn: boolean) => {
    if (loggedIn) {
      // console.log('The user is signed in');
      // You can access user profile info with:
      // this.auth.currentUser.get().getBasicProfile();
      this.setState({loggedIn: true})
    } else {
      // console.log('The user is not signed in');
      this.setState({loggedIn: false, user: null})
    }
  }

  handleLogin = () => {
    console.log('step 1');
    console.log(this.auth.currentUser.get())
    this.auth.signIn({prompt: 'select_account'}).then(this.handleVerifyUser).catch((error: any) => console.log(error));
  }

  handleVerifyUser = () => {
    // should never send "this.auth.currentUser.get().getBasicProfile().getID()" to backend
    // instead, get idToken and then send that to backend
    console.log('step 2')
    const idToken = this.auth.currentUser.get().getAuthResponse().id_token;
    fetch(`/api/verify?idToken=${idToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => this.handleVerifiedUser(res))
    .catch(() => console.log("/verify: Failed to connect to server"));
  }

  handleVerifiedUser = (res: any) => {
    res.json()
    .then((data: any) => {
      this.setState({loggedIn: true, user: data.userInfo, landingNextPage: true})
    })
    console.log('setted state')
  }

  handleLogout = () => {
    this.auth.signOut().then(this.updateSigninStatus(false)).catch((error: any) => console.log(error));
  }

  handlePageChange = (page: pages): void => {
    this.setState({page: page});
  }

  handleUpdateUser = (_loggedIn: boolean, _user: any) =>{
    console.log('setted state')
    this.setState({loggedIn: _loggedIn, user: _user})
  }

  updateLandingNextPage = (bool: boolean) => {
    console.log(bool)
    this.setState({landingNextPage: bool})
  }

  updateProjectNextPage = (bool: boolean) => {
    this.setState({page: "Landing", landingNextPage: true})
  }


  render = (): JSX.Element => {
    if (this.state.page === "Landing") {
      return (
        <>
          <Navbar pageChange={this.handlePageChange} updateNextPage={this.updateLandingNextPage} user={this.state.user} loggedIn={this.state.loggedIn}/>
          <Landing
            pageChange={this.handlePageChange}
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            user={this.state.user}
            loggedIn={this.state.loggedIn}
            nextPage={this.state.landingNextPage}
            updateNextPage={this.updateLandingNextPage}
          />
        </>
      )
    }
    else if (this.state.page === "About") {
      return (
        <>
          <Navbar pageChange={this.handlePageChange} updateNextPage={this.updateLandingNextPage} user={this.state.user} loggedIn={this.state.loggedIn}/>
          <About
            pageChange={this.handlePageChange}
          />
        </>
      )
    }
    else {
      throw new Error("invalid page");
    }
    
  };
}

export default App;