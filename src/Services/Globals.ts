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
}

class ProductionGlobals extends Globals {
    public linesUrl = "http://barber-backend-app-308bdd2961da.herokuapp.com/api/line";
    public adminUrl = "http://barber-backend-app-308bdd2961da.herokuapp.com/api/admin";
    public loginUrl = "http://barber-backend-app-308bdd2961da.herokuapp.com/api/auth/login";
    public smsUrl = "http://barber-backend-app-308bdd2961da.herokuapp.com/api/sms";
    public ordersUrl = "http://barber-backend-app-308bdd2961da.herokuapp.com/api/orders";
    public messagesUrl = "http://barber-backend-app-308bdd2961da.herokuapp.com/api/message";
}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;