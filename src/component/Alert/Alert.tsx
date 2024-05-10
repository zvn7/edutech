import { useEffect } from "react";
import Swal from "sweetalert2";

const Alert = ({ message }: { message?: string }) => {
	useEffect(() => {
		if (message) {
			Swal.fire({
				icon: "error",
				title: "Access Denied",
				text: message,
			});
		}
	}, [message]);

	return null;
};

export default Alert;
