import React, { Component } from 'react';
import { tarotcards } from '../oldComponents/SelectingTarotCards/tarotcards';
import './DrawTarotCards.css';
import TarotCardComponent from '../TarotCard/TarotCard'
import ProgressBar from '../ProgressBar/ProgressBar';
import drawCardLogo from "./drawCardLogo.svg";
import ReviewCards from './ReviewCards/ReviewCards';
import ReorderCards from '../ReorderCards/ReorderCards';
import PageButtons from '../PageButtons/PageButtons';
import RoundtableConversation from './RoundtableConversation/RoundtableConversation';

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
    nextPage: boolean,
    cardThoughts: { [cardTitle: string]: string[] },
    newThought: string,
    showRoundtable: boolean
}

const cards: Card[] = tarotcards;

class DrawTarotCards extends Component<DrawTarotCardsProps, DrawTarotCardsState & { isShuffling: boolean, isDrawing: boolean, showCardContent: boolean, showCardsOverview: boolean }> {

    constructor(props: DrawTarotCardsProps) {
        super(props);

        this.state = {
            currentCard: null,
            finishedCards: [],
            response: '',
            showReviewCards: false,
            finishedCardsWithResponse: [],
            unfinishedCards: cards,
            nextPage: false,
            isShuffling: false,
            isDrawing: false,
            showCardContent: false,
            showCardsOverview: false,
            cardThoughts: {},
            newThought: '',
            showRoundtable: false
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
            throw new Error('Failed to fetch cards');
        })
        .then((data) => {
            const usersTarotCards = data.cards || [];
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
            
            // Set currentCard to null initially, will be set by user action
            let unfinishedRandomCard = null;
            
            this.setState({
                finishedCards: data.cards || [], 
                finishedCardsWithResponse: matchingCardsWithResponse, 
                unfinishedCards: unfinishedCards, 
                currentCard: unfinishedRandomCard
            })
        })
        .then(() => {
            
        })
        .catch((error) => {
            console.error(error)
            // If API fails, just set up with all cards as unfinished
            this.setState({
                finishedCards: [], 
                finishedCardsWithResponse: [], 
                unfinishedCards: tarotcards, 
                currentCard: null
            })
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
        this.setState({currentCard: randomCard, response: '', showCardContent: false, newThought: ''})
    };

    handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({response: e.target.value}, () => this.saveResponse())
    };

    addThoughtToCard = (cardTitle: string, thought: string) => {
        if (!thought.trim()) return;
        
        const currentThoughts = this.state.cardThoughts[cardTitle] || [];
        this.setState({
            cardThoughts: {
                ...this.state.cardThoughts,
                [cardTitle]: [...currentThoughts, thought.trim()]
            },
            newThought: ''
        });
    };

    editThoughtInCard = (cardTitle: string, thoughtIndex: number, newThought: string) => {
        const currentThoughts = this.state.cardThoughts[cardTitle] || [];
        const updatedThoughts = [...currentThoughts];
        updatedThoughts[thoughtIndex] = newThought.trim();
        
        this.setState({
            cardThoughts: {
                ...this.state.cardThoughts,
                [cardTitle]: updatedThoughts
            }
        });
    };

    deleteThoughtFromCard = (cardTitle: string, thoughtIndex: number) => {
        const currentThoughts = this.state.cardThoughts[cardTitle] || [];
        const updatedThoughts = currentThoughts.filter((_, index) => index !== thoughtIndex);
        
        this.setState({
            cardThoughts: {
                ...this.state.cardThoughts,
                [cardTitle]: updatedThoughts
            }
        });
    };

    handleNewThoughtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newThought: e.target.value });
    };

    handleNewThoughtSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && this.state.currentCard) {
            this.addThoughtToCard(this.state.currentCard.title, this.state.newThought);
        }
    };

    setCard = (card: any) => {
        console.log('setCard was called')
        console.log(card)
        this.setState({currentCard: card, response: card.response, showReviewCards: false, nextPage: false});
    }

    deleteCard = (card: any, calledFromOtherPage: boolean) => {
        console.log(card)
        
        fetch('/api/project/removeCard', {
            method: "DELETE",
            body: JSON.stringify({
                projectId: this.props.projectId,
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
            this.updateCardsAfterDelete(newFinishedCardsWithResponse, calledFromOtherPage);
        }).catch((err) => {
            console.error(err)
        })
        console.log(this.state)
    }

    updateCardsAfterDelete = (newFinishedCardsWithResponse: any[], calledFromOtherPage: boolean) => {
        const newFinishedCardsWithResponseNames = newFinishedCardsWithResponse.map(card => card.title)
        const unfinishedCards = cards.filter(card => !newFinishedCardsWithResponseNames.includes(card.title));
        console.log(newFinishedCardsWithResponse)
        console.log(unfinishedCards)
        this.setState({finishedCardsWithResponse: newFinishedCardsWithResponse, unfinishedCards: unfinishedCards}, () => {!calledFromOtherPage && this.drawCard()})
    }

    toggle = () => {
        this.setState({showReviewCards: !this.state.showReviewCards})
    }

    handleDrawCardWithShuffle = () => {
        this.setState({ 
            isShuffling: true, 
            isDrawing: true, 
            showCardContent: false 
        });
        
        // First shuffle animation
        setTimeout(() => {
            this.drawCard();
            this.setState({ isShuffling: false });
        }, 600);
        
        // Then card drawing animation
        setTimeout(() => {
            this.setState({ isDrawing: false });
        }, 1200);
        
        // Finally reveal card content
        setTimeout(() => {
            this.setState({ showCardContent: true });
        }, 1800);
    }

    handleDeckClick = () => {
        this.setState({ showCardsOverview: true });
    }

    closeCardsOverview = () => {
        this.setState({ showCardsOverview: false });
    }

    selectCardFromOverview = (card: Card) => {
        this.setState({ 
            currentCard: card, 
            response: '',
            showCardContent: false,
            showCardsOverview: false 
        });
        
        // Trigger the reveal animation after selecting
        setTimeout(() => {
            this.setState({ showCardContent: true });
        }, 300);
    }

    render() {
        return (
        this.state.showReviewCards ? 
            <ReviewCards toggle={this.toggle} setCard={this.setCard} finishedCardsWithResponse={this.state.finishedCardsWithResponse} deleteCard={this.deleteCard} sortCards={this.sortCards}/>
        :
        !this.state.nextPage ?
            <div className="draw-tarot-cards bg-light tasks">
                <ProgressBar step={2}/>
                <header className="container">
                    <h4 className="page-subheader">What are the potential societal impact of your project?</h4>
                    <p className="ethics-board-description">The Tarot Cards of Tech have been used to help tech creators fully consider the impact of technology. They'll not only help you anticipate unintended consequences, but also reveal opportunities for creating positive change. Draw a card and note down your thoughts. </p>
                    <br></br>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            {/* Default card area state */}
                            {!this.state.currentCard && (
                                <div style={{
                                    height: '500px',
                                    width: '300px',
                                    margin: '0 auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '20px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '20px',
                                    border: '3px dashed #667eea',
                                    position: 'relative',
                                    textAlign: 'center',
                                }}>
                                    {/* Decorative elements */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '15px',
                                        fontSize: '20px',
                                        opacity: 0.3,
                                    }}>✨</div>
                                    <div style={{
                                        position: 'absolute',
                                        top: '15px',
                                        left: '15px',
                                        fontSize: '18px',
                                        opacity: 0.3,
                                    }}>🔮</div>
                                    
                                    {/* Card stack illustration */}
                                    <div style={{ marginBottom: '20px', position: 'relative' }}>
                                        <div style={{
                                            width: '120px',
                                            height: '180px',
                                            backgroundColor: '#667eea',
                                            borderRadius: '12px',
                                            position: 'relative',
                                            transform: 'rotate(-5deg)',
                                            opacity: 0.8,
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: '-8px',
                                                left: '8px',
                                                width: '120px',
                                                height: '180px',
                                                backgroundColor: '#764ba2',
                                                borderRadius: '12px',
                                                transform: 'rotate(10deg)',
                                                opacity: 0.6,
                                            }}></div>
                                            <div style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%) rotate(5deg)',
                                                color: '#fff',
                                                fontSize: '14px',
                                                fontWeight: '600',
                                            }}>
                                                ?
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <h3 style={{
                                        fontSize: '1.3em',
                                        fontWeight: '600',
                                        color: '#333',
                                        marginBottom: '12px',
                                    }}>
                                        Draw Your First Card
                                    </h3>
                                    
                                    <p style={{
                                        fontSize: '0.9em',
                                        color: '#666',
                                        lineHeight: '1.4',
                                        marginBottom: '20px',
                                    }}>
                                        Click the button below to reveal an ethical perspective for your project
                                    </p>
                                    
                                    <button 
                                        className="draw-card-btn" 
                                        style={{
                                            padding: '14px 24px',
                                            borderRadius: '12px',
                                            border: 'none',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            fontSize: '1em',
                                            fontWeight: '600',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            letterSpacing: '0.5px',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                            transform: 'translateY(0)',
                                        }}
                                        onClick={this.handleDrawCardWithShuffle}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                                        }}
                                    >
                                        🎴 Draw your first card
                                    </button>
                                    
                                    <div style={{
                                        marginTop: '20px',
                                        fontSize: '0.8em',
                                        color: '#999',
                                    }}>
                                        Or click here to{' '}
                                        <button 
                                            onClick={this.handleDeckClick}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#667eea',
                                                textDecoration: 'underline',
                                                cursor: 'pointer',
                                                fontSize: 'inherit',
                                            }}
                                        >
                                            view all cards
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            {/* Existing card container - only show when card is drawn */}
                            {this.state.currentCard && (
                                <div className="card-draw-container" style={{position: 'relative', height: '500px', width: '300px', margin: '0 auto', perspective: '1000px'}}>
                                    {/* Deck effect: show up to 4 cards behind the main card */}
                                    {this.state.unfinishedCards.slice(1, 5).map((card, idx) => (
                                        <div
                                            key={`${card.title}-${idx}`}
                                            className={`deck-card${this.state.isShuffling ? ' shuffling' : ''}`}
                                            onClick={this.handleDeckClick}
                                            style={{
                                                position: 'absolute',
                                                top: `${30 + idx * 8}px`,
                                                left: `${30 - idx * 8}px`,
                                                width: '240px',
                                                height: '360px',
                                                backgroundColor: '#1a1a2e',
                                                borderRadius: '16px',
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                                zIndex: idx,
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                transform: this.state.isShuffling ? `translateY(${Math.random() * 20 - 10}px) rotate(${Math.random() * 10 - 5}deg)` : 'none',
                                                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    ))}
                                    
                                    {/* Drawing card animation */}
                                    {this.state.isDrawing && (
                                        <div
                                            className="drawing-card"
                                            style={{
                                                position: 'absolute',
                                                top: '62px',
                                                left: '6px',
                                                width: '240px',
                                                height: '360px',
                                                backgroundColor: '#1a1a2e',
                                                borderRadius: '16px',
                                                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                                                zIndex: 15,
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                transform: 'translateY(-40px) translateX(15px) scale(1.05)',
                                                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                            }}
                                        />
                                    )}
                                    
                                    {/* Main card */}
                                    <div
                                        className="main-card"
                                        style={{
                                            position: 'absolute',
                                            top: '20px',
                                            left: '30px',
                                            width: '240px',
                                            height: '360px',
                                            backgroundColor: this.state.currentCard.color,
                                            borderRadius: '16px',
                                            boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                                            zIndex: 20,
                                            overflow: 'hidden',
                                            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                            transform: this.state.showCardContent ? 'rotateY(0deg)' : 'rotateY(-15deg)',
                                            opacity: this.state.showCardContent ? 1 : 0.9,
                                        }}
                                    >
                                        <div className="card-content" style={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            position: 'relative',
                                            transform: this.state.showCardContent ? 'scale(1)' : 'scale(0.95)',
                                            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                        }}>
                                            {/* Card Back Image and Content */}
                                            <div className="card-back-content" style={{
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                opacity: this.state.showCardContent ? 1 : 0,
                                                transform: this.state.showCardContent ? 'translateY(0)' : 'translateY(20px)',
                                                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                                transitionDelay: this.state.showCardContent ? '0.3s' : '0s',
                                            }}>
                                                {/* Back Image */}
                                                <div className="card-image-container" style={{
                                                    height: '100%',
                                                    overflow: 'hidden',
                                                    borderTopLeftRadius: '16px',
                                                    borderTopRightRadius: '16px',
                                                }}>
                                                    <img 
                                                        src={this.state.currentCard.backimage} 
                                                        alt="Tarot Card Back" 
                                                        style={{
                                                            width: '100%', 
                                                            height: '100%', 
                                                            objectFit: 'cover',
                                                            transform: this.state.showCardContent ? 'scale(1)' : 'scale(1.1)',
                                                            transition: 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                                            transitionDelay: '0.4s',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Draw Button - Always visible below the card */}
                                    <div className="button-container" style={{
                                        position: 'absolute',
                                        bottom: '20px',
                                        left: '30px',
                                        width: '240px',
                                        padding: '0',
                                        zIndex: 25,
                                    }}>
                                        <button 
                                            className="draw-card-btn" 
                                            style={{
                                                width: '100%',
                                                padding: '14px',
                                                borderRadius: '12px',
                                                border: 'none',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                fontSize: '1em',
                                                fontWeight: '600',
                                                color: '#fff',
                                                cursor: 'pointer',
                                                letterSpacing: '0.5px',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                                transform: 'translateY(0)',
                                            }}
                                            onClick={this.handleDrawCardWithShuffle}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                                            }}
                                        >
                                            Draw a new card
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-md-8">
                            {/* Response section */}
                            {this.state.currentCard && !this.state.showCardsOverview && (
                                <div className="response-section" style={{
                                    padding: '20px',
                                    opacity: this.state.showCardContent ? 1 : 0,
                                    transform: this.state.showCardContent ? 'translateY(0)' : 'translateY(30px)',
                                    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                    transitionDelay: '1.2s',
                                }}>
                                    {/* Current Card Thoughts Input */}
                                    <div style={{
                                        marginBottom: '32px',
                                        padding: '20px',
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '12px',
                                        border: `3px solid ${this.state.currentCard.color}`,
                                    }}>
                                        <h3 style={{
                                            marginBottom: '12px',
                                            fontSize: '1.3em',
                                            fontWeight: '600',
                                            color: '#333',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                        }}>
                                            <div style={{
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                backgroundColor: this.state.currentCard.color,
                                            }}></div>
                                            Your Thoughts
                                        </h3>
                                        
                                        {/* Current card's thoughts */}
                                        <div style={{ marginBottom: '16px' }}>
                                            {(this.state.cardThoughts[this.state.currentCard.title] || []).map((thought, index) => (
                                                <div key={index} style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    marginBottom: '8px',
                                                    padding: '8px 12px',
                                                    backgroundColor: '#fff',
                                                    borderRadius: '8px',
                                                    border: '1px solid #e1e5e9',
                                                }}>
                                                    <span style={{ fontSize: '12px', marginRight: '8px', color: '#999' }}>•</span>
                                                    <input
                                                        type="text"
                                                        value={thought}
                                                        onChange={(e) => this.editThoughtInCard(this.state.currentCard!.title, index, e.target.value)}
                                                        style={{
                                                            flex: 1,
                                                            border: 'none',
                                                            outline: 'none',
                                                            fontSize: '14px',
                                                            color: '#333',
                                                            backgroundColor: 'transparent',
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() => this.deleteThoughtFromCard(this.state.currentCard!.title, index)}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            color: '#999',
                                                            cursor: 'pointer',
                                                            fontSize: '12px',
                                                            padding: '4px',
                                                        }}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Add new thought */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                        }}>
                                            <input
                                                type="text"
                                                value={this.state.newThought}
                                                onChange={this.handleNewThoughtChange}
                                                onKeyPress={this.handleNewThoughtSubmit}
                                                placeholder="Add a new thought..."
                                                style={{
                                                    flex: 1,
                                                    padding: '10px 12px',
                                                    borderRadius: '8px',
                                                    border: '2px solid #e1e5e9',
                                                    fontSize: '14px',
                                                    outline: 'none',
                                                    transition: 'border-color 0.3s ease',
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = this.state.currentCard?.color || '#667eea';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = '#e1e5e9';
                                                }}
                                            />
                                            <button
                                                onClick={() => this.state.currentCard && this.addThoughtToCard(this.state.currentCard.title, this.state.newThought)}
                                                style={{
                                                    padding: '10px 16px',
                                                    borderRadius: '8px',
                                                    border: 'none',
                                                    backgroundColor: this.state.currentCard.color,
                                                    color: '#fff',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    transition: 'opacity 0.3s ease',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.opacity = '0.8';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.opacity = '1';
                                                }}
                                            >
                                                + Add
                                            </button>
                                        </div>

                                        {/* Hear What Others Might Say - Roundtable Section */}
                                        {this.state.currentCard && Object.keys(this.state.cardThoughts).some(cardTitle => 
                                            this.state.cardThoughts[cardTitle].length > 0
                                        ) && !this.state.showCardsOverview && !this.state.showRoundtable && (
                                            <div style={{
                                                marginTop: '24px',
                                                padding: '16px',
                                                backgroundColor: '#f8f9fa',
                                                borderRadius: '12px',
                                                border: '1px solid #e1e5e9',
                                                opacity: this.state.showCardContent ? 1 : 0,
                                                transform: this.state.showCardContent ? 'translateY(0)' : 'translateY(20px)',
                                                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                                transitionDelay: '1.4s',
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    gap: '16px',
                                                }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '12px',
                                                    }}>
                                                        <div style={{
                                                            display: 'flex',
                                                            gap: '6px',
                                                        }}>
                                                            <div style={{
                                                                width: '20px',
                                                                height: '20px',
                                                                borderRadius: '50%',
                                                                backgroundColor: '#667eea',
                                                                marginLeft: '-2px',
                                                            }}></div>
                                                            <div style={{
                                                                width: '20px',
                                                                height: '20px',
                                                                borderRadius: '50%',
                                                                backgroundColor: '#f39c12',
                                                                marginLeft: '-6px',
                                                            }}></div>
                                                            <div style={{
                                                                width: '20px',
                                                                height: '20px',
                                                                borderRadius: '50%',
                                                                backgroundColor: '#e74c3c',
                                                                marginLeft: '-6px',
                                                            }}></div>
                                                        </div>
                                                        <div>
                                                            <div style={{
                                                                fontSize: '14px',
                                                                fontWeight: '600',
                                                                color: '#333',
                                                                marginBottom: '2px',
                                                            }}>
                                                                Get different perspectives?
                                                            </div>
                                                            <div style={{
                                                                fontSize: '12px',
                                                                color: '#666',
                                                            }}>
                                                                Curious what others might think? This is a simulated conversation, so for real insights, we encourage you to connect directly the stakeholders for in-depth conversations.
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        style={{
                                                            padding: '8px 16px',
                                                            borderRadius: '8px',
                                                            border: '1px solid #667eea',
                                                            background: '#fff',
                                                            color: '#667eea',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s ease',
                                                            whiteSpace: 'nowrap',
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.background = '#667eea';
                                                            e.currentTarget.style.color = '#fff';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.background = '#fff';
                                                            e.currentTarget.style.color = '#667eea';
                                                        }}
                                                        onClick={() => {
                                                            this.setState({ showRoundtable: true });
                                                        }}
                                                    >
                                                        Start conversation
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Roundtable Conversation Component */}
                                        {this.state.showRoundtable && this.state.currentCard && (
                                            <div style={{
                                                marginTop: '24px',
                                                opacity: this.state.showCardContent ? 1 : 0,
                                                transform: this.state.showCardContent ? 'translateY(0)' : 'translateY(20px)',
                                                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                            }}>
                                                <RoundtableConversation
                                                    currentCard={{
                                                        title: this.state.currentCard.title,
                                                        color: this.state.currentCard.color,
                                                        backimage: this.state.currentCard.backimage
                                                    }}
                                                    userThoughts={this.state.cardThoughts[this.state.currentCard.title] || []}
                                                    onAddThought={(thought: string) => this.addThoughtToCard(this.state.currentCard!.title, thought)}
                                                    onClose={() => this.setState({ showRoundtable: false })}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Previous Cards' Thoughts - Compact Card Stack */}
                                    {Object.keys(this.state.cardThoughts).some(cardTitle => 
                                        this.state.cardThoughts[cardTitle].length > 0
                                    ) && (
                                        <div style={{ marginBottom: '24px' }}>
                                            <h3 style={{
                                                marginBottom: '16px',
                                                fontSize: '1.2em',
                                                fontWeight: '600',
                                                color: '#333',
                                            }}>
                                                Reflection History
                                            </h3>
                                            
                                            {Object.keys(this.state.cardThoughts)
                                                .filter(cardTitle => cardTitle !== this.state.currentCard?.title && this.state.cardThoughts[cardTitle].length > 0)
                                                .map((cardTitle) => {
                                                    const card = tarotcards.find(c => c.title === cardTitle);
                                                    const thoughts = this.state.cardThoughts[cardTitle];
                                                    
                                                    return (
                                                        <div key={cardTitle} style={{
                                                            marginBottom: '16px',
                                                            padding: '16px',
                                                            backgroundColor: '#fff',
                                                            borderRadius: '12px',
                                                            border: `2px solid ${card?.color || '#ddd'}`,
                                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                marginBottom: '12px',
                                                            }}>
                                                                <div style={{
                                                                    width: '12px',
                                                                    height: '12px',
                                                                    borderRadius: '50%',
                                                                    backgroundColor: card?.color || '#ddd',
                                                                    marginRight: '8px',
                                                                }}></div>
                                                                <h4 style={{
                                                                    margin: 0,
                                                                    fontSize: '1em',
                                                                    fontWeight: '600',
                                                                    color: '#333',
                                                                }}>
                                                                    {cardTitle}
                                                                </h4>
                                                            </div>
                                                            
                                                            <div>
                                                                {thoughts.map((thought, index) => (
                                                                    <div key={index} style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        marginBottom: '6px',
                                                                        fontSize: '14px',
                                                                        color: '#666',
                                                                    }}>
                                                                        <span style={{ marginRight: '8px' }}>•</span>
                                                                        <span>{thought}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    )}
                                </div>
                            )}

                            

                            {/* Default state when no card is drawn */}
                            {!this.state.currentCard && !this.state.showCardsOverview && (
                                <div className="default-state" style={{
                                    textAlign: 'center',
                                    maxWidth: '800px',
                                    margin: '0 auto',
                                }}>
                                    <div style={{
                                        marginBottom: '32px',
                                        padding: '40px',
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '20px',
                                        border: '2px dashed #d1d5db',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}>
                                        {/* Decorative background elements */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '20px',
                                            right: '20px',
                                            fontSize: '24px',
                                            opacity: 0.1,
                                        }}>✨</div>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '20px',
                                            left: '20px',
                                            fontSize: '20px',
                                            opacity: 0.1,
                                        }}>🔮</div>
                                        
                                        <h2 style={{
                                            fontSize: '2em',
                                            fontWeight: '700',
                                            color: '#333',
                                            marginBottom: '16px',
                                            position: 'relative',
                                        }}>
                                            Ready to Begin Brainstorming societal impacts of your project?
                                        </h2>
                                        
                                        <div style={{
                                        textAlign: 'left',
                                        backgroundColor: '#fff',
                                        padding: '24px',
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                                        border: '1px solid #e1e5e9',
                                    }}>
                                        {/* <h3 style={{
                                            fontSize: '1.2em',
                                            fontWeight: '600',
                                            color: '#333',
                                            marginBottom: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                        }}>
                                            💡 How it works
                                        </h3> */}
                                        
                                        <div style={{ color: '#666', lineHeight: '1.6' }}>
                                            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                                <span style={{ 
                                                    minWidth: '24px', 
                                                    height: '24px', 
                                                    backgroundColor: '#667eea', 
                                                    color: '#fff', 
                                                    borderRadius: '50%', 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center', 
                                                    fontSize: '12px', 
                                                    fontWeight: '600',
                                                    marginTop: '2px',
                                                }}>1</span>
                                                <span><strong>Draw a card</strong> from the deck to reveal an ethical perspective</span>
                                            </div>
                                            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                                <span style={{ 
                                                    minWidth: '24px', 
                                                    height: '24px', 
                                                    backgroundColor: '#667eea', 
                                                    color: '#fff', 
                                                    borderRadius: '50%', 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center', 
                                                    fontSize: '12px', 
                                                    fontWeight: '600',
                                                    marginTop: '2px',
                                                }}>2</span>
                                                <span><strong>Add thoughts</strong> as you reflect on the card's questions</span>
                                            </div>
                                            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                                <span style={{ 
                                                    minWidth: '24px', 
                                                    height: '24px', 
                                                    backgroundColor: '#667eea', 
                                                    color: '#fff', 
                                                    borderRadius: '50%', 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center', 
                                                    fontSize: '12px', 
                                                    fontWeight: '600',
                                                    marginTop: '2px',
                                                }}>3</span>
                                                <span><strong>Continue drawing</strong> to explore different perspectives</span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    </div>
                                    
                                    
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Cards Overview Modal - MOVED OUTSIDE CONTAINER */}
                {this.state.showCardsOverview && (
                    <div 
                        className="cards-overview-modal"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0,0,0,0.85)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(8px)',
                            animation: 'modalFadeIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            overflow: 'hidden',
                        }}
                        onClick={this.closeCardsOverview}
                    >
                        <div 
                            className="modal-content"
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '24px',
                                padding: '24px',
                                width: '85vw',
                                height: '85vh',
                                maxWidth: '1200px',
                                maxHeight: '1000px',
                                overflow: 'auto',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                                transform: 'scale(1)',
                                animation: 'modalScaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '24px',
                                flexShrink: 0
                            }}>
                                <h2 style={{
                                    color: '#fff',
                                    fontSize: '2em',
                                    fontWeight: '700',
                                    margin: '0 0 8px 0',
                                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                                }}>
                                    ✨ All Tarot Cards ✨
                                </h2>
                                <p style={{
                                    color: 'rgba(255,255,255,0.9)',
                                    fontSize: '1em',
                                    margin: 0,
                                }}>
                                    Click any card to select it for your reflection
                                </p>
                            </div>
                            
                            <div className="cards-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: '30px',
                                flex: 1,
                                minHeight: '1100px',
                                overflow: 'hidden',
                                paddingRight: '8px',
                            }}>
                                {tarotcards.map((card, idx) => (
                                    <div
                                        key={card.title}
                                        className="overview-card"
                                        onClick={() => this.selectCardFromOverview(card)}
                                        style={{
                                            backgroundColor: card.color,
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                            transform: 'scale(1)',
                                            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                                            animation: `cardSlideIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${idx * 0.02}s both`,
                                            aspectRatio: '2/3',
                                            minHeight: 0,
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.02) translateY(-4px)';
                                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                                        }}
                                    >
                                        <div style={{ height: '100%', position: 'relative' }}>
                                            <img 
                                                src={card.frontimage} 
                                                alt={card.title}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                                padding: '12px 8px 8px',
                                                color: '#fff',
                                            }}>
                                                <h4 style={{
                                                    margin: 0,
                                                    fontSize: '0.8em',
                                                    fontWeight: '600',
                                                    textAlign: 'center',
                                                    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                                                    lineHeight: '1.2',
                                                }}>
                                                    {card.title}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div style={{ 
                                textAlign: 'center', 
                                marginTop: '20px',
                                flexShrink: 0,
                            }}>
                                <button
                                    onClick={this.closeCardsOverview}
                                    style={{
                                        background: 'rgba(255,255,255,0.2)',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderRadius: '12px',
                                        padding: '10px 28px',
                                        color: '#fff',
                                        fontSize: '1em',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* <button 
                                        className='review-all-cards-button' 
                                        onClick={() => this.toggle()}
                                        style={{
                                            marginTop: '16px',
                                            padding: '12px 24px',
                                            borderRadius: '8px',
                                            border: '2px solid #667eea',
                                            background: 'transparent',
                                            color: '#667eea',
                                            fontSize: '1em',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#667eea';
                                            e.currentTarget.style.color = '#fff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = '#667eea';
                                        }}
                                    >
                                        Review All Cards
                                    </button> */}
                {/* <PageButtons back={this.props.returnToPrevPage} next={() => this.setState({nextPage: true})} /> */}
            </div>
        :
            <ReorderCards setCard={this.setCard} returnToPrevPage={() => this.setState({nextPage: false})} user={this.props.user} returnToHomePage={this.props.returnToHomePage} projectId={this.props.projectId} />
          );
    }

  
};

export default DrawTarotCards;
