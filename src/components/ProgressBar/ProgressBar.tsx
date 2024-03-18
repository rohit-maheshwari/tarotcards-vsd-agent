import { Component } from "react";
import "./ProgressBar.css";

type TarotCardType = {
  title: string,
  image: string,
  questions: string[]
}

type ProgressBarProps = {
  selectedCards: TarotCardType[]
}

type ProgressBarState = {
  
}

class ProgressBar extends Component<ProgressBarProps, ProgressBarState> {
  constructor(props: ProgressBarProps) {
    super(props);

    this.state = { selectedCards: this.props.selectedCards}
  }

  handleDrawCircle = () : JSX.Element => {
    const circles = [];
    for (let i: number = 0; i < this.props.selectedCards.length; i++) {
      circles.push(<div key={i} className="completed-circle"></div>);
    }

    for (let i: number = this.props.selectedCards.length; i < 12; i++) {
      circles.push(<div key={i} className="in-progress-circle"></div>);
    }

    return (
      <div>{circles}</div>
    );
  }

  render = (): JSX.Element => {
    {console.log(this.props.selectedCards);}
    return (
        <div className="circle-container">
          {this.handleDrawCircle()}
      </div>
    )
  };
}

export default ProgressBar;
