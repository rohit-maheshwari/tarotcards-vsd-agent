import React, { useState, Component } from "react";
import './ProjectDescription.css';

type pages = "ProjectDescription" | "SelectingTarotCards";

type Props = {
  pageChange: (page: pages) => void,
  finishedChange: (finished: boolean) => void,
  titleChange: (title: string) => void,
  descriptionChange: (description: string) => void
}

type ProjectDescriptionState = {
  title: string,
  description: string,
  finished: boolean,
}

class ProjectDescription extends Component<Props, ProjectDescriptionState> {
    constructor(props: Props) {
      super(props);
  
      this.state = {
        title: 'Amazing Project 1.0',
        description: 'Amazing Project Description',
        finished: false
      };
    }

    handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      this.setState({ title: event.target.value });
    };

    handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      this.setState({ description: event.target.value });
    };
  
    handleSubmit = () => {
      this.setState({finished: !this.state.finished});
      this.props.titleChange(this.state.title);
      this.props.descriptionChange(this.state.description);
      this.props.finishedChange(this.state.finished);
    };

    handleUserSubmit = () => {
      this.props.pageChange('SelectingTarotCards');
    }
  

    render = (): JSX.Element => {

      return (
        <>
          <h3 className="announce">Enter title and description of your project! This will help us generate your export later!</h3>
          <div className="project">
            <p>Title</p>
            <textarea 
              readOnly={this.state.finished}
              value={this.state.title}
              onChange={this.handleTitleChange}
              className="projectTitleTextArea"
              rows={1}
              cols={50}
            />
            <p>Description</p>
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
        </>
      );
    };
}

export default ProjectDescription;