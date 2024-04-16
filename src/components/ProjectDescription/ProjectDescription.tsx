import React, { useState, Component } from "react";
import './ProjectDescription.css';
import Sprite from '../Sprite/Sprite';

type pages = "ProjectDescription" | "SelectingTarotCards";

type Props = {
  pageChange: (page: pages) => void;
  finishedChange: (finished: boolean) => void;
  descriptionChange: (description: string) => void;
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
  
    handleSubmit = () => {
      this.setState({finished: !this.state.finished});
      this.props.descriptionChange(this.state.description);
      this.props.finishedChange(this.state.finished);
    };

    handleUserSubmit = () => {
      this.props.pageChange('SelectingTarotCards');
    }
  

    render = (): JSX.Element => {

      return (
        <>
          <div className="projectDescription">
            <textarea
              readOnly={this.state.finished}
              value={this.state.description}
              onChange={this.handleDescriptionChange}
              className="projectDescriptionTextArea"
              rows={4}
              cols={50}
            />
            <button
              onClick={this.handleSubmit}
              className="projectDescriptionButton"
            >
            {this.state.finished ? "EDIT" : "DONE"}
            </button>
          </div>
          {this.state.finished &&
            <div className="buttons">
              <button className="button" onClick={this.handleUserSubmit}>Show me the Tarot Cards!</button>
            </div>
          }
          <Sprite page = {"ProjectDescription"} finished = {this.state.finished} />
        </>
      );
    };
}

export default ProjectDescription;