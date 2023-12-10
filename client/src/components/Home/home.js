import React, { useEffect } from "react";
import MichaelImage from "../../images/michael.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin,faGithub } from "@fortawesome/free-brands-svg-icons";
import "./home.css";
import Image from 'react-bootstrap/Image'
import { Container,Row,Col } from "react-bootstrap";


const Home = () => {
  useEffect(() => {
    document.body.classList.add("developer-background");

    return () => {
      document.body.classList.remove("developer-background");
    };
  }, []);

  return (
    
<Container>
  <Row>
    <Col sm={3}>
    <div className="mt-3">
    <Image src={MichaelImage} rounded fluid />
          <p className="navbar-text">
            Email: hamami2010@gmail.com<br></br>
            Phone: 050-832-0025 <br></br>
            City: Netanya
          </p>
        </div>      
      </Col>
    <Col sm={7}>
    <div>
        {/* <!-- About--> */}
          <div className="navbar-text">
            <h4>
              <p>

                Welcome {":)"} <br></br> This is my Calendar Project
              </p>
            </h4>
            <div className="subheading mb-4">
              <p> My name is Michael Hamami </p>
            </div>
            <p className="lead mb-4">
              I am Full-Stack Developer - B.Sc. Software Engineering.<br></br>
              Interested in a Junior full-time position.<br></br>
              This website deployed so you can see what i can do {":)"} <br></br>
            </p>
            <h3>
 
              If you think i can be in your team/company contact me {":)"} <br></br>
              details on the left or above {":) "}
            </h3>
            <br></br>
            <h4>Sign in to explore my Calendar Website</h4>
            <h4>
              If you see any bug or want to help me, contact me i would love
              to hear you<br></br>
            </h4>
            <div className="social-icons">
              <a
                className="social-icon"
                href="https://www.linkedin.com/in/michael-hamami-693516167/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
              <a
                className="social-icon"
                href="https://github.com/MichaelHamami?tab=repositories"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
            </div>
            <p className="last-text mt-2">
              Maybe not the best designer but having fun learning to do new
              things
            </p>
          </div>
    </div> 
        </Col>
  </Row>
</Container>


      
  );
};

export default Home;
