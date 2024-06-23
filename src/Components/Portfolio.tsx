import { Fade } from "react-awesome-reveal";
import ModalImage from "./ModalImage";
import globals from "../Services/Globals";
import { useAppSelector } from "../Redux/Store";
import { useEffect } from "react";
import adminService from "../Services/Admin";

function Portfolio(): JSX.Element {
  const admin = useAppSelector(state => state.linesState.currentAdmin);

  useEffect(() => {
    if (!admin) adminService.getCurrentAdminAsync();
  }, [admin])

  return (
    <section id="portfolio">
      <Fade triggerOnce duration={1000} >
        <div className="row">
          <div className="twelve collapsed">
            <h1>העבודות שלי</h1>
            <div
              id="portfolio-wrapper"
              className="bgrid-quarters s-bgrid-halves cf"
            >
              {admin && admin.imagesNames.map((imgName, index) => <div key={index} className="columns portfolio-item">
                <div className="item-wrap ">
                  <ModalImage {...{ imgSrc: globals.imagesUrl + "/" + imgName }} />
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
}


export default Portfolio;
