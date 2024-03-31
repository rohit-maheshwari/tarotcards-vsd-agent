import React, { Component } from "react";
import "./TarotCard.css";
import { FrontTarotCardComponent } from "./Front/FrontTarotCard";
import { BackTarotCardComponent } from "./Back/BackTarotCard";

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
    selectedCards: TarotCardType[],
    showComponent: boolean,
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
            <div className={`card ${this.state.isFlipping ? 'half-flipped' : ''}`} onClick={this.flipCard}>
                {this.props.showComponent ?
                    <FrontTarotCardComponent tarotcard={this.props.tarotcard} />
                :
                <div className="card-back">
                    <BackTarotCardComponent tarotcard={this.props.tarotcard} />
                </div>
                }
            </div>
        );
        
    };
};