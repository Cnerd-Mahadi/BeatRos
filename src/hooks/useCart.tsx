import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useCart = () => {
	return useSelector((state: RootState) => state.cart);
};
