import { Component, useState } from "react";
import "./ProgressBar.css";
import Tooltip from '@mui/material/Tooltip';
import {tarotcards} from '../SelectingTarotCards/tarotcards';

type TarotCardType = {
  title: string,
  frontimage: string,
  backimage: string,
  questions: string[]
}

type ProgressBarProps = {
  selectedCards: TarotCardType[]
  allCards: typeof tarotcards
}

type ProgressBarState = {
  dictionary: { [key: string]: JSX.Element }
}

class ProgressBar extends Component<ProgressBarProps, ProgressBarState> {
  constructor(props: ProgressBarProps) {
    super(props);
    const dictionary: { [key: string]: JSX.Element } = {};
    this.state = {dictionary: dictionary};
  }

  componentDidMount() {
    const tempDictionary = this.state.dictionary;
    for (let i: number = 0; i < this.props.allCards.length; i++) {
        const name = this.props.allCards[i].title;
        tempDictionary[name] = <Tooltip title={name}><div key={name} className="in-progress-circle"></div></Tooltip>;
    }
    this.setState({dictionary: tempDictionary});
  }


  componentDidUpdate(prevProps: ProgressBarProps, prevState: ProgressBarState) {
    if (prevProps.selectedCards !== this.props.selectedCards || prevState.dictionary !== this.state.dictionary) {
      const tempDictionary = this.state.dictionary;
      if (prevProps.selectedCards.length > this.props.selectedCards.length) { // if we are removing a card
        // if card in prevProps is not in this.props, replace in dict with in-progress circle
        for (let i: number = 0; i < prevProps.selectedCards.length; i++) {
          if (!(this.props.selectedCards.includes(prevProps.selectedCards[i]))) {
            const name = prevProps.selectedCards[i].title;
            tempDictionary[name] = <Tooltip title={name}><div key={name} className="in-progress-circle"></div></Tooltip>;
          }
        }
      }

      if (prevProps.selectedCards.length < this.props.selectedCards.length) { // if we are adding a card
        // if card in this.props is not in prevProps, replace it dict with completed circle
        for (let i: number = 0; i < this.props.selectedCards.length; i++) {
          if (!(prevProps.selectedCards.includes(this.props.selectedCards[i]))) {
            const name = this.props.selectedCards[i].title;
            tempDictionary[name] = <Tooltip title={name}><div key={name} className="completed-circle"></div></Tooltip>;
          }
        }
      }
      this.handleChangeDict();
    }
  }

  handleChangeDict = () : void => {
    const tempDictionary = this.state.dictionary;
      // for every selected card, if the title is in the dictionary right now, delete it and add a completed circle
      for (let i: number = 0; i < this.props.selectedCards.length; i++) {
        const name = this.props.selectedCards[i].title;
        tempDictionary[name] = <Tooltip title={name}><div key={name} className="completed-circle"></div></Tooltip>;
      }
    
    this.setState({dictionary: tempDictionary});
  }

  handleDrawCircles = () : JSX.Element => {
    const circles = [];
    for (let i: number = 0; i < this.props.allCards.length; i++) {
      let name = this.props.allCards[i].title;
      circles.push(this.state.dictionary[name]);
    }
    return (
      <div>{circles}</div>
    )
  }

  render = (): JSX.Element => {
    console.log("Selected cards:", this.props.selectedCards);
    console.log("Dictionary:", this.state.dictionary);
    return (
      <div className="circle-container">
        {this.handleDrawCircles()}
      </div>
    )
  };
}

export default ProgressBar;
