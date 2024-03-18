import React, { Component } from "react";
import { TarotCardComponent } from "../TarotCard/TarotCard";
import { tarotcards } from "./tarotcards";
import Sprite from '../Sprite/Sprite';
import "./SelectingTarotCards.css";
import ProgressBar from "../ProgressBar/ProgressBar";

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


class SelectingTarotCards extends Component<SelectingTarotCardsProps> {
  constructor(props: SelectingTarotCardsProps) {
    super(props);

    this.state = { selectedCards: this.props.selectedCards }
  }

  handleProjectDescriptionSubmit = (): void => {
    this.props.pageChange("ProjectDescription");
  }

  render = (): JSX.Element => {
    {console.log(this.props.selectedCards);}
    return (
      <>
        <button className="navbarButton" onClick={this.handleProjectDescriptionSubmit}>EDIT PROJECT DESCRIPTION</button>
        <div className="TarotCardsContainer">
          {tarotcards.map((card: TarotCardType, key: number) => {
            return (
              <TarotCardComponent key={key} tarotcard={card} selectedCards={this.props.selectedCards} handleCardSelect={this.props.handleCardSelect}/>
              );
          })}
        </div>
        <Sprite page={"SelectingTarotCards"} finished = {true} />
        <ProgressBar selectedCards={this.props.selectedCards}/>
      </>
    )
  };
}

export default SelectingTarotCards;
