import React, { Component } from "react";
import { spritedialogue } from "./spritedialogue";
// keep a list of the icon ids we put in the symbol

const sprite = ["Layer_1"];

const text = ["Text while entering project description!", "Text while prompting for if user needs help", "Text prompting selection", "Text prompting editing"];

type pages =  "ProjectDescription" | "SelectingTarotCards" | "Playground";

type SpriteState = {
    index : number; // index correlating to the text the sprite will produce 
    page: pages;
    finished: boolean;
}

type SpriteProps = {
    page: pages;
    finished: boolean;
}

type SpriteDialogue = {
    index: number;
    dialogue: string;
}

class Sprite extends Component<SpriteProps, SpriteState> {
    constructor(props: SpriteProps) {
        super(props);
        this.state = this.calculateState(props);
    }

    componentDidUpdate(prevProps: SpriteProps) {
        if (prevProps.page !== this.props.page || prevProps.finished !== this.props.finished) {
            this.setState(this.calculateState(this.props));
        }
    }


    calculateState = (props: SpriteProps) : SpriteState => {
        let index = null;
        if (this.props.page === "ProjectDescription") {
            if (this.props.finished) {
                index = 1;
            } else {
                index = 0;
            }
        } else if (this.props.page === "SelectingTarotCards") {
            index = 2;
        } else {
            index = 3;
        }
        console.log("index num: ", index);
        console.log("finsihed: ", this.props.finished);
        return {index: index, page: this.props.page, finished: this.props.finished};
    }

    render = () : JSX.Element => {
        return (
            <>
            <svg width="500" height="500" viewBox="0 0 500 504">
              <use href={`/sprite.svg#${"Layer_1"}`} />
            </svg>
            
            <div className="TarotCardsContainer">
                <div className="card-text">
                    <p>{spritedialogue[this.state.index].dialogue}</p>
                </div>
            </div>
          </>
          )
    };
}

export default Sprite;