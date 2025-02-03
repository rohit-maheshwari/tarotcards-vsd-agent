import React, { Component } from "react";
import "./TarotCard.css";
import { FrontTarotCardComponent } from "./Front/FrontTarotCard";
import { BackTarotCardComponent } from "./Back/BackTarotCard";
import flip from "./flipbutton.svg";

type TarotCardType = {
    title: string,
    frontimage: string,
    backimage: string,
    questions: string[],
    color: string
}

type TarotCardProps = {
    title: string,
    description: string,
    key: number | undefined,
    tarotcard: TarotCardType,
    handleCardSelect: (card: TarotCardType) => void,
    showComponent: boolean,
    finishedCards: {[key: string]: boolean},
    updateCard: (card: TarotCardType, response: string) => void,
    initialResponse: string,
    user: any
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
                    <BackTarotCardComponent title={this.props.title} description={this.props.description} tarotcard={this.props.tarotcard} finishedCards={this.props.finishedCards} updateCard={this.props.updateCard} initialResponse={this.props.initialResponse} user={this.props.user}/>
                </div>
                }
            </div>
        );
        
    };
};