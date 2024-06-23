import SMSModel from "../Models/SMSModel";
import globals from "./Globals";
import jwtAxios from "./JwtAxios";
import notify from "./Notify";
import {Buffer} from "buffer";

class SMSService {
    public async sendSMS(sms: SMSModel): Promise<number> {
        try {
            sms.message = Buffer.from(sms.message).toString("base64");
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