import { Zoom } from 'react-awesome-reveal';
import LineModel from '../../Models/LineModel';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import linesService from '../../Services/Lines';
import { Call, Cancel, WhatsApp } from '@mui/icons-material';

interface AdminLineProps {
    line: LineModel;
}

export default function AdminLineCard(props: AdminLineProps) {
    const daysMap = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"];
    const date = new Date(+props.line.timestamp);
    const isToday = date.toDateString() === new Date().toDateString();

    return (
        <Zoom triggerOnce>
            {props.line &&
                <div className="AdminLineCard">
                    <h3>{props.line.name}</h3>
                    {isToday ? <h4>היום בשעה {date.toTimeString().substring(0, 5)}</h4> :
                        <h4>יום {daysMap[date.getDay()]}{` ${date.getDate()}.${(+date.getMonth() + 1)} בשעה ${date.toTimeString().substring(0, 5)}`}</h4>}

                    <div className="buttonsDiv" dir='ltr'>
                        <ButtonGroup orientation='vertical' variant="text" aria-label="Basic button group">
                            <IconButton onClick={async () => { await linesService.deleteLineAsync(props.line._id) }} title='ביטול' color='warning'><Cancel /></IconButton>
                            <a href={"tel:" + props.line.phone}><IconButton title='שיחה' color='primary'><Call /></IconButton></a>
                            <a href={"https://wa.me/+972" + props.line.phone.substring(1)}><IconButton title='WhatsApp' color='success'><WhatsApp /></IconButton></a>
                        </ButtonGroup>
                        {/* <a href={"tel:" + props.line.phone}><Button sx={{ margin: "0.5rem", padding: '1rem 0', borderRadius: '50%' }} type="submit" variant="contained" color="success"><Call fontSize='small'/></Button></a>
                        <Button sx={{ margin: "0.5rem", borderRadius: '40px' }} type="submit" variant="contained" color="warning" onClick={async () => await linesService.deleteLineAsync(props.line._id)}><Cancel/></Button> */}
                    </div>
                </div>
            }
        </Zoom>

    );
}
