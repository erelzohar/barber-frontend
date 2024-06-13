import { useEffect, useState } from "react";
import LineModel from "../../Models/LineModel";
import store from "../../Redux/Store";
import linesService from "../../Services/Lines";
import AdminLineCard from "./AdminLineCard";


function LinesList(): JSX.Element {

    const [linesData, setLinesData] = useState<LineModel[]>(store.getState().linesState.lines);
    useEffect(() => {
        if (linesData.length === 0) linesService.getAllLinesAsync()
            .then(res => setLinesData(res));
    }, [])

    return <div className="LinesList">
        <h2 style={{ textAlign: 'center' }}>התורים שלך</h2>
        <div className="list-container">
            {linesData && linesData.map(l => <AdminLineCard line={l} />)}
        </div>
    </div>
}

export default LinesList;