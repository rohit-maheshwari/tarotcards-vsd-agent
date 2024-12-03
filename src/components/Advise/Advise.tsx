import React, { FC } from 'react';
import './Advise.css';

interface BoardMember {
  name: string;
  department: string;
  bio: string;
  profilePicture: string;
}

const AdvisePage: FC = () => {
  const boardMembers: BoardMember[] = [
    { 
      name: "Timothy Brown", 
      department: "UW School of Medicine, Department of Bioethics and Humanities",
      bio: "Dr. Brown works at the intersection of biomedical ethics, philosophy of technology, (black/latinx/queer) feminist thought, and aesthetics. His research explores the potential impact of neurotechnologies—systems that record and stimulate the nervous system—on end users’ sense of agency and embodiment. His work also interrogates neurotechnologies for their potential to exacerbate or create social inequities, in order to establish best practices for engineers. Finally, Dr. Brown’s approach to research is interdisciplinary, embedded, and relies on mixed methods; his work on interdisciplinary is aimed at encouraging deeper collaborations between humanists and engineers in the future.",
      profilePicture: "https://depts.washington.edu/bhdept/sites/default/files/Tim%20Brown%20photo.jpg"
    },
    { 
      name: "Ryan Calo", 
      department: "UW Law School",
      bio: "Ryan Calo is the Lane Powell and D. Wayne Gittinger Professor at the University of Washington School of Law and holds a joint appointment in the Information School and a courtesy appointment in the Paul G. Allen School of Computer Science and Engineering. He is a founding co-director of the interdisciplinary UW Tech Policy Lab and a co-founder of the UW Center for an Informed Public. Professor Calo's research on law and emerging technology appears in leading law reviews (California Law Review, University of Chicago Law Review, and Columbia Law Review) and technical publications (MIT Press, Nature, Artificial Intelligence) and is frequently referenced by the national media. His work has been translated into at least four languages. Professor Calo has testified before the German Parliament, the California Little Hoover Commission, and the full Judiciary and Commerce Committees of the United States Senate. He has organized events on behalf of the National Science Foundation, the National Academy of Sciences, and the Obama White House. He has been a speaker at President Obama's Frontiers Conference, the Aspen Ideas Festival, and NPR's Weekend in Washington.",
      profilePicture: "https://www.law.uw.edu/media/141131/calo-ryan_compressed.jpg?center=0.17625899280575538,0.71223021582733814&mode=crop&width=600&height=400&rnd=133715798660000000"
    },
    { 
      name: "Priti Ramamurthy", 
      department: "UW Gender, Women, and Sexuality Studies",
      bio: "Priti Ramamurthy is a professor in the department of Gender, Women, and Sexuality Studies. A feminist political economist, she is interested in questions of social reproduction: how do people who are marginalized by politics and economic development craft meaningful lives in the process of reproducing themselves every day and across generations? Two major research studies have engaged these questions. The Country and the City: Poetic Lives in India's Informal Economy is about the lived experiences and desires of women and men, many from subordinated caste groups, who toil in India's cities even as they remain enmeshed in on-going lives in their villages. For this project, she and her collaborators conducted over a hundred oral history interviews with poor urban migrants in Delhi and Hyderabad and went back with ten to their villages. The second study is about the relationship between the social reproduction of rural families and processes of agrarian transformation in the Telangana region of southern India. For this, she has returned to the same villages for three decades. Ramamurthy’s articulation of feminist commodity chain analysis, a way to track the creation of value and gendered identities, is a methodological contribution to studies of gender and globalization. A third project resulted in the co-edited and co-authored The Modern Girl Around the World: Modernity, Consumption, Globalization (Duke, 2008).",
      profilePicture: "https://gwss.washington.edu/sites/gwss/files/styles/portrait/public/photos/priti-ramamurthy.jpg?itok=vurw2rkb"
    },
    { 
      name: "Daniela Roesner", 
      department: "Human-Centered Design & Engineering",
      bio: "Dr. Daniela Rosner is a professor in the Department of Human Centered Design & Engineering (HCDE) at the University of Washington. Her research investigates the social, political, and material circumstances of technology development, with an emphasis on foregrounding marginalized histories of practice, from maintenance to needlecraft. She has worked in design research at Microsoft Research, Adobe Systems, Nokia Research and as an exhibit designer at several museums, including the Adler Planetarium and Astronomy Museum. Rosner's work has been supported by multiple awards from the U.S. National Science Foundation, including an NSF CAREER award. In her book, Critical Fabulations, she investigates new ways of thinking about design’s past to rework future relationships between technology and social responsibility (MIT Press, 2018).",
      profilePicture: "https://www.hcde.washington.edu/sites/hcde/files/people/imgs/rosner-square.png"
    },
    { 
      name: "Adam Romero", 
      department: "UW Bothell School of Interdisciplinary Arts & Sciences",
      bio: "[*Need to update*] Adam Romero offers readers the opportunity for a dramatic paradigm shift in regard to the growth of industrial agriculture from the nineteenth into the twentieth century… Rethinking the spread of economic poisons also forces readers to grapple with a common observation about American agriculture whose meaning has often been ignored. Although most histories of agriculture and the development of pesticides include some acknowledgment that abundance was the sector’s most persistent and serious economic problem, few scholars address the implications of this truism. If abundance was so harmful, why do many accept at face value the idea that pesticide use was motivated by the desire to increase output? Romero’s thesis provides an explanation for this contradiction.",
      profilePicture: "https://www.uwb.edu/ias/wp-content/uploads/sites/30/2023/06/IAS-Faculty-Adam-Romero-Square.jpg"
    }
  ];

  return (
    <div className="bg-light">
      <div className="container mt-0 tasks">
        <div className="page-header">
          <h3 className="page-header-title">Consult</h3>
          <h4 className="page-subheader">We provide support to connect you with our ethics advisory board to chat about social impact of your projects!</h4>
          <hr/>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h4 className="page-subheader"><strong>Our Ethics Advisory Board</strong></h4>
            <p className="ethics-board-description">Our Advisory Board, composed of experts from diverse disciplines, offers valuable guidance to help you navigate ethical considerations in your project.</p>
          </div>
        </div>
        
        {boardMembers.map((member, index) => (
          <div className="row">
            <div key={index} className="col-md-12 mb-4">
              <div className="card w-100 shadow-sm border rounded d-flex flex-row align-items-center p-3">
                <div className="expert-profile-picture me-3">
                  <img src={member.profilePicture} alt={member.name} className="rounded-circle" />
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold">{member.name}</h5>
                  <p className="card-text mb-1"><strong>{member.department}</strong></p>
                  <p className="card-text">{member.bio}</p>
                </div>
              </div>
            </div>
          </div>
          ))}
      </div>
    </div>
  );
};

  // return (
  //   <div className="aboutBody">
  //     <div className="container">
  //       <div className="aboutheader">
  //         <h1 className="aboutH1">
  //           <span className="ABOUTUS">Ethics Consultation</span>
  //         </h1>
  //         <p className="aboutDescription">
  //           Want to have custom advice to talk about your project? We have created an ethics board to provide ethics consultation services.
  //         </p>
  //       </div>

  //       <div className="main">
  //         {boardMembers.map((member, index) => (
  //           <div key={index} className="person">
  //             <h2>{member.name}</h2>
  //             <p>{member.department}</p>
  //           </div>
  //         ))}
          
  //         <div className="aboutheader" style={{ width: '100%', marginTop: '40px' }}>
  //           <h1 className="aboutH1">
  //             <span className="ABOUTUS" style={{ fontSize: '48px' }}>Contact Us</span>
  //           </h1>
  //           <p className="aboutDescription">
  //             For seeking advice from the ethics board, any other inquiries, or concerns related to the PEACE project, please reach out to:
  //           </p>
  //           {contacts.map((person, index) => (
  //           <div key={index}>
  //             <h5>{person.name}</h5>
  //             <p>
  //               <a href={`mailto:${person.email}`} style={{ color: '#444', textDecoration: 'underline' }}>
  //                 {person.email}
  //               </a>
  //             </p>
  //           </div>
  //         ))}
  //         </div>

          
  //       </div>
  //     </div>
  //   </div>
  // );
// };

export default AdvisePage;