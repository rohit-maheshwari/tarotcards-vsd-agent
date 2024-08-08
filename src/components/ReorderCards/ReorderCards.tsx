import React, { useState, Component } from 'react';
import { pages } from '../../App';
import { tarotcards } from '../SelectingTarotCards/tarotcards';
import './ReorderCards.css';
import TarotCardComponent from '../NewTarotCard/NewTarotCard'
import ProgressBar from '../NewProgressBar/ProgressBar';
import editbutton from './editbutton.svg'
import deletebutton from './deletebutton.svg'
import ExportCards from '../ExportCards/ExportCards';

type Card = {
    title: string;
    image: string;
    questions: string[];
    color: string
}

type ReorderCardsProps = {
    setCard: (card: any) => void;
    returnToPrevPage: () => void;
    returnToHomePage: () => void;
    user: any;
    projectId: number | null;
}

type ReorderCardsState = {
    cardsWithResponse: any[],
    prevPage: boolean,
    nextPage: boolean,
}

class ReorderCards extends Component<ReorderCardsProps, ReorderCardsState> {
    constructor(props: ReorderCardsProps) {
        super(props);

        this.state = { 
            cardsWithResponse: [],
            prevPage: false,
            nextPage: false
        }
    }

    componentDidMount(): void {
        fetch('/api/project/getCards?projectId='+this.props.projectId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        .then((data) => {
            const cardNames = data.cards.map((card: any) => card.cardName)
            const answeredCards = tarotcards.filter((card) => cardNames.includes(card.title));
            const cardsWithResponse = answeredCards.map((card) => {
                return {...card, 'response': data.cards.find((c: any) => c.cardName == card.title)?.answers}
            })
            console.log(cardsWithResponse.sort((a, b) => a.response.length - b.response.length))
            this.setState({cardsWithResponse: cardsWithResponse.sort((a, b) => b.response.length - a.response.length)})
        })
        .catch((error) => {
            console.log(error)
        })
    }

    moveCardUp = (card: any) => {
        let newCardsWithResponse = this.state.cardsWithResponse;
        const currIndex = newCardsWithResponse.findIndex(c => c.title === card.title);

        if (currIndex == 0) {
            return;
        }

        const temp = newCardsWithResponse[currIndex];
        newCardsWithResponse[currIndex] = newCardsWithResponse[currIndex-1];
        newCardsWithResponse[currIndex-1] = temp
        

        this.setState({cardsWithResponse: newCardsWithResponse});
    }

    moveCardDown = (card: any) => {
        let newCardsWithResponse = this.state.cardsWithResponse;
        const currIndex = newCardsWithResponse.findIndex(c => c.title === card.title);

        if (currIndex == newCardsWithResponse.length - 1) {
            return;
        }

        const temp = newCardsWithResponse[currIndex];
        newCardsWithResponse[currIndex] = newCardsWithResponse[currIndex+1];
        newCardsWithResponse[currIndex+1] = temp
        

        this.setState({cardsWithResponse: newCardsWithResponse});
    }

    render() {
        return (
            !this.state.nextPage ?
            <div className="reorder-body">
                <ProgressBar step={3} />
                <h1 className="title">Review and rank the unintended consequences you identified</h1>
                <h3 className="description">You can review your answers, edit anything you would like to change, and rank the tarot cards in the order you think is most important.</h3>
                <div className="reordering-window">
                {this.state.cardsWithResponse.map((card) => 
                    <div className='reorder-card'>
                        <div className="reorder-buttons">
                            <p className='reorder-button' onClick={() => this.moveCardUp(card)}>&uarr;</p>
                            <p className='reorder-button' onClick={() => this.moveCardDown(card)}>&darr;</p>
                        </div>
                        <div className='reorder-card-content'>
                            <img src={card.frontimage} />
                            <div className="reorder-card-text">
                                <h3 className='reorder-card-title'>{card.title}</h3>
                                <p className='reorder-card-response'>{card.response}</p>
                            </div>
                            <button className='reorder-card-edit-button' onClick={() => this.props.setCard(card)}>Edit</button>
                        </div>
                    </div>
                )}
                </div>
                <div className="reorder-takeaways">
                    <h3>What are your overall takeaways?</h3>
                    <textarea rows={5}/>
                </div>
                <div className="reorder-page-buttons">
                    <button className='reorder-back-button' onClick={() => this.props.returnToPrevPage()}>Back</button>
                    <button className='reorder-next-button' onClick={() => this.setState({nextPage: true})}>Next</button>
                </div>
            </div>
            :
            <ExportCards finalCards={this.state.cardsWithResponse} returnToPrevPage={() => this.setState({nextPage: false})} user={this.props.user} returnToHomePage={this.props.returnToHomePage} projectId={this.props.projectId}/>
        )
    }
}

export default ReorderCards;