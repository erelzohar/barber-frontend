class AdminModel {
    constructor(admin: AdminModel) {
        if (admin._id) this._id = admin._id;
        if (admin.username) this.username = admin.username;
        if (admin.name) this.name = admin.name;
        if (admin.phone) this.phone = admin.phone;
        if (admin.password) this.password = admin.password;
        if (admin.minutesPerLine) this.minutesPerLine = admin.minutesPerLine;
        if (admin.message) this.message = admin.message;
        if (admin.workingDays) this.workingDays = admin.workingDays;
        if (admin.vacations) this.vacations = admin.vacations;
    }
    public _id: string;
    public username: string;
    public vacations: string[];
    public workingDays: string[];
    public name: string;
    public message: string;
    public minutesPerLine: number;
    public phone: string;
    public password: string;
    public token: string;


    public static convertToFormData(admin: AdminModel): FormData {
        const formData = new FormData();
        if (admin._id) formData.append("_id", admin._id);
        formData.append("username", admin.username);
        formData.append("name", admin.name);
        formData.append("phone", admin.phone);
        formData.append("password", admin.password);
        formData.append("vacations",JSON.stringify(admin.vacations));
        formData.append("workingDays", JSON.stringify(admin.workingDays));
        formData.append("message", admin.message);
        formData.append("minutesPerLine", admin.minutesPerLine.toString());
        return formData
    }
}

export default AdminModel;