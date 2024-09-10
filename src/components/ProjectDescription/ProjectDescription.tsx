import React, { Component } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import './ProjectDescription.css';
import DrawTarotCards from "../DrawTarotCards/DrawTarotCards";
import PageButtons from "../PageButtons/PageButtons";

const lodash = require('lodash')

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
  projectId: number | null
}

class ProjectDescription extends Component<ProjectDescriptionProps, ProjectDescriptionState> {
    constructor(props: ProjectDescriptionProps) {
      super(props);
  
      this.state = {
        subfield: '',
        title: '',
        description: '',
        nextPage: false,
        projectId: this.props.projectId
      };

      this.saveProject = lodash.debounce(this.saveProject.bind(this), 500);
    }
    
    componentDidMount(): void {
      console.log(this.props.projectId)
      console.log(this.props.user)
      if (this.props.user == null) {
        fetch('/api/project/create', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personEmailAddress: null
          })
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          this.setState({projectId: data.projectId})
        })
      }
      else if (this.props.projectId != null) {
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
      this.setState({ subfield: event.target.value }, () => this.saveProject());
    };

    handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      this.setState({ title: event.target.value }, () => this.saveProject());
    };

    handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      this.setState({ description: event.target.value }, () => this.saveProject());
    };

    nextPage = () => {
      // SAVE TO DB FETCH HERE
      this.togglePage();
    }
    
    togglePage = () => {
      this.setState({nextPage: !this.state.nextPage});
    }

    saveProject = () => {
      fetch('/api/project/update', {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: this.state.projectId,
          projectSubfield: this.state.subfield,
          projectTitle: this.state.title,
          projectDescription: this.state.description
        })
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error)
      })
    }
  

    render = (): JSX.Element => {

      return (
        !this.state.nextPage ? 
          <div className="project">
            <ProgressBar step={1}/>
            <h2 className="project-description-title">Enter title and description of your project. This will help us generate your export later.</h2>
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
                rows={20}
                cols={50}
              />
            </div>
            <PageButtons back={this.props.returnToPrevPage} next={this.nextPage} />
          </div>
        :
        <DrawTarotCards returnToPrevPage={this.togglePage} user={this.props.user} returnToHomePage={this.props.returnToHomePage} projectId={this.state.projectId} />
      );
    };
}

export default ProjectDescription;