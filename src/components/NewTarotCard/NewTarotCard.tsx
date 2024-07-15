import React, { Component } from "react";
import "./NewTarotCard.css";
import flip from "./flipbutton.svg";

type Card = {
    title: string,
    image: string,
    questions: string[],
    color: string
}

type TarotCardProps = {
    tarotcard: Card,
}

type TarotCardState = {
    selected: boolean,
    isFlipping: boolean
}

export default class TarotCardComponent extends Component <TarotCardProps, TarotCardState> {
    constructor(props: TarotCardProps) {
        super(props);

        this.state = { selected: false, isFlipping: false }
    }

    flipCard = () => {
        this.setState({ isFlipping: true });

        setTimeout(() => {
            this.setState({ isFlipping: false });
        }, 150);
    }

    render = (): JSX.Element => {
        return (
            <div className={`card-pic ${this.state.isFlipping ? 'half-flipped' : ''}`}>
                <div className="flipbuttoncontainer">
                    <img className={`flipbtn ${this.state.isFlipping ? 'half-flipped' : ''}`} src={flip} onClick={this.flipCard} />
                </div>
                {!this.state.selected ?
                    <img src={this.props.tarotcard.image} />
                :
                    <img src={this.props.tarotcard.image} />
                }
            </div>
        );
        
    };
};