import React, { useState, Component } from 'react';
import { pages } from '../../../App';
import { tarotcards } from '../../SelectingTarotCards/tarotcards';
import './ReviewCards.css';
import TarotCardComponent from '../../NewTarotCard/NewTarotCard'
import ProgressBar from '../../NewProgressBar/ProgressBar';
import editbutton from './editbutton.svg'
import deletebutton from './deletebutton.svg'

type ReviewCardsProps = {
    pageChange: (page: pages) => void,
}

type ReviewCardsState = {
    cards: any[]
}

class ReviewCards extends Component<ReviewCardsProps, ReviewCardsState> {
    constructor(props: ReviewCardsProps) {
        super(props);

        this.state = { cards: [] }
    }

    componentDidMount(): void {
        fetch('/api/project/getCards?projectId='+'1', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            const usersTarotCards = data.cards;
            const userTarotCardsNames = usersTarotCards.map((card: any) => card.cardName)
            const matchingCardsWithResponse = tarotcards
            .filter(card => userTarotCardsNames.includes(card.title))
            .map(card => {
                const matchingSelectedCard = usersTarotCards.find((selectedCard: any) => selectedCard.cardName === card.title);
                return {
                ...card,
                response: matchingSelectedCard ? matchingSelectedCard.answers : null
                };
            });
            console.log(matchingCardsWithResponse)
            this.setState({cards: matchingCardsWithResponse })
        })
        .catch((error) => {
            console.error(error)
        })
    }

    render() {
        console.log(this.state.cards)
        return (
            <div className="review-body">
                <h1 className="review-header">All the Tarot Cards of Tech</h1>
                <div className="review-cards-container">
                    {this.state.cards.map((card) => (
                        <div key={card.cardName} className="review-card">
                            <div className="card-content">
                                <img className="card-image" src={card.image} alt="Card" />
                                <div className="card-response">
                                    <div className='card-functions'>
                                        <label>Your response</label>
                                        <img className='card-buttons' src={editbutton} />
                                        <img className='card-buttons'  src={deletebutton} />
                                    </div>
                                    <textarea
                                        className='review-card-textarea'
                                        value={card.response}
                                        readOnly={true}
                                        rows={30}
                                        cols={40}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="review-back-button" onClick={() => this.props.pageChange("DrawTarotCards")}>Back</button>
            </div>
        )
    }
}

export default ReviewCards;