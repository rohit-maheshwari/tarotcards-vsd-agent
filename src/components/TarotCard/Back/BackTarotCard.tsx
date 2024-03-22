import React, { Component } from "react";
import "./BackTarotCard.css";

type TarotCardType = {
    title: string,
    frontimage: string,
    backimage: string,
    questions: string[]
}

type TarotCardProps = {
    tarotcard: TarotCardType,
    handleCardSelect: (card: TarotCardType) => void,
    selectedCards: TarotCardType[],
    flipCard: () => void
}

type TarotCardState = {

}

export class BackTarotCardComponent extends Component <TarotCardProps, TarotCardState> {
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

    funcCalls = (): void => {
        this.props.handleCardSelect(this.props.tarotcard);
        this.props.flipCard();
    }

    render = (): JSX.Element => {
        return (
            <img className="card-back" src={this.props.tarotcard.backimage} alt={this.props.tarotcard.title} onClick={() => this.funcCalls()} />
        );
    };
};