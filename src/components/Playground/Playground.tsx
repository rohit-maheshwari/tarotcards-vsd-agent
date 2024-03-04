import React, { Component } from "react";

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
            </>
        )
    };
}

export default Playground;