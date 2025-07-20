import "./biography.scss";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container-bio">
        <div className="container-bio__banner">
          <img src={imageUrl} alt="whoweare" />
        </div>

        <div className="container-bio__banner">
          <p className="bio-heading">Biography</p>
          <h3 className="bio-subheading">Who We Are</h3>
          <p>
            Welcome to SkCare Hospital Management System — a smart and scalable web-based solution built to transform the way hospitals operate. Our system is developed using the MERN Stack (MongoDB, Express, React, Node.js) to ensure real-time data flow, fast performance, and secure medical operations.
          </p>
          <p>
            Founded in 2024, our mission is to digitalize patient care and streamline hospital workflows. From appointment scheduling and electronic medical records to staff management and billing — everything is integrated into one seamless platform.
          </p>
          <p>
            This project demonstrates not just technical capabilities but also a deep understanding of healthcare operations. We believe that innovation in healthcare begins with intelligent software.
          </p>
          <p>
            Built with a passion for code and care, our system brings together technology and humanity — because efficient care saves lives.
          </p>
          <p>We're proud to be building this system as part of our journey in full-stack web development.</p>
          <p>#CodingIsCare</p>
        </div>
      </div>
    </>
  );
};

export default Biography;