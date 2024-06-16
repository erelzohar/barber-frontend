import { Slide } from "react-awesome-reveal";
import DatePickerComponent from "./DatePicker";
import LineCard from "./LineCard";
import { useState } from "react";
import { useEffect } from "react"
import adminService from "../Services/Admin";
import AdminModel from "../Models/AdminModel";
import LineModel from "../Models/LineModel";
import linesService from "../Services/Lines";
import store from "../Redux/Store";

function LinePicker() {
  const [adminData, setAdminData] = useState<AdminModel>(store.getState().linesState.currentAdmin);
  const [linesData, setLinesData] = useState<LineModel[]>(store.getState().linesState.lines);
  const [date, setDate] = useState<number>(new Date().getTime());
  const daysMap = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"];
  const fixedDate = new Date(date);

  useEffect(() => {
    if (!adminData) adminService.getCurrentAdminAsync()
      .then(res => setAdminData(res));
    if (linesData.length === 0) linesService.getAllLinesAsync()
      .then(res => setLinesData(res));
  }, [])

  const todayWorkingHours = adminData?.workingDays[new Date(date).getDay()].split("-");//10:00-18:00

  const linesMap = (workingHours: string[], epochDate: number, linesArr: LineModel[]): number[] => {
    if (!workingHours || workingHours[0] === '') return [];
    const workStart = new Date(epochDate).setHours(+(workingHours[0].split(":")[0]), +(workingHours[0].split(":")[1]), 0, 0);
    const workEnd = new Date(epochDate).setHours(+(workingHours[1].split(":")[0]), +(workingHours[1].split(":")[1]), 0, 0);
    const miliseconds = adminData.minutesPerLine * 60 * 1000;
    const availableLines = [];

    for (let nextLine = workStart; nextLine <= workEnd; nextLine += miliseconds) {
      if (nextLine >= new Date().getTime()) {
        if (linesArr.findIndex(l => +l.timestamp === nextLine) !== -1) continue;
        availableLines.push(nextLine);
      }
    }
    return availableLines;
  }
  return (
    <section id="LinePicker">
      <Slide triggerOnce duration={1300}>
        <h1>זימון תור אונליין</h1>
        <div className="row education">
          <DatePickerComponent {...{ epochDate: date, setDate, vacations: (adminData ? adminData.vacations : []) }} />
        </div>
        <h1>תורים פנויים ליום  {daysMap[fixedDate.getDay()] + ` ${fixedDate.getDate()}/${(+fixedDate.getMonth() + 1)}`}:</h1>
        <div className="linesList">
          {adminData && linesMap(todayWorkingHours, date, linesData).length === 0 ? <h3 style={{ textAlign: "center" }}> אין תורים פנויים נסה תאריך אחר</h3> : adminData && linesMap(todayWorkingHours, date, linesData).map(l => <LineCard key={l} epochDate={l} setLines={setLinesData} />)}
        </div>
      </Slide>
    </section>
  );

}

export default LinePicker;
