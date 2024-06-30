import { useEffect, useState } from "react";
import "./AdminPage.css"
import AdminModel from "../../Models/AdminModel";
import store from "../../Redux/Store";
import { Button, FormControl,TextField, FormControlLabel, Switch, ToggleButtonGroup, ToggleButton } from "@mui/material";
import adminService from "../../Services/Admin";
import notify from "../../Services/Notify";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Link } from "react-router-dom";

function AdminPage(): JSX.Element {
    const daysMap = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"];
    const [adminData, setAdminData] = useState<AdminModel>(store.getState().linesState.currentAdmin);
    const [vacationStart, setVacationStart] = useState<number>();
    const [vacationEnd, setVacationEnd] = useState<number>();
    const [isLoading, setIsLoading] = useState<boolean>(false);


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

    const handleHoursChange = (value: string, arrIndex: number, startEndIndex: number) => {
        const newArr = [...adminData.workingDays];
        let elementToChange = newArr[arrIndex];
        const elementArr = elementToChange.split("-");
        elementArr[startEndIndex] = value;
        elementToChange = elementArr.join("-");
        newArr[arrIndex] = elementToChange;
        setAdminData(prev => ({ ...prev, workingDays: newArr }));
    }

    const handleDayOnOff = (index: number) => {

        if (adminData.workingDays[index] !== null) {
            const newArr = [...adminData.workingDays];
            newArr[index] = null;
            return setAdminData(prev => ({ ...prev, workingDays: newArr }));
        }
        const defaultTime = "10:00-18:00";
        const newArr = [...adminData.workingDays];
        newArr[index] = defaultTime;
        setAdminData(prev => ({ ...prev, workingDays: newArr }));
    }
    const messageOnOff = () => {
        if (adminData.message) {
            return setAdminData(prev => ({ ...prev, message: '' }));
        }
        setAdminData(prev => ({ ...prev, message: 'הכנס הודעה חדשה...' }));
    }

    const saveChanges = async () => {
        setIsLoading(true);
        await adminService.updateCurrentAdminAsync(adminData);
        setIsLoading(false);
    }

    return (
        <div className="AdminPage">
            <ToggleButtonGroup
                color="primary"
                value="settings"
                exclusive
                aria-label="Platform"
            >
                <Link to="/manage/lines"><ToggleButton value="lines">רשימת תורים</ToggleButton></Link>
                <ToggleButton value="settings">הגדרות</ToggleButton>
            </ToggleButtonGroup>
            {adminData && <>
                <h4>הודעת פתיחה : </h4>
                <div className="openMessage">
                    <FormControlLabel sx={{ direction: "ltr", margin: '5px' }} control={<Switch checked={adminData.message !== ''} />} label=":הצג הודעת פתיחה " onClick={messageOnOff} />
                    <TextField disabled={adminData.message === ''} sx={{ backgroundColor: "#cecece" }} multiline label="הודעת פתיחה" value={adminData.message} onChange={(event) => setAdminData(prev => ({ ...prev, message: event?.currentTarget?.value }))} />
                </div>
                <h4> שעות עבודה :</h4>
                <div className="adminWorkingDays">
                    {daysMap.map((d, i) => {
                        let startDate = new Date().setHours(10, 0);
                        let endDate = new Date().setHours(18, 0);
                        if (adminData.workingDays[i]) {
                            const startHours = adminData.workingDays[i].split("-")[0].split(":")[0];
                            const startMinutes = adminData.workingDays[i].split("-")[0].split(":")[1];
                            startDate = new Date().setHours(+startHours, +startMinutes);
                            const endHours = adminData.workingDays[i].split("-")[1].split(":")[0];
                            const endMinutes = adminData.workingDays[i].split("-")[1].split(":")[1];
                            endDate = new Date().setHours(+endHours, +endMinutes);
                        }
                        return <>
                            <h6 key={d}>יום {d} :</h6>
                            <div className="dayDiv" key={i}>
                                <Switch checked={adminData.workingDays[i] !== null} onChange={event => { handleDayOnOff(i) }} />
                                <TimePicker disabled={!adminData.workingDays[i]} sx={{ maxWidth: "20vw" }} value={dayjs(startDate)}
                                    onAccept={(val: Dayjs) => handleHoursChange(val.hour() + ":" + (val.minute().toLocaleString().length === 1 ? "0" + val.minute().toLocaleString() : val.minute()), i, 0)}
                                />
                                <span style={{ fontSize: 60 }}> - </span>
                                <TimePicker disabled={!adminData.workingDays[i]} sx={{ maxWidth: "20vw" }} value={dayjs(endDate)}
                                    onAccept={(val: Dayjs) => handleHoursChange(val.hour() + ":" + (val.minute().toLocaleString().length === 1 ? "0" + val.minute().toLocaleString() : val.minute()), i, 1)}
                                />
                            </div>
                        </>
                    })}
                </div>
                <h4>זמן תור :</h4>
                <FormControl sx={{ mb: 2 }}>
                    <TextField value={adminData.minutesPerLine} onChange={event => setAdminData(prev => ({ ...prev, minutesPerLine: +event.currentTarget.value }))} label="מספר דקות לכל תור " dir="ltr" margin="dense" required type="number" id="minutes-input" variant="outlined"/>
                </FormControl>
                <div className="vacations-div">
                    <h4>חופשות  :</h4>
                    {adminData.vacations.map(v => {
                        const start = v.split("-")[0];
                        const end = v.split("-")[1];

                        return <div className="vacation-line" key={v}>
                            <DatePicker disabled defaultValue={dayjs(new Date(+start).getTime())} sx={{ direction: "ltr" }} label="התחלה" />
                            <DatePicker disabled defaultValue={dayjs(new Date(+end).getTime())} sx={{ direction: "ltr" }} label="סיום" />
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
                <Button disabled={isLoading} onClick={saveChanges} sx={{ margin: "1rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} type="submit" variant="contained" color="success">שמירה</Button>
                <Button onClick={() => adminService.getCurrentAdminAsync().then(res => setAdminData(res))} sx={{ margin: "1rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} type="submit" variant="contained" color="warning">ביטול</Button>
            </div>
        </div>
    )
}
export default AdminPage;