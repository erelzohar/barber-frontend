import { useEffect, useState } from "react";
import About from "./About";
import AlertMessage from "./AlertMessage";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import LinePicker from "./LinePicker";
import Login from "./Login";
import Portfolio from "./Portfolio";
import SpeedDialComponent from "./SpeedDialComponent";




function Home() {

    const [alert, setAlert] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setAlert(true);
        }, 2000)
    }, [])
    return (
        <div className="Home">
            {alert && <AlertMessage />}
            <Header />
            <Login />
            <About />
            <Portfolio />
            <LinePicker />
            <Contact />
            <Footer />
            <SpeedDialComponent />
        </div>
    );

}
export default Home;