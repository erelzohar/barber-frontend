
class LineModel {
    _id: string;
    name: string;
    timestamp: string;
    phone: string;


    public static convertToFormData(line: LineModel): FormData {
        const formData = new FormData();
        if (line._id) formData.append("_id", line._id);
        formData.append("name", line.name);
        formData.append("timestamp", line.timestamp);
        formData.append("phone", line.phone);
        return formData;
    }

}

export default LineModel;