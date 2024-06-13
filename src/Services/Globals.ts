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
    public registerUrl = "https://polar-garden-74885-12cdd1b0d0eb.herokuapp.com/api/auth/register";
    public loginUrl = "https://polar-garden-74885-12cdd1b0d0eb.herokuapp.com/api/auth/login";
    public productsUrl = "https://polar-garden-74885-12cdd1b0d0eb.herokuapp.com/api/products";
    public ordersUrl = "https://polar-garden-74885-12cdd1b0d0eb.herokuapp.com/api/orders";
    public messagesUrl = "https://polar-garden-74885-12cdd1b0d0eb.herokuapp.com/api/message";

}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;