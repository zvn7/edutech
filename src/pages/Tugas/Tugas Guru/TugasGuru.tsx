import Navigation from "../../../component/Navigation/Navigation";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
	useAssignmentsByTeacherId,
	useGetLessonByGuru,
} from "../../../services/queries";
import { useDeleteTugas } from "../../../services/mutation";
import TugasEdit from "./TugasEdit";
import TugasAdd from "./TugasAdd";
import TugasAddMobile from "./TugasAddMobile";
import TugasEditMobile from "./TugasEditMobile";
import TugasAddTablet from "./TugasAddTablet";
import TugasEditTablet from "./TugasEditTablet";

const TugasGuru = () => {
	const [showAddForm, setShowAddForm] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [isMobileModalOpenAdd, setisMobileModalOpenAdd] = useState(false);
	const [isMobileModalOpenEdit, setisMobileModalOpenEdit] = useState(false);
	const [isTabletModalOpenAdd, setisTabletModalOpenAdd] = useState(false);
	const [isTabletModalOpenEdit, setisTabletModalOpenEdit] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);
	const assigmentQueries = useAssignmentsByTeacherId();
	const { data: assigmentData, isLoading } = assigmentQueries;
	const [selectedLesson, setSelectedLesson] = useState("semua tugas");

	const mapelQuery = useGetLessonByGuru();
	const { data: dataMapel } = mapelQuery;

	useEffect(() => {
		const handleResize = () => {
			const windowWidth = window.innerWidth;
			setIsMobile(windowWidth <= 768);
			setIsTablet(windowWidth > 768 && windowWidth <= 1024);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleLessonChange = (e: any) => {
		setSelectedLesson(e.target.value);
	};

	const filteredData =
		selectedLesson === "semua tugas"
			? assigmentData
			: assigmentData?.filter(
					({ lessonName }) => lessonName === selectedLesson
			  );

	const handleShowAddForm = () => {
		if (showEditForm) {
			Swal.fire({
				title: "Peringatan",
				text: "Apakah Anda yakin? Perubahan tidak akan tersimpan!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#d33",
				cancelButtonColor: "#3085d6",
				confirmButtonText: "Ya, lanjutkan",
				cancelButtonText: "Tidak",
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

	const [taskIdToEdit, setTaskIdToEdit] = useState(null);

	const handleShowEditForm = (taskId: any) => {
		if (showAddForm) {
			Swal.fire({
				title: "Peringatan",
				text: "Apakah Anda yakin? Perubahan tidak akan tersimpan!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#d33",
				cancelButtonColor: "#3085d6",
				confirmButtonText: "Ya, lanjutkan",
				cancelButtonText: "Tidak",
			}).then((result) => {
				if (result.isConfirmed) {
					setShowAddForm(false);
					setTaskIdToEdit(taskId);
					setShowEditForm(true);
				}
			});
		} else {
			if (showEditForm) {
				setTaskIdToEdit(taskId);
				Swal.fire({
					title: "Peringatan",
					text: "Apakah Anda yakin? Perubahan tidak akan tersimpan!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#d33",
					cancelButtonColor: "#3085d6",
					confirmButtonText: "Ya, lanjutkan",
					cancelButtonText: "Tidak",
				}).then((result) => {
					if (result.isConfirmed) {
						setTaskIdToEdit(taskId);
						setShowEditForm(true);
						setShowAddForm(false);
					}
				});
			} else {
				setTaskIdToEdit(taskId);
				setShowEditForm(true);
				setShowAddForm(false);
			}
		}
	};

	const handleCloseForms = () => {
		if (showAddForm || showEditForm) {
			Swal.fire({
				title: "Peringatan",
				text: "Apakah Anda yakin? Perubahan tidak akan tersimpan!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#d33",
				cancelButtonColor: "#3085d6",
				confirmButtonText: "Ya, lanjutkan",
				cancelButtonText: "Tidak",
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

	const handleShowModalEditFormMobile = (taskId: any) => {
		if (showAddForm) {
			Swal.fire({
				title: "Peringatan",
				text: "Apakah Anda yakin? Perubahan tidak akan tersimpan!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#d33",
				cancelButtonColor: "#3085d6",
				confirmButtonText: "Ya, lanjutkan",
				cancelButtonText: "Tidak, batalkan",
			}).then((result) => {
				if (result.isConfirmed) {
					isMobileModalOpenAdd
						? setisMobileModalOpenAdd(false)
						: setisMobileModalOpenAdd(false);
					setTaskIdToEdit(taskId);
					isMobileModalOpenEdit
						? setisMobileModalOpenEdit(false)
						: setisMobileModalOpenEdit(true);
				}
			});
		} else {
			setTaskIdToEdit(taskId);
			isMobileModalOpenEdit
				? setisMobileModalOpenEdit(false)
				: setisMobileModalOpenEdit(!isMobileModalOpenEdit);
		}
	};

	const handleShowModalAddFormTablet = () => {
		setisTabletModalOpenAdd(true);
		setisTabletModalOpenEdit(false);
	};

	const handleShowModalEditFormTablet = (taskId: any) => {
		if (isTabletModalOpenEdit) {
			Swal.fire({
				title: "Peringatan",
				text: "Apakah Anda yakin? Perubahan tidak akan tersimpan!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#d33",
				cancelButtonColor: "#3085d6",
				confirmButtonText: "Ya, lanjutkan",
				cancelButtonText: "Tidak, batalkan",
			}).then((result) => {
				if (result.isConfirmed) {
					setisTabletModalOpenAdd(false);
					// Set ID tugas yang akan diedit ke dalam state
					setTaskIdToEdit(taskId);
					setisTabletModalOpenEdit(true);
				}
			});
		} else {
			// Set ID tugas yang akan diedit ke dalam state
			setTaskIdToEdit(taskId);
			setisTabletModalOpenEdit(!isTabletModalOpenEdit);
		}
	};

	const [searchTerm, setSearchTerm] = useState("");

	const filteredAssignments = (tugas: any) => {
		return tugas.assignmentName
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
	};

	const handleSearchChange = (e: any) => {
		setSearchTerm(e.target.value);
	};

	const deleteTugas = useDeleteTugas();

	const handleDeleteTugas = async (id: any) => {
		const confirmation = await Swal.fire({
			title: "Peringatan",
			text: "Apakah Anda yakin? Perubahan tidak akan tersimpan!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Ya, Lanjutkan",
			cancelButtonText: "Batal",
		});

		if (confirmation.isConfirmed) {
			try {
				await deleteTugas.mutateAsync(id);
				Swal.fire({
					icon: "success",
					title: "Berhasil",
					text: "Tugas Berhasil dihapus!",
					confirmButtonText: "Ok",
				});
			} catch (error: any) {
				Swal.fire({
					icon: "error",
					title: "Gagal",
					text: error.toString(),
					confirmButtonText: "Ok",
				});
			}
		}
	};

	const formatDate = (assignmentDate: string): string => {
		const parts = assignmentDate.split("-");
		const year = parts[0];
		const month = parseInt(parts[1], 10);
		const date = parseInt(parts[2], 10);

		const months = [
			"Januari",
			"Februari",
			"Maret",
			"April",
			"Mei",
			"Juni",
			"Juli",
			"Agustus",
			"September",
			"Oktober",
			"November",
			"Desember",
		];

		return `${date} ${months[month - 1]} ${year}`;
	};
	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
					<div>
						<div className="mt-14 flex justify-between">
							<h1 className="text-3xl font-bold font-mono">Tugas</h1>
							<select
								id="countries"
								value={selectedLesson}
								onChange={handleLessonChange}
								className="p-2 capitalize bg-white border border-gray-300 rounded-lg"
							>
								<option selected>semua tugas</option>
								{dataMapel?.map((mapel) => (
									<option key={mapel.lessonId} value={mapel.lessonName}>
										{mapel.lessonName}
									</option>
								))}
							</select>
						</div>

						<div className="mt-5 flex justify-between gap-4 mb-2">
							<form className="max-w-xs" onSubmit={(e) => e.preventDefault()}>
								<label
									htmlFor="default-search"
									className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
								>
									Search
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
										<img
											src="/gif/search.gif"
											alt="search"
											className="w-5 h-5"
										/>
									</div>
									<input
										type="search"
										id="default-search"
										className="block md:w-80 w-56 p-2 ps-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-gray-200 focus:border-none capitalize"
										placeholder="temukan tugas disini...."
										value={searchTerm}
										onChange={handleSearchChange}
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

						<div
							className="overflow-y-auto overflow-clip max-h-[calc(100vh-100px)]"
							style={{ scrollbarWidth: "none" }}
						>
							<div className="mt-4 flex flex-col gap-3">
								{isLoading ? (
									Array.from({ length: 5 }).map((_, index) => (
										<div
											key={index}
											className="flex items-center shadow-sm p-3 gap-2 bg-white mb-2 rounded-lg animate-pulse"
										>
											<div className="flex gap-3">
												<div className="bg-blue-100 rounded-lg h-14 w-14"></div>
												<div className="flex flex-col space-y-2">
													<div className="bg-gray-200 h-4 w-40 rounded"></div>
													<div className="bg-gray-200 h-4 w-48 rounded"></div>
													<div className="bg-gray-200 h-4 w-32 rounded"></div>
												</div>
											</div>
										</div>
									))
								) : filteredData && filteredData.length > 0 ? (
									filteredData.filter(filteredAssignments).length > 0 ? (
										filteredData.filter(filteredAssignments).map((items) => (
											<div key={items?.assignmentId} className="cursor-pointer">
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
																{items?.lessonName}
															</p>
															<h2
																className="text-md font-medium"
																title={items?.assignmentName}
															>
																{items?.assignmentName &&
																items.assignmentName.length > 25
																	? items.assignmentName.substring(0, 25) +
																	  "..."
																	: items.assignmentName}
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
																		{formatDate(items?.assignmentDate)}
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
																	? () =>
																			handleShowModalEditFormMobile(
																				items.assignmentId
																			)
																	: isTablet
																	? () =>
																			handleShowModalEditFormTablet(
																				items.assignmentId
																			)
																	: () => handleShowEditForm(items.assignmentId)
															}
														>
															Edit
														</Button>

														<Button
															onClick={() =>
																handleDeleteTugas(items.assignmentId)
															}
															color="failure"
														>
															Hapus
														</Button>
													</Button.Group>
												</div>
											</div>
										))
									) : (
										<p className="text-center text-gray-400">
											Tidak ada hasil pencarian yang sesuai.
										</p>
									)
								) : (
									<p className="text-center text-gray-400">
										Tidak ada data yang sesuai dengan pilihan tugas yang
										dipilih.
									</p>
								)}
							</div>
						</div>
					</div>
					{/* right side */}
					{showAddForm && (
						<div
							className="overflow-y-auto"
							style={{ scrollbarWidth: "none" }}
						>
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
								<TugasAdd
									setShowAddForm={setShowAddForm}
									handleCloseForms={handleCloseForms}
								/>
							</div>
						</div>
					)}
					{showEditForm && (
						<div
							className="overflow-y-auto"
							style={{ scrollbarWidth: "none" }}
						>
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
									{/* Tambahkan logika untuk menampilkan formulir edit berdasarkan ID yang disimpan */}
									<TugasEdit
										id={taskIdToEdit}
										setShowEditForm={setShowEditForm}
									/>
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
									<TugasAddMobile
										setisMobileModalOpenAdd={setisMobileModalOpenAdd}
										handleCloseForms={handleCloseForms}
									/>
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
							<Modal.Header>Edit Tugas</Modal.Header>
							<Modal.Body>
								<TugasEditMobile
									id={taskIdToEdit}
									setisMobileModalOpenEdit={setisMobileModalOpenEdit}
								/>
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
									<TugasAddTablet
										setisTabletModalOpenAdd={setisTabletModalOpenAdd}
										handleCloseForms={handleCloseForms}
									/>
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
									<TugasEditTablet
										id={taskIdToEdit}
										setisTabletModalOpenEdit={setisTabletModalOpenEdit}
									/>
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
