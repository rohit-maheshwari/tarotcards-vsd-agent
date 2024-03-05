import React, { Component } from "react";
import "./TarotCard.css";

type TarotCardType = {
    title: string,
    image: string,
    questions: string[]
}

type TarotCardProps = {
    key: number,
    tarotcard: TarotCardType,
    handleCardSelect: (card: TarotCardType) => void,
    selectedCards: TarotCardType[]
}

type TarotCardState = {

}

export class TarotCardComponent extends Component <TarotCardProps, TarotCardState> {
    constructor(props: TarotCardProps) {
        super(props);
    }

    isCardSelected = (currCard: TarotCardType): boolean => {

        for (let card of this.props.selectedCards) {
            if (card === currCard) {
                return true;
            }
        }

        return false;
    }

    render = (): JSX.Element => {
        if (!this.isCardSelected(this.props.tarotcard)) {
            return (
                <button className="card" onClick={() => this.props.handleCardSelect(this.props.tarotcard)}>
                    <h3>{this.props.tarotcard.title}</h3>
                    <div className="card-text">
                        <p>{this.props.tarotcard.questions[0]}</p>
                    </div>
                </button>
            );
        } else {
            return (
                <button className="card" onClick={() => this.props.handleCardSelect(this.props.tarotcard)}>
                    <p className="selectedIndicator">Selected</p>
                    <h3>{this.props.tarotcard.title}</h3>
                    <div className="card-text">
                        <p>{this.props.tarotcard.questions[0]}</p>
                    </div>
                </button>
            );
        }
        
    };
};