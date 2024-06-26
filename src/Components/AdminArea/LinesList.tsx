import { useEffect } from "react";
import { useAppSelector } from "../../Redux/Store";
import linesService from "../../Services/Lines";
import AdminLineCard from "./AdminLineCard";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";


function LinesList(): JSX.Element {
    const linesData = useAppSelector(state => state.linesState.lines);

    useEffect(() => {
        if (linesData?.length === 0 || !linesData) linesService.getAllLinesAsync();
        const interval = setInterval(() => {
            linesService.getAllLinesAsync(true);
        }, 220000);
        return () => { clearInterval(interval); }
    }, [])

    return <div className="LinesList gradient-bg">
        <ToggleButtonGroup
            color="primary"
            value="lines"
            exclusive
            aria-label="Platform"
        >
            <ToggleButton value="lines">רשימת תורים</ToggleButton>
            <Link to="/manage/settings"> <ToggleButton value="settings">הגדרות</ToggleButton></Link>
        </ToggleButtonGroup>
        <h2 style={{ textAlign: 'center' }}>התורים שלך</h2>
        <div className="list-container">
            {linesData && linesData.map(l => <AdminLineCard key={l._id} line={l} />)}
        </div>
    </div>
}

export default LinesList;