import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import MateriSiswa from "./pages/Materi/Materi Siswa/MateriSiswa";
import TugasSiswa from "./pages/Tugas/Tugas Siswa/TugasSiswa";
import MateriGuru from "./pages/Materi/Materi Guru/MateriGuru";
import TugasGuru from "./pages/Tugas/Tugas Guru/TugasGuru";
import Penilaian from "./pages/Penilaian/Penilaian";
import Koreksi from "./pages/Penilaian/Koreksi/Koreksi";
import Mapel from "./pages/Mapel/Mapel";
import Guru from "./pages/Pengguna/Guru/Guru";
import Siswa from "./pages/Pengguna/Siswa/Siswa";
import BerandaSiswa from "./pages/Beranda/BerandaSiswa/BerandaSiswa";
import AbsensiAdmin from "./pages/Absensi/RekapAbsensi/AbsensiAdmin";
import HasilAbsensiAdmin from "./pages/Absensi/HasilAbsensiAdmin/HasilAbsensiAdmin";
import JadwalAdmin from "./pages/Jadwal/JadwalAdmin/JadwalAdmin";
import TambahJadwalAdmin from "./pages/Jadwal/JadwalAdmin/TambahJadwalAdmin/TambahJadwalAdmin";
import EditJadwalAdmin from "./pages/Jadwal/JadwalAdmin/EditJadwalAdmin/EditJadwalAdmin";
import TambahSiswa from "./pages/Pengguna/Siswa/TambahSiswa/TambahSiswa";
import EditSiswa from "./pages/Pengguna/Siswa/EditSiswa/EditSiswa";
import TambahGuru from "./pages/Pengguna/Guru/TambahGuru/TambahGuru";
import EditGuru from "./pages/Pengguna/Guru/EditGuru/EditGuru";
import ProfilSiswa from "./pages/Profile/ProfilSiswa/ProfilSiswa";
import ProfilGuru from "./pages/Profile/ProfilGuru/ProfilGuru";
import BerandaAdmin from "./pages/Beranda/BerandaAdmin/BerandaAdmin";
import BerandaGuru from "./pages/Beranda/BerandaGuru/BerandaGuru";
import JadwalSiswa from "./pages/Jadwal/JadwalSiswa/JadwalSiswa";
import ProtectedRoute from "./hoc/ProtectedRoute";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/not-found",
		element: <NotFound />,
	},
	{
		path: "/beranda-siswa",
		element: (
			<ProtectedRoute requiredRole="3">
				<BerandaSiswa />,
			</ProtectedRoute>
		),
	},
	{
		path: "/beranda-guru",
		element: (
			<ProtectedRoute requiredRole="2">
				<BerandaGuru />
			</ProtectedRoute>
		),
	},
	{
		path: "/beranda-admin",
		element: (
			<ProtectedRoute requiredRole="1">
				<BerandaAdmin />
			</ProtectedRoute>
		),
	},
	{
		path: "/tugas-siswa",
		element: (
			<ProtectedRoute requiredRole="3">
				<TugasSiswa />
			</ProtectedRoute>
		),
	},
	{
		path: "/tugas-guru",
		element: (
			<ProtectedRoute requiredRole="2">
				<TugasGuru />
			</ProtectedRoute>
		),
	},
	{
		path: "/materi-siswa",
		element: (
			<ProtectedRoute requiredRole="3">
				<MateriSiswa />
			</ProtectedRoute>
		),
	},
	{
		path: "/materi-guru",
		element: (
			<ProtectedRoute requiredRole="2">
				<MateriGuru />
			</ProtectedRoute>
		),
	},
	{
		path: "/penilaian",
		element: (
			<ProtectedRoute requiredRole="2">
				<Penilaian />
			</ProtectedRoute>
		),
	},
	{
		path: "/penilaian/koreksi/:id",
		element: (
			<ProtectedRoute requiredRole="2">
				<Koreksi />
			</ProtectedRoute>
		),
	},
	{
		path: "/mapel",
		element: (
			<ProtectedRoute requiredRole="3">
				<Mapel />
			</ProtectedRoute>
		),
	},
	{
		path: "/rekap-absensi",
		element: (
			<ProtectedRoute requiredRole="1">
				<AbsensiAdmin />
			</ProtectedRoute>
		),
	},
	{
		path: "/data-absensi",
		element: (
			<ProtectedRoute requiredRole="1">
				<HasilAbsensiAdmin />
			</ProtectedRoute>
		),
	},
	{
		path: "/jadwal-admin",
		element: (
			<ProtectedRoute requiredRole="1">
				<JadwalAdmin />
			</ProtectedRoute>
		),
	},
	{
		path: "/jadwal-siswa",
		element: (
			<ProtectedRoute requiredRole="3">
				<JadwalSiswa />
			</ProtectedRoute>
		),
	},
	{
		path: "/jadwal-admin/tambah-jadwal",
		element: (
			<ProtectedRoute requiredRole="1">
				<TambahJadwalAdmin />
			</ProtectedRoute>
		),
	},
	{
		path: "/jadwal-admin/edit-jadwal/:id",
		element: (
			<ProtectedRoute requiredRole="1">
				<EditJadwalAdmin />
			</ProtectedRoute>
		),
	},
	{
		path: "/pengguna-guru",
		element: (
			<ProtectedRoute requiredRole="2">
				<Guru />
			</ProtectedRoute>
		),
	},
	{
		path: "/pengguna-guru/tambah-guru",
		element: (
			<ProtectedRoute requiredRole="2">
				<TambahGuru />
			</ProtectedRoute>
		),
	},
	{
		path: "/pengguna-guru/edit-guru/:id",
		element: (
			<ProtectedRoute requiredRole="2">
				<EditGuru />
			</ProtectedRoute>
		),
	},
	{
		path: "/pengguna-siswa",
		element: (
			<ProtectedRoute requiredRole="3">
				<Siswa />
			</ProtectedRoute>
		),
	},
	{
		path: "/pengguna-siswa/tambah-siswa",
		element: (
			<ProtectedRoute requiredRole="3">
				<TambahSiswa />
			</ProtectedRoute>
		),
	},
	{
		path: "/pengguna-siswa/edit-siswa/:id",
		element: (
			<ProtectedRoute requiredRole="3">
				<EditSiswa />
			</ProtectedRoute>
		),
	},
	{
		path: "/profile-siswa",
		element: (
			<ProtectedRoute requiredRole="3">
				<ProfilSiswa />
			</ProtectedRoute>
		),
	},
	{
		path: "/profile-guru",
		element: (
			<ProtectedRoute requiredRole="2">
				<ProfilGuru />
			</ProtectedRoute>
		),
	},
]);
export default router;
