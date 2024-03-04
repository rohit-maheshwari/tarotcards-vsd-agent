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
  
    handleDoneSubmit = () => {
      this.setState({finished: true});
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

    handleLLMSubmit = () => {
      this.props.pageChange('Playground');
    }
  

    render = (): JSX.Element => {
      if (!this.state.finished) {
        return (
          <>
            <div className="projectDescription">
              <textarea
                value={this.state.description}
                onChange={this.handleDescriptionChange}
                className="projectDescriptionTextArea"
                rows={4}
                cols={50}
              />
              <button
                onClick={this.handleDoneSubmit}
                className="projectDescriptionButton"
              >
              DONE
              </button>
            </div>
          </>
        )
      } else {
        return (
          <>
            <div className="projectDescription">
              <textarea readOnly={true}
                value={this.state.description}
                className="projectDescriptionTextArea"
                rows={4}
                cols={50}
              />
              <button
                onClick={this.handleEditSubmit}
                className="projectDescriptionButton"
              >
              EDIT
              </button>
            </div>
            <div className="buttons">
              <button className="button" onClick={this.handleUserSubmit}>I can find some myself!</button>
              <button className="button" onClick={this.handleLLMSubmit}>Some help please!</button>
            </div>
          </>
        )
      }
    };
}

export default ProjectDescription;