import { Component } from "react";
import { pages } from '../../App';
import './About.css'
import aboutInformation from './About.json';

type Props = {
    pageChange: (page: pages) => void
}

type LandingState = {

}

class Landing extends Component<Props, LandingState> {
  constructor(props: Props) {
    super(props);

    this.state = { };
  }

  toggleMenu = () => {
    const menu = document.getElementById('menu');
    if (!menu) {
        throw new Error("Menu does not exist")
    }
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
  }

  render = (): JSX.Element => {
    return (
    <div className="aboutBody">
        <div className="container">
            <div className="aboutheader">
                <h1 className="aboutH1"><span className="ABOUTUS">About Us</span></h1>
                <p className="aboutDescription">
                This is an overview of our project
                </p>
            </div>
            <div className="main">
                {aboutInformation.people.map((person) => {
                    return (
                        <a className="person" href={person.link !== "" ? person.link : undefined} target="_blank">
                            <h2>{person.name}</h2>
                            <p>{person.title}</p>
                        </a>
                    )
                })}
            </div>
        </div>
    </div>
    );
  };
}

export default Landing;