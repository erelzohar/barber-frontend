import { Link, useNavigate, useParams } from "react-router-dom";
import notify from "../Services/Notify";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LineModel from "../Models/LineModel";
import linesService from "../Services/Lines";



export default function CancelLine(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const lineId = params.lineId;
    const [lineToDelete, setLineToDelete] = useState<LineModel>();
    const [date, setDate] = useState<Date>();
    const daysMap = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"];
    const timeToCancelLine = 3600000;
    useEffect(() => {
        linesService.getLineById(lineId)
            .then(res => {
                if (res) {
                    if ((+res.timestamp - new Date().getTime()) < timeToCancelLine) return;
                    setLineToDelete(res);
                    setDate((new Date(+res.timestamp)));
                }
                else navigate("/*")
            })
    }, [params])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '600px',
        bgcolor: '#fff',
        boxShadow: 24,
        p: 4,
        borderRadius: '7px',
    }
    return <div className="CancelLine">
        <Modal
            sx={{ backgroundColor: '#cecece' }}
            open={true}
            // onClose={() => { setOpen(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box sx={style}>
                {lineToDelete ? <>
                    <Typography id="modal-modal-title" variant="h6" component="h1" style={{ margin: "3px", direction: "rtl", textAlign: 'center' }}>
                        {lineToDelete.name + " - " + lineToDelete.phone.replace("+972", "0")}
                        <br />
                        <h3>יום {daysMap[date.getDay()]}</h3>
                        <h3>{`${date.getDate()}.${(+date.getMonth() + 1)} - ${date.toTimeString().substring(0, 5)}`}</h3>
                    </Typography>
                    <Button onClick={async()=>linesService.deleteLineAsync(lineId)} sx={{ margin: "1rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} variant="contained" color="error">ביטול התור</Button>
                </>
                    : <>
                        <Typography id="modal-modal-title" variant="h6" component="h1" style={{ margin: "3px", direction: "rtl", textAlign: 'center' }}>
                            לא ניתן לבטל את התור צור קשר עם בית העסק
                        </Typography>
                        <Button sx={{ margin: "1rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} variant="contained" >
                            <Link style={{color:'#fff'}} to="/" >חזרה לדף הבית </Link>
                        </Button>
                    </>
                }

            </Box>

        </Modal>
    </div>
}