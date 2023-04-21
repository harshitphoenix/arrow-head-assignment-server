export class GeneralResponse {
	status: number;
	msg: string;
	hasError: boolean;
	data: object;

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
