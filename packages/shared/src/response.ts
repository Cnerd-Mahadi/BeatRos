export enum STATUS {
	OK = 200,
	CREATED = 201,

	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	NOT_FOUND = 404,
	SERVER_ERROR = 500,
}

export function isError(code: number) {
	return code >= 400;
}

export function isSuccess(code: number) {
	return code >= 200 && code < 300;
}

export class HttpError extends Error {
	status: number;
	constructor(status: number, message: string) {
		super(message);
		this.status = status;

		Object.setPrototypeOf(this, HttpError.prototype);
	}
}
