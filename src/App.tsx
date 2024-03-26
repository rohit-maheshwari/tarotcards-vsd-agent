import { Component } from 'react';
import './App.css';
import ProjectDescription from './components/ProjectDescription/ProjectDescription';
import SelectingTarotCards from './components/SelectingTarotCards/SelectingTarotCards';
import Playground from './components/Playground/Playground';

type Props = {
  page: pages
}

type TarotCardType = {
  title: string,
  image: string,
  questions: string[],
  color: string
}

type pages = "ProjectDescription" | "SelectingTarotCards" | "Playground";

type AppState = {
  page: pages,
  selectedCards: TarotCardType[],
  finished: boolean // denotes if description is finished or not
}

class App extends Component<Props, AppState> {

  constructor(props: Props) {
    super(props);

    this.state = {page: "ProjectDescription", selectedCards: [], finished: false}
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
    this.setState({finished: !this.state.finished}); // 
  }


  handlePageChange = (page: pages): void => {
    this.setState({page: page});
  }

  handlePreselectSubmit = () => {
    // BACKEND FETCH WILL BE HERE
    console.log('preselecting...');
    this.setState({selectedCards: []});
  }

  handleButtonClick = async () => {
    const requestData = {
      // Your request payload
      key: 'value',
    };

    try {
      // const response = await fetch('https://your-api-endpoint.com/post', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // Add any other headers your API requires
      //   },
      //   body: JSON.stringify(requestData),
      // });
      const response = await fetch('http://localhost:3000/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Response:', responseData);
    } catch (error) {
      console.error('Request failed:', error);
    }
  }

  render = (): JSX.Element => {
    // if (this.state.page === "ProjectDescription") {
    //   return (<ProjectDescription pageChange={this.handlePageChange} finishedChange={this.handleFinishedChange}/>);
    // }
    // else if (this.state.page === "SelectingTarotCards") {
    //   return (<SelectingTarotCards selectedCards={this.state.selectedCards} pageChange={this.handlePageChange} handleCardSelect={this.handleCardSelect} handlePreselectSubmit={this.handlePreselectSubmit}/>);
    // }
    // else if (this.state.page === "Playground") {
    //   return (<Playground pageChange={this.handlePageChange}/>);
    // }
    // else {
    //   throw new Error("invalid page");
    // }
    return (<button onClick={this.handleButtonClick}>Send POST Request</button>)
  };
}

export default App;
