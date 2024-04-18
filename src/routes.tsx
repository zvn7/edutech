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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/beranda-siswa",
    element: <BerandaSiswa />,
  },
  {
    path: "/beranda-guru",
    element: <BerandaGuru />,
  },
  {
    path: "/beranda-admin",
    element: <BerandaAdmin />,
  },
  {
    path: "/tugas-siswa",
    element: <TugasSiswa />,
  },
  {
    path: "/tugas-guru",
    element: <TugasGuru />,
  },
  {
    path: "/materi-siswa",
    element: <MateriSiswa />,
  },
  {
    path: "/materi-guru",
    element: <MateriGuru />,
  },
  {
    path: "/penilaian",
    element: <Penilaian />,
  },
  {
    path: "/penilaian/koreksi",
    element: <Koreksi />,
  },
  {
    path: "/mapel",
    element: <Mapel />,
  },
  {
    path: "/rekap-absensi",
    element: <AbsensiAdmin />,
  },
  {
    path: "/data-absensi",
    element: <HasilAbsensiAdmin />,
  },
  {
    path: "/jadwal-admin",
    element: <JadwalAdmin />,
  },
  {
    path: "/jadwal-siswa",
    element: <JadwalSiswa />,
  },
  {
    path: "/jadwal/tambah-jadwal",
    element: <TambahJadwalAdmin />,
  },
  {
    path: "/jadwal/edit-jadwal",
    element: <EditJadwalAdmin />,
  },
  {
    path: "/pengguna-guru",
    element: <Guru />,
  },
  {
    path: "/pengguna-guru/tambah-guru",
    element: <TambahGuru />,
  },
  {
    path: "/pengguna-guru/edit-guru/:id",
    element: <EditGuru />,
  },
  {
    path: "/pengguna-siswa",
    element: <Siswa />,
  },
  {
    path: "/pengguna-siswa/tambah-siswa",
    element: <TambahSiswa />,
  },
  {
    path: "/pengguna-siswa/edit-siswa/:id",
    element: <EditSiswa />,
  },
  {
    path: "/profile-siswa",
    element: <ProfilSiswa />,
  },
  {
    path: "/profile-guru",
    element: <ProfilGuru />,
  },
]);
export default router;
