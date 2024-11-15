import React, { FC } from 'react';
import '../About/About.css';

interface BoardMember {
  name: string;
  department: string;
}

interface ContactPerson {
  name: string;
  email: string;
}

const AdvisePage: FC = () => {
  const boardMembers: BoardMember[] = [
    { name: "Timothy Brown", department: "UW School of Medicine, Department of Bioethics and Humanities" },
    { name: "Ryan Calo", department: "UW Law School" },
    { name: "Priti Ramamurthy", department: "UW Gender, Women, and Sexuality Studies" },
    { name: "Daniela Roesner", department: "Human-Centered Design & Engineering" },
    { name: "Adam Romero", department: "UW Bothell School of Interdisciplinary Arts & Sciences" }
  ];

  const contacts: ContactPerson[] = [
    { name: "Katharina Reinecke", email: "reinecke@cs.washington.edu" },
    { name: "Rock Yuren Pang", email: "ypang2@cs.washington.edu" }
  ];

  return (
    <div className="aboutBody">
      <div className="container">
        <div className="aboutheader">
          <h1 className="aboutH1">
            <span className="ABOUTUS">Ethics Consultation</span>
          </h1>
          <p className="aboutDescription">
            Want to have custom advice to talk about your project? We have created an ethics board to provide ethics consultation services.
          </p>
        </div>

        <div className="main">
          {boardMembers.map((member, index) => (
            <div key={index} className="person">
              <h2>{member.name}</h2>
              <p>{member.department}</p>
            </div>
          ))}
          
          <div className="aboutheader" style={{ width: '100%', marginTop: '40px' }}>
            <h1 className="aboutH1">
              <span className="ABOUTUS" style={{ fontSize: '48px' }}>Contact Us</span>
            </h1>
            <p className="aboutDescription">
              For seeking advice from the ethics board, any other inquiries, or concerns related to the PEACE project, please reach out to:
            </p>
            {contacts.map((person, index) => (
            <div key={index}>
              <h5>{person.name}</h5>
              <p>
                <a href={`mailto:${person.email}`} style={{ color: '#444', textDecoration: 'underline' }}>
                  {person.email}
                </a>
              </p>
            </div>
          ))}
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default AdvisePage;