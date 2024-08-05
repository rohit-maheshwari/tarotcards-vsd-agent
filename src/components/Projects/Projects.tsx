import React, { Component } from "react";
import { pages } from '../../App';
import ProjectDescription from "../ProjectDescription/ProjectDescription";

type Props = {
  
}

type ProjectsState = {
  nextPage: boolean
}

class Projects extends Component<Props, ProjectsState> {
    constructor(props: Props) {
      super(props);
  
      this.state = { nextPage: false };
    }
  
  

    render = (): JSX.Element => {
      return (
        !this.state.nextPage ?
          <>
            <h3>Projects Page</h3>
            <button onClick={() => this.setState({nextPage: true})}>Next</button>
          </>
        :
          <ProjectDescription returnToPrevPage={() => this.setState({nextPage: false})}/>
      );
    };
}

export default Projects;