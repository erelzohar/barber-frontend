import { StaticDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface DatePickerProps {
    vacations: string[];
    epochDate: number;
    setDate: React.Dispatch<React.SetStateAction<number>>;
}

function DatePickerComponent(props: DatePickerProps) {
    const daysMap = {
        "א׳" : "ראשון",
        "ב׳" : "שני",
        "ג׳" : "שלישי",
        "ד׳" : "רביעי",
        "ה׳" : "חמישי",
        "ו׳" : "שישי",
    }
    return (<>
        {props.vacations &&
            <StaticDatePicker
                shouldDisableDate={(day) => {
                    if (day.day() === 6) return true;
                    for (let i = 0; i < props.vacations.length; i++) {
                        const start = +props.vacations[i].split("-")[0];
                        const end = +props.vacations[i].split("-")[1];
                        return (day.valueOf() >= start) && (day.valueOf() <= end);
                    }
                }}
                disablePast
                showDaysOutsideCurrentMonth
                maxDate={dayjs().add(1, 'month')}
                view="day"
                sx={{
                    direction: 'ltr', '.MuiDateCalendar-root': {
                        color: '#000000',
                        borderRadius: '18px',
                        borderWidth: '1px',
                        borderColor: '#c0d6e4',
                        border: '2px solid #c0d6e4',
                        backgroundColor: '#F0F8FF',
                        direction: 'rtl'
                    },
                    '.MuiPickersCalendarHeader-root': { direction: 'ltr' }
                }}
                value={dayjs(props.epochDate)}
                // dayOfWeekFormatter={(day:string)=>daysMap[day]}
                onChange={(newValue) => {
                    if (newValue) props.setDate(newValue.valueOf());
                }}
            />
        }
    </>
    )
}
export default DatePickerComponent;
