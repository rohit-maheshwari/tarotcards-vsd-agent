import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectDescription from './components/ProjectDescription/ProjectDescription';
import SelectingTarotCards from './components/SelectingTarotCards/SelectingTarotCards';
import Playground from './components/Playground/Playground';

type Props = {
  page: pages
}

type pages = "ProjectDescription" | "SelectingTarotCards" | "Playground";

type AppState = {
  page: pages
}

class App extends Component<Props, AppState> {

  constructor(props: Props) {
    super(props);

    this.state = {page: "ProjectDescription"}
  }

  render = (): JSX.Element => {
    if (this.state.page === "ProjectDescription") {
      return (<ProjectDescription pageChange={this.handlePageChange}/>);
    }
    else if (this.state.page === "SelectingTarotCards") {
      return (<SelectingTarotCards pageChange={this.handlePageChange}/>);
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
