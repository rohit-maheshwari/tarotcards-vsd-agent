import { Component } from 'react';
import './PageButtons.css';


type PageButtonsProps = {
    next: (() => void) | null;
    back: (() => void) | null;
}

type PageButtonsState = {

}

class PageButtons extends Component<PageButtonsProps, PageButtonsState> {
    constructor(props: PageButtonsProps) {
        super(props);

        this.state = {  }
    }

    render() {
        return (
            <div className="page-buttons">
                {this.props.back !== null && <button className="page-buttons-back-button" onClick={this.props.back}>Back</button>}
                {this.props.next !== null && <button className="page-buttons-next-button" onClick={this.props.next}>Next</button>}
            </div>
        )
    }
}

export default PageButtons;