import React, {useEffect} from 'react';
import MichaelImage from '../../images/michael.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import './home.css'


const Home = () => {
  useEffect(() => {
    console.log('onMounte with useEffect');
  document.body.classList.add('developer-background');

    return () => 
    {
      document.body.classList.remove('developer-background');
    }

  },[])

  return (
      <>
    <div className="page" id="page-top">
        {/* <!-- Navigation--> */}
         <nav className="navbar navbar-expand-lg  fixed-top" id="sideNav">
            <div className="navbar-brand">
                <span><img className="img-fluid img-profile rounded-circle mx-auto mb-2" src={MichaelImage} alt="..." /></span>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <p className="nav-detailes">
                Email: hamami2010@gmail.com<br></br>
                Phone: 050-832-0025 <br></br>
                City:  Bney-Dror, Close to Ranana/Netanya
              </p>
            </div>
          </nav>
        {/* <!-- Page Content--> */}
        <div className="container-fluid p-0">
              
            {/* <!-- About--> */}
            <section className="resume-section" id="about">
                <div className="resume-section-content">
                    <h4 className="mb-0">
                       <p> Welcome :) <br></br> This is my Calendar Project</p> 
                    </h4>
                    <div className="subheading mb-4">
                      <p> My name is Michael Hamami </p>
                    </div>
                    <p className="lead mb-4">
                      I am Full-Stack Developer - B.Sc. Software Engineering 1 Month to gradute.<br></br>
                      Interested in a Junior full-time position.<br></br>
                      This website deployed so you can see what i can do :) <br></br>
                      <h3> If you think i can be in your team/company contact me :) <br></br>
                      detailes on the left navbar </h3></p> <br></br>

                      <h4>Sign in to explore/use my Calendar</h4>
                      <h4>If you see any bug or want to help me, contact me :) i would love to hear you<br></br></h4>

                    <div className="social-icons">
                      <a className="social-icon" href="https://www.linkedin.com/in/michael-hamami-693516167/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} size="lg" /></a>
                      <a className="social-icon" href="https://github.com/hamamiMaestro?tab=repositories" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} size="lg"/></a>
                    </div>
                    <p className="mt-2"> (Maybe not the best designer but having fun learning to do new things :) )</p>
                </div>
            </section>
            </div>
        </div>
</>
  );
};

export default Home;