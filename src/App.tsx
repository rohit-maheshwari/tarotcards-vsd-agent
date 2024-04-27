import { Component } from 'react';
import './App.css';
import ProjectDescription from './components/ProjectDescription/ProjectDescription';
import SelectingTarotCards from './components/SelectingTarotCards/SelectingTarotCards';
const env = require('./environment.json')
const googleClientId = env.GOOGLE_CLIENT_ID;

type Props = {
  page: pages
}

type TarotCardType = {
  title: string,
  image: string,
  questions: string[],
  color: string
}

type pages = "ProjectDescription" | "SelectingTarotCards";

type AppState = {
  loggedIn: boolean,
  user: any,
  page: pages,
  title: string,
  description: string,
  selectedCards: TarotCardType[],
  finished: boolean // denotes if description is finished or not
}

class App extends Component<Props, AppState> {

  auth: gapi.auth2.GoogleAuth;

  constructor(props: Props) {
    super(props);

    this.state = {loggedIn: false, user: null, page: "ProjectDescription", title: "", description: "", selectedCards: [], finished: false}

    this.auth = {} as gapi.auth2.GoogleAuth;
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
        clientId: googleClientId,
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
      console.log('The user is signed in');
          // You can access user profile info with:
          // this.auth.currentUser.get().getBasicProfile();
      this.setState({loggedIn: true})
    } else {
      console.log('The user is not signed in');
      this.setState({loggedIn: false, user: null})
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
    fetch('/api/verify?idToken=' + idToken, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => this.handleVerifiedUser(res))
    .catch(() => console.log("/get: Failed to connect to server"));
  }

  handleVerifiedUser = (res: any) => {
    res.json()
    .then((data: any) => {
      console.log(data.userInfo);
      this.setState({loggedIn: true, user: data.userInfo})
    })
  }

  handleLogout = () => {
    this.auth.signOut().then().catch((error: any) => console.log(error));
  }



  handleCardSelect = (card: TarotCardType) => {
    const selectedCards = this.state.selectedCards;

    const index = selectedCards.findIndex((selectedCard: TarotCardType) => 
      selectedCard.title === card.title);

    if (index > -1) {
      // Card is already selected, remove it from the array
      this.setState({
        selectedCards: selectedCards.filter((_, i) => i !== index)
      });
    } else {
      // Card is not selected, add it to the array
      this.setState({
        selectedCards: [...selectedCards, card]
      });
    }
  }

  handleFinishedChange = (finished: boolean) => {
    this.setState({finished: !this.state.finished});
  }

  handleTitleChange = (title: string) => {
    this.setState({title: title});
  }

  handleDescriptionChange = (description: string) => {
    this.setState({description: description});
  }

  handlePageChange = (page: pages): void => {
    this.setState({page: page});
  }

  handlePreselectSubmit = () => {
    // BACKEND FETCH WILL BE HERE
    console.log('preselecting...');
    this.setState({selectedCards: []});
  }


  render = (): JSX.Element => {
    console.log(this.state.user);
    if (this.state.loggedIn) {
      console.log('user logged in')
      // return (<button onClick={this.handleLogout}>Sign Out</button>);
      if (this.state.page === "ProjectDescription") {
        return (<ProjectDescription pageChange={this.handlePageChange} finishedChange={this.handleFinishedChange} titleChange={this.handleTitleChange} descriptionChange={this.handleDescriptionChange} user={this.state.user}/>);
      }
      else if (this.state.page === "SelectingTarotCards") {
        return (<SelectingTarotCards selectedCards={this.state.selectedCards} title={this.state.title} description={this.state.description} pageChange={this.handlePageChange} handleCardSelect={this.handleCardSelect} handlePreselectSubmit={this.handlePreselectSubmit} user={this.state.user}/>);
      }
      else {
        throw new Error("invalid page");
      }
    } else {
      console.log('user logged out')
      return (<button onClick={this.handleLogin}>Sign In with Google</button>)
    }
    
  };
}

export default App;