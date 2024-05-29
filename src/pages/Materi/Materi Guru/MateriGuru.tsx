import Navigation from "../../../component/Navigation/Navigation";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useGetLessonByGuru, useTeacherinfo } from "../../../services/queries";
import { IMateriGuru } from "../../../types/materi";
import MateriAdd from "./MateriAdd";
import MateriEdit from "./MateriEdit";
import MateriEditMobile from "./MateriEditMobile";
import MateriAddMobile from "./MateriAddMobile";
import MateriAddTablet from "./MateriAddTablet";
import MateriEditTablet from "./MateriEditTablet";

const MateriGuru = () => {
	const [showAddForm, setShowAddForm] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [isMobileModalOpenAdd, setisMobileModalOpenAdd] = useState(false);
	const [isMobileModalOpenEdit, setisMobileModalOpenEdit] = useState(false);
	const [isTabletModalOpenAdd, setisTabletModalOpenAdd] = useState(false);
	const [isTabletModalOpenEdit, setisTabletModalOpenEdit] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);

	const teacherinfo = useTeacherinfo();
	const { data: formData } = teacherinfo;

	const [formUpdate, setFormUpdate] = useState<{
		id: string;
		courseName: string;
		description: string;
		fileData: string;
		linkCourse: string;
		lessonName: string;
	}>({
		id: "",
		courseName: "",
		description: "",
		fileData: "",
		linkCourse: "",
		lessonName: "",
	});

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

	const handleShowEditForm = async (data: IMateriGuru) => {
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
					// Tutup form tambah jika dikonfirmasi
					setShowAddForm(false);
					setFormUpdate({
						id: data.id,
						courseName: data.courseName || "",
						description: data.description || "",
						fileData: data.fileData || "",
						linkCourse: data.linkCourse || "",
						lessonName: data.lessonName || "",
					});
				}
			});
		} else {
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
						// Tampilkan form edit
						setShowEditForm(true);
						setShowAddForm(false);
						setFormUpdate({
							id: data.id,
							courseName: data.courseName || "",
							description: data.description || "",
							fileData: data.fileData || "",
							linkCourse: data.linkCourse || "",
							lessonName: data.lessonName || "",
						});
					}
				});
			} else {
				setFormUpdate({
					id: data.id,
					courseName: data.courseName || "",
					description: data.description || "",
					fileData: data.fileData || "",
					linkCourse: data.linkCourse || "",
					lessonName: data.lessonName || "",
				});
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

	const handleShowModalAddFormTablet = () => {
		setisTabletModalOpenAdd(true);
		setisTabletModalOpenEdit(false);
	};

	const handleShowModalEditFormMobile = (data: IMateriGuru) => {
		setFormUpdate({
			id: data.id,
			courseName: data.courseName || "",
			description: data.description || "",
			fileData: data.fileData || "",
			linkCourse: data.linkCourse || "",
			lessonName: data.lessonName || "",
		});
		setisMobileModalOpenEdit(true);
		setisMobileModalOpenAdd(false);
	};

	const handleCloseModalFormMobile = () => {
		if (isMobileModalOpenAdd || isMobileModalOpenEdit) {
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
					setisMobileModalOpenAdd(false);
					setisMobileModalOpenEdit(false);
				}
			});
		} else {
			setisMobileModalOpenAdd(false);
			setisMobileModalOpenEdit(false);
		}
	};

	const handleCloseModalFormTablet = () => {
		if (isTabletModalOpenAdd || isTabletModalOpenEdit) {
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
					setisTabletModalOpenAdd(false);
					setisTabletModalOpenEdit(false);
				}
			});
		} else {
			setisTabletModalOpenAdd(false);
			setisTabletModalOpenEdit(false);
		}
	};

	const [selectedLesson, setSelectedLesson] = useState("semua mapel");

	const queryMapel = useGetLessonByGuru();
	const { data: dataMapel, isLoading } = queryMapel;

	const filteredData: IMateriGuru[] =
		selectedLesson === "semua mapel"
			? formData || []
			: (formData || []).filter(
					(materi) => materi.lessonName === selectedLesson
			  );

	const handleShowModalEditFormTablet = (data: IMateriGuru) => {
		setFormUpdate({
			id: data.id,
			courseName: data.courseName || "",
			description: data.description || "",
			fileData: data.fileData || "",
			linkCourse: data.linkCourse || "",
			lessonName: data.lessonName || "",
		});
		setisTabletModalOpenEdit(true);
		setisTabletModalOpenAdd(false);
	};

	const handleLessonChange = (e: any) => {
		setSelectedLesson(e.target.value);
	};

	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (e: any) => {
		setSearchTerm(e.target.value);
	};
	const searchFilter = (lesson: any) => {
		return (
			lesson.courseName &&
			lesson.courseName.toLowerCase().includes(searchTerm.toLowerCase())
		);
	};

	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2">
					{/* left side */}
					<div>
						<div className="flex items-center justify-between mt-16 mb-2">
							<h1 className="text-3xl font-bold capitalize">Materi</h1>

							{isMobile && (
								<button
									type="button"
									onClick={handleShowModalAddFormMobile}
									className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
									className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
									className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
									Materi
								</button>
							)}
						</div>

						<div className="flex justify-between gap-4 mt-5">
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
										className="block md:w-80 w-full p-2.5 ps-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-gray-200 focus:border-none capitalize"
										placeholder="temukan materi disini...."
										value={searchTerm}
										onChange={handleSearchChange}
									/>
								</div>
							</form>
							<select
								value={selectedLesson}
								onChange={handleLessonChange}
								className="p-2 capitalize bg-white border border-gray-300 rounded-lg"
							>
								<option selected>semua mapel</option>
								{dataMapel?.map((item) => (
									<option value={item.lessonName}>{item.lessonName}</option>
								))}
							</select>
						</div>
						<div
							className="overflow-y-auto overflow-clip max-h-[calc(100vh-100px)]"
							style={{ scrollbarWidth: "none" }}
						>
							<div className="flex flex-col gap-3 mt-6 ">
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
									filteredData.filter(searchFilter).length > 0 ? (
										filteredData.filter(searchFilter).map((card) => (
											<div key={card.id} className="cursor-pointer">
												<div className="flex items-center justify-between gap-2 p-3 bg-white rounded-lg shadow-sm">
													<div className="flex gap-3">
														<div className="flex items-center bg-blue-100 rounded-lg h-14">
															<svg
																className="w-12 h-12 text-blue-600 dark:text-white"
																aria-hidden="true"
																xmlns="http://www.w3.org/2000/svg"
																fill="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	fillRule="evenodd"
																	d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2c.6 0 1-.4 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
																	clipRule="evenodd"
																/>
															</svg>
														</div>
														<div className="flex flex-col">
															<p className="text-sm text-gray-500 capitalize">
																{card.lessonName}
															</p>
															<p className="text-base font-medium capitalize">
																{card.courseName}
															</p>
															<p className="text-sm text-gray-500 capitalize">
																{card.longClassName}
															</p>
														</div>
													</div>
													<Button
														color="warning"
														onClick={
															isMobile
																? () => handleShowModalEditFormMobile(card)
																: isTablet
																? () => handleShowModalEditFormTablet(card)
																: () => handleShowEditForm(card)
														}
													>
														Edit
													</Button>
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
										Tidak ada data yang sesuai dengan pilihan pelajaran yang
										dipilih.
									</p>
								)}
							</div>
						</div>
					</div>
					{/* right side */}
					{showAddForm && (
						<div
							className="fixed w-2/5 h-screen pb-16 overflow-y-auto right-4 top-6"
							style={{ scrollbarWidth: "none" }}
						>
							<div className="p-3 bg-white border rounded-lg shadow-sm mt-14">
								<div className="flex justify-between">
									<p className="text-xl font-bold text-gray-500">
										Upload Materi
									</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseForms}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-6 h-6"
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
								<MateriAdd setShowAddForm={setShowAddForm} />
							</div>
						</div>
					)}
					{showEditForm && (
						<div
							className="fixed w-2/5 h-screen pb-16 overflow-y-auto right-4 top-6"
							style={{ scrollbarWidth: "none" }}
						>
							<div className="p-3 bg-white border rounded-lg shadow-sm mt-14">
								<div className="flex justify-between">
									<p className="text-xl font-bold text-gray-500">Edit Materi</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseForms}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-6 h-6"
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
								<MateriEdit
									id={formUpdate.id}
									setShowEditForm={setShowEditForm}
								/>
							</div>
						</div>
					)}
					{isMobileModalOpenAdd && (
						<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
							<div className="w-full p-4 bg-white rounded-lg sm:max-w-md">
								<div className="flex justify-between">
									<p className="text-xl font-bold text-gray-500">
										Upload Materi
									</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseModalFormMobile}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-6 h-6"
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
								<MateriAddMobile
									setisMobileModalOpenAdd={setisMobileModalOpenAdd}
								/>
							</div>
						</div>
					)}
					{isMobileModalOpenEdit && (
						<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
							<div className="w-full p-4 bg-white rounded-lg sm:max-w-md">
								<div className="flex justify-between">
									<p className="text-xl font-bold text-gray-500">Edit Materi</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseModalFormMobile}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-6 h-6"
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
								<MateriEditMobile
									id={formUpdate.id}
									setisMobileModalOpenEdit={setisMobileModalOpenEdit}
								/>
							</div>
						</div>
					)}
					{isTabletModalOpenAdd && (
						<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
							<div className="w-full p-4 bg-white rounded-lg sm:max-w-md">
								<div className="flex justify-between">
									<p className="text-xl font-bold text-gray-500">
										Upload Materi
									</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseModalFormTablet}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-6 h-6"
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
								<MateriAddTablet
									setisTabletModalOpenAdd={setisTabletModalOpenAdd}
								/>
							</div>
						</div>
					)}
					{isTabletModalOpenEdit && (
						<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
							<div className="w-full p-4 bg-white rounded-lg sm:max-w-md">
								<div className="flex justify-between">
									<p className="text-xl font-bold text-gray-500">Edit Materi</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseModalFormTablet}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-6 h-6"
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
								<MateriEditTablet
									id={formUpdate.id}
									setisTabletModalOpenEdit={setisTabletModalOpenEdit}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MateriGuru;
