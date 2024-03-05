import React, { Component } from "react";
import { TarotCard } from "../TarotCard/TarotCard";
import { tarotcards } from "./tarotcards";
import "./SelectingTarotCards.css";

type pages = "ProjectDescription" | "SelectingTarotCards" | "Playground"

type SelectingTarotCardsProps = {
  pageChange: (page: pages) => void;
}

type SelectingTarotCardsState = {
    
}

class SelectingTarotCards extends Component<SelectingTarotCardsProps, SelectingTarotCardsState> {
  constructor(props: SelectingTarotCardsProps) {
    super(props);

    this.state = { }
  }

  handleProjectDescriptionSubmit = (): void => {
    this.props.pageChange("ProjectDescription");
  }

  render = (): JSX.Element => {
    return (
      <>
        <button className="navbarButton" onClick={this.handleProjectDescriptionSubmit}>EDIT PROJECT DESCRIPTION</button>
        <div className="TarotCardsContainer">
          {tarotcards.map((card: any, key: number) => {
            return (
              <TarotCard key={key} title={card.title} image={card.image} questions={card.questions} />
            );
          })}
        </div>
      </>
    )
  };
}

export default SelectingTarotCards;