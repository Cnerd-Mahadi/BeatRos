import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useProduct = () => {
	return useSelector((state: RootState) => state.products);
};
