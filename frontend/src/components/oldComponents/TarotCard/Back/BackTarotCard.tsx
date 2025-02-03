import React, { Component, useState } from "react";
import "./BackTarotCard.css";
// const env = require('../../../environment.json');
// const backendURL = env.BACKEND.URL + ":" + env.BACKEND.PORT;

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
    tarotcard: TarotCardType,
    finishedCards: {[key: string]: boolean},
    updateCard: (card: TarotCardType, response: string) => void;
    initialResponse: string,
    user: any
}

type TarotCardState = {
    response: string
}

export class BackTarotCardComponent extends Component <TarotCardProps, TarotCardState> {
    constructor(props: TarotCardProps) {
        super(props);

        this.state = { 
            response: this.props.initialResponse || ''
        }
    }

    handleAnswerChange = (answer: string) => {
        this.setState({response: answer});
        
    };

    handleButtonClick = async () => {
        console.log(this.props.title);
        if (!this.props.finishedCards[this.props.tarotcard.title]) { // if button is going from "done" -> "edit"
            let userCheck = window.confirm("are you sure?");
            console.log(this.state.response);
            const requestData = {
                // Your request payload
                time_stamp: 3, 
                title: this.props.title,
                description: this.props.description, 
                card: this.props.tarotcard.title,
                card_response: this.state.response,
                finished: !this.props.finishedCards[this.props.tarotcard.title],
                user_name: this.props.user.name,
                user_email: this.props.user.email,
                user_id: this.props.user.googleId,
                session_id: 3 
            };
            if (userCheck) {
                if (this.state.response !== "") {
                    this.props.updateCard(this.props.tarotcard, this.state.response);
                    fetch (`/api/record`, {
                        method: 'PUT',
                        body: JSON.stringify(requestData),
                        headers: {
                        'Content-Type': 'application/json',
                        },
                    })
                    .then((res) => this.doButtonClickResponse(res))
                    .catch(() => this.doError("/record: Failed to connect to server"));
                } else {
                    fetch (`/api/delete?uid=${requestData.user_id}&card=${requestData.card}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            },
                    })

                }
            }
        } else { // if button is going from "edit" -> "done"
            this.props.updateCard(this.props.tarotcard, this.state.response);
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
                <textarea rows={5} cols={30} readOnly={this.props.finishedCards[this.props.tarotcard.title]} onChange={(e) => this.handleAnswerChange(e.target.value)} placeholder="Enter answer here" value={this.state.response} ></textarea> <br />
                <button className="done-btn" onClick={this.handleButtonClick}>{this.props.finishedCards[this.props.tarotcard.title] ? 'EDIT' : 'DONE'}</button>
            </div>
        );
    };
};