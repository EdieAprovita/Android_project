import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
	palette: {
		primary: {
			main: "#007BDF",
			light: "#006DC6",
		},
		secondary: {
			main: "#00CBFF",
			light: "#00BFF0",
		},
		info: {
			main: "#FBA905",
			light: "#F1A000",
		},
		success: {
			main: "#00FF00",
			light: "#33FF33",
		},
		error: {
			main: "#FF0000",
			light: "#FF3333",
		},
		background: {
			default: "#FAFDFF",
		},
		text: {
			primary: "#53575A",
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				":root": {
					"--first-color": "#007BDF",
					"--first-color-alt": "#006DC6",
					"--second-color": "#00CBFF",
					"--second-color-alt": "#00BFF0",
					"--accent-color": "#FBA905",
					"--accent-color-alt": "#F1A000",
					"--success-color": "#00FF00",
					"--success-color-alt": "#33FF33",
					"--error-color": "#FF0000",
					"--error-color-alt": "#FF3333",
					"--dark-color": "#282D31",
					"--dark-color-alt": "#141618",
					"--border-color": "#DFE0E0",
					"--text-color": "#53575A",
					"--body-bg": "#FAFDFF",
				},
			},
		},
	},
});

export default Theme;
