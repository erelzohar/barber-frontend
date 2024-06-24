import { useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import notify from "../Services/Notify";
import SMSModel from "../Models/SMSModel";
import smsService from "../Services/SMS";
import { Button } from "@mui/material";

function Contact() {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const adminPhone = "+972503713852";

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!phone.match(/^05\d{8}$/)) return notify.custom("טלפון לא תקין");
    const sms = new SMSModel();
    sms.phoneNumber = adminPhone;
    sms.message = `השאירו לך הודעה חדשה באתר! 

    ${name + " - " + phone} 
    
    ${message}`;
    const res = await smsService.sendSMS(sms);
    if (res !== 200) return notify.custom("אירעה שגיאה נסה שוב מאוחר יותר");
    setMessage("");
    setName("");
    setPhone("");
    notify.success("ההודעה נשלחה בהצלחה");
  }
  return (
    <section id="contact">
      <Fade triggerOnce direction="down" duration={1000}>
        <div className="row section-head">
          <div className="two columns header-col">
            <h1>
              <span>שמרו על קשר</span>
            </h1>
          </div>

          <div className="ten columns">
            <p className="lead">השאירו פרטים ואצור איתכם קשר בהקדם.</p>
          </div>
        </div>
      </Fade>

      <div className="row">
        <Slide triggerOnce direction="left" duration={1000}>
          <div className="eight columns">
            <form onSubmit={handleSubmit} method="post" id="contactForm" name="contactForm">
              <fieldset>
                <div>
                  <label htmlFor="contactName">
                    שם <span className="required">*</span>
                  </label>
                  <input
                    value={name}
                    required
                    type="text"
                    size={35}
                    id="contactName"
                    name="contactName"
                    onChange={(e) => { setName(e.target.value) }}
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail">
                    טלפון <span className="required">*</span>
                  </label>
                  <input
                    value={phone}
                    required
                    type="text"
                    size={35}
                    dir="ltr"
                    id="contactEmail"
                    name="contactEmail"
                    onChange={(e) => { setPhone(e.target.value) }}
                  />
                </div>

                <div>
                  <label htmlFor="contactMessage">
                    הודעה <span className="required">*</span>
                  </label>
                  <textarea
                    value={message}
                    required
                    cols={50}
                    rows={15}
                    id="contactMessage"
                    name="contactMessage"
                    onChange={(e) => { setMessage(e.target.value) }}
                  ></textarea>
                </div>

                <div>
                  <Button className="submit" type="submit">שליחה</Button>
                </div>
              </fieldset>
            </form>
          </div>
        </Slide>

            <div className="widget widget_contact">
              <h4>כתובת ומספר טלפון</h4>
              <p className="address">
                אריאל אדרי
                <br />
                חטיבת גולני 6
                <br />
                רמלה , ישראל
                <br />
                <span>053-713-1173</span>
              </p>
            </div>
      </div>
    </section>
  );
}


export default Contact;
