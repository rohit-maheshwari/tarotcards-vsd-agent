import React, { Component } from "react";
import Sprite from '../Sprite/Sprite';
type pages = "ProjectDescription" | "SelectingTarotCards" | "Playground"

type Props = {
  pageChange: (page: pages) => void;
}

type PlaygroundState = {
    
}

class Playground extends Component<Props, PlaygroundState> {
    constructor(props: Props) {
        super(props);
    
        this.state = { }
    }
    
    render = (): JSX.Element => {
        return (
            <>
                Playground Page Coming soon
                <Sprite page = {"Playground"} finished = {true} /> 
            </>
        )
    };
}

export default Playground;