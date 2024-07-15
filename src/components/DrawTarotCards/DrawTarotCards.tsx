import React, { useState, Component } from 'react';
import { tarotcards } from '../SelectingTarotCards/tarotcards';
import './DrawTarotCards.css';
import TarotCardComponent from '../NewTarotCard/NewTarotCard'
import ProgressBar from '../NewProgressBar/ProgressBar';

type Card = {
  title: string;
  image: string;
  questions: string[];
  color: string
}

type DrawTarotCardProps = {
    
}

type DrawTarotCardsState = {
    currentCard: Card,
    response: string
}

const cards: Card[] = tarotcards;

class DrawTarotCards extends Component<DrawTarotCardProps, DrawTarotCardsState> {

    constructor(props: DrawTarotCardProps) {
        super(props);

        this.state = {
            currentCard: cards[0],
            response: ''
        };
    }

    drawCard = () => {
        
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        this.setState({currentCard: randomCard, response: ''})
    };

    handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({response: e.target.value})
    };

    render() {
        return (
            <div className="draw-tarot-cards">
                <ProgressBar step={2}/>
                <header className='header-brainstorm'>
                    <h1 className='title'>Please draw a card from the stack</h1>
                    <h3 className='description'>Each card will guide you to anticipate impacts from different perspectives. Write down your reflection.</h3>
                </header>
                <div className='draw-card-row'>
                    <div className="card-draw">
                        <button className='review-all-cards-button' onClick={() => console.log(this.state.currentCard.title)}>Review All Cards</button>
                        <br />
                        <button className='draw-new-card-button' onClick={this.drawCard}>Draw a new card</button>
                    </div>
                    {this.state.currentCard && (
                        <TarotCardComponent tarotcard={this.state.currentCard}/>
                        // <div className="card">
                        //     <h2>{this.state.currentCard.title}</h2>
                            
                        //     {this.state.currentCard.questions.map((question, index) => (
                        //         <p key={index}>{question}</p>
                        //     ))}
                        // </div>
                    )}
                    <div className="response">
                        <h3>What is your response to the questions?</h3>
                        <textarea
                        className='response-textarea'
                        value={this.state.response}
                        onChange={this.handleResponseChange}
                        placeholder="Your response is ..."
                        rows={30}
                        cols={30}
                        />
                    </div>
                </div>
            </div>
          );
    }

  
};

export default DrawTarotCards;
