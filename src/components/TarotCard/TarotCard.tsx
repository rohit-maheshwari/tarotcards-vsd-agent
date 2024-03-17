import React, { Component } from "react";
import "./TarotCard.css";
import { FrontTarotCardComponent } from "./Front/FrontTarotCard";
import { BackTarotCardComponent } from "./Back/BackTarotCard";

type TarotCardType = {
    title: string,
    frontimage: string,
    backimage: string,
    questions: string[]
  }

type TarotCardProps = {
    key: number | undefined,
    tarotcard: TarotCardType,
    handleCardSelect: (card: TarotCardType) => void,
    selectedCards: TarotCardType[]
}

type TarotCardState = {
    isFlipped: boolean
}

export class TarotCardComponent extends Component <TarotCardProps, TarotCardState> {
    constructor(props: TarotCardProps) {
        super(props);

        this.state = { isFlipped: false }
    }

    isCardSelected = (currCard: TarotCardType): boolean => {

        for (let card of this.props.selectedCards) {
            if (card === currCard) {
                return true;
            }
        }

        return false;
    }

    flipCard = () => {
        this.setState({ isFlipped: !this.state.isFlipped });
    }

    render = (): JSX.Element => {

        return (
            <div
                className={`flip-card ${
                    this.state.isFlipped ? "flipped" : ""
                }`}
            >
                <div className="flip-card-inner">
                    <FrontTarotCardComponent tarotcard={this.props.tarotcard} handleCardSelect={this.props.handleCardSelect} selectedCards={this.props.selectedCards} flipCard={this.flipCard} />
                    <BackTarotCardComponent tarotcard={this.props.tarotcard} handleCardSelect={this.props.handleCardSelect} selectedCards={this.props.selectedCards} flipCard={this.flipCard} />
                </div>
            </div>

        )
        
    };
};