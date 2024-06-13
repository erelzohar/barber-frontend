import { StaticDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface DatePickerProps {
    epochDate: number;
    setDate: React.Dispatch<React.SetStateAction<number>>;
}
function DatePickerComponent(props: DatePickerProps) {
    return (
        <StaticDatePicker
            shouldDisableDate={(day) => day.day() === 6}
            disablePast
            showDaysOutsideCurrentMonth
            sx={{
                direction: 'ltr', '.MuiDateCalendar-root': {
                    color: '#000000',
                    borderRadius: '18px',
                    borderWidth: '1px',
                    borderColor: '#c0d6e4',
                    border: '2px solid #c0d6e4',
                    backgroundColor: '#F0F8FF',
                }
            }}
            value={dayjs(props.epochDate)}
            onChange={(newValue) => {
                if (newValue) props.setDate(newValue.valueOf());
                console.log(newValue);

            }}
        />
    )
}
export default DatePickerComponent;
