import React, { Component } from "react";
import { TarotCardComponent } from "../TarotCard/TarotCard";
import { tarotcards } from "./tarotcards";
import "./SelectingTarotCards.css";

type pages = "ProjectDescription" | "SelectingTarotCards" | "Playground"

type TarotCardType = {
  title: string,
  image: string,
  questions: string[]
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

    this.state = { selectedCards: this.props.selectedCards }
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
            return (
              <TarotCardComponent key={key} tarotcard={card} selectedCards={this.props.selectedCards} handleCardSelect={this.props.handleCardSelect}/>
            );
          })}
        </div>
      </>
    )
  };
}

export default SelectingTarotCards;