import React, { Component, Profiler } from "react";
import { tarotcards } from "./tarotcards";
import Sprite from '../Sprite/Sprite';
import "./SelectingTarotCards.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import { TarotCardComponent } from "../TarotCard/TarotCard";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Doc from './PDF/PDF';

type pages = "ProjectDescription" | "SelectingTarotCards";

type TarotCardType = {
  title: string,
  image: string,
  questions: string[],
  color: string
}

type SelectingTarotCardsProps = {
  pageChange: (page: pages) => void;
  selectedCards: TarotCardType[],
  handleCardSelect: (card: TarotCardType) => void,
  handlePreselectSubmit: () => void,
  title: string,
  description: string
}

type SelectingTarotCardsState = {
  finishedCards: {[key: string]: boolean},
  initialResponses: {[key: string]: string}
}

class SelectingTarotCards extends Component<SelectingTarotCardsProps, SelectingTarotCardsState> {
  constructor(props: SelectingTarotCardsProps) {
    super(props);

    this.state = { 
      finishedCards: tarotcards.reduce((acc: {[key: string]: boolean}, obj: TarotCardType) => {
          acc[obj.title] = false;
          return acc;
      }, {}),
      initialResponses: {}
    }
  }

  componentDidMount(): void {
    const user_id = 12345678910;
    fetch('/get?uid=' + user_id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => this.handleGetFillCards(res))
    .catch(() => this.getError("/get: Failed to connect to server"));
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
      this.setState({finishedCards: parseFinishedMap, initialResponses: parseResponsesMap})
    })
    .catch((error: string) => {
      console.error("Error parsing JSON: ", error);
    });
  }

  getError = (error: string) => {
    console.log(error);
  }

  handleProjectDescriptionSubmit = (): void => {
    this.props.pageChange("ProjectDescription");
  }

  updateCard = (card: TarotCardType): void => {
    // update state of finished card
    const newMap = this.state.finishedCards;
    newMap[card.title] = !newMap[card.title];
    this.setState({finishedCards: newMap});
  }

  render = (): JSX.Element => {
    console.log(this.state.finishedCards)
    return (
      <>
        <button className="navbarButton" onClick={this.handleProjectDescriptionSubmit}>EDIT PROJECT DESCRIPTION</button>
        <button className="navbarButton" style={{ float: 'right', marginRight: '100px' }}>
          <PDFDownloadLink document={<Doc allCards={tarotcards} title={this.props.title} description={this.props.description} finishedCards={this.state.finishedCards} responses={this.state.initialResponses}/>} fileName="tarotcards.pdf" style={{ textDecoration: 'none', color: 'white'}}>
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'DOWNLOAD PDF'
            }
          </PDFDownloadLink>
        </button>
        <Sprite page={"SelectingTarotCards"} finished = {true} />
        <ProgressBar allCards={tarotcards} finishedCards={this.state.finishedCards}/>
        <div className="TarotCardsContainer">
          {tarotcards.map((card: TarotCardType, key: number) => {
            let showComponent = null;
            this.props.selectedCards.includes(card) ? showComponent = false : showComponent = true;
            return (
              <TarotCardComponent title={this.props.title} description={this.props.description} key={key} tarotcard={card} handleCardSelect={this.props.handleCardSelect} showComponent={showComponent} finishedCards={this.state.finishedCards} updateCard={this.updateCard} initialResponse={this.state.initialResponses[card.title]}/>
            );
          })}
        </div>
      </>
    )
  };
}

export default SelectingTarotCards;
