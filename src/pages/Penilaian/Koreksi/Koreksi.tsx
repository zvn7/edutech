import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../../../component/Navigation/Navigation";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Koreksi = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		id: "",
		nameStudent: "",
		assignmentName: "",
		submissionTime: "",
		submissionTimeStatus: "",
		comment: "",
		link: "",
		grade: "",
		fileData: "",
		fileName: "",
	});

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${
						import.meta.env.VITE_API_URL
					}/AssignmentSubmissions/getSubmissionForTeacherBySubmissionId/${id}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				setFormData({
					...formData,
					id: response.data.id, // Set the id correctly
					nameStudent: response.data.nameStudent,
					assignmentName: response.data.assignmentName,
					submissionTime: response.data.submissionTime,
					submissionTimeStatus: response.data.submissionTimeStatus,
					comment: response.data.comment,
					link: response.data.link,
					grade: response.data.grade,
					fileData: response.data.fileData,
					fileName: response.data.fileName,
				});
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [id]);
	const shortenLink = (link, maxLength) => {
		if (link.length > maxLength) {
			return link.substring(0, maxLength) + "...";
		} else {
			return link;
		}
	};

	const handleSubmitEdit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.put(
				`${import.meta.env.VITE_API_URL}/AssignmentSubmissions/teacher/${id}`,
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
				text: "Penilaian Berhasil dilakukan!",
				confirmButtonText: "Ok",
			}).then((result) => {
				if (result.isConfirmed) {
					navigate("/penilaian");
				}
			});
			navigate("/penilaian");
		} catch (error: any) {
			if (error.response && error.response.data && error.response.data.errors) {
				const errorMessage = Object.values(error.response.data.errors)
					.flat()
					.join(", ");
				Swal.fire({
					icon: "error",
					title: "Gagal",
					text: errorMessage,
					confirmButtonText: "Ok",
				});
			} else {
				Swal.fire({
					icon: "error",
					title: "Gagal",
					text: error.toString(),
					confirmButtonText: "Ok",
				});
			}
		}
		setLoading(false);
	};

	const handleInputChange = (e) => {
		const { value, name } = e.target;

		if (name === "grade") {
			const grades = value.split(",");
			for (let i = 0; i < grades.length; i++) {
				const grade = grades[i].trim();

				if (isNaN(grade) || parseInt(grade) < 1 || parseInt(grade) > 100) {
					console.log("Nilai grade tidak valid!");
					return; // Keluar dari fungsi jika nilai tidak valid
				}
			}
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
				navigate("/penilaian");
			}
		});
	};

	const formatDate = (dateString) => {
		// Mendapatkan tanggal dari string tanggal
		const date = new Date(dateString);

		// Mengambil komponen tanggal
		const day = date.getDate();
		const month = date.toLocaleString("default", { month: "long" });
		const year = date.getFullYear();

		// Menggabungkan komponen tanggal ke dalam format yang diinginkan
		const formattedDate = `${day} ${month} ${year}`;

		return formattedDate;
	};

	const handleFileDownload = async (assignmentId, assignmentFileName) => {
		if (!formData.fileData) {
			Swal.fire({
				icon: "error",
				title: "Gagal",
				text: "No file available to download",
				confirmButtonText: "Ok",
			});
			return;
		}

		try {
			const response = await axios.get(
				`${
					import.meta.env.VITE_API_URL
				}/AssignmentSubmissions/download/${assignmentId}`,
				{
					responseType: "blob",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			const blob = new Blob([response.data], { type: "application/pdf" });
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", assignmentFileName);
			document.body.appendChild(link);
			link.click();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Error downloading file:", error);
			Swal.fire({
				icon: "error",
				title: "Gagal",
				text: "Error downloading file. Please try again later.",
				confirmButtonText: "Ok",
			});
		}
	};

	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				<div className="mt-14">
					<button
						className="mt-14 flex gap-2 items-center"
						onClick={handleBatal}
					>
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
						<h1 className="text-2xl font-bold capitalize">Kembali</h1>
					</button>

					{/* card */}
					<div className="bg-white p-5 rounded-2xl border flex-col gap-2 items-center shadow-lg mt-5">
						<p className="text-xl  font-bold">Form Penilaian</p>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mt-6">
							<Card className="max-w-auto bg-blue-100 border-0">
								<table>
									<tr>
										<td className="text-md text-gray-900 dark:text-white">
											Nama
										</td>
										<td className="text-md text-gray-900 dark:text-white">
											: <span className="ml-2">{formData.nameStudent}</span>
										</td>
									</tr>
									<tr>
										<td className="text-md text-gray-900 dark:text-white">
											Tugas
										</td>
										<td className="text-md text-gray-900 dark:text-white">
											: <span className="ml-2"> {formData.assignmentName}</span>
										</td>
									</tr>
									<tr>
										<td className="text-md text-gray-900 dark:text-white">
											Tanggal Pengumpulan
										</td>
										<td className="text-md text-gray-900 dark:text-white">
											:{" "}
											<span className="ml-2">
												{formatDate(formData.submissionTime)}
											</span>
										</td>
									</tr>
									<tr>
										<td className="text-md text-gray-900 dark:text-white">
											Status pengumpulan
										</td>
										<td className="text-md text-gray-900 dark:text-white">
											:{" "}
											<span
												className={`ml-2 text-xs font-medium me-2 px-2.5 py-1.5 rounded ${
													formData.submissionTimeStatus === "Terlambat"
														? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
														: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
												}`}
											>
												{formData.submissionTimeStatus === "Terlambat"
													? "Terlambat"
													: "Tepat Waktu"}
											</span>
										</td>
									</tr>
								</table>
							</Card>
							<Card className="max-w-auto bg-blue-100 border-0">
								{formData.fileData ? (
									<div className="flex justify-between items-center">
										<div>
											<p className="text-md text-gray-900 dark:text-white">
												{formData.fileName}
											</p>
											<button
												className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
												onClick={() =>
													handleFileDownload(formData.id, formData.fileName)
												}
											>
												Download
											</button>
										</div>
										<svg
											className="w-24 h-24 text-blue-300"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												fillRule="evenodd"
												d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z"
												clipRule="evenodd"
											/>
											<path
												fillRule="evenodd"
												d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
								) : (
									<div className="">
										<table className="w-full">
											<tr>
												<td className="text-md text-gray-900  font-semibold">
													Link
												</td>
												<td className="text-md text-blue-500 ">
													:{" "}
													<a
														href={formData.link}
														className="hover:underline"
														target="_blank"
													>
														{shortenLink(formData.link, 50)}
													</a>
												</td>
											</tr>
										</table>
									</div>
								)}
							</Card>
						</div>
						<div>
							<p className="text-lg mt-4 font-bold ">Review</p>
							<textarea
								name="comment"
								className=" rounded-md h-24 shadow-md border-none w-1/2 bg-blue-100 border-0"
								placeholder="Masukkan review"
								value={formData.comment}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<p className="text-lg mt-4 font-bold ">Nilai</p>
							<input
								type="number"
								name="grade"
								className=" rounded-md shadow-md border-none w-1/2 bg-blue-100 border-0"
								placeholder="Masukkan Nilai"
								value={formData.grade}
								onChange={handleInputChange}
								min={0}
								max={100}
							/>
						</div>
						<div className="flex mt-5 space-x-4">
							<button
								type="submit"
								className="flex w-32 items-center text-center justify-center  px-5 py-2.5  text-sm font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
								disabled={loading}
								onClick={handleSubmitEdit}
							>
								{loading ? (
									<div className="text-center">
										<div role="status">
											<svg
												aria-hidden="true"
												className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
												viewBox="0 0 100 101"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
													fill="currentColor"
												/>
												<path
													d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
													fill="currentFill"
												/>
											</svg>
											<span className="sr-only">Loading...</span>
										</div>
									</div>
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
		</div>
	);
};

export default Koreksi;
