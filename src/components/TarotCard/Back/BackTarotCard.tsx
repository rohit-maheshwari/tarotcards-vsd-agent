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
    response: string
}

export class BackTarotCardComponent extends Component <TarotCardProps, TarotCardState> {
    constructor(props: TarotCardProps) {
        super(props);

        this.state = { 
            response: ''
        }
    }

    handleAnswerChange = (answer: string) => {
        this.setState({response: answer});
        
    };

    handleButtonClick = async () => {
        if (!this.props.finishedCards[this.props.tarotcard.title]) { // if button is going from "done" -> "edit"
            let userCheck = window.confirm("are you sure?");
            const requestData = {
                // Your request payload
                time_stamp: 3, 
                description: "Project Description", 
                card: this.props.tarotcard.title,
                card_response: this.state.response,
                user_id: 12345678910, 
                session_id: 3 
            };
            if (userCheck) {
                
                if (this.state.response !== "") {
                    this.props.updateCard(this.props.tarotcard);
                    fetch ('/record', {
                        method: 'PUT',
                        body: JSON.stringify(requestData),
                        headers: {
                        'Content-Type': 'application/json',
                        },
                    })
                    .then((res) => this.doButtonClickResponse(res))
                    .catch(() => this.doError("/record: Failed to connect to server"));
                } else {
                    console.log(requestData.user_id);
                    fetch ('/delete', {
                        method: 'Delete',
                        body: JSON.stringify({uid: requestData.user_id}),
                        headers: {
                            'Content-Type': 'application/json',
                            },
                    })
                    console.log('deleting');

                }
            }
        } else { // if button is going from "edit" -> "done"
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
                {this.props.tarotcard.questions.slice(1,).map((s: string, index: number) => {
                    return (
                        <div>
                            <p>{s}</p>
                        </div>
                    )
                })}
                <textarea rows={5} cols={30} readOnly={this.props.finishedCards[this.props.tarotcard.title]} onChange={(e) => this.handleAnswerChange(e.target.value)} placeholder="Enter answer here"/> <br />
                <button className="done-btn" onClick={this.handleButtonClick}>{this.props.finishedCards[this.props.tarotcard.title] ? 'EDIT' : 'DONE'}</button>
            </div>
        );
    };
};