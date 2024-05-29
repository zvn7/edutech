import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	Avatar,
	Dropdown,
	Navbar,
	NavbarBrand,
	NavbarToggle,
} from "flowbite-react";
import { AiFillHome } from "react-icons/ai";
import {
	FaBookBookmark,
	FaClipboardList,
	FaUserLarge,
	FaFileCircleCheck,
	FaCalendarDays,
	FaListCheck,
	FaBookOpen,
} from "react-icons/fa6";
import { FaUser, FaAngleDown } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";
import Swal from "sweetalert2";

const Navigation = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const location = useLocation();
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [absenMenuOpen, setAbsenMenuOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const toggleUserMenu = () => {
		setUserMenuOpen(!userMenuOpen);
	};

	useEffect(() => {
		const handleBodyClick = (event: any) => {
			const userMenu = document.getElementById("user-menu");
			if (userMenu && !userMenu.contains(event.target)) {
				setUserMenuOpen(false);
			}
		};

		document.body.addEventListener("click", handleBodyClick);

		return () => {
			document.body.removeEventListener("click", handleBodyClick);
		};
	}, []);

	useEffect(() => {
		const submenuLinks = ["/pengguna-guru", "/pengguna-siswa"];
		if (submenuLinks.includes(location.pathname)) {
			setUserMenuOpen(true);
		} else {
			setUserMenuOpen(false);
		}
	}, [location.pathname]);

	const toggleAbsenMenu = () => {
		setAbsenMenuOpen(!absenMenuOpen);
	};

	useEffect(() => {
		const handleBodyClick = (event: any) => {
			const userMenu = document.getElementById("absensi-menu");
			if (userMenu && !userMenu.contains(event.target)) {
				setAbsenMenuOpen(false);
			}
		};

		document.body.addEventListener("click", handleBodyClick);

		return () => {
			document.body.removeEventListener("click", handleBodyClick);
		};
	}, []);

	useEffect(() => {
		const submenuLinks = ["/rekap-absensi", "/data-absensi"];
		if (submenuLinks.includes(location.pathname)) {
			setAbsenMenuOpen(true);
		} else {
			setAbsenMenuOpen(false);
		}
	}, [location.pathname]);

	const navigate = useNavigate();

	const handleLogout = () => {
		Swal.fire({
			title: "Konfirmasi Logout",
			text: "Anda yakin ingin keluar?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Ya, Logout!",
		}).then((result) => {
			if (result.isConfirmed) {
				// Lakukan logout jika pengguna menekan tombol "Ya, Logout!"
				// Misalnya, panggil fungsi logout atau navigasi ke halaman login
				localStorage.removeItem("token");
				localStorage.removeItem("selectedAssignment");
				localStorage.removeItem("selectedLesson");
				navigate("/");
			}
		});
	};

	const [dataUser, setDataUser] = useState<any | null>([]);

	const decodeToken = (token: any) => {
		if (!token) {
			return null;
		}
		// JWT terdiri dari tiga bagian yang dipisahkan oleh titik
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
				.join("")
		);
		return JSON.parse(jsonPayload);
	};

	useEffect(() => {
		const fetchUserFromToken = () => {
			try {
				const token = localStorage.getItem("token");
				if (token) {
					const decodedToken = decodeToken(token);
					setDataUser(decodedToken);
				} else {
					console.log("No token found");
				}
			} catch (error) {
				console.log("Error decoding token:", error);
			}
		};
		fetchUserFromToken();
	}, []);

	const getClassName = (className: string) => {
		switch (className) {
			case "TKJ":
				return "Teknik Komputer Jaringan";
			case "RPL":
				return "Rekayasa Perangkat Lunak";
			case "TKR":
				return "Teknik Kendaraan Ringan";
			default:
				return className; // Kembalikan nilai className apa adanya jika tidak sesuai dengan kasus di atas
		}
	};
	return (
		<div>
			<Navbar className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
				<div className="flex gap-4">
					<NavbarToggle onClick={toggleSidebar} />
					<NavbarBrand href="#">
						<img
							src="/img/logo-edutech.png"
							className="h-8 md:h-9 lg:h-9"
							alt="Flowbite React Logo"
						/>
					</NavbarBrand>
				</div>
				<div className="flex gap-3">
					{/* profile */}
					<Dropdown
						arrowIcon={false}
						inline
						label={<Avatar alt="User" img="/img/user.jpg" rounded />}
					>
						{/* role admin */}
						<div>
							{dataUser.role === "1" && (
								<Dropdown.Header>
									<span className="block text-sm capitalize">
										{dataUser.NameAdmin}
									</span>
								</Dropdown.Header>
							)}
						</div>
						{/* role guru */}
						<div>
							{dataUser.role === "2" && (
								<>
									<Dropdown.Header>
										<span className="block text-sm capitalize">
											{dataUser.NameTeacher}
										</span>
										<span className="block truncate text-sm font-medium">
											{dataUser.Nip}
										</span>
									</Dropdown.Header>
									<Dropdown.Item icon={FaUserLarge}>
										<Link to="/profile-guru">Lihat Profil</Link>
									</Dropdown.Item>
								</>
							)}
						</div>

						{/* role siswa */}
						<div>
							{dataUser.role === "3" && (
								<>
									<Dropdown.Header>
										<span className="block text-sm capitalize">
											{dataUser.NameStudent}
										</span>
										<span className="block truncate text-sm font-medium">
											{getClassName(dataUser.ClassName)}
										</span>
									</Dropdown.Header>
									<Dropdown.Item icon={FaUserLarge}>
										<Link to="/profile-siswa">Lihat Profil</Link>
									</Dropdown.Item>
								</>
							)}
						</div>

						<Dropdown.Item icon={HiLogout} onClick={handleLogout}>
							Logout
						</Dropdown.Item>
					</Dropdown>
				</div>
			</Navbar>
			<div
				className={`fixed left-0 z-40 w-64 h-screen pt-14 transition-transform mt-6  overflow-y-auto ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				} bg-white border-r border-gray-200 sm:translate-x-0`}
			>
				<div className="h-full px-3 space-y-4">
					{/* role admin */}
					{dataUser.role === "1" && (
						<div className="space-y-3">
							<Link
								to="/beranda-admin"
								className={`flex items-center px-4 py-2 ${
									location.pathname === "/beranda-admin"
										? "bg-gray-200 rounded-md"
										: ""
								}`}
							>
								<AiFillHome
									className={`mr-2 h-7 w-7 ${
										location.pathname === "/beranda-admin"
											? "text-[#1b5fbf]"
											: "text-gray-500"
									}`}
								/>
								<span
									className={`font-semibold text-lg ${
										location.pathname === "/beranda-admin"
											? "text-[#1b5fbf]"
											: ""
									}`}
								>
									Beranda
								</span>
							</Link>
							<Link
								to="/jadwal-admin"
								className={`flex items-center px-4 py-2 ${
									location.pathname === "/jadwal-admin"
										? "bg-gray-200 rounded-md"
										: ""
								}`}
							>
								<FaCalendarDays
									className={`mr-2 h-7 w-7 ${
										location.pathname === "/jadwal-admin"
											? "text-[#1b5fbf]"
											: "text-gray-500"
									}`}
								/>
								<span
									className={`font-semibold text-lg ${
										location.pathname === "/jadwal-admin"
											? "text-[#1b5fbf]"
											: ""
									}`}
								>
									Jadwal
								</span>
							</Link>
							<Link
								to="/mapel"
								className={`flex items-center px-4 py-2 ${
									location.pathname === "/mapel" ? "bg-gray-200 rounded-md" : ""
								}`}
							>
								<FaBookOpen
									className={`mr-2 h-7 w-7 ${
										location.pathname === "/mapel"
											? "text-[#1b5fbf]"
											: "text-gray-500"
									}`}
								/>
								<span
									className={`font-semibold text-lg ${
										location.pathname === "/mapel" ? "text-[#1b5fbf]" : ""
									}`}
								>
									Mapel
								</span>
							</Link>
							<div className="relative">
								<button
									className="flex items-center px-4 py-2 w-full text-left"
									onClick={toggleAbsenMenu}
								>
									<FaListCheck
										className={`mr-2 h-7 w-7 ${
											location.pathname === "/rekap-absensi" ||
											location.pathname === "/data-absensi"
												? "text-[#1b5fbf]"
												: "text-gray-500"
										}`}
									/>
									<span
										className={`font-semibold text-lg ${
											location.pathname === "/rekap-absensi" ||
											location.pathname === "/data-absensi"
												? "text-[#1b5fbf]"
												: "text-dark"
										}`}
									>
										Absensi
									</span>
									<FaAngleDown
										className={`ml-auto w-6 h-6 ${
											location.pathname === "/rekap-absensi" ||
											location.pathname === "/data-absensi"
												? "text-[#1b5fbf]"
												: "text-gray-500"
										} dark:text-white transform `}
									/>
								</button>
								{absenMenuOpen && (
									<div className="ml-10 space-y-2">
										<Link
											to="/rekap-absensi"
											className={`block px-4 py-2 ${
												location.pathname === "/rekap-absensi"
													? "bg-gray-200 rounded-md"
													: ""
											}`}
										>
											Rekap Absensi
										</Link>
										<Link
											to="/data-absensi"
											className={`block px-4 py-2 ${
												location.pathname === "/data-absensi"
													? "bg-gray-200 rounded-md"
													: ""
											}`}
										>
											Data Absensi
										</Link>
									</div>
								)}
							</div>
							<div className="relative">
								<button
									className="flex items-center px-4 py-2 w-full text-left"
									onClick={toggleUserMenu}
								>
									<FaUser
										className={`mr-2 h-7 w-7 ${
											location.pathname === "/pengguna-guru" ||
											location.pathname === "/pengguna-siswa"
												? "text-[#1b5fbf]"
												: "text-gray-500"
										}`}
									/>
									<span
										className={`font-semibold text-lg ${
											location.pathname === "/pengguna-guru" ||
											location.pathname === "/pengguna-siswa"
												? "text-[#1b5fbf]"
												: "text-dark"
										}`}
									>
										User Menu
									</span>
									<FaAngleDown
										className={`ml-auto w-6 h-6 ${
											location.pathname === "/pengguna-guru" ||
											location.pathname === "/pengguna-siswa"
												? "text-[#1b5fbf]"
												: "text-gray-500"
										} dark:text-white transform`}
									/>
								</button>
								{userMenuOpen && (
									<div className="ml-10 space-y-2">
										<Link
											to="/pengguna-guru"
											className={`block px-4 py-2 ${
												location.pathname === "/pengguna-guru"
													? "bg-gray-200 rounded-md"
													: ""
											}`}
										>
											Guru
										</Link>
										<Link
											to="/pengguna-siswa"
											className={`block px-4 py-2 ${
												location.pathname === "/pengguna-siswa"
													? "bg-gray-200 rounded-md"
													: ""
											}`}
										>
											Siswa
										</Link>
									</div>
								)}
							</div>
						</div>
					)}

					{/* role guru */}
					{dataUser.role === "2" && (
						<div className="space-y-3">
							<Link
								to="/beranda-guru"
								className={`flex items-center px-4 py-2 ${
									location.pathname === "/beranda-guru"
										? "bg-gray-200 rounded-md"
										: ""
								}`}
							>
								<AiFillHome
									className={`mr-2 h-7 w-7 ${
										location.pathname === "/beranda-guru"
											? "text-[#1b5fbf]"
											: "text-gray-500"
									}`}
								/>
								<span
									className={`font-semibold text-lg ${
										location.pathname === "/beranda-guru"
											? "text-[#1b5fbf]"
											: ""
									}`}
								>
									Beranda
								</span>
							</Link>
							<Link
								to="/materi-guru"
								className={`flex items-center px-4 py-2 ${
									location.pathname === "/materi-guru"
										? "bg-gray-200 rounded-md"
										: ""
								}`}
							>
								<FaBookBookmark
									className={`mr-2 h-7 w-7 ${
										location.pathname === "/materi-guru"
											? "text-[#1b5fbf]"
											: "text-gray-500"
									}`}
								/>
								<span
									className={`font-semibold text-lg ${
										location.pathname === "/materi-guru" ? "text-[#1b5fbf]" : ""
									}`}
								>
									Materi
								</span>
							</Link>
							<Link
								to="/tugas-guru"
								className={`flex items-center px-4 py-2 ${
									location.pathname === "/tugas-guru"
										? "bg-gray-200 rounded-md"
										: ""
								}`}
							>
								<FaClipboardList
									className={`mr-2 h-7 w-7 ${
										location.pathname === "/tugas-guru"
											? "text-[#1b5fbf]"
											: "text-gray-500"
									}`}
								/>
								<span
									className={`font-semibold text-lg ${
										location.pathname === "/tugas-guru" ? "text-[#1b5fbf]" : ""
									}`}
								>
									Tugas
								</span>
							</Link>
							<Link
								to="/penilaian"
								className={`flex items-center px-4 py-2 ${
									location.pathname === "/penilaian"
										? "bg-gray-200 rounded-md"
										: ""
								}`}
							>
								<FaFileCircleCheck
									className={`mr-2 h-7 w-7 ${
										location.pathname === "/penilaian"
											? "text-[#1b5fbf]"
											: "text-gray-500"
									}`}
								/>
								<span
									className={`font-semibold text-lg ${
										location.pathname === "/penilaian" ? "text-[#1b5fbf]" : ""
									}`}
								>
									Penilaian
								</span>
							</Link>
						</div>
					)}

					{/* role siswa */}
					{dataUser.role === "3" && (
						<div className="space-y-3">
							<Link
								to="/beranda-siswa"
								className={`flex items-center px-4 py-2 ${
									location.pathname === "/beranda-siswa"
										? "bg-gray-200 rounded-md"
										: ""
								}`}
							>
								<AiFillHome
									className={`mr-2 h-7 w-7 ${
										location.pathname === "/beranda-siswa"
											? "text-[#1b5fbf]"
											: "text-gray-500"
									}`}
								/>
								<span
									className={`font-semibold text-lg ${
										location.pathname === "/beranda-siswa"
											? "text-[#1b5fbf]"
											: ""
									}`}
								>
									Beranda
								</span>
							</Link>
							<Link
								to="/materi-siswa"
								className={`flex items-center px-4 py-2 ${
									location.pathname === "/materi-siswa"
										? "bg-gray-200 rounded-md"
										: ""
								}`}
							>
								<FaBookBookmark
									className={`mr-2 h-7 w-7 ${
										location.pathname === "/materi-siswa"
											? "text-[#1b5fbf]"
											: "text-gray-500"
									}`}
								/>
								<span
									className={`font-semibold text-lg ${
										location.pathname === "/materi-siswa"
											? "text-[#1b5fbf]"
											: ""
									}`}
								>
									Materi
								</span>
							</Link>
							<Link
								to="/tugas-siswa"
								className={`flex items-center px-4 py-2 ${
									location.pathname === "/tugas-siswa"
										? "bg-gray-200 rounded-md"
										: ""
								}`}
							>
								<FaClipboardList
									className={`mr-2 h-7 w-7 ${
										location.pathname === "/tugas-siswa"
											? "text-[#1b5fbf]"
											: "text-gray-500"
									}`}
								/>
								<span
									className={`font-semibold text-lg ${
										location.pathname === "/tugas-siswa" ? "text-[#1b5fbf]" : ""
									}`}
								>
									Tugas
								</span>
							</Link>
							<Link
								to="/jadwal-siswa"
								className={`flex items-center px-4 py-2 ${
									location.pathname === "/jadwal-siswa"
										? "bg-gray-200 rounded-md"
										: ""
								}`}
							>
								<FaCalendarDays
									className={`mr-2 h-7 w-7 ${
										location.pathname === "/jadwal-siswa"
											? "text-[#1b5fbf]"
											: "text-gray-500"
									}`}
								/>
								<span
									className={`font-semibold text-lg ${
										location.pathname === "/jadwal-siswa"
											? "text-[#1b5fbf]"
											: ""
									}`}
								>
									Jadwal
								</span>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navigation;
