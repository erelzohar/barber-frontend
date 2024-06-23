import {Fade} from "react-awesome-reveal";
import logo from "../images/ariel-logo.webp";

function About () {
    return (
      <section id="about">
        <Fade triggerOnce duration={1000}>
          <div className="row">
            <div className="three columns">
              <img
                className="profile-pic"
                src={logo}
                alt="Profile Pic"
              />
            </div>
            <div className="nine columns main-col">
              <h2>קצת עליי</h2>
              <p>אני אריאל , בן 20 מרמלה ספר בנשמה . אני אשמח לייעץ ולהתאים לך תספורת שתתאים בול בשבילך, כי אצלי הכי חשוב שתצא מרוצה.</p>
              <div className="row">
                <div className="columns">
                  <ul className="social-links">
                    <li key='facebook'>
                      <a href='https://www.facebook.com/profile.php?id=100033295129831'>
                        <i className='fa fa-facebook'></i>
                      </a>
                    </li>
                    <li key='whatsapp'>
                      <a href='https://wa.me/972537131173'>
                        <i className='fa fa-whatsapp'></i>
                      </a>
                    </li>
                    <li key='instagram'>
                      <a href='https://www.instagram.com/ariel_edri.3/'>
                        <i className='fa fa-instagram'></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="columns contact-details">
                  <h2>צרו איתי קשר</h2>
                  <p className="address">
                    <span>אריאל אדרי</span>
                    <br />
                    <span>
                      חטיבת גולני 6
                      <br />
                      רמלה
                    </span>
                    <br />
                    <span><a href="tel:+972537131173">053-713-1173</a></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  
}

export default About;
