import React, { Component } from "react";
import "./FrontTarotCard.css";

type TarotCardType = {
    title: string,
    frontimage: string,
    backimage: string,
    questions: string[],
    color: string
}

type TarotCardProps = {
    tarotcard: TarotCardType
}

type TarotCardState = {

}

export class FrontTarotCardComponent extends Component <TarotCardProps, TarotCardState> {
    constructor(props: TarotCardProps) {
        super(props);
    }

    render = (): JSX.Element => {
        return (
            <img className="card-front" src={this.props.tarotcard.frontimage} alt={this.props.tarotcard.title} />
        );
    };
};