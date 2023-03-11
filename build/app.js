"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config");
const errorHandler_1 = require("./midddleware/errorHandler");
const example_1 = __importDefault(require("./routes/example"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("common"));
app.use("/api", example_1.default);
app.use(() => {
    throw (0, http_errors_1.default)(404, "Route Not found ");
});
app.use(errorHandler_1.errorHandler);
mongoose_1.default
    .connect(config_1.DB)
    .then(() => {
    console.log("Database connected succefully...");
    app.listen(config_1.PORT, () => {
        console.log(`server is runnig at : http://localhost:${config_1.PORT}`);
    });
})
    .catch((error) => {
    console.log(error);
    throw (0, http_errors_1.default)(501, "Unable to connect DataBase !!!");
});
