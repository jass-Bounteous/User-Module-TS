"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.isInValid = exports.addUserService = void 0;
const userSchema_1 = __importDefault(require("../schema/userSchema"));
const addUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const resData = yield userSchema_1.default.create(user);
    return resData;
});
exports.addUserService = addUserService;
const isInValid = (data) => {
    console.log(data);
    return !(data.name &&
        data.mobile_no &&
        data.email &&
        data.password &&
        data.emp_code);
};
exports.isInValid = isInValid;
const checkUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.default.findById(id);
    if (user)
        return true;
    return false;
});
exports.checkUser = checkUser;
