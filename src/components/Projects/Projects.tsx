import React, { Component } from "react";
import { pages } from '../../App';
import './Projects.css'
import ProjectDescription from "../ProjectDescription/ProjectDescription";
import editbutton from './editbutton.svg'
import deletebutton from './deletebutton.svg'
import pdfbutton from './pdfbutton.svg'
import ExportCards from "../ExportCards/ExportCards";

type ProjectsProps = {
  user: any;
  returnToHomePage: () => void;
}

type ProjectsState = {
  nextPage: boolean,
  userProjects: any[],
  selectedProjectId: number | null;
}

class Projects extends Component<ProjectsProps, ProjectsState> {
    constructor(props: ProjectsProps) {
      super(props);
  
      this.state = { nextPage: false, userProjects: [], selectedProjectId: null };
    }

    componentDidMount(): void {
        fetch('/api/project/getUsers?emailAddress='+this.props.user.email, {
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
          console.log(data.projects)
          this.setState({userProjects: data.projects})
        })
        .catch((error) => {
          console.log(error)
        })
    }

    componentDidUpdate(prevProps: Readonly<ProjectsProps>, prevState: Readonly<ProjectsState>, snapshot?: any): void {
        if (prevState.nextPage == true && this.state.nextPage == false) {
          this.componentDidMount();
        }
    }

    createProject = () => {
      fetch('/api/project/create', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personEmailAddress: this.props.user.email
        })
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        this.setState({nextPage: true, selectedProjectId: data.projectId})
      })
    }

    deleteProject = (projectId: number) => {
      fetch('/api/project/delete?projectId='+projectId, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        this.setState({userProjects: data.remainingProjects})
      })
      .catch((error) => {
        console.log(error);
      })
    }
  
    render = (): JSX.Element => {
      console.log(this.state)
      return (
        !this.state.nextPage ?
          <div className='projects'>
            <div className='project-header'>
              <h1>Hello {this.props.user.name} !</h1>
            </div>
            <div className='create-project-button'>
              <button onClick={() => this.createProject()}>Create a New Project</button>
            </div>
            <ul className='projects-container'>
            {this.state.userProjects.map((project: any) => {
              return (
                <li className='projects-project'>
                  {project.projectTitle}
                  <div className='project-buttons'>
                    <img src={editbutton} onClick={() => this.setState({nextPage: true, selectedProjectId: project.projectId})}/>
                    <img src={deletebutton} onClick={() => this.deleteProject(project.projectId)}/>
                  </div>
                </li>
              )
            })}
            </ul>
            <div className="projects-page-buttons">
              <button onClick={() => this.props.returnToHomePage()}>Home</button>
            </div>
          </div>
        :
          <ProjectDescription returnToPrevPage={() => this.setState({nextPage: false})} user={this.props.user} returnToHomePage={this.props.returnToHomePage} projectId={this.state.selectedProjectId}/>
      );
    };
}

export default Projects;