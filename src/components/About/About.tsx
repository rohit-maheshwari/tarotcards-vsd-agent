import { Component } from "react";
import { pages } from '../../App';
import './About.css';
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
        <div className="bg-light">
            <div className="container mt-0 tasks">
                {/* Page Header */}
                <div className="page-header">
                    <h3 className="page-header-title">About</h3>
                    <h4 className="page-subheader">We explore how to support and help fellow researchers seamlessly integrate ethical considerations into their workflows!</h4>
                    <hr/>
                </div>
                
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="page-subheader"><strong>Get in touch?</strong></h4>
                        <p className="ethics-board-description">Please contact Katharina Reinecke (reinecke@cs.washington.edu) or Rock Pang (ypang2@cs.washington.edu).</p>
                    </div>
                </div>

                <div className="row">
                    {aboutInformation.people.map((person) => (
                        <div key={person.name} className="col-md-4 mb-4">
                            <a href={person.link !== "" ? person.link : undefined} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                <div className="about-card card w-100 shadow-sm border rounded d-flex flex-row align-items-center p-3">
                                    <div className="about-profile-picture me-3">
                                        <img src={person.profilePicture} alt={person.name} className="rounded-circle" />
                                    </div>

                                    <div className="card-body">
                                        <h5 className="mb-1mb-1mb-1">{person.name}</h5>
                                        <p className="card-text mb-1">{person.title}</p>
                                        </div>
                                    </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
  };
}

export default Landing;

{/* // <div className="aboutBody">
    //     <div className="container">
    //         <div className="aboutheader">
    //             <h1 className="aboutH1"><span className="ABOUTUS">About Us</span></h1>
    //             <p className="aboutDescription">
    //             This is an overview of our project
    //             </p>
    //         </div>
    //         <div className="main">
    //             {aboutInformation.people.map((person) => {
    //                 return (
    //                     <a className="person" href={person.link != "" ? person.link : undefined} target="_blank">
    //                         <h2>{person.name}</h2>
    //                         <p>{person.title}</p>
    //                     </a>
    //                 )
    //             })}
    //         </div>
    //     </div>
    // </div> */}