import React from "react";
import { Typography, Button, Stack, Box } from "@mui/material";

interface ErrorDisplayProps {
	retry: () => void;
	message: string;
	noFavorites?: boolean;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ retry, message, noFavorites }) => {
	return (
		<Stack direction="column" justifyContent="center" alignItems="center">
			{noFavorites ? (
				<>
					<Box>
						<Typography variant="h5" color="error">
							No hay noticias favoritas
						</Typography>
					</Box>
					<Box>
						<Typography variant="body1">
							Agrega noticias a tus favoritas para verlas aquí.
						</Typography>
					</Box>
				</>
			) : (
				<>
					<Box>
						<Typography variant="h5" color="error">
							Error al cargar la información de noticias
						</Typography>
					</Box>
					<Box>
						<Typography variant="body1">{message}</Typography>
					</Box>
					<Box>
						<Button variant="outlined" onClick={retry}>
							Intentar de Nuevo
						</Button>
					</Box>
				</>
			)}
		</Stack>
	);
};

export default ErrorDisplay;
