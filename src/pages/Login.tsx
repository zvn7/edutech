import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLogin } from "../services/mutation";
import Swal from "sweetalert2";
import { LoginUser } from "../types/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(0);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onChangeUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const loginMutation = useLogin();
  const navigate = useNavigate();
  const onSubmit = async () => {
    try {
      const result = await loginMutation.mutateAsync({
        username: username,
        password: password,
        token: "",
        role: role,
      });

			// Jika tidak terjadi kesalahan, maka result akan berisi data yang sesuai dengan tipe LoginSiswa
			const data = result as LoginUser;
			localStorage.setItem("token", data.token);
			setRole(data.role);
			Swal.fire({
				icon: "success",
				title: "Login berhasil",
				text: "Selamat datang kembali!",
				confirmButtonText: "Ok",
			}).then((result) => {
				/* Read more about isConfirmed, isDenied below */
				if (result.isConfirmed) {
					if (data.role === 1) {
						navigate("/beranda-admin");
					} else if (data.role === 2) {
						navigate("/beranda-guru");
					} else if (data.role === 3) {
						navigate("/beranda-siswa");
					}
				}
			});
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Login Gagal",
				text: "Masukkan username dan password yang benar!",
				confirmButtonText: "Ok",
			}).then((result) => {
				/* Read more about isConfirmed, isDenied below */
				if (result.isConfirmed) {
					navigate("/");
				}
			});
		}
	};
	return (
		<section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex justify-center items-center p-4">
			{/* left side */}
			<motion.div
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="bg-white rounded-lg md:justify-center flex-grow-0 md:flex-grow-1 flex-shrink-0 md:flex-shrink md:w-2/3 h-full p-8 py-10 border border-gray-200 dark:border-gray-700 shadow-lg"
				style={{ maxWidth: "400px" }}
			>
				<div className="h-[450px] flex flex-col justify-center">
					<div className="space-y-2 md:space-y-6">
						<a
							href="#"
							className="flex items-center justify-center mb-2 text-2xl font-semibold text-gray-900 dark:text-white"
						>
							<img className="w-44" src="/img/logo-edutech.png" alt="logo" />
						</a>
						<div>
							<h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white pt-5">
								Selamat Datang!
							</h1>
							<p className="text-center text-md font-light text-gray-500 dark:text-gray-400 mb-2">
								Masukkan Nama Pengguna & Kata Sandi Anda!
							</p>
						</div>
					</div>
					<div className="space-y-4 md:space-y-6 mt-8">
						<div>
							<label
								htmlFor="username"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Nama Pengguna
							</label>
							<input
								type="text"
								name="username"
								id="username"
								value={username}
								onChange={onChangeUsername}
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Masukkan Nama Pengguna"
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault(); // Prevent default behavior of form submission
										document.getElementById("password").focus(); // Focus on password input
									}
								}}
							/>
						</div>
						<div className="relative">
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Kata Sandi
							</label>
							<div className="flex items-center justify-center">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									id="password"
									value={password}
									onChange={onChangePassword}
									placeholder="Masukkan Kata Sandi"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											onSubmit();
										}
									}}
								/>
								<span
									onClick={togglePasswordVisibility}
									className="absolute right-3 cursor-pointer"
								>
									{showPassword ? <FaEyeSlash /> : <FaEye />}
								</span>
							</div>
						</div>
						<button
							type="submit"
							onClick={onSubmit}
							className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
						>
							Masuk
						</button>
					</div>
				</div>
			</motion.div>

			{/* right side */}
			<motion.div
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 1, delay: 0.2 }}
				className="hidden md:flex md:w-1/2  justify-center"
			>
				<div className="flex flex-col items-center justify-center p-6 space-y-4 md:space-y-6 sm:p-8">
					<h2 className="text-4xl font-semibold text-gray-900 dark:text-white">
						Permudah interaksi antar{" "}
						<span className="text-[#F0CC00]">Guru</span> dan{" "}
						<span className="text-[#F0CC00]">Siswa</span> secara online
					</h2>
					<img className="w-full" src="/img/1.png" alt="interaksi" />
				</div>
			</motion.div>
		</section>
	);
};

export default Login;
