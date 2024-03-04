import React, { Component } from "react";
import "./SelectingTarotCards.css";

type pages = "ProjectDescription" | "SelectingTarotCards" | "Playground"

type Props = {
  pageChange: (page: pages) => void;
}

type SelectingTarotCardsState = {
    
}

class TarotCard extends Component <{title: string, image: string}, {}> {
  constructor(props: {title: string, image: string}) {
      super(props);
  
      this.state = { }
  }

  render = (): JSX.Element => {
      return (
          <div className="card">
              <div className="card-title">{this.props.title}</div>
              <div className="card-question">{this.props.image}</div>
          </div>
      )
  };
};

class SelectingTarotCards extends Component<Props, SelectingTarotCardsState> {
  constructor(props: Props) {
    super(props);

    this.state = { }
  }

  handleProjectDescriptionSubmit = (): void => {
    this.props.pageChange("ProjectDescription");
  }

  render = (): JSX.Element => {
    return (
      <>
        <button className="navbarButton" onClick={this.handleProjectDescriptionSubmit}>EDIT PROJECT DESCRIPTION</button>
        <div className="TarotCardsContainer">
          <TarotCard title="The Scandal" image="What's the worst headline about your product you can imagine?" />
          <TarotCard title="The Smash Hit" image="What happens when 100 million people use your product?" />
          <TarotCard title="The Radio Star" image="Who or what disappears if your product is successful?" />
          <TarotCard title="Mother Nature" image="If the environment was your client, how would your product change?" />
        </div>
      </>
    )
  };
}

export default SelectingTarotCards;