import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
	children,
	requiredRole,
}: {
	children: ReactNode;
	requiredRole: string;
}) => {
	const token = localStorage.getItem("token");

	if (!token) {
		// Jika tidak ada token, arahkan pengguna ke halaman login
		return <Navigate to={"/"} />;
	}

	// Mendapatkan informasi peran pengguna dari token
	const tokenData = JSON.parse(atob(token.split(".")[1]));
	const userRole = tokenData.role;

	// Periksa apakah peran pengguna memenuhi syarat yang diperlukan untuk mengakses rute ini
	if (!userRole || userRole !== requiredRole) {
		// Jika peran pengguna tidak memenuhi syarat, arahkan pengguna kembali ke halaman login
		return <Navigate to={"/not-found"} />;
	}

	// Jika peran pengguna memenuhi syarat, izinkan akses ke rute ini
	return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
