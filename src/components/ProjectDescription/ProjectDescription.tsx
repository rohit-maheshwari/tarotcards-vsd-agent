import React, { useState, Component } from "react";
import './ProjectDescription.css';

type pages = "ProjectDescription" | "SelectingTarotCards" | "Playground"

type Props = {
  pageChange: (page: pages) => void;
}

type ProjectDescriptionState = {
    description: string;
    finished: boolean;
}

class ProjectDescription extends Component<Props, ProjectDescriptionState> {
    constructor(props: Props) {
      super(props);
  
      this.state = {
        description: 'RASSAR is a prototype that identifies, categorizes, and localizes indoor accessibility and safety issues using LiDAR camera data, machine learning, and AR.',
        finished: false
      };
    }
  
    handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      this.setState({ description: event.target.value });
    };
  
    handleButtonSubmit = () => {
      this.setState({finished: !this.state.finished});
      console.log('Description submitted:', this.state.description);
      // You might want to do something with the description, like sending it to a server
    };

    handleEditSubmit = () => {
      this.setState({finished: false});
      console.log('Description being edited');
      // You might want to do something with the description, like sending it to a server
    };

    handleUserSubmit = () => {
      this.props.pageChange('SelectingTarotCards');
    }
  

    render = (): JSX.Element => {
      return (
        <>
          <div className="projectDescription">
            <textarea
              value={this.state.description}
              onChange={this.handleDescriptionChange}
              className="projectDescriptionTextArea"
              rows={4}
              cols={50}
              readOnly={this.state.finished}
            />
            <button
              onClick={this.handleButtonSubmit}
              className="projectDescriptionButton"
            >
            {!this.state.finished ? "DONE" : "EDIT"}
            </button>
          </div>
          {this.state.finished ?
            <div className="buttons">
              <button className="button" onClick={this.handleUserSubmit}>Show me the Tarot Cards!</button>
            </div>
           :
            <div></div>
          }
        </>
      )
    };
}

export default ProjectDescription;