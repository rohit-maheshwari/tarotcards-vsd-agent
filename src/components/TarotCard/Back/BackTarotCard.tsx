import React, { Component, useState } from "react";
import "./BackTarotCard.css";

type TarotCardType = {
    title: string,
    image: string,
    questions: string[],
    color: string
}


type TarotCardProps = {
    tarotcard: TarotCardType
}

type TarotCardState = {
    answers: {}
}

export class BackTarotCardComponent extends Component <TarotCardProps, TarotCardState> {
    constructor(props: TarotCardProps) {
        super(props);

        this.state = { answers: {} }
    }

    handleAnswerChange = (question: string, answer: string) => {
        this.setState(prevState => ({
            answers: {
              ...prevState.answers,
              [question]: answer
            }
          }));
    };

    handleInputClick = (event: any) => {
        event.stopPropagation();
    }

    render = (): JSX.Element => {
        
        console.log(this.state.answers);

        return (
            <div className="card-back" style={{backgroundColor: this.props.tarotcard.color}}>
                <h1>{this.props.tarotcard.title}</h1>
                <h3>{this.props.tarotcard.questions[0]}</h3>
                <input onClick={this.handleInputClick} onChange={(e) => this.handleAnswerChange(this.props.tarotcard.questions[0], e.target.value)} placeholder="Enter answer here"/>
                {this.props.tarotcard.questions.slice(1,).map((s: string, index: number) => {
                    return (
                        <div>
                            <p>{s}</p>
                            <input onClick={this.handleInputClick} onChange={(e) => this.handleAnswerChange(this.props.tarotcard.questions[index+1], e.target.value)} placeholder="Enter answer here"/>
                        </div>
                    )
                })}
            </div>
        );
    };
};