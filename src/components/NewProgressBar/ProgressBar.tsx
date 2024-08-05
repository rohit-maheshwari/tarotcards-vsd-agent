import React, { Component } from "react";
import './ProgressBar.css'

type ProgressBarProps = {
    step: number
}

class ProgressBar extends Component<ProgressBarProps, {}> {
    render() {
        return (
            <ul className="progress-bar">
                <li className={this.props.step === 1 ? "active" : this.props.step > 1 ? "completed" : "incomplete"} data-step="1">Create Project</li>
                <li className={this.props.step === 2 ? "active" : this.props.step > 2 ? "completed" : "incomplete"} data-step="2">Brainstorm</li>
                <li className={this.props.step === 3 ? "active" : this.props.step > 3 ? "completed" : "incomplete"} data-step="3">Review and Reorder</li>
            </ul>
        );
    }
}

export default ProgressBar;