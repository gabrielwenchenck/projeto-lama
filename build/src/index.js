"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const pingRouter_1 = require("./router/pingRouter");
const showRouter_1 = require("./router/showRouter");
const userRouter_1 = require("./router/userRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`);
});
app.use("/ping", pingRouter_1.pingRouter);
app.use("/users", userRouter_1.userRouter);
app.use("/shows", showRouter_1.showRouter);
//# sourceMappingURL=index.js.map