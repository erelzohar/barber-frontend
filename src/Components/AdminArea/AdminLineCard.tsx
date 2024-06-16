import { Zoom } from 'react-awesome-reveal';
import LineModel from '../../Models/LineModel';
import { Button } from '@mui/material';
import linesService from '../../Services/Lines';

interface AdminLineProps {
    line: LineModel;
}

export default function AdminLineCard(props: AdminLineProps) {
    const daysMap = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"];
    const date = new Date(+props.line.timestamp)
    return (
        <Zoom triggerOnce>
            {props.line &&
                <div className="AdminLineCard">
                    <h3>{props.line.name}</h3>
                    {/* היום */}
                    <h4>יום {daysMap[date.getDay()]}{` ${date.getDate()}.${(+date.getMonth() + 1)} בשעה ${date.toTimeString().substring(0, 5)}`}</h4>
                    <div className="buttonsDiv">
                        <a href={"tel:" + props.line.phone}><Button sx={{ margin: "1rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} type="submit" variant="contained" color="success">שיחה</Button></a>
                        <Button sx={{ margin: "1rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} type="submit" variant="contained" color="warning" onClick={async () =>await linesService.deleteLineAsync(props.line._id)}>ביטול</Button>
                    </div>
                </div>
            }
        </Zoom>

    );
}
