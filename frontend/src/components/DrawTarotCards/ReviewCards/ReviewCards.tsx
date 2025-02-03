import { Component } from 'react';
import './ReviewCards.css';
import TarotCardComponent from '../../TarotCard/TarotCard'
import editbutton from './editbutton.svg'
import deletebutton from './deletebutton.svg'
import PageButtons from '../../PageButtons/PageButtons';

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
                <h1 className="review-header">Tarot Cards of Tech Deck</h1>
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
                <PageButtons back={this.props.toggle} next={null} />
            </div>
        )
    }
}

export default ReviewCards;