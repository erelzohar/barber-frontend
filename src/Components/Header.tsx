import ParticlesBg from "particles-bg";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import logo from "../Assets/images/ariel-logo.webp";

function Header() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => prev === 2 ? 0 : prev + 1)
    }, 5000);
    return () => clearInterval((interval));
  }, [])
  
  return (
    <header id="header">
      <ParticlesBg type="circle" color="#FFD700" bg={true} />
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#header" title="Hide navigation">
          Hide navigation
        </a>

        <ul id="nav" className="nav">
          <li className="current">
            <a className="smoothscroll" href="#header">
              דף הבית
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#about">
              קצת עליי
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#portfolio">
              תיק עבודות
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#LinePicker">
              זימון תורים
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#contact">
              צור קשר
            </a>
          </li>
          <li>
            <Link style={{fontSize:"large"}} to="/auth/login">
               התחברות
            </Link>
          </li>
        </ul>
      </nav>

      <div className="row banner">
        <div id="header-bg" style={{backgroundImage:`url("${logo}")`}}></div>
        <div className="banner-text" >
          <br />
          <Fade triggerOnce direction="down" duration={1500} key={index}>
            <h3 className="description">
              {['ברוכים הבאים למספרה של אריאל אדרי עיצוב שיער ברמלה.', 'אצלנו תוכלו ליהנות ממבחר רחב של תספורות לגברים בכל הסגנונות .', 'אריאל אדרי הוא ספר מוכר בעיר ויודע לטפל בלקוחותיו במקצועיות בין אם מדובר בלקוח חדש או לקוח וותיק.'][index]}
            </h3>
\          </Fade>
          <hr />
          <Fade triggerOnce direction="down" duration={2000}>
            <ul className="social">
              <a href="#LinePicker" className="button btn project-btn smoothscroll">
                להזמנת תור<i className="fa fa-book"></i>
              </a>
            </ul>
          </Fade>
        </div>
      </div>

      <p className="scrolldown">
        <a className="smoothscroll" href="#about">
          <i className="fa fa-chevron-down"></i>
        </a>
      </p>
    </header>
  );
}


export default Header;
