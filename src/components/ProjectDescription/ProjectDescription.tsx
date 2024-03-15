import React, { useState, Component } from "react";
import './ProjectDescription.css';
import Sprite from '../Sprite/Sprite';

type pages = "ProjectDescription" | "SelectingTarotCards" | "Playground"

type Props = {
  pageChange: (page: pages) => void;
  finishedChange: (finished: boolean) => void;
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
      this.props.finishedChange(true);
      console.log('Description submitted:', this.state.description);
      // You might want to do something with the description, like sending it to a server
    };

    handleEditSubmit = () => {
      this.setState({finished: false});
      this.props.finishedChange(false);
      console.log('Description being edited');
      // You might want to do something with the description, like sending it to a server
    };

    handleUserSubmit = () => {
      this.props.pageChange('SelectingTarotCards');
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
            <Sprite page = {"ProjectDescription"} finished = {false} />;
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
              <button className="button" onClick={this.handleUserSubmit}>Show me the Tarot Cards!</button>
            </div>
            <Sprite page = {"ProjectDescription"} finished = {true} />;
          </>
        )
      }
    };
}

export default ProjectDescription;