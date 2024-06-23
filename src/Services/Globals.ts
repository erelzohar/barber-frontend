abstract class Globals {
    public linesUrl:string;
    public loginUrl :string;
    public adminUrl:string;
    public smsUrl:string;
}

class DevelopmentGlobals extends Globals {
    public linesUrl = "http://localhost:3001/api/line";
    public adminUrl = "http://localhost:3001/api/admin";
    public loginUrl = "http://localhost:3001/api/auth/login";
    public smsUrl = "http://localhost:3001/api/sms";
    public ordersUrl = "http://localhost:3001/api/orders";
    public messagesUrl = "http://localhost:3001/api/message";
    public imagesUrl = "http://localhost:3001/api/admin/img";
}

class ProductionGlobals extends Globals {
    public linesUrl = "https://barber-backend-app-308bdd2961da.herokuapp.com/api/line";
    public adminUrl = "https://barber-backend-app-308bdd2961da.herokuapp.com/api/admin";
    public loginUrl = "https://barber-backend-app-308bdd2961da.herokuapp.com/api/auth/login";
    public smsUrl = "https://barber-backend-app-308bdd2961da.herokuapp.com/api/sms";
    public ordersUrl = "https://barber-backend-app-308bdd2961da.herokuapp.com/api/orders";
    public messagesUrl = "https://barber-backend-app-308bdd2961da.herokuapp.com/api/message";
    public imagesUrl = "https://barber-backend-app-308bdd2961da.herokuapp.com/api/admin/img";

}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;