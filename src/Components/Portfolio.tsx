import { Fade } from "react-awesome-reveal";
import ModalImage from "./ModalImage";

let id = 0;
function Portfolio(): JSX.Element {
  const data = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg","07.jpg","08.jpg","09.jpg","10.jpg","11.jpg","12.jpg"  ]

  const projects = data.map(function (imgName) {
    let projectImage = "images/portfolio/" + imgName;

    return (
      <div key={id++} className="columns portfolio-item">
        <div className="item-wrap ">
          {/* <img src={projectImage} alt={projects.title} /> */}
          <ModalImage {...{imgSrc:projectImage}} />
          {/* <ModalImage
            small={projectImage}
            large={projectImage}
            alt="Hello World!"
          /> */}
        </div>
      </div>
    );
  });

  return (
    <section id="portfolio">
      <Fade triggerOnce duration={1000} >
        <div className="row">
          <div className="twelve collapsed">
            <h1>העבודות שלי</h1>

            <div
              id="portfolio-wrapper"
              className="bgrid-quarters s-bgrid-thirds cf"
            >
              {projects}
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
}


export default Portfolio;
