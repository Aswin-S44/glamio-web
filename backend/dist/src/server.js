"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("./modules/users/user.routes"));
const service_routes_1 = __importDefault(require("./modules/services/service.routes"));
const expert_routes_1 = __importDefault(require("./modules/experts/expert.routes"));
const offer_routes_1 = __importDefault(require("./modules/offers/offer.routes"));
const slot_routes_1 = __importDefault(require("./modules/slots/slot.routes"));
const appointment_routes_1 = __importDefault(require("./modules/appointments/appointment.routes"));
const shop_routes_1 = __importDefault(require("./modules/shops/shop.routes"));
const customer_routes_1 = __importDefault(require("./modules/customers/customer.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
var corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Middlewares
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ limit: "10mb", extended: true }));
app.use((0, cors_1.default)(corsOptions));
// Routes
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/user", user_routes_1.default);
app.use("/api/v1/services", service_routes_1.default);
app.use("/api/v1/expert", expert_routes_1.default);
app.use("/api/v1/offers", offer_routes_1.default);
app.use("/api/v1/slots", slot_routes_1.default);
app.use("/api/v1/appointments", appointment_routes_1.default);
app.use("/api/v1/shops", shop_routes_1.default);
app.use("/api/v1/customer", customer_routes_1.default);
app.get("/", (req, res) => {
    res.send("API is working");
});
app.listen(port, () => {
    console.log(`Server is running at the port ${port}`);
});
