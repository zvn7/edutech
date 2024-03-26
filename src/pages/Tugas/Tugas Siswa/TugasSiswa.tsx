import { useState, useEffect } from "react";
import Navigation from "../../../component/Navigation/Navigation";
import { FileInput, Tabs, TextInput } from "flowbite-react";

interface CardInfo {
	id: number;
	modul: string;
	tugas: string;
	description: string;
	file: string;
}

const TugasSiswa = () => {
	const [selectedCard, setSelectedCard] = useState<number | null>(null); // State untuk menyimpan ID kartu yang dipilih
	const [isMobileView, setIsMobileView] = useState<boolean>(false); // State untuk menentukan apakah tampilan sedang pada mode mobile atau tidak
	const [selectedOption, setSelectedOption] = useState("file");

	const handleOptionChange = (option: string) => {
		setSelectedOption(option);
	};

	// Data sampel untuk kartu
	const detailedCardInfo: CardInfo[] = [
		{
			id: 1,
			modul: "Pemrograman Dasar",
			tugas: "Pemrograman Dasar",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			file: "pemrograman_dasar.pdf",
		},
		{
			id: 2,
			modul: "Basic Pemrograman",
			tugas: "Basic Pemrograman",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			file: "basic_pemrograman.pdf",
		},
	];

	useEffect(() => {
		const handleResize = () => {
			// Fungsi untuk menentukan apakah tampilan sedang pada mode mobile atau tidak
			setIsMobileView(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);

		// Pengecekan awal saat komponen dipasang
		handleResize();

		// Membersihkan event listener saat komponen di-unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Fungsi untuk menangani klik pada kartu
	const handleCardClick = (cardId: number) => {
		setSelectedCard(cardId);
	};

	// Fungsi untuk menutup modal
	const closeModal = () => {
		setSelectedCard(null);
	};

	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
					{/* left side */}
					<div>
						<div className=" mt-14 flex justify-between">
							<h1 className="text-3xl font-bold font-mono">Tugas</h1>
						</div>

						<div className="mt-8 flex flex-col gap-3">
							{detailedCardInfo.map((card) => (
								<div
									key={card.id}
									onClick={() => handleCardClick(card.id)}
									className="cursor-pointer flex flex-col gap-3"
								>
									<div className="flex justify-between items-center border rounded-lg shadow-sm p-3 gap-2 bg-white">
										<div className="flex gap-3">
											<div className="bg-blue-100 rounded-lg h-14 flex items-center">
												<svg
													className="w-12 h-12 text-blue-600 dark:text-white"
													aria-hidden="true"
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														fill-rule="evenodd"
														d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm-.3 9.3c.4.4.4 1 0 1.4L9.4 14l1.3 1.3a1 1 0 0 1-1.4 1.4l-2-2a1 1 0 0 1 0-1.4l2-2a1 1 0 0 1 1.4 0Zm2.6 1.4a1 1 0 0 1 1.4-1.4l2 2c.4.4.4 1 0 1.4l-2 2a1 1 0 0 1-1.4-1.4l1.3-1.3-1.3-1.3Z"
														clip-rule="evenodd"
													/>
												</svg>
											</div>
											<div className="flex flex-col">
												<p className="text-sm">{card.modul}</p>
												<h2 className="text">{card.tugas}</h2>
												<div className="flex flex-wrap gap-2 ">
													<div className="flex gap-1">
														<svg
															className="w-5 h-5 text-gray-800 dark:text-white"
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
																d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
															/>
														</svg>
														<span className="text-sm">01 Januari 2024</span>
													</div>
													<div className="flex gap-1">
														<svg
															className="w-5 h-5 text-gray-800 dark:text-white"
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
																d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
															/>
														</svg>
														<span className="text-sm">07:30 - 10:00</span>
													</div>
												</div>
											</div>
										</div>
										<div className="bg-orange-200 p-1 rounded-2xl border-2 border-orange-400">
											<h2 className="text-center text-orange-500 font-semibold text-sm">
												Belum selesai
											</h2>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* right side */}
					{selectedCard &&
						(isMobileView ? (
							<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
								<div className="bg-white p-4 rounded-lg w-full sm:max-w-md overflow-y-auto h-full">
									<div className="flex justify-end">
										<button
											className="text-gray-500 hover:text-gray-700"
											onClick={closeModal}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
									<Tabs aria-label="Tabs with underline" style="underline">
										<Tabs.Item active title="Deskripsi">
											<p>{detailedCardInfo[selectedCard - 1].description}</p>
											<h1 className="text-2xl font-bold mt-8">Tugas</h1>
											<div className="mt-5 flex justify-between items-center border rounded-lg shadow-sm p-3 gap-2 bg-[#E7F6FF]">
												<div className="flex gap-3">
													<div className="bg-white rounded-lg h-14 flex items-center">
														<svg
															className="w-12 h-12 text-blue-600 dark:text-white"
															aria-hidden="true"
															xmlns="http://www.w3.org/2000/svg"
															fill="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																fillRule="evenodd"
																d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm-.3 9.3c.4.4.4 1 0 1.4L9.4 14l1.3 1.3a1 1 0 0 1-1.4 1.4l-2-2a1 1 0 0 1 0-1.4l2-2a1 1 0 0 1 1.4 0Zm2.6 1.4a1 1 0 0 1 1.4-1.4l2 2c.4.4.4 1 0 1.4l-2 2a1 1 0 0 1-1.4-1.4l1.3-1.3-1.3-1.3Z"
																clipRule="evenodd"
															/>
														</svg>
													</div>
													<div className="flex flex-col justify-center">
														<p className="text-lg font-semibold">
															{detailedCardInfo[selectedCard - 1].file}
														</p>
													</div>
												</div>
											</div>
										</Tabs.Item>
										<Tabs.Item title="Pengumpulan">
											<p className="text-md font-bold">Informasi Pengumpulan</p>
											<div className="relative overflow-x-auto sm:rounded-lg mt-4">
												<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
													<tbody>
														<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
															<td className="px-6 py-4">Judul</td>
															<td className="px-6 py-4 float-end">
																{detailedCardInfo[selectedCard - 1].tugas}
															</td>
														</tr>
														<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
															<td className="px-6 py-4">Jenis Pengumpulan</td>
															<td className="px-6 py-4 float-end">File</td>
														</tr>
														<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
															<td className="px-6 py-4">Batas Pengumpulan</td>
															<td className="px-6 py-4 float-end">
																<div className="bg-orange-200 p-1 rounded-2xl border-2 border-orange-400 w-32">
																	<h2 className="text-center text-orange-500 font-semibold text-sm">
																		17-09-2024
																	</h2>
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div>
												<p className="text-md font-bold mt-4">
													Pengumpulan Tugas
												</p>
												<div className="bg-orange-200 p-1 rounded-2xl border-2 border-orange-400 mt-3">
													<h2 className="p-2 text-orange-500 font-semibold text-sm">
														Mengumpulkan ataupun mengubah jawaban setelah
														deadline berakhir akan dikenai pengurangan nilai
													</h2>
												</div>
												<div className=" flex gap-5">
													<div
														className="flex items-center gap-2 mt-5"
														onClick={() => handleOptionChange("file")}
													>
														<input
															type="radio"
															id="file"
															name="submissionOption"
															value="file"
															checked={selectedOption === "file"}
														/>
														<label htmlFor="file">File</label>
													</div>
													<div
														className="flex items-center gap-2 mt-5"
														onClick={() => handleOptionChange("link")}
													>
														<input
															type="radio"
															id="link"
															name="submissionOption"
															value="link"
															checked={selectedOption === "link"}
														/>
														<label htmlFor="link">Link</label>
													</div>
												</div>
												{selectedOption === "file" && (
													<div id="fileUpload" className="mt-4">
														<FileInput id="file" />
													</div>
												)}
												{selectedOption === "link" && (
													<div id="linkInput" className="mt-4">
														<TextInput
															id="link"
															type="text"
															placeholder="Masukkan url atau link yang valid disini"
															required
														/>
													</div>
												)}
												<button
													type="submit"
													className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
												>
													Kirim
												</button>
											</div>
										</Tabs.Item>
									</Tabs>
								</div>
							</div>
						) : (
							<div>
								<div className="border rounded-lg shadow-sm p-3 mt-14 px-4 bg-white">
									<div className="flex justify-end">
										<button
											className="text-gray-500 hover:text-gray-700"
											onClick={closeModal}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
									<Tabs aria-label="Tabs with underline" style="underline">
										<Tabs.Item active title="Deskripsi">
											<p>{detailedCardInfo[selectedCard - 1].description}</p>
											<h1 className="text-2xl font-bold mt-8">Tugas</h1>
											<div className="mt-5 flex justify-between items-center border rounded-lg shadow-sm p-3 gap-2 bg-[#E7F6FF]">
												<div className="flex gap-3">
													<div className="bg-white rounded-lg h-14 flex items-center">
														<svg
															className="w-12 h-12 text-blue-600 dark:text-white"
															aria-hidden="true"
															xmlns="http://www.w3.org/2000/svg"
															fill="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																fillRule="evenodd"
																d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm-.3 9.3c.4.4.4 1 0 1.4L9.4 14l1.3 1.3a1 1 0 0 1-1.4 1.4l-2-2a1 1 0 0 1 0-1.4l2-2a1 1 0 0 1 1.4 0Zm2.6 1.4a1 1 0 0 1 1.4-1.4l2 2c.4.4.4 1 0 1.4l-2 2a1 1 0 0 1-1.4-1.4l1.3-1.3-1.3-1.3Z"
																clipRule="evenodd"
															/>
														</svg>
													</div>
													<div className="flex flex-col justify-center">
														<p className="text-lg font-semibold">
															{detailedCardInfo[selectedCard - 1].file}
														</p>
													</div>
												</div>
											</div>
										</Tabs.Item>
										<Tabs.Item title="Pengumpulan">
											<p className="text-md font-bold">Informasi Pengumpulan</p>
											<div className="relative overflow-x-auto sm:rounded-lg mt-4">
												<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
													<tbody>
														<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
															<td className="px-6 py-4">Judul</td>
															<td className="px-6 py-4 float-end">
																{detailedCardInfo[selectedCard - 1].tugas}
															</td>
														</tr>
														<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
															<td className="px-6 py-4">Jenis Pengumpulan</td>
															<td className="px-6 py-4 float-end">File</td>
														</tr>
														<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
															<td className="px-6 py-4">Batas Pengumpulan</td>
															<td className="px-6 py-4 float-end">
																<div className="bg-orange-200 p-1 rounded-2xl border-2 border-orange-400 w-32">
																	<h2 className="text-center text-orange-500 font-semibold text-sm">
																		17-09-2024
																	</h2>
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div>
												<p className="text-md font-bold mt-4">
													Pengumpulan Tugas
												</p>
												<div className="bg-orange-200 p-1 rounded-2xl border-2 border-orange-400 mt-3">
													<h2 className="p-2 text-orange-500 font-semibold text-sm">
														Mengumpulkan ataupun mengubah jawaban setelah
														deadline berakhir akan dikenai pengurangan nilai
													</h2>
												</div>
												<div className=" flex gap-5">
													<div
														className="flex items-center gap-2 mt-5"
														onClick={() => handleOptionChange("file")}
													>
														<input
															type="radio"
															id="file"
															name="submissionOption"
															value="file"
															checked={selectedOption === "file"}
														/>
														<label htmlFor="file">File</label>
													</div>
													<div
														className="flex items-center gap-2 mt-5"
														onClick={() => handleOptionChange("link")}
													>
														<input
															type="radio"
															id="link"
															name="submissionOption"
															value="link"
															checked={selectedOption === "link"}
														/>
														<label htmlFor="link">Link</label>
													</div>
												</div>
												{selectedOption === "file" && (
													<div id="fileUpload" className="mt-4">
														<FileInput id="file" />
													</div>
												)}
												{selectedOption === "link" && (
													<div id="linkInput" className="mt-4">
														<TextInput
															id="link"
															type="text"
															placeholder="Masukkan url atau link yang valid disini"
															required
														/>
													</div>
												)}
												<button
													type="submit"
													className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
												>
													Kirim
												</button>
											</div>
										</Tabs.Item>
										<Tabs.Item title="Nilai">
											<p className="text-md font-bold">Informasi Tugas</p>
											<div className="relative overflow-x-auto sm:rounded-lg mt-4">
												<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
													<tbody>
														<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
															<td className="px-6 py-4">Judul</td>
															<td className="px-6 py-4 float-end">
																{detailedCardInfo[selectedCard - 1].tugas}
															</td>
														</tr>
														<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
															<td className="px-6 py-4">Status</td>
															<td className="px-6 py-4 float-end">
																<div className="bg-orange-200 p-1 rounded-2xl border-2 border-orange-400 w-32">
																	<h2 className="text-center text-orange-500 font-semibold text-sm">
																		Sudah Dikoreksi
																	</h2>
																</div>
															</td>
														</tr>
														<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
															<td className="px-6 py-4">Nilai</td>
															<td className="px-6 py-4 float-end">76</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div>
												<p className="text-md font-bold mt-4">Review Guru</p>
												<div className="bg-orange-200 p-1 rounded-2xl border-2 border-orange-400 mt-3">
													<h2 className="p-2 text-orange-500 font-semibold text-sm">
														Mengumpulkan ataupun mengubah jawaban setelah
														deadline berakhir akan dikenai pengurangan nilai
													</h2>
												</div>
											</div>
										</Tabs.Item>
									</Tabs>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default TugasSiswa;
