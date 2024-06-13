import { useEffect, useState } from "react";
import "./AdminPage.css"
import LineModel from "../../Models/LineModel";
import AdminModel from "../../Models/AdminModel";
import store from "../../Redux/Store";
import { Button, FormControl, Input, InputLabel, TextField, Checkbox, FormControlLabel } from "@mui/material";
import adminService from "../../Services/Admin";
import linesService from "../../Services/Lines";
import notify from "../../Services/Notify";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function AdminPage(): JSX.Element {
    const daysMap = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"];
    const [adminData, setAdminData] = useState<AdminModel>(store.getState().linesState.currentAdmin);
    const [vacationStart, setVacationStart] = useState<number>();
    const [vacationEnd, setVacationEnd] = useState<number>();
    useEffect(() => {
        if (!adminData) adminService.getCurrentAdminAsync()
            .then(res => setAdminData(res));
    }, [])

    const removeVacation = (vacation: string) => {
        const index = adminData.vacations.findIndex(v => v === vacation);
        const newArr = [...adminData.vacations];
        newArr.splice(index, 1);
        setAdminData(prev => ({ ...prev, vacations: newArr }));
        notify.custom("נמחק בהצלחה");
    }
    const addVacation = () => {
        // const index = adminData.vacations.findIndex(v => v === vacation);
        const newArr = [...adminData.vacations];
        newArr.push(vacationStart + "-" + vacationEnd);
        setAdminData(prev => ({ ...prev, vacations: newArr }));
        notify.custom("נוסף בהצלחה");
    }

    return (
        <div className="AdminPage">
            {adminData && <>
                <h4>הודעת פתיחה : </h4>
                <div className="openMessage">
                    <FormControlLabel sx={{direction : "ltr",margin:'5px'}}  control={<Checkbox defaultChecked />} label=":הצג הודעת פתיחה " />
                    <TextField sx={{ backgroundColor: "#cecece" }} multiline label="הודעת פתיחה" value="לקוחות יקרים בתאריכים 24.1 עד 27.1 אני בחופשה אוהב אותכם!" />
                </div>
                <h4> שעות עבודה :</h4>
                <div className="adminWorkingDays">
                    {daysMap.map(d => <div className="dayDiv">
                        <h6>יום {d} :</h6>
                        <TimePicker sx={{ maxWidth: "20vw" }} />
                        <span style={{ fontSize: 70 }}> - </span>
                        <TimePicker sx={{ maxWidth: "20vw" }} />
                    </div>)}
                </div>
                <h4>זמן תור :</h4>
                <FormControl sx={{ mb: 2 }}>
                    <InputLabel>מספר דקות לכל תור :</InputLabel>
                    <Input defaultValue={adminData.minutesPerLine} dir="ltr" margin="dense" required type="number" id="minutes-input" />
                </FormControl>
                <div className="vacations-div">
                    <h4>חופשות  :</h4>
                    {adminData.vacations.map(v => {
                        const start = v.split("-")[0];
                        const end = v.split("-")[1];

                        return <div className="vacation-line" key={v}>
                            <DatePicker disabled defaultValue={dayjs(start)} sx={{ direction: "ltr" }} label="התחלה" />
                            <DatePicker disabled defaultValue={dayjs(end)} sx={{ direction: "ltr" }} label="סיום" />
                            <Button onClick={() => removeVacation(v)} sx={{ margin: "1rem", padding: '0.5rem 1rem 0.5rem 1rem' }} type="submit" variant="contained" color="error">מחיקה</Button>
                        </div>

                    })}
                    <h6>חופשה חדשה</h6>
                    <div className="vacation-line" >
                        <DatePicker onChange={(val: Dayjs) => setVacationStart(new Date(val.valueOf()).getTime())} sx={{ direction: "ltr" }} label="התחלה" />
                        <DatePicker onChange={(val: Dayjs) => setVacationEnd(new Date(val.valueOf()).getTime())} sx={{ direction: "ltr" }} label="סיום" />
                        <Button onClick={addVacation} sx={{ margin: "1rem", padding: '0.5rem 1rem 0.5rem 1rem' }} type="submit" variant="contained" color="success">הוספה</Button>
                    </div>

                </div>
            </>}

            <div className="form-actions-div">
                <Button sx={{ margin: "1rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} type="submit" variant="contained" color="success">שמירה</Button>
                <Button sx={{ margin: "1rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} type="submit" variant="contained" color="warning">ביטול</Button>
            </div>
        </div>
    )
}
export default AdminPage;