import React, { Component } from "react";
import ProgressBar from "../NewProgressBar/ProgressBar";
import './ProjectDescription.css';
import DrawTarotCards from "../DrawTarotCards/DrawTarotCards";

type ProjectDescriptionProps = {
  returnToPrevPage: () => void;
  returnToHomePage: () => void;
  user: any;
  projectId: number | null;
}

type ProjectDescriptionState = {
  subfield: string,
  title: string,
  description: string,
  nextPage: boolean,
}

class ProjectDescription extends Component<ProjectDescriptionProps, ProjectDescriptionState> {
    constructor(props: ProjectDescriptionProps) {
      super(props);
  
      this.state = {
        subfield: '',
        title: '',
        description: '',
        nextPage: false,
      };
    }
    
    componentDidMount(): void {
        if (this.props.projectId != null) {
          fetch('/api/project/get?projectId='+this.props.projectId, {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            if (response.ok) {
              return response.json()
            }
          })
          .then((data) => {
            console.log(data)
            this.setState({subfield: data.subfield, title: data.title, description: data.description})
          })
          .catch((error) => {
            console.log(error)
          })
        }
    }

    handleSubfieldChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      this.setState({ subfield: event.target.value });
    };

    handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      this.setState({ title: event.target.value });
    };

    handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      this.setState({ description: event.target.value });
    };

    nextPage = () => {
      // SAVE TO DB FETCH HERE
      this.togglePage();
    }
    
    togglePage = () => {
      this.setState({nextPage: !this.state.nextPage});
    }
  

    render = (): JSX.Element => {

      return (
        !this.state.nextPage ? 
          <div className="project">
            <ProgressBar step={1}/>
            <h2 className="project-description-title">Enter title and description of your project! This will help us generate your export later!</h2>
            <div className="project-description-content">
              <p>Subfield</p>
              <textarea 
                value={this.state.subfield}
                onChange={this.handleSubfieldChange}
                className="project-description-subfield-text-area"
                rows={1}
                cols={50}
              />
              <p>Title</p>
              <textarea
                value={this.state.title}
                onChange={this.handleTitleChange}
                className="project-description-title-text-area"
                rows={1}
                cols={50}
              />
              <p>Description</p>
              <textarea
                value={this.state.description}
                onChange={this.handleDescriptionChange}
                className="project-description-description-text-area"
                rows={4}
                cols={50}
              />
            </div>
            <div className="project-description-buttons">
              <button className="project-description-back-button" onClick={() => this.props.returnToPrevPage()}>Back</button>
              <button className="project-description-next-button" onClick={this.nextPage}>Next</button>
            </div>
          </div>
        :
        <DrawTarotCards returnToPrevPage={this.togglePage} user={this.props.user} returnToHomePage={this.props.returnToHomePage} projectId={this.props.projectId} />
      );
    };
}

export default ProjectDescription;