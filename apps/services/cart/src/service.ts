import { HttpError, STATUS } from "shared";

export const testCart = (testBool: boolean = false) => {
	if (testBool) {
		throw new HttpError(STATUS.BAD_REQUEST, "Very Bad One");
	}
	return "Good To Go";
};
