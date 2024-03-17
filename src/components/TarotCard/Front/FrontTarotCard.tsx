import React, { Component } from "react";
import "./FrontTarotCard.css";

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

export class FrontTarotCardComponent extends Component <TarotCardProps, TarotCardState> {
    constructor(props: TarotCardProps) {
        super(props);
    }

    funcCalls = (): void => {
        this.props.handleCardSelect(this.props.tarotcard);
        this.props.flipCard();
    }

    render = (): JSX.Element => {
        return (
            <img className="card-front" src={this.props.tarotcard.frontimage} alt={this.props.tarotcard.title} onClick={() => this.funcCalls()} />
        );
    };
};