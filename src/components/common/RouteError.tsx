import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const RouteError = () => {
	const error = useRouteError();
	return isRouteErrorResponse(error) ? (
		<div className="error-element">
			<h1>Sorry, This Page is not found. Check below for More Details</h1>
			<p>{error.status}</p>
			<p>{error.statusText}</p>
			{error.data?.message && <p>{error.data.message}</p>}
		</div>
	) : (
		<div>Oops</div>
	);
};
