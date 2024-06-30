import React, { Component } from "react";
import { pages } from '../../App';

type Props = {
    pageChange: (page: pages) => void,
}

type ProjectsState = {

}

class Projects extends Component<Props, ProjectsState> {
    constructor(props: Props) {
      super(props);
  
      this.state = { };
    }
  
  

    render = (): JSX.Element => {
      return (
        <>
        <h3>Projects Page</h3>
        <button onClick={() => this.props.pageChange("ProjectDescription")}>Next</button>
        </>
      );
    };
}

export default Projects;