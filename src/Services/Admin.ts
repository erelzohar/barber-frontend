import AdminModel from "../Models/AdminModel";
import { setCurrentAdmin } from "../Redux/Reducers/lines.slice";
import store from "../Redux/Store";
import globals from "./Globals";
import jwtAxios from "./JwtAxios";
import notify from "./Notify";

class AdminService {


    public async getCurrentAdminAsync(): Promise<AdminModel> {
        try {
            if (store.getState().linesState.currentAdmin) return store.getState().linesState.currentAdmin;
            const response = await jwtAxios.get<AdminModel>(globals.adminUrl);
            store.dispatch(setCurrentAdmin(response.data));
            return response.data;
        }
        catch (err) {
            notify.error(err);
            return null;
        }

    }


}
const adminService = new AdminService();
export default adminService;