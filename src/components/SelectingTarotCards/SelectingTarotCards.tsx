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
  handlePreselectSubmit: () => void
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
          acc[obj.title] = false; // UPDATE THIS (Fix the whether card is finished or not depending on server data @Julie12Yu @rohit-maheshwari @rrrrrrockpang)
          return acc;
      }, {}),
      initialResponses: {}
    }
  }

  componentDidMount(): void {
      const requestData = {
        user_id: 12345678910
      }
      fetch ('/get', {
        method: 'GET',
        body: JSON.stringify(requestData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => this.handleGetFillCards(res))
      .catch(() => this.getError("/record: Failed to connect to server"));
  }

  handleGetFillCards = (res: Response): void => {

  }

  getError = (error: string) => {
    
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
    return (
      <>
        <button className="navbarButton" onClick={this.handleProjectDescriptionSubmit}>EDIT PROJECT DESCRIPTION</button>
        <button className="navbarButton" style={{ float: 'right', marginRight: '100px' }}>
          <PDFDownloadLink document={<Doc allCards={tarotcards} finishedCards={this.state.finishedCards}/>} fileName="tarotcards.pdf" style={{ textDecoration: 'none', color: 'white'}}>
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
              <TarotCardComponent key={key} tarotcard={card} handleCardSelect={this.props.handleCardSelect} showComponent={showComponent} finishedCards={this.state.finishedCards} updateCard={this.updateCard} initialResponse={this.state.initialResponses[card.title]}/>
            );
          })}
        </div>
      </>
    )
  };
}

export default SelectingTarotCards;
