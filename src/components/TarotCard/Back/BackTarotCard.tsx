import React, { Component } from "react";
import "./BackTarotCard.css";

type TarotCardType = {
    title: string,
    image: string,
    questions: string[],
    color: string,
}

type TarotCardProps = {
    tarotcard: TarotCardType
}

type TarotCardState = {

}

export class BackTarotCardComponent extends Component <TarotCardProps, TarotCardState> {
    constructor(props: TarotCardProps) {
        super(props);
    }

    render = (): JSX.Element => {
        return (
            <div className="card-back" style={{backgroundColor: this.props.tarotcard.color}}>
                <div className="card-back-content">
                    hello
                </div>
            </div>
        );
    };
};