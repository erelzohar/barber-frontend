import LineModel from "../Models/LineModel";
import { addLine, deleteLine, setLines } from "../Redux/Reducers/lines.slice";
import store from "../Redux/Store";
import globals from "./Globals";
import jwtAxios from "./JwtAxios";
import notify from "./Notify";

class LinesService {


    public async getAllLinesAsync(): Promise<LineModel[]> {
        try {
            if (store.getState().linesState.lines?.length > 0) return store.getState().linesState.lines;
            const response = await jwtAxios.get<LineModel[]>(globals.linesUrl);
            store.dispatch(setLines(response.data));
            return response.data;
        }
        catch (err) {
            notify.error(err);
            return null;
        }

    }

    public async getLineById(id: string) {
        try {
            if (store.getState().linesState.lines?.length > 0) {
                const index = store.getState().linesState.lines.findIndex(l => l._id === id);
                if (index !== -1) return store.getState().linesState.lines[index]
            }
            const response = await jwtAxios.get<LineModel>(globals.linesUrl + "/" + id);
            return response.data;
        }
        catch (err) {
            notify.error(err);
            return null;
        }
    }
    public async addLineAsync(newLine: LineModel): Promise<LineModel> {
        try {
            const response = await jwtAxios.post<LineModel>(globals.linesUrl, LineModel.convertToFormData(newLine));
            store.dispatch(addLine(response.data));
            return response.data;
        }
        catch (err) {
            notify.error(err);
            return null;
        }

    }
    public async deleteLineAsync(_id: string): Promise<LineModel> {
        try {
            const ok = window.confirm("לבטל את התור?");
            if (!ok) return;
            const response = await jwtAxios.delete(globals.linesUrl + "/" + _id);
            store.dispatch(deleteLine(_id));
            notify.success("נמחק בהצלחה");
            return response.data;
        }
        catch (err) {
            notify.error(err);
            return null;
        }

    }


}
const linesService = new LinesService();
export default linesService;