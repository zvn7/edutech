import Navigation from "../../../component/Navigation/Navigation";
import { Button, FileInput, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface CardInfo {
	id: number;
	modul: string;
	tugas: string;
	description: string;
	file: string;
}

const TugasGuru = () => {
	const [showAddForm, setShowAddForm] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [selectedOption, setSelectedOption] = useState("file");
	const [isMobileModalOpenAdd, setisMobileModalOpenAdd] = useState(false);
	const [isMobileModalOpenEdit, setisMobileModalOpenEdit] = useState(false);
	const [isTabletModalOpenAdd, setisTabletModalOpenAdd] = useState(false);
	const [isTabletModalOpenEdit, setisTabletModalOpenEdit] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			const windowWidth = window.innerWidth;
			setIsMobile(windowWidth <= 768);
			setIsTablet(windowWidth > 768 && windowWidth <= 1024);
		};

		handleResize(); // Panggil fungsi handleResize saat komponen dimuat agar state 'isMobile' dan 'isTablet' dapat diatur dengan benar

		window.addEventListener("resize", handleResize); // Tambahkan event listener untuk memantau perubahan ukuran layar

		return () => {
			window.removeEventListener("resize", handleResize); // Bersihkan event listener saat komponen di-unmount
		};
	}, []);

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

	const handleDeleteCard = (cardId: number) => {
		// Use SweetAlert to confirm deletion
		Swal.fire({
			title: "Are you sure?",
			text: "You will not be able to recover this card!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				// If user confirms, delete the card
				console.log("Deleting card with ID:", cardId);
				// Add your delete logic here
				// For example, you can call a function to delete the card from the list
				// deleteCard(cardId);

				// Show success message
				Swal.fire("Deleted!", "Your card has been deleted.", "success");
			}
		});
	};

	const handleShowAddForm = () => {
		if (showEditForm) {
			Swal.fire({
				title: "Anda yakin ingin meninggalkan halaman?",
				text: "Perubahan yang Anda buat mungkin tidak disimpan.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Ya, lanjutkan",
				cancelButtonText: "Tidak, batalkan",
			}).then((result) => {
				if (result.isConfirmed) {
					setShowEditForm(false);
					setShowAddForm(true);
				}
			});
		} else {
			setShowAddForm(!showAddForm);
		}
	};

	const handleShowEditForm = () => {
		if (showAddForm) {
			Swal.fire({
				title: "Anda yakin ingin meninggalkan halaman?",
				text: "Perubahan yang Anda buat mungkin tidak disimpan.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Ya, lanjutkan",
				cancelButtonText: "Tidak, batalkan",
			}).then((result) => {
				if (result.isConfirmed) {
					setShowAddForm(false);
					setShowEditForm(true);
				}
			});
		} else {
			setShowEditForm(!showEditForm);
		}
	};

	const handleCloseForms = () => {
		if (showAddForm || showEditForm) {
			Swal.fire({
				title: "Anda yakin ingin meninggalkan halaman?",
				text: "Perubahan yang Anda buat mungkin tidak disimpan.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Ya, lanjutkan",
				cancelButtonText: "Tidak, batalkan",
			}).then((result) => {
				if (result.isConfirmed) {
					setShowAddForm(false);
					setShowEditForm(false);
				}
			});
		} else {
			setShowAddForm(false);
			setShowEditForm(false);
		}
	};

	const handleShowModalAddFormMobile = () => {
		setisMobileModalOpenAdd(true);
		setisMobileModalOpenEdit(false);
	};

	const handleShowModalEditFormMobile = () => {
		setisMobileModalOpenEdit(true);
		setisMobileModalOpenAdd(false);
	};

	// const handleCloseModalFormMobile = () => {
	// 	setisMobileModalOpenAdd(false);
	// 	setisMobileModalOpenEdit(false);
	// };

	const handleShowModalAddFormTablet = () => {
		setisTabletModalOpenAdd(true);
		setisTabletModalOpenEdit(false);
	};

	const handleShowModalEditFormTablet = () => {
		setisTabletModalOpenEdit(true);
		setisTabletModalOpenAdd(false);
	};

	// const handleCloseModalFormTablet = () => {
	// 	setisTabletModalOpenAdd(false);
	// 	setisTabletModalOpenEdit(false);
	// };

	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
					{/* left side */}
					<div>
						<div className=" mt-14 flex justify-between">
							<h1 className="text-3xl font-bold font-mono">Tugas</h1>
						</div>

						<div className="mt-5 flex justify-between gap-4">
							<form className="max-w-xs">
								<label
									htmlFor="default-search"
									className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
								>
									Search
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
										<svg
											className="w-3 h-3 text-gray-500 dark:text-gray-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 20"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
											/>
										</svg>
									</div>
									<input
										type="search"
										id="default-search"
										className="block md:w-80 w-56 p-2 ps-7 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Cari..."
										required
									/>
								</div>
							</form>
							{isMobile && (
								<button
									type="button"
									onClick={handleShowModalAddFormMobile}
									className="justify-between px-4 py-2 text-sm font-medium text-center flex gap-2 items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									<svg
										className="w-5 h-5 text-white dark:text-white"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 12h14m-7 7V5"
										/>
									</svg>
									Tugas
								</button>
							)}
							{isTablet && (
								<button
									type="button"
									onClick={handleShowModalAddFormTablet}
									className="justify-between px-4 py-2 text-sm font-medium text-center flex gap-2 items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									<svg
										className="w-5 h-5 text-white dark:text-white"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 12h14m-7 7V5"
										/>
									</svg>
									Tugas
								</button>
							)}
							{!isMobile && !isTablet && (
								<button
									type="button"
									onClick={handleShowAddForm}
									className="justify-between px-4 py-2 text-sm font-medium text-center flex gap-2 items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									<svg
										className="w-5 h-5 text-white dark:text-white"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 12h14m-7 7V5"
										/>
									</svg>
									Tugas
								</button>
							)}
						</div>

						<div className="mt-8 flex flex-col gap-3">
							{detailedCardInfo.map((card) => (
								<div key={card.id} className="cursor-pointer">
									<div className="flex justify-between items-center bg-white rounded-lg shadow-sm p-3 gap-2">
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
												<p className="text-sm font-normal text-gray-500">
													Basic Programing
												</p>
												<h2 className="text-md font-medium">
													Membuat Flowchart
												</h2>
												<div className="flex flex-wrap gap-2 ">
													<div className="flex gap-1">
														<svg
															className="w-5 h-5 text-gray-500"
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
														<span className="text-sm text-gray-500">
															01 Januari 2024
														</span>
													</div>
													<div className="flex gap-1">
														<svg
															className="w-5 h-5 text-gray-500"
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
														<span className="text-sm text-gray-500 uppercase">
															07:30 - 10:00 wib
														</span>
													</div>
												</div>
											</div>
										</div>
										<Button.Group>
											<Button
												color="warning"
												onClick={
													isMobile
														? handleShowModalEditFormMobile
														: isTablet
														? handleShowModalEditFormTablet
														: handleShowEditForm
												}
											>
												Edit
											</Button>

											<Button
												onClick={() => handleDeleteCard(card.id)}
												color="failure"
											>
												Hapus
											</Button>
										</Button.Group>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* right side */}
					{showAddForm && (
						<div>
							<div className="border rounded-lg shadow-sm p-3 mt-14 bg-white">
								<div className="flex justify-between">
									<p className="text-gray-500 text-xl font-bold">
										Tambah Tugas
									</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseForms}
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
								<hr className="my-3" />
								<form className="max-w-full mt-4">
									<div className="mb-5">
										<label
											htmlFor="materi"
											className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
										>
											Materi
										</label>
										<select
											id="countries"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										>
											<option>Materi</option>
											<option>Desain</option>
											<option>Tools</option>
										</select>
									</div>
									<div className="mb-5">
										<label
											htmlFor="nama_tugas"
											className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
										>
											Nama Tugas
										</label>
										<input
											type="text"
											id="nama_tugas"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Masukkan Nama Tugas"
										/>
									</div>
									<div className="mb-5">
										<label
											htmlFor="nama_tugas"
											className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
										>
											Deskripsi Tugas
										</label>
										<textarea
											id="message"
											rows={4}
											className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Masukkan Deskripsi Tugas"
											defaultValue={""}
										/>
									</div>
									<div className="mb-5">
										<label
											htmlFor="nama_tugas"
											className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
										>
											Tanggal Tugas
										</label>
										<input
											type="date"
											id="nama_tugas"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Masukkan Nama Tugas"
										/>
									</div>
									<div className="mb-5">
										<label
											htmlFor="nama_tugas"
											className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
										>
											Deadline Tugas
										</label>
										<input
											type="date"
											id="nama_tugas"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Masukkan Nama Tugas"
										/>
									</div>
									<div className="mb-5">
										<label
											htmlFor="nama_tugas"
											className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
										>
											Detail Tugas
										</label>
										<div className="flex gap-5">
											<div
												className="flex items-center gap-2"
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
												className="flex items-center gap-2"
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
									</div>
									<button
										type="submit"
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
									>
										Kirim
									</button>
								</form>
							</div>
						</div>
					)}
					{showEditForm && (
						<div className="edit-form">
							<div>
								<div className="border rounded-lg shadow-sm p-3 mt-14 bg-white">
									<div className="flex justify-between">
										<p className="text-gray-500 text-xl font-bold">
											Edit Tugas
										</p>
										<button
											className="text-gray-500 hover:text-gray-700"
											onClick={handleCloseForms}
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
									<hr className="my-3" />
									<form className="max-w-full mt-4">
										<div className="mb-5">
											<label
												htmlFor="materi"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Materi
											</label>
											<select
												id="countries"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											>
												<option>Materi</option>
												<option>Desain</option>
												<option>Tools</option>
											</select>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Nama Tugas
											</label>
											<input
												type="text"
												id="nama_tugas"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Nama Tugas"
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Deskripsi Tugas
											</label>
											<textarea
												id="message"
												rows={4}
												className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Deskripsi Tugas"
												defaultValue={""}
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Tanggal Tugas
											</label>
											<input
												type="date"
												id="nama_tugas"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Nama Tugas"
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Deadline Tugas
											</label>
											<input
												type="date"
												id="nama_tugas"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Nama Tugas"
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Detail Tugas
											</label>
											<div className="flex gap-5">
												<div
													className="flex items-center gap-2"
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
													className="flex items-center gap-2"
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
										</div>
										<button
											type="submit"
											className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
										>
											Kirim
										</button>
									</form>
								</div>
							</div>
						</div>
					)}
					{isMobileModalOpenAdd && (
						<Modal
							dismissible
							show={isMobileModalOpenAdd}
							onClose={() => setisMobileModalOpenAdd(false)}
						>
							<Modal.Header>Tambah Tugas</Modal.Header>
							<Modal.Body>
								<div className="add-form">
									<form className="max-w-full">
										<div className="mb-5">
											<label
												htmlFor="materi"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Materi
											</label>
											<select
												id="countries"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											>
												<option>Materi</option>
												<option>Desain</option>
												<option>Tools</option>
											</select>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Nama Tugas
											</label>
											<input
												type="text"
												id="nama_tugas"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Nama Tugas"
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Deskripsi Tugas
											</label>
											<textarea
												id="message"
												rows={4}
												className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Deskripsi Tugas"
												defaultValue={""}
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Tanggal Tugas
											</label>
											<input
												type="date"
												id="nama_tugas"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Nama Tugas"
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Deadline Tugas
											</label>
											<input
												type="date"
												id="nama_tugas"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Nama Tugas"
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Detail Tugas
											</label>
											<div className="flex gap-5">
												<div
													className="flex items-center gap-2"
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
													className="flex items-center gap-2"
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
										</div>
										<button
											type="submit"
											className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											Kirim
										</button>
									</form>
								</div>
							</Modal.Body>
						</Modal>
					)}
					{isMobileModalOpenEdit && (
						<Modal
							dismissible
							show={isMobileModalOpenEdit}
							onClose={() => setisMobileModalOpenEdit(false)}
						>
							<Modal.Header>Tambah Tugas</Modal.Header>
							<Modal.Body>
								<div className="add-form">
									<form className="max-w-full">
										<div className="mb-5">
											<label
												htmlFor="materi"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Materi
											</label>
											<select
												id="countries"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											>
												<option>Materi</option>
												<option>Desain</option>
												<option>Tools</option>
											</select>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Nama Tugas
											</label>
											<input
												type="text"
												id="nama_tugas"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Nama Tugas"
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Deskripsi Tugas
											</label>
											<textarea
												id="message"
												rows={4}
												className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Deskripsi Tugas"
												defaultValue={""}
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Tanggal Tugas
											</label>
											<input
												type="date"
												id="nama_tugas"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Nama Tugas"
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Deadline Tugas
											</label>
											<input
												type="date"
												id="nama_tugas"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Nama Tugas"
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Detail Tugas
											</label>
											<div className="flex gap-5">
												<div
													className="flex items-center gap-2"
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
													className="flex items-center gap-2"
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
										</div>
										<button
											type="submit"
											className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											Kirim
										</button>
									</form>
								</div>
							</Modal.Body>
						</Modal>
					)}
					{isTabletModalOpenAdd && (
						<Modal
							dismissible
							show={isTabletModalOpenAdd}
							onClose={() => setisTabletModalOpenAdd(false)}
						>
							<Modal.Header>Tambah Tugas</Modal.Header>
							<Modal.Body>
								<div className="add-form">
									<form className="max-w-full">
										<div className="mb-5">
											<label
												htmlFor="materi"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Materi
											</label>
											<select
												id="countries"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											>
												<option>Materi</option>
												<option>Desain</option>
												<option>Tools</option>
											</select>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Nama Tugas
											</label>
											<input
												type="text"
												id="nama_tugas"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Nama Tugas"
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Deskripsi Tugas
											</label>
											<textarea
												id="message"
												rows={4}
												className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Deskripsi Tugas"
												defaultValue={""}
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Tanggal Tugas
											</label>
											<input
												type="date"
												id="nama_tugas"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Nama Tugas"
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Deadline Tugas
											</label>
											<input
												type="date"
												id="nama_tugas"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Nama Tugas"
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Detail Tugas
											</label>
											<div className="flex gap-5">
												<div
													className="flex items-center gap-2"
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
													className="flex items-center gap-2"
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
										</div>
										<button
											type="submit"
											className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											Kirim
										</button>
									</form>
								</div>
							</Modal.Body>
						</Modal>
					)}
					{isTabletModalOpenEdit && (
						<Modal
							dismissible
							show={isTabletModalOpenEdit}
							onClose={() => setisTabletModalOpenEdit(false)}
						>
							<Modal.Header>Tambah Tugas</Modal.Header>
							<Modal.Body>
								<div className="add-form">
									<form className="max-w-full">
										<div className="mb-5">
											<label
												htmlFor="materi"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Materi
											</label>
											<select
												id="countries"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											>
												<option>Materi</option>
												<option>Desain</option>
												<option>Tools</option>
											</select>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Nama Tugas
											</label>
											<input
												type="text"
												id="nama_tugas"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Nama Tugas"
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Deskripsi Tugas
											</label>
											<textarea
												id="message"
												rows={4}
												className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Deskripsi Tugas"
												defaultValue={""}
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Tanggal Tugas
											</label>
											<input
												type="date"
												id="nama_tugas"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Nama Tugas"
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Deadline Tugas
											</label>
											<input
												type="date"
												id="nama_tugas"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Masukkan Nama Tugas"
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="nama_tugas"
												className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
											>
												Detail Tugas
											</label>
											<div className="flex gap-5">
												<div
													className="flex items-center gap-2"
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
													className="flex items-center gap-2"
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
										</div>
										<button
											type="submit"
											className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											Kirim
										</button>
									</form>
								</div>
							</Modal.Body>
						</Modal>
					)}
				</div>
			</div>
		</div>
	);
};

export default TugasGuru;
