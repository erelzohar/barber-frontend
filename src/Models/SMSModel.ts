
class SMSModel {
    phoneNumber: string;
    message: string;



    public static convertToFormData(message: SMSModel): FormData {
        const formData = new FormData();
        formData.append("phoneNumber", message.phoneNumber);
        formData.append("message", message.message);

        return formData;
    }






}

export default SMSModel;