import {Fade} from "react-awesome-reveal";

function Footer (){
    return (
      <footer>
        <div className="row">
          <Fade triggerOnce direction="down">
            <div className="twelve columns">
              <ul className="social-links">
                <li key="whatsapp">
                  <a href="https://wa.me/972537131173">
                    <i className="fa fa-whatsapp"></i>
                  </a>
                </li>
                <li key="instagram">
                  <a href="https://www.instagram.com/ariel_edri.3/">
                    <i className="fa fa-instagram"></i>
                  </a>
                </li>
                <li key="facebook">
                  <a href="https://www.facebook.com/profile.php?id=100033295129831">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
              </ul>

              <ul className="copyright">
                <li>&copy; Copyright 2024</li>
                <li>
                  Designed by{" "}
                  <a title="EZ Webs" href="https://www.instagram.com/ezwebs/" target="blank">
                    EZ Web Solutions
                  </a>
                </li>
              </ul>
            </div>
          </Fade>

          <div id="go-top">
            <a className="smoothscroll" title="Back to Top" href="#header">
              <i className="fa fa-chevron-up"></i>
            </a>
          </div>
        </div>
      </footer>
    );
  }


export default Footer;
