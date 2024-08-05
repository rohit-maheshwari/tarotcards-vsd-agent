import React, { useState, Component } from 'react';
import { pages } from '../../../App';
import { tarotcards } from '../../SelectingTarotCards/tarotcards';
import './ReviewCards.css';
import TarotCardComponent from '../../NewTarotCard/NewTarotCard'
import ProgressBar from '../../NewProgressBar/ProgressBar';
import editbutton from './editbutton.svg'
import deletebutton from './deletebutton.svg'

type Card = {
    title: string;
    frontimage: string;
    backimage: string;
    questions: string[];
    color: string
}

type ReviewCardsProps = {
    toggle: () => void,
    setCard: (card: Card) => void;
    finishedCardsWithResponse: any[];
    deleteCard: (card: any, deleted: boolean) => void;
    sortCards: () => any[],
}

type ReviewCardsState = {

}

class ReviewCards extends Component<ReviewCardsProps, ReviewCardsState> {
    constructor(props: ReviewCardsProps) {
        super(props);

        this.state = {  }
    }

    render() {
        console.log(this.props.finishedCardsWithResponse)
        return (
            <div className="review-body">
                <h1 className="review-header">All the Tarot Cards of Tech</h1>
                <div className="review-cards-container">
                    {this.props.sortCards().map((card) => (
                        <div key={card.cardName} className="review-card">
                            <div className="card-content">
                                <img className="card-image" src={card.frontimage} alt="Card" />
                                <div className="card-response">
                                    <div className='card-functions'>
                                        <label>Your response</label>
                                        <img className='card-buttons' src={editbutton} onClick={() => this.props.setCard(card)}/>
                                        {(card.response == '' || card.response != null) && <img className='card-buttons' src={deletebutton} onClick={() => this.props.deleteCard(card, false)}/>}
                                    </div>
                                    <textarea
                                        className='review-card-textarea'
                                        value={card.response ? card.response : ''}
                                        readOnly={true}
                                        rows={28}
                                        cols={40}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="review-back-button" onClick={() => this.props.toggle()}>Back</button>
            </div>
        )
    }
}

export default ReviewCards;