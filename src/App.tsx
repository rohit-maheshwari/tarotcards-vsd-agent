import { Component } from 'react';
import './App.css';
import ProjectDescription from './components/ProjectDescription/ProjectDescription';
import SelectingTarotCards from './components/SelectingTarotCards/SelectingTarotCards';

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


  render = (): JSX.Element => {
    if (this.state.page === "ProjectDescription") {
      return (<ProjectDescription pageChange={this.handlePageChange} finishedChange={this.handleFinishedChange}/>);
    }
    else if (this.state.page === "SelectingTarotCards") {
      return (<SelectingTarotCards selectedCards={this.state.selectedCards} pageChange={this.handlePageChange} handleCardSelect={this.handleCardSelect} handlePreselectSubmit={this.handlePreselectSubmit}/>);
    }
    else {
      throw new Error("invalid page");
    }
  };
}

export default App;