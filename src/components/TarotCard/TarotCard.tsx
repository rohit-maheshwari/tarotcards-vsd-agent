import React, { Component } from "react";
import "./TarotCard.css";
import { FrontTarotCardComponent } from "./Front/FrontTarotCard";
import { BackTarotCardComponent } from "./Back/BackTarotCard";
import flip from "./flipbutton.svg";

type TarotCardType = {
    title: string,
    image: string,
    questions: string[],
    color: string
}

type TarotCardProps = {
    key: number | undefined,
    tarotcard: TarotCardType,
    handleCardSelect: (card: TarotCardType) => void,
    showComponent: boolean,
    finishedCards: {[key: string]: boolean},
    updateCard: (card: TarotCardType) => void;
}

type TarotCardState = {
    isFlipping: boolean
}

export class TarotCardComponent extends Component <TarotCardProps, TarotCardState> {
    constructor(props: TarotCardProps) {
        super(props);

        this.state = { isFlipping: false }
    }

    flipCard = () => {
        this.setState({ isFlipping: true });

        setTimeout(() => {
            this.props.handleCardSelect(this.props.tarotcard);
        }, 150);

        setTimeout(() => {
            this.setState({ isFlipping: false });
        }, 150);
    }

    render = (): JSX.Element => {
        return (
            <div className={`card ${this.state.isFlipping ? 'half-flipped' : ''}`}>
                <div className="flipbuttoncontainer">
                    <img className={`flipbtn ${this.state.isFlipping ? 'half-flipped' : ''}`} src={flip} onClick={this.flipCard} />
                </div>
                {this.props.showComponent ?
                    <FrontTarotCardComponent tarotcard={this.props.tarotcard} />
                :
                <div className="card-back">
                    <BackTarotCardComponent tarotcard={this.props.tarotcard} finishedCards={this.props.finishedCards} updateCard={this.props.updateCard}/>
                </div>
                }
            </div>
        );
        
    };
};