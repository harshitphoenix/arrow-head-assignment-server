"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralResponse = void 0;
class GeneralResponse {
    constructor(status = 200, msg = "", hasError = false, data = {}) {
        this.status = status;
        this.msg = msg;
        this.hasError = hasError;
        this.data = data;
    }
    getResponse() {
        return {
            status: this.status,
            msg: this.msg,
            hasError: this.hasError,
            data: this.data,
        };
    }
}
exports.GeneralResponse = GeneralResponse;
//# sourceMappingURL=Response.js.map