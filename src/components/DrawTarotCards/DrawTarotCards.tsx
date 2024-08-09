import React, { useState, Component } from 'react';
import { pages } from '../../App';
import { tarotcards } from '../SelectingTarotCards/tarotcards';
import './DrawTarotCards.css';
import TarotCardComponent from '../NewTarotCard/NewTarotCard'
import ProgressBar from '../NewProgressBar/ProgressBar';
import drawCardLogo from "./drawCardLogo.svg";
import ReviewCards from './ReviewCards/ReviewCards';
import ReorderCards from '../ReorderCards/ReorderCards';

const lodash = require('lodash');

type Card = {
  title: string;
  frontimage: string;
  backimage: string;
  questions: string[];
  color: string
}

type DrawTarotCardsProps = {
    returnToPrevPage: () => void;
    returnToHomePage: () => void;
    user: any;
    projectId: number | null;
}

type DrawTarotCardsState = {
    currentCard: Card | null,
    finishedCards: any[],
    response: string,
    showReviewCards: boolean,
    finishedCardsWithResponse: any[],
    unfinishedCards: Card[],
    nextPage: boolean
}

const cards: Card[] = tarotcards;

class DrawTarotCards extends Component<DrawTarotCardsProps, DrawTarotCardsState> {

    constructor(props: DrawTarotCardsProps) {
        super(props);

        this.state = {
            currentCard: null,
            finishedCards: [],
            response: '',
            showReviewCards: false,
            finishedCardsWithResponse: [],
            unfinishedCards: cards,
            nextPage: false
        };

        this.saveResponse = lodash.debounce(this.saveResponse.bind(this), 500)
    }

    setFinishedCardsFromDB = async () => {
        fetch('/api/project/getCards?projectId='+this.props.projectId, {
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

            const unfinishedCards = tarotcards.filter(card => !matchingCardsWithResponse.map(card => card.title).includes(card.title))
            console.log(unfinishedCards)
            const unfinishedRandomCard = unfinishedCards[Math.floor(Math.random() * unfinishedCards.length)];
            
            this.setState({finishedCards: data.cards, finishedCardsWithResponse: matchingCardsWithResponse, unfinishedCards: unfinishedCards, currentCard: unfinishedRandomCard})
        })
        .then(() => {
            
        })
        .catch((error) => {
            console.error(error)
        })
    }

    sortCards = () => {
        let matchingCards: any[] = [];
        let nonMatchingCards: any[] = [];

        tarotcards.forEach(card => {
            const finishedCard = this.state.finishedCardsWithResponse.find(finished => finished.title === card.title);
            if (finishedCard) {
                matchingCards.push({ ...card, response: finishedCard.response });
            } else {
                nonMatchingCards.push(card);
            }
        });

        console.log([...matchingCards, ...nonMatchingCards])

        return [...matchingCards, ...nonMatchingCards];

    }

    componentDidMount() {
        this.setFinishedCardsFromDB();
    }

    // handleCardUpdate = () => {
    //     fetch('/api/project/getCard?projectId='+'1&cardName='+this.state.currentCard?.title, {
    //         method: "GET",
    //     }).then((response) => {
    //         if (response.ok) {
    //             return response.json()
    //         }
    //     }).then((data) => {
    //         if (data.card != null) {
    //             this.setState({response: data.card.answers})
    //         } else {
    //             this.setState({response: ''});
    //         }
    //     }).catch((error) => {
    //         console.log(error.message)
    //     })
    // }

    saveResponse = async () => {
        fetch('/api/project/addOrUpdateCard', {
            method: "PUT",
            body: JSON.stringify({
                projectId: this.props.projectId,
                cardName: this.state.currentCard?.title,
                answers: this.state.response
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            console.log(data.message);
            if (this.state.finishedCardsWithResponse.map(card => card.title).includes(this.state.currentCard?.title)) {
                let newFinishedCardsWithResponse = this.state.finishedCardsWithResponse.map(card => 
                    (card.title == this.state.currentCard?.title && this.state.response != '')
                    ? {...card, response: this.state.response}
                    : card
                )
                // newFinishedCardsWithResponse.push({...this.state.currentCard, response: this.state.response});
                if (this.state.response == '') {
                    this.deleteCard(this.state.currentCard, true);
                }
                this.setState({finishedCardsWithResponse: newFinishedCardsWithResponse});
            } else {
                const newFinishedCardsWithResponse = [...this.state.finishedCardsWithResponse, {...this.state.currentCard, response: this.state.response}]
                const newUnfinishedCards = this.state.unfinishedCards.filter(card => card.title !== this.state.currentCard?.title);
                this.setState({finishedCardsWithResponse: newFinishedCardsWithResponse, unfinishedCards: newUnfinishedCards});
            }
            
            // this.setState({finishedCards: [...this.state.finishedCards, ], finishedCardsWithResponse: newFinishedCardsWithResponse, unfinishedCards: newUnfinishedCards})
        }).catch((error) => {
            console.log(error.message)
        })
    }


    drawCard = () => {
        const randomCard = this.state.unfinishedCards[Math.floor(Math.random() * this.state.unfinishedCards.length)];
        this.setState({currentCard: randomCard, response: ''})
    };

    handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({response: e.target.value}, () => this.saveResponse())
    };

    setCard = (card: any) => {
        console.log('setCard was called')
        console.log(card)
        this.setState({currentCard: card, response: card.response, showReviewCards: false, nextPage: false});
    }

    deleteCard = (card: any, calledFromSaveResponse: boolean) => {
        console.log(card)
        
        fetch('/api/project/removeCard', {
            method: "DELETE",
            body: JSON.stringify({
                projectId: 1,
                cardName: card.title
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            console.log(data);
            const newFinishedCardsWithResponse = this.state.finishedCardsWithResponse.filter((c) => c.title != card.title)
            this.updateCardsAfterDelete(newFinishedCardsWithResponse, calledFromSaveResponse);
            // this.setState({cards: updatedCards})
            // const newCard = updatedCards[Math.floor(Math.random() * updatedCards.length)];
            // this.props.setCard(newCard, true);
        }).catch((err) => {
            console.error(err)
        })
        console.log(this.state)
    }

    updateCardsAfterDelete = (newFinishedCardsWithResponse: any[], calledFromSaveResponse: boolean) => {
        const newFinishedCardsWithResponseNames = newFinishedCardsWithResponse.map(card => card.title)
        const unfinishedCards = cards.filter(card => !newFinishedCardsWithResponseNames.includes(card.title));
        console.log(newFinishedCardsWithResponse)
        console.log(unfinishedCards)
        this.setState({finishedCardsWithResponse: newFinishedCardsWithResponse, unfinishedCards: unfinishedCards}, () => {!calledFromSaveResponse && this.drawCard()})
    }

    toggle = () => {
        this.setState({showReviewCards: !this.state.showReviewCards})
    }

    render() {
        return (
        this.state.showReviewCards ? 
            <ReviewCards toggle={this.toggle} setCard={this.setCard} finishedCardsWithResponse={this.state.finishedCardsWithResponse} deleteCard={this.deleteCard} sortCards={this.sortCards}/>
        :
        !this.state.nextPage ?
            <div className="draw-tarot-cards">
                <ProgressBar step={2}/>
                <header className='header-brainstorm'>
                    <h1 className='title'>Please draw a card from the stack</h1>
                    <h3 className='description'>Each card will guide you to anticipate impacts from different perspectives. Write down your reflection.</h3>
                </header>
                <div className='draw-card-row'>
                    <div className="card-draw">
                        <button className='review-all-cards-button' onClick={() => this.toggle()}>Review All Cards</button>
                        <img className="draw-card-logo" src={drawCardLogo} />
                        <button className='draw-new-card-button' onClick={this.drawCard}>Draw a new card</button>
                    </div>
                    {this.state.currentCard && (
                        <TarotCardComponent tarotcard={this.state.currentCard}/>
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
                <div className="draw-page-buttons">
                    <button className='draw-back-button' onClick={() => this.props.returnToPrevPage()}>Back</button>
                    <button className='draw-next-button' onClick={() => this.setState({nextPage: true})}>Next</button>
                </div>
            </div>
        :
            <ReorderCards setCard={this.setCard} returnToPrevPage={() => this.setState({nextPage: false})} user={this.props.user} returnToHomePage={this.props.returnToHomePage} projectId={this.props.projectId} />
          );
    }

  
};

export default DrawTarotCards;
