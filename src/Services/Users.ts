import { JwtPayload, jwtDecode } from "jwt-decode";
import AdminModel from "../Models/AdminModel";
import notify from "./Notify";
import CredentialsModel from "../Models/Credentials";
import globals from "./Globals";
import jwtAxios from "./JwtAxios";
import store from "../Redux/Store";
import { adminLoggedIn } from "../Redux/Reducers/admin.slice";

class UsersService {

    public SaveUserLocal(user: AdminModel) {
        const newUser = { ...user }
        delete newUser.password;
        delete newUser._id;
        delete newUser.username;
        const string = JSON.stringify(newUser);
        localStorage.setItem("barbershopuser", string);
    }
    public checkUserExp() {
        let user;
        if (localStorage.getItem('barbershopuser')) {
            try {
                user = JSON.parse(localStorage.getItem('barbershopuser'));
            }
            catch {
                user = null;
            }
        }
        if (!user?.token) return null;
        const decodedToken: JwtPayload = jwtDecode(user.token);
        if (decodedToken.exp < Date.now() / 1000) {
            localStorage.removeItem('barbershopuser');
            notify.custom("אנא התחבר מחדש");
            return null;
        }
        return user;
    }

    public async login(credentials: CredentialsModel): Promise<AdminModel> {
        const formData = new FormData();
        formData.append("username", credentials.username);
        formData.append("password", credentials.password);

        const res = await jwtAxios.post<AdminModel>(globals.loginUrl, formData);
        if (!res) return null;
        store.dispatch(adminLoggedIn(res.data));
        usersService.SaveUserLocal(res.data);
        notify.success('!התחברת בהצלחה');
        return res.data;
    }

}

const usersService = new UsersService();

export default usersService;