import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectDescription from './components/ProjectDescription/ProjectDescription';
import SelectingTarotCards from './components/SelectingTarotCards/SelectingTarotCards';
import Playground from './components/Playground/Playground';

type TarotCardType = {
  title: string,
  image: string,
  questions: string[]
}

type Props = {
  page: pages
}

type pages = "ProjectDescription" | "SelectingTarotCards" | "Playground";

type AppState = {
  page: pages,
  selectedCards: TarotCardType[]
}

class App extends Component<Props, AppState> {

  constructor(props: Props) {
    super(props);

    this.state = {page: "ProjectDescription", selectedCards: []}
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

  render = (): JSX.Element => {
    if (this.state.page === "ProjectDescription") {
      return (<ProjectDescription pageChange={this.handlePageChange}/>);
    }
    else if (this.state.page === "SelectingTarotCards") {
      return (<SelectingTarotCards selectedCards={this.state.selectedCards} pageChange={this.handlePageChange} handleCardSelect={this.handleCardSelect}/>);
    }
    else if (this.state.page === "Playground") {
      return (<Playground pageChange={this.handlePageChange}/>);
    }
    else {
      throw new Error("invalid page");
    }
  };

  handlePageChange = (page: pages): void => {
    this.setState({page: page});
  }
}

export default App;
