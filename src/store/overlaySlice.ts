import { createSlice } from "@reduxjs/toolkit";

type OverlayType = {
	menu: boolean;
	userMenu: boolean;
	filterMenu: boolean;
};

const initialOverlay: OverlayType = {
	menu: false,
	userMenu: false,
	filterMenu: false,
};

const overlaySlice = createSlice({
	name: "overlay",
	initialState: initialOverlay,
	reducers: {
		menuOn: (state) => {
			state.menu = true;
		},

		menuOff: (state) => {
			state.menu = false;
		},
		userMenuOn: (state) => {
			state.userMenu = true;
		},

		userMenuOff: (state) => {
			state.userMenu = false;
		},
		filterMenuOn: (state) => {
			state.filterMenu = true;
		},

		filterMenuOff: (state) => {
			state.filterMenu = false;
		},
	},
});

export const overlayAction = overlaySlice.actions;
export const overlayReducer = overlaySlice.reducer;
