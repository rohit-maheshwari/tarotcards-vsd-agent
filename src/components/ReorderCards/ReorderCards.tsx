import React, { useState, createRef, Component } from 'react';
import { pages } from '../../App';
import { tarotcards } from '../SelectingTarotCards/tarotcards';
import './ReorderCards.css';
import TarotCardComponent from '../NewTarotCard/NewTarotCard'
import ProgressBar from '../NewProgressBar/ProgressBar';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import editbutton from './editbutton.svg'
import deletebutton from './deletebutton.svg'
import ExportCards from '../ExportCards/ExportCards';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

const lodash = require('lodash')

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
    takeaways: string,
    dragCard: number,
    dragOverCard: number,
}

class ReorderCards extends Component<ReorderCardsProps, ReorderCardsState> {
    ref: React.RefObject<HTMLDivElement>; 

    constructor(props: ReorderCardsProps) {
        super(props);

        this.state = { 
            cardsWithResponse: [],
            prevPage: false,
            nextPage: false,
            takeaways: '',
            dragCard: 0,
            dragOverCard: 0,
        }

        this.ref = React.createRef();

        this.saveProject = lodash.debounce(this.saveProject.bind(this), 500);
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

        fetch('/api/project/get?projectId='+this.props.projectId, {
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
            console.log(data)
            this.setState({takeaways: data.takeaways})
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
    
    handleTakeawaysChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ takeaways: event.target.value }, () => this.saveProject());
    };

    saveProject = () => {
        fetch('/api/project/update', {
          method: "PUT",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectId: this.props.projectId,
            projectTakeaways: this.state.takeaways,
          })
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error)
        })
      }

    handleSort = () => {
        const cardsWithResponseClone = [...this.state.cardsWithResponse]
        const temp = cardsWithResponseClone[this.state.dragCard]
        cardsWithResponseClone[this.state.dragCard] = cardsWithResponseClone[this.state.dragOverCard]
        cardsWithResponseClone[this.state.dragOverCard] = temp
        this.setState({cardsWithResponse: cardsWithResponseClone})
    }

    onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    
        const container = this.ref.current;
        if (!container) return;
    
        const rect = container.getBoundingClientRect();
        const scrollThreshold = 100; // pixels from the edge to start scrolling
        const scrollSpeed = 0.75; // how fast to scroll
    
        // Scroll down if the mouse is near the bottom of the container
        if (e.clientY > rect.bottom - scrollThreshold) {
            container.scrollTop += scrollSpeed;
        }
    
        // Scroll up if the mouse is near the top of the container
        if (e.clientY < rect.top + scrollThreshold) {
            container.scrollTop -= scrollSpeed;
        }
    };

    render() {
        console.log(this.state.cardsWithResponse)
        return (
            !this.state.nextPage ?
            <div className="reorder-body">
                <ProgressBar step={3} />
                <h1 className="title">Review and rank the unintended consequences you identified.</h1>
                <h3 className="description">You can review, edit, and rank the tarot cards in the order you think is most important.</h3>
                <div ref={this.ref} className="reordering-window">
                    {this.state.cardsWithResponse.map((card, index) => 
                        <div className='reorder-card' 
                            draggable
                            onDragStart={() => (this.setState({dragCard: index}))}
                            onDragEnter={() => (this.setState({dragOverCard: index}))}
                            onDragEnd={this.handleSort}
                            onDragOver={this.onDragOver}
                        >
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
                    <textarea
                        value={this.state.takeaways}
                        onChange={this.handleTakeawaysChange}
                        rows={5}
                    />
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