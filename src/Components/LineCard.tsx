import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import notify from "../Services/Notify";
import SMSModel from "../Models/SMSModel";
import smsService from "../Services/SMS";
import LineModel from "../Models/LineModel";
import linesService from "../Services/Lines";
import { Fade } from "react-awesome-reveal";

interface Props {
    epochDate: number;
}
interface LineCredentials {
    phoneNumber: string;
    name: string;
}
const randomNum = Math.random().toString().substring(2, 7);

function LineCard(props: Props) {
    const date = new Date(props.epochDate);
    const daysMap = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"];
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [verifyCode, setVerifyCode] = useState<string>();
    const [formSteps, setFormSteps] = useState(0);
    const [newLine, setNewLine] = useState<LineModel>(new LineModel());
    const resolver: Resolver<LineCredentials> = async (values) => {
        return {
            values: values.name && values.phoneNumber ? values : {},
            errors: !values.name && !values.phoneNumber ? {
                name: {
                    type: 'required',
                    message: 'אנא מלא שם '
                },
                phoneNumber: {
                    type: 'required',
                    message: 'אנא מלא טלפון '
                }
            }
                : (!values.name || values.name.length < 2) ? {
                    name: {
                        type: 'required',
                        message: 'אנא מלא שם '
                    }
                } : (!values.phoneNumber || !values.phoneNumber.match(/^05\d{8}$/)) ? {
                    phoneNumber: {
                        type: 'required',
                        message: 'טלפון לא תקין '
                    }
                } : {},
        };
    }
    const { register, handleSubmit, formState: { errors } } = useForm<LineCredentials>({ resolver, mode: 'onSubmit' });
    const submit: SubmitHandler<LineCredentials> = async data => {
        try {
            newLine.name = data.name;
            newLine.phone = data.phoneNumber;
            newLine.timestamp = props.epochDate.toString();

            const sms = new SMSModel();
            sms.message = " לקביעת התור קוד האימות הוא: " + randomNum;
            sms.phoneNumber = newLine.phone;
            const res = await smsService.sendSMS(sms);
            if (res !== 200) return notify.custom("אירעה שגיאה נסה שוב מאוחר יותר");
            setFormSteps(1);

        }
        catch (err: any) {
            notify.error(err);
        }
    }
    const verify = async () => {
        try {
            if (verifyCode !== randomNum) return notify.custom("קוד שגוי נסה שוב");
            setLoading(true);
            const res = await linesService.addLineAsync(newLine);
            setLoading(false);
            if (!res) return notify.error("משהו השתבש");
            setOpen(false);
            notify.success("!התור נקבע בהצלחה");
            const sms = new SMSModel();
            sms.message = "שלום " + newLine.name + `,  נקבע לך תור לאריאל אדרי לתאריך ${date.getDate()}/${(+date.getMonth() + 1)} בשעה ${date.toTimeString().substring(0, 5)} יום ${daysMap[date.getDay()]} . לינק לביטול התור עד שעה לפני המועד שנקבע :${window.location.origin + "/cancel/" + res._id}`;
            sms.phoneNumber = newLine.phone;
            const smsRes = await smsService.sendSMS(sms);
            if (smsRes !== 200) return notify.custom("אירעה שגיאה נסה שוב מאוחר יותר");
        }
        catch (err: any) {
            notify.error(err);
        }
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '400px',
        bgcolor: '#fff',
        boxShadow: 24,
        p: 3,
        paddingBottom: 0,
        paddingTop: 1,
        borderRadius: '7px',
    }
    return (
        <>
            <div className="LineCard" onClick={() => { setOpen(true) }}>
                <p>{date.getHours()}:{date.getMinutes().toString().length === 1 ? "0" + date.getMinutes() : date.getMinutes()}</p>
            </div>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="lineCardBox">
                    <div style={{ display: formSteps === 1 ? "none" : "" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ margin: "3px", direction: "rtl" }}>
                            <div className="lineDetails">
                                <h3>יום {daysMap[date.getDay()]}</h3>
                                <h3 id="lineCardDateTime">
                                    <span>{date.getDate() + "." + (+date.getMonth() + 1)} <i className="fa fa-calendar" style={{color:"#737c6c"}} aria-hidden="true"></i></span>
                                    <span>{date.toTimeString().substring(0, 5)} <i className="fa fa-clock-o" style={{color:"#737c6c"}} aria-hidden="true"></i></span>
                                </h3>
                            </div>
                        </Typography>
                        <form className="modalForm" id="line-form" noValidate onSubmit={handleSubmit(submit)}>

                            <TextField
                                dir="rtl"
                                fullWidth
                                margin="dense"
                                type="text"
                                {
                                ...register("name", {
                                    required: "שדה חובה"
                                })
                                }
                                id="name-input"
                                error={errors.name ? true : false}
                                helperText={errors.name?.message}
                                label="שם"
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                id="phoneNumber-input"
                                fullWidth
                                margin="dense"
                                type="text"
                                dir="ltr"
                                {
                                ...register("phoneNumber", {
                                    required: "שדה חובה",
                                    pattern: {
                                        value: /^05\d{8}$/,
                                        message: "טלפון לא תקין"
                                    }
                                })
                                }
                                error={errors.phoneNumber ? true : false}
                                helperText={errors.phoneNumber?.message}
                                label="טלפון"
                                variant="outlined"
                                size="small"
                            />
                            <Button sx={{ margin: "1rem 0 2rem 0", padding: "0.5rem 0", borderRadius: '10px' }} fullWidth type="submit" variant="contained" ><i className="fa fa-paper-plane" aria-hidden="true"></i> </Button>
                        </form>
                    </div>
                    <div style={{ display: formSteps === 0 ? "none" : "" }}>
                        <Fade>
                            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ margin: "3px", direction: "rtl" }}>
                                שלחנו לך קוד ב SMS לצורך אימות:
                            </Typography>
                            <TextField
                                autoFocus
                                focused
                                fullWidth
                                label="קוד אימות"
                                margin="normal"
                                size="small"
                                onChange={(e => setVerifyCode(e.target.value))}
                            />
                            <Button disabled={loading} onClick={async () => { verify() }} sx={{ margin: "1rem 0", color: '#fff', padding: '0.3rem 0', borderRadius: '7px' }} fullWidth className="gradient-bg" type="submit" variant="text">קבע תור</Button>
                        </Fade>
                    </div>
                </Box>
            </Modal>
        </>
    );
}


export default LineCard;
