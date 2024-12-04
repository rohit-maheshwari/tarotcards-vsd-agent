import { Component } from "react";
import './Projects.css'
import ProjectDescription from "../ProjectDescription/ProjectDescription";
import editbutton from './editbutton.svg'
import deletebutton from './deletebutton.svg'
import env from '../../environment.json';
const backendURL = env.BACKEND.URL + ":" + env.BACKEND.PORT

type ProjectsProps = {
  user: any;
  returnToHomePage: () => void;
  navbarClick?: boolean;
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
        fetch(backendURL + '/api/project/getUsers?emailAddress='+this.props.user.email, {
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
        if (prevState.nextPage === true && this.state.nextPage === false) {
          this.componentDidMount();
        }
    }

    createProject = async () => {
      await fetch(backendURL + '/api/project/create', {
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

    deleteProject = async (projectId: number) => {
      console.log(projectId)
      await fetch(backendURL + '/api/project/delete?personEmailAddress=' + this.props.user.email + '&projectId='+projectId, {
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
        console.log(data.remainingProjects);
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
            {this.state.userProjects.length === 0 ? 
              <div> no projects yet... </div>
            : this.state.userProjects.map((project: any) => {
              return (
                <div className='projects-project'>
                  <p>{project.projectTitle}</p>
                  <div className='project-buttons'>
                    <img src={editbutton} onClick={() => this.setState({nextPage: true, selectedProjectId: project.projectId})}/>
                    <img src={deletebutton} onClick={() => this.deleteProject(project.projectId)}/>
                  </div>
                </div>
              )
            })}
            </ul>
          </div>
        :
          <ProjectDescription returnToPrevPage={() => this.setState({nextPage: false})} user={this.props.user} returnToHomePage={this.props.returnToHomePage} projectId={this.state.selectedProjectId}/>
      );
    };
}

export default Projects;