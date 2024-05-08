import { useEffect, useState } from "react";
import Navigation from "../../../../component/Navigation/Navigation";
import { Link, useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import axios from "axios";

const EditSiswa = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	// const [iconVisible, setIconVisible] = useState(false);
	const [formData, setFormData] = useState({
		nameStudent: "",
		// className: "",
		// password: "",
		// nis: "",
		// birthDate: "",
		// birthPlace: "",
		address: "",
		phoneNumber: "",
		// parentName: "",
		// gender: 0,
		uniqueNumberOfClassRoom: "",
	});

	const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.66.239:13311/api/Account/student/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

				setFormData({
					...formData,
					// nis: response.data.nis || "",
					// className: response.data.className || "",
					nameStudent: response.data.nameStudent || "",
					// birthDate: response.data.birthDate || "",
					// password: response.data.password || "",
					// birthPlace: response.data.birthPlace || "",
					address: response.data.address || "",
					phoneNumber: response.data.phoneNumber || "",
					// parentName: response.data.parentName || "",
					// gender: response.data.gender || 0,
					uniqueNumberOfClassRoom: response.data.uniqueNumberOfClassRoom || "",
				});
				return response.data;
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [id]);

	const handleSubmitEdit = async (e: any) => {
		e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.put(
        `http://192.168.66.239:13311/api/Account/edit/student/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Siswa Berhasil diperbarui!",
        confirmButtonText: "Ok",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/pengguna-siswa");
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

	const handleInputChange = (e: any) => {
		const { value, name } = e.target;

		// Memastikan bahwa nomor telepon dimulai dengan angka 0
		if (name === "phoneNumber" && value.length === 1 && value !== "0") {
			return; // Mencegah input jika angka pertama bukan 0
		}
		if (name === "phoneNumber" && value.length > 15) {
			return;
		}

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleBatal = () => {
		Swal.fire({
			icon: "warning",
			title: "Peringatan",
			text: "Apakah Anda yakin ingin membatalkan?",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
		}).then((result) => {
			if (result.isConfirmed) {
				navigate("/pengguna-siswa");
			}
		});
	};
	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				{/* <Link to="/pengguna-siswa"> */}
				<button className="mt-14 flex gap-2 items-center" onClick={handleBatal}>
					<div className="bg-white p-2 rounded-full shadow-sm hover:bg-slate-300 hover:cursor-pointer">
						<svg
							className="w-7 h-7 text-blue-800 hover:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 12h14M5 12l4-4m-4 4 4 4"
							/>
						</svg>
					</div>
					<h1 className="text-2xl font-bold capitalize">kembali</h1>
				</button>
				{/* </Link> */}

				<div className="mt-6">
					<section className="bg-white rounded-lg">
						<div className="py-6 px-4">
							<h2 className="mb-4 text-xl font-bold text-gray-900 capitalize">
								edit data siswa {formData.nameStudent}
							</h2>
							<div>
								<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
									<div>
										<label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
											jurusan
										</label>
										<select
											name="uniqueNumberOfClassRoom"
											value={formData.uniqueNumberOfClassRoom}
											// {...register("uniqueNumberOfClassRoom")}
											onChange={handleInputChange}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 capitalize"
											required
											onInvalid={(e: React.ChangeEvent<HTMLSelectElement>) =>
												e.currentTarget.setCustomValidity(
													"Pilih jurusan tidak boleh kosong"
												)
											}
											onInput={(e: React.ChangeEvent<HTMLSelectElement>) =>
												e.currentTarget.setCustomValidity("")
											}
										>
											<option value="">pilih jurusan</option>
											<option value="001">TKJ</option>
											<option value="002">TKR</option>
											<option value="003">RPL</option>
										</select>
									</div>
									<div>
										<label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
											nomor telepon
										</label>
										<input
											type="number"
											name="phoneNumber"
											// {...register("phoneNumber")}
											value={formData.phoneNumber}
											onChange={handleInputChange}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
											placeholder="masukkan nomor telepon"
											required
											onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
												e.currentTarget.setCustomValidity(
													"Nomor Telepon tidak boleh kosong"
												)
											}
											onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
												e.currentTarget.setCustomValidity("")
											}
										/>
										<span className="text-sm text-red-500">
											* no.tlp mulai dari 0
										</span>
									</div>

									{/* alamat & no tlp */}
									<div>
										<label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
											alamat
										</label>
										<textarea
											name="address"
											// {...register("address")}
											value={formData.address}
											onChange={handleInputChange}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
											placeholder="Masukkan alamat lengkap"
											required
										/>
									</div>

									<div className="flex gap-2 items-center">
										<button
											type="submit"
											className="flex w-20 items-center text-center justify-center  px-5 py-2.5  text-sm font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
											disabled={loading}
											onClick={handleSubmitEdit}
										>
											{loading ? (
												<svg
													className="animate-spin w-5 h-5 mr-3"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.585l-2.829 2.829zm0 8.446a8.045 8.045 0 01-2.38-2.38l2.38-2.83v5.21zM12 20.528a7.995 7.995 0 01-4-.943v-3.585L9.172 16.7c.258.258.563.465.896.605zm4-1.947l2.829-2.83 2.83 2.83-2.83 2.83v-5.22a8.045 8.045 0 01-2.38 2.38zm2.39-8.38L19.528 12h-5.21l2.83-2.829 2.83 2.829zM12 5.473V1.548A8.045 8.045 0 0115.473 4.39L12 7.863zm-2.829-.707L7.17 4.39A8.045 8.045 0 0110.39 1.548l-1.219 1.218zm1.219 13.123l-1.22 1.219a8.045 8.045 0 012.38 2.38l1.22-1.22zM16.832 16.7l1.219 1.22a8.045 8.045 0 012.38-2.38l-1.218-1.219z"
													></path>
												</svg>
											) : (
												"Simpan"
											)}
										</button>

										<button
											onClick={handleBatal}
											className="flex w-20 items-center text-center justify-center  px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 capitalize"
										>
											batal
										</button>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default EditSiswa;
