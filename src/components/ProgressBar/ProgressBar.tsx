import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProgressBar.css';  // We'll add some custom CSS

type ProgressBarProps = {
    step: number
}

class ProgressBar extends Component<ProgressBarProps, {}> {
    render() {
        return (
            <div className="progress-bar container">
                <ul className="list-unstyled d-flex align-items-center">
                    <li className="col-4 text-center position-relative">
                        <div className={`step-circle d-flex align-items-center justify-content-center mx-auto mb-2
                            ${this.props.step >= 1 ? 'active' : ''}`}>
                            1
                        </div>
                        <div className={`connecting-line ${this.props.step > 1 ? 'active' : ''}`}></div>
                        <span className="step-text">Create Project</span>
                    </li>
                    <li className="col-4 text-center position-relative">
                        <div className={`step-circle d-flex align-items-center justify-content-center mx-auto mb-2
                            ${this.props.step >= 2 ? 'active' : ''}`}>
                            2
                        </div>
                        <div className={`connecting-line ${this.props.step > 2 ? 'active' : ''}`}></div>
                        <span className="step-text">Brainstorm</span>
                    </li>
                    <li className="col-4 text-center position-relative">
                        <div className={`step-circle d-flex align-items-center justify-content-center mx-auto mb-2
                            ${this.props.step >= 3 ? 'active' : ''}`}>
                            3
                        </div>
                        <span className="step-text">Review and Reorder</span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default ProgressBar;