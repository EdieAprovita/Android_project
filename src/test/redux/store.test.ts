import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../../redux/reducer";

describe("Store", () => {
	it("should return a store with the rootReducer", () => {
		const store = configureStore({
			reducer: rootReducer,
		});

		expect(store).toEqual(store);
	});
});
