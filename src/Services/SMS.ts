import SMSModel from "../Models/SMSModel";
import globals from "./Globals";
import jwtAxios from "./JwtAxios";
import notify from "./Notify";

class SMSService {
    public async sendSMS(sms: SMSModel): Promise<number> {
        try {
            const res = await jwtAxios.post<SMSModel>(globals.smsUrl, SMSModel.convertToFormData(sms));
            return res.status;
        }
        catch (err) {
            notify.error(err);
            return null;
        }
    }
}
const smsService = new SMSService();
export default smsService;