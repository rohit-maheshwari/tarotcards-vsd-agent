import React, { Component } from "react";
import { tarotcards } from "./tarotcards";
import Sprite from '../Sprite/Sprite';
import "./SelectingTarotCards.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import { TarotCardComponent } from "../TarotCard/TarotCard";

type pages = "ProjectDescription" | "SelectingTarotCards";

type TarotCardType = {
  title: string,
  image: string,
  questions: string[],
  color: string
}

type SelectingTarotCardsProps = {
  pageChange: (page: pages) => void;
  selectedCards: TarotCardType[],
  handleCardSelect: (card: TarotCardType) => void,
  handlePreselectSubmit: () => void
}

type SelectingTarotCardsState = {
  finishedCards: {[key: string]: boolean}
}

class SelectingTarotCards extends Component<SelectingTarotCardsProps, SelectingTarotCardsState> {
  constructor(props: SelectingTarotCardsProps) {
    super(props);

    this.state = { 
      finishedCards: tarotcards.reduce((acc: {[key: string]: boolean}, obj: TarotCardType) => {
        acc[obj.title] = false; // UPDATE THIS (Fix the whether card is finished or not depending on server data @Julie12Yu @rohit-maheshwari @rrrrrrockpang)
        return acc;
    }, {}), }
  }

  handleProjectDescriptionSubmit = (): void => {
    this.props.pageChange("ProjectDescription");
  }

  updateCard = (card: TarotCardType): void => {
    // update state of finished card
    const newMap = this.state.finishedCards;
    newMap[card.title] = !newMap[card.title];
    this.setState({finishedCards: newMap});
  }

  render = (): JSX.Element => {
    return (
      <>
        <button className="navbarButton" onClick={this.handleProjectDescriptionSubmit}>EDIT PROJECT DESCRIPTION</button>
        <div className="TarotCardsContainer">
          {tarotcards.map((card: TarotCardType, key: number) => {
            let showComponent = null;
            this.props.selectedCards.includes(card) ? showComponent = false : showComponent = true;
            return (
              <TarotCardComponent key={key} tarotcard={card} handleCardSelect={this.props.handleCardSelect} showComponent={showComponent} finishedCards={this.state.finishedCards} updateCard={this.updateCard}/>
            );
          })}
        </div>
        <Sprite page={"SelectingTarotCards"} finished = {true} />
        <ProgressBar allCards={tarotcards} finishedCards={this.state.finishedCards}/>
      </>
    )
  };
}

export default SelectingTarotCards;
