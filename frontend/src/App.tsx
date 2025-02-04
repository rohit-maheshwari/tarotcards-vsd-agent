import { Component } from 'react';
import './App.css';
import Landing from './components/Landing/LandingNew';
import About from './components/About/About'
import Projects from './components/Projects/Projects';
import ProjectDescription from './components/ProjectDescription/ProjectDescription';
import SelectingTarotCards from './components/oldComponents/SelectingTarotCards/SelectingTarotCards';
import DrawTarotCards from './components/DrawTarotCards/DrawTarotCards';
import ReviewCards from './components/DrawTarotCards/ReviewCards/ReviewCards';
import ReorderCards from './components/ReorderCards/ReorderCards'
import Navbar from './components/Navbar/Navbar';
import TechnologyDashboard from './components/Learn/Learn';
import AdvisePage from './components/Advise/Advise';
import Anticipate from './components/Anticipate/Anticipate';
import Footer from './components/Footer/Footer';

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

export type pages = "Landing" | "About" | "Projects" | "ProjectDescription" | "DrawTarotCards" | "Reorder" | "Export" | "Learn" | "Advise" | "Anticipate";

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
        // Handle initial sign-in state.
        this.updateSigninStatus(false, null);
    }).catch((error) => {
      // Handle the error here if initialization fails
      console.error('Error initializing the Google API client:', error);
  });
  }

  updateSigninStatus = (loggedIn: boolean, user: any) => {
    if (loggedIn) {
      this.setState({loggedIn: true, user: user, landingNextPage: true})
    } else {
      this.setState({loggedIn: false, user: user, landingNextPage: false})
    }
  }

  handleLogin = () => {
    console.log("state before any login stuff: ", this.state)
    console.log('step 1');
    console.log(this.auth.currentUser.get())
    this.auth.signIn({prompt: 'select_account'}).then(() => this.handleVerifyUser()).catch((error: any) => console.log(error));
  }

  handleVerifyUser = () => {
    // should never send "this.auth.currentUser.get().getBasicProfile().getID()" to backend
    // instead, get idToken and then send that to backend
    console.log('step 2')
    const idToken = this.auth.currentUser.get().getAuthResponse().id_token;
    fetch(`${process.env.REACT_APP_API_URL}/api/verify?idToken=${idToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {this.handleVerifiedUser(res)})
    .catch(() => console.log("/verify: Failed to connect to server"));
  }

  handleVerifiedUser = (res: any) => {
    console.log('step 3');
    res.json()
      .then((data: any) => {
          this.updateSigninStatus(true, data.userInfo);
      });
};
  handleLogout = () => {
    this.auth.signOut().then(() => this.updateSigninStatus(false, null)).catch((error: any) => console.log(error));
  }

  handlePageChange = (page: pages): void => {
    this.setState({page: page});
  }

  handleUpdateUser = (_loggedIn: boolean, _user: any) =>{
    console.log('setted state')
    this.setState({loggedIn: _loggedIn, user: _user})
  }

  updateLandingNextPage = (bool: boolean) => {
    this.setState({landingNextPage: bool})
  }

  updateProjectNextPage = (bool: boolean) => {
    this.setState({page: "Landing", landingNextPage: true})
  }


  render = (): JSX.Element => {
    let content;

    if (this.state.page === "Landing") {
      content = (
        <>
          <Navbar 
              pageChange={this.handlePageChange} 
              updateNextPage={this.updateLandingNextPage} 
              user={this.state.user} 
              loggedIn={this.state.loggedIn}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
          />
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
      );
    } else if (this.state.page === "About") {
      content = (
        <>
          <Navbar 
              pageChange={this.handlePageChange} 
              updateNextPage={this.updateLandingNextPage} 
              user={this.state.user} 
              loggedIn={this.state.loggedIn}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
          />
          <About
            pageChange={this.handlePageChange}
          />
        </>
      );
    } else if (this.state.page === "Learn") {
      content = (
        <>
          <Navbar 
              pageChange={this.handlePageChange} 
              updateNextPage={this.updateLandingNextPage} 
              user={this.state.user} 
              loggedIn={this.state.loggedIn}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
          />
          <TechnologyDashboard />
        </>
      );
    } else if (this.state.page === "Advise") {
      content = (
        <>
          <Navbar 
              pageChange={this.handlePageChange} 
              updateNextPage={this.updateLandingNextPage} 
              user={this.state.user} 
              loggedIn={this.state.loggedIn}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
          />
          <AdvisePage />
        </>
      );
    } else if (this.state.page === "Anticipate") {
      content = (
        <>
          <Navbar 
              pageChange={this.handlePageChange} 
              updateNextPage={this.updateLandingNextPage} 
              user={this.state.user} 
              loggedIn={this.state.loggedIn}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
          />
          <Anticipate
            pageChange={this.handlePageChange}
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            user={this.state.user}
            loggedIn={this.state.loggedIn}
            nextPage={this.state.landingNextPage}
            updateNextPage={this.updateLandingNextPage}
          />
        </>
      );
    } else {
      throw new Error("invalid page");
    }

    return (
      <>
        {content}
        <Footer />
      </>
    );
  };
}

export default App;