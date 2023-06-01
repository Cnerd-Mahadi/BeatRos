import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useOverlay = () => {
	return useSelector((state: RootState) => state.overlay);
};
