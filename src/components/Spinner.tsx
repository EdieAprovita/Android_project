import React from "react";
import { CircularProgress } from "@mui/material";

const Spinner: React.FC = () => {
	return (
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
			<CircularProgress />
		</div>
	);
};

export default Spinner;
