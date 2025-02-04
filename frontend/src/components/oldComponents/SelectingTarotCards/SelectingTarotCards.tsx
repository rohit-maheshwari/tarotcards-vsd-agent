import React, { Component, Profiler } from "react";
import { tarotcards } from "./tarotcards";
import Sprite from '../Sprite/Sprite';
import "./SelectingTarotCards.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import { TarotCardComponent } from "../TarotCard/TarotCard";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Doc from './PDF/PDF';

// const env = require('../../environment.json')
// const backendURL = env.BACKEND.URL + ":" + env.BACKEND.PORT

type pages = "ProjectDescription" | "SelectingTarotCards";

type TarotCardType = {
  title: string,
  frontimage: string,
  backimage: string,
  questions: string[],
  color: string
}

type SelectingTarotCardsProps = {
  pageChange: (page: pages) => void;
  selectedCards: TarotCardType[],
  handleCardSelect: (card: TarotCardType) => void,
  handlePreselectSubmit: () => void,
  title: string,
  description: string,
  user: any
}

type SelectingTarotCardsState = {
  finishedCards: {[key: string]: boolean},
  responses: {[key: string]: string}
}

class SelectingTarotCards extends Component<SelectingTarotCardsProps, SelectingTarotCardsState> {
  constructor(props: SelectingTarotCardsProps) {
    super(props);

    this.state = { 
      finishedCards: tarotcards.reduce((acc: {[key: string]: boolean}, obj: TarotCardType) => {
          acc[obj.title] = false;
          return acc;
      }, {}),
      responses: {}
    }
  }

  componentDidMount(): void {
    if (this.props.user == null) {
      this.setState({finishedCards: {}, responses: {}});
    } else {
      const googleId = this.props.user.googleId;
      fetch(`${process.env.REACT_APP_API_URL}/api/cards?uid=${googleId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => this.handleGetFillCards(res))
      .catch(() => console.log("/get: Failed to connect to server"));
    }
  }
  

  handleGetFillCards = (res: any): void => {
    res.json()
    .then((data: any) => {
      let parseResponsesMap: {[key: string]: string} = {}
      let parseFinishedMap: {[key: string]: boolean} = {}
      for (let cardObj of data.cardData) {
        parseResponsesMap[cardObj.card] = cardObj.card_response
        parseFinishedMap[cardObj.card] = cardObj.finished
      } 
      this.setState({finishedCards: parseFinishedMap, responses: parseResponsesMap})
    })
    .catch((error: string) => {
      console.error("Error parsing JSON: ", error);
    });
  }

  handleProjectDescriptionSubmit = (): void => {
    this.props.pageChange("ProjectDescription");
  }

  updateCard = (card: TarotCardType, response: string): void => {
    // update state of finished card
    const newFinishedCards = this.state.finishedCards;
    newFinishedCards[card.title] = !newFinishedCards[card.title];
    const newResponses = this.state.responses;
    newResponses[card.title] = response;
    this.setState({finishedCards: newFinishedCards, responses: newResponses});
  }

  render = (): JSX.Element => {
    return (
      <>
        <button className="navbarButton" onClick={this.handleProjectDescriptionSubmit}>EDIT PROJECT DESCRIPTION</button>
        <button className="navbarButton" style={{ float: 'right', marginRight: '100px' }}>
          <PDFDownloadLink document={<Doc allCards={tarotcards} title={this.props.title} description={this.props.description} finishedCards={this.state.finishedCards} responses={this.state.responses}/>} fileName="tarotcards.pdf" style={{ textDecoration: 'none', color: 'white'}}>
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'DOWNLOAD PDF'
            }
          </PDFDownloadLink>
        </button>
        <ProgressBar allCards={tarotcards} finishedCards={this.state.finishedCards}/>
        <div className="TarotCardsContainer">
          {tarotcards.map((card: TarotCardType, key: number) => {
            let showComponent = null;
            this.props.selectedCards.includes(card) ? showComponent = false : showComponent = true;
            return (
              <TarotCardComponent title={this.props.title} description={this.props.description} key={key} tarotcard={card} handleCardSelect={this.props.handleCardSelect} showComponent={showComponent} finishedCards={this.state.finishedCards} updateCard={this.updateCard} initialResponse={this.state.responses[card.title]} user={this.props.user}/>
            );
          })}
        </div>
        <Sprite page={"SelectingTarotCards"} finished = {true} />
      </>
    )
  };
}

export default SelectingTarotCards;
