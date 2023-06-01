import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { overlayAction } from "../../store/overlaySlice";
import { RootState } from "../../store/store";

export const DropDown = () => {
	const userMenu = useSelector((state: RootState) => state.overlay.userMenu);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleuserMenuOff = () => {
		dispatch(overlayAction.userMenuOff());
	};

	return (
		<>
			<div
				className={`drop-down ${!userMenu && "menu-off"}`}
				onMouseLeave={handleuserMenuOff}>
				<Link className="drop-down__link" to="/signup">
					<div className="drop-down__item" onClick={handleuserMenuOff}>
						SignUp
					</div>
				</Link>
				<Link className="drop-down__link" to="/signin">
					<div className="drop-down__item" onClick={handleuserMenuOff}>
						SignIn
					</div>
				</Link>

				<div
					className="drop-down__item"
					onClick={() => {
						localStorage.removeItem("username");
						navigate("/");
					}}>
					LogOut
				</div>
			</div>
		</>
	);
};
