import React, { Component } from "react";
import "./TarotCard.css";


type TarotCardProps = {
    key: number,
    title: string,
    image: string,
    questions: string[]
}

type TarotCardState = {
    isSelected: boolean
}

export class TarotCard extends Component <TarotCardProps, TarotCardState> {
    constructor(props: TarotCardProps) {
        super(props);

        this.state = { isSelected: false }
    }

    changeState = (): void => {
        this.setState({isSelected: !this.state.isSelected});
    }

    render = (): JSX.Element => {
        if (!this.state.isSelected) {
            return (
                <button key={this.props.key} className="card" onClick={this.changeState}>
                    <h3>{this.props.title}</h3>
                    <div className="card-text">
                        <p>{this.props.questions[0]}</p>
                    </div>
                </button>
            );
        } else {
            return (
                <button key={this.props.key} className="card" onClick={this.changeState}>
                    <p className="selectedIndicator">Selected</p>
                    <h3>{this.props.title}</h3>
                    <div className="card-text">
                        <p>{this.props.questions[0]}</p>
                    </div>
                </button>
            );
        }
        
    };
};