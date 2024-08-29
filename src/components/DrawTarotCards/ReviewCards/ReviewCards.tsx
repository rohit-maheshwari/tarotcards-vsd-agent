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
                <h1 className="review-header">Review All Tarot Cards</h1>
                <div className="review-cards-container">
                    {this.props.sortCards().map((card) => (
                        <div key={card.cardName} className="review-card">
                            <div className="card-content">
                                <div className="card-image"><TarotCardComponent tarotcard={card}/></div>
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
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="review-page-buttons">
                    <button className="review-back-button" onClick={() => this.props.toggle()}>Back</button>
                </div>
            </div>
        )
    }
}

export default ReviewCards;