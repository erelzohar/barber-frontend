import { Zoom } from 'react-awesome-reveal';
import LineModel from '../../Models/LineModel';
import { Button } from '@mui/material';

interface AdminLineProps {
    line: LineModel;
}

export default function AdminLineCard(props: AdminLineProps) {

    return (
        <Zoom triggerOnce>
            {props.line &&
                <div className="AdminLineCard">
                    <h2>{props.line.name}</h2>
                    <h3>יום שלישי 24.2 בשעה 12:00</h3>
                    <div className="buttonsDiv">
                        <Button sx={{ margin: "1rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} type="submit" variant="contained" color="success">שיחה</Button>
                        <Button sx={{ margin: "1rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} type="submit" variant="contained" color="warning">ביטול</Button>
                    </div>
                </div>
            }
        </Zoom>

    );
}
