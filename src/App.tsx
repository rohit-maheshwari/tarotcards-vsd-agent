import { Component } from 'react';
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
  finished: boolean,
  selectedCards: TarotCardType[]
}

class App extends Component<Props, AppState> {

  constructor(props: Props) {
    super(props);

    this.state = {page: "ProjectDescription", finished: false, selectedCards: []} // finished starts as false
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

  handlePageSelect = (): JSX.Element => {
    let mainPage = null;
    if (this.state.page === "ProjectDescription") {
      mainPage = <ProjectDescription pageChange={this.handlePageChange} finishedChange={this.handleFinishedChange}/>;
    }
    else if (this.state.page === "SelectingTarotCards") {
      mainPage = <SelectingTarotCards selectedCards={this.state.selectedCards} pageChange={this.handlePageChange} handleCardSelect={this.handleCardSelect}/>;
    }
    else if (this.state.page === "Playground") {
      mainPage = <Playground pageChange={this.handlePageChange}/>;
    }
    else {
      throw new Error("invalid page");
    }

    return (mainPage);
  };

  render = (): JSX.Element => {
    let mainPage = this.handlePageSelect();

    return (
    <div> 
        {mainPage} 
    </div>);
  };


  handlePageChange = (page: pages): void => {
    this.setState({page: page});
  }

  handleFinishedChange = (finished: boolean) : void => {
    this.setState({finished: finished});
  }
}

export default App;
