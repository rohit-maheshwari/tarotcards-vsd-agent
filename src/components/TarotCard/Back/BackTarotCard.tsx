import React, { Component, useState } from "react";
import "./BackTarotCard.css";

type TarotCardType = {
    title: string,
    image: string,
    questions: string[],
    color: string
}

type TarotCardProps = {
    tarotcard: TarotCardType,
    finishedCards: {[key: string]: boolean},
    updateCard: (card: TarotCardType) => void;
}

type TarotCardState = {
    responses: {}
}

export class BackTarotCardComponent extends Component <TarotCardProps, TarotCardState> {
    constructor(props: TarotCardProps) {
        super(props);

        this.state = { 
            responses: this.props.tarotcard.questions.reduce((acc: {[key: string]: string}, cur: string) => {
                acc[cur] = '';
                return acc;
            }, {})
        }
    }

    handleAnswerChange = (question: string, answer: string) => {
        this.setState(prevState => ({
            responses: {
              ...prevState.responses,
              [question]: answer
            }
          }));
        
    };

    handleButtonClick = async () => {
        if (!this.props.finishedCards[this.props.tarotcard.title]) {
            let userCheck = window.confirm("are you sure?");
            if (userCheck) {
                this.props.updateCard(this.props.tarotcard);

                const requestData = {
                    // Your request payload
                    time_stamp: 3, 
                    description: "Project Description", 
                    card: this.props.tarotcard.title,
                    card_responses: this.state.responses, 
                    user_id: 12345678910, 
                    session_id: 3 
                };
        
                fetch ('/record', {
                    method: 'PUT',
                    body: JSON.stringify(requestData),
                    headers: {
                    'Content-Type': 'application/json',
                    },
                })
                .then((res) => this.doButtonClickResponse(res))
                .catch(() => this.doError("/record: Failed to connect to server"));
            }
        } else {
            this.props.updateCard(this.props.tarotcard);
        }
    }

    doButtonClickResponse = (res: Response) => {
        if (res.status === 200) {
            alert("Successfully saved!");
            
        } else {
            this.doError("/record: Failed to connect to server with code: " + res.status);
        }
    }

    doError = (errMessage: string) => {
        console.log("Error at: " + errMessage);
    } 

    render = (): JSX.Element => {
        return (
            <div className="card-back" style={{backgroundColor: this.props.tarotcard.color}}>
                <h1>{this.props.tarotcard.title}</h1>
                <h3>{this.props.tarotcard.questions[0]}</h3>
                <textarea key={0} readOnly={this.props.finishedCards[this.props.tarotcard.title]} onChange={(e) => this.handleAnswerChange(this.props.tarotcard.questions[0], e.target.value)} placeholder="Enter answer here"/>
                {this.props.tarotcard.questions.slice(1,).map((s: string, index: number) => {
                    return (
                        <div>
                            <p>{s}</p>
                            <textarea key={index} readOnly={this.props.finishedCards[this.props.tarotcard.title]} onChange={(e) => this.handleAnswerChange(this.props.tarotcard.questions[index+1], e.target.value)} placeholder="Enter answer here"/>
                        </div>
                    )
                })}
                <button className="done-btn" onClick={this.handleButtonClick}>{this.props.finishedCards[this.props.tarotcard.title] ? 'EDIT' : 'DONE'}</button>
            </div>
        );
    };
};