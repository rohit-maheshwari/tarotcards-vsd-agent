import { Component } from "react";
import { spritedialogue } from "./spritedialogue";
import "./Sprite.css";
import spriteavatar from "./aayilaSprite.svg";

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
        // console.log("index num: ", index);
        // console.log("finsihed: ", this.props.finished);
        return {index: index, page: this.props.page, finished: this.props.finished};
    }

    render = () : JSX.Element => {
        return (
            <>
                <div className="talk-bubble border round btm-right-in">
                    <div className="sprite-text">{spritedialogue[this.state.index].dialogue}</div>
                </div>
                <img src={spriteavatar} alt="sprite avatar!" className="sprite-avatar" />
            </>
        )
    };
}

export default Sprite;