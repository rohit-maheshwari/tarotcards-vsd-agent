import React, { Component } from "react";
import { tarotcards } from "./tarotcards";
import Sprite from '../Sprite/Sprite';
import "./SelectingTarotCards.css";
import { TarotCardComponent } from "../TarotCard/TarotCard";

type pages = "ProjectDescription" | "SelectingTarotCards" | "Playground"

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

}

class SelectingTarotCards extends Component<SelectingTarotCardsProps, SelectingTarotCardsState> {
  constructor(props: SelectingTarotCardsProps) {
    super(props);

    this.state = {  }
  }

  handleProjectDescriptionSubmit = (): void => {
    this.props.pageChange("ProjectDescription");
  }

  render = (): JSX.Element => {
    return (
      <>
        <button className="navbarButton" onClick={this.handleProjectDescriptionSubmit}>EDIT PROJECT DESCRIPTION</button>
        <button className="navbarButton" onClick={this.props.handlePreselectSubmit}>PRESELECT Some Related Tarot Cards...</button>
        <div className="TarotCardsContainer">
          {tarotcards.map((card: TarotCardType, key: number) => {
            let showComponent = null;
            this.props.selectedCards.includes(card) ? showComponent = false : showComponent = true;
            console.log(showComponent);
            return (
              <TarotCardComponent key={key} tarotcard={card} selectedCards={this.props.selectedCards} handleCardSelect={this.props.handleCardSelect} showComponent={showComponent}/>
            );
          })}
        </div>
        <Sprite page={"SelectingTarotCards"} finished = {true} />
      </>
    )
  };
}

export default SelectingTarotCards;
