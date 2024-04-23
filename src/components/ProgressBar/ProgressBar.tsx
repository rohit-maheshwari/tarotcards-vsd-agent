import { Component } from "react";
import "./ProgressBar.css";
import Tooltip from '@mui/material/Tooltip';
import {tarotcards} from '../SelectingTarotCards/tarotcards';

type TarotCardType = {
  title: string,
  image: string,
  questions: string[],
  color: string
}

type ProgressBarProps = {
  allCards: typeof tarotcards
  finishedCards: {[key: string]: boolean}
}

type ProgressBarState = {

}

class ProgressBar extends Component<ProgressBarProps, ProgressBarState> {
  constructor(props: ProgressBarProps) {
    super(props);
    this.state = { };
  }

  handleDrawCircles = () : JSX.Element => {
    const circles: JSX.Element[] = [];
    for (let i: number = 0; i < this.props.allCards.length; i++) {
        const name = this.props.allCards[i].title;
        if (this.props.finishedCards[this.props.allCards[i]?.title]) {
          circles.push(<Tooltip title={name}><div key={name} className="completed-circle" style={{backgroundColor: this.props.allCards[i].color}}></div></Tooltip>);
        } else {
          circles.push(<Tooltip title={name}><div key={name} className="in-progress-circle"></div></Tooltip>);
        }
    }
    return (
      <div>{circles}</div>
    )
  }

  render = (): JSX.Element => {
    // console.log("Selected cards:", this.props.selectedCards);
    // console.log("Dictionary:", this.state.dictionary);
    // console.log("finished cards: ", this.props.finishedCards);
    return (
      <div className="circle-container">
        {this.handleDrawCircles()}
      </div>
    )
  };
}

export default ProgressBar;
