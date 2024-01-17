import React from "react";
import { Typography, Button } from "@mui/material";

interface ErrorDisplayProps {
	retry: () => void;
	message: string;
	noFavorites?: boolean;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ retry, message, noFavorites }) => (
	<>
		{noFavorites ? (
			<>
				<Typography variant="h1" color="error">
					No hay noticias favoritas
				</Typography>
				<Typography variant="body1">
					Agrega noticias a tus favoritas para verlas aquí.
				</Typography>
			</>
		) : (
			<>
				<Typography variant="h1" color="error">
					Error al cargar la información de noticias
				</Typography>
				<Typography variant="body1">{message}</Typography>
				<Button variant="outlined" onClick={retry}>
					Intentar de Nuevo
				</Button>
			</>
		)}
	</>
);

export default ErrorDisplay;
