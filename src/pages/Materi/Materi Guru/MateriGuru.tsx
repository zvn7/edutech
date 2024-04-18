import Navigation from "../../../component/Navigation/Navigation";
import { Button, FileInput, TextInput, Textarea } from "flowbite-react"; // Import Modal component
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useTeacherinfo } from "../../../services/queries";
import { useCreateMateri } from "../../../services/mutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { IMateriGuru } from "../../../types/materi";

const MateriGuru = () => {
	const [showAddForm, setShowAddForm] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [selectedOption, setSelectedOption] = useState("file");
	const [selectedCardDescription, setSelectedCardDescription] = useState("");
	const [isMobileModalOpenAdd, setisMobileModalOpenAdd] = useState(false); // State untuk mengatur visibilitas modal di mode mobile
	const [isMobileModalOpenEdit, setisMobileModalOpenEdit] = useState(false);
	const [isTabletModalOpenAdd, setisTabletModalOpenAdd] = useState(false); // State untuk mengatur visibilitas modal di mode mobile
	const [isTabletModalOpenEdit, setisTabletModalOpenEdit] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);
	const teacherinfo = useTeacherinfo();
	const { data: formData } = teacherinfo;
	console.log("formData", formData);
	const createMateriMutation = useCreateMateri();
	const { register, handleSubmit, reset } = useForm<IMateriGuru>();
	const [course, setCourse] = useState({
		courses: [
			{
				courseName: "",
				description: "",
				fileName: "",
				linkCourse: "",
				uniqueNumberOfLesson: "",
				uniqueNumberOfClassRooms: "",
				fileData: "",
				lessonName: "",
			},
		],
	});

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

	const handleDeleteCard = (cardId: number) => {
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
				console.log("Deleting card with ID:", cardId);
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

	const handleCloseModalFormMobile = () => {
		if (isMobileModalOpenAdd || isMobileModalOpenEdit) {
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
					setisMobileModalOpenAdd(false);
					setisMobileModalOpenEdit(false);
				}
			});
		} else {
			setisMobileModalOpenAdd(false);
			setisMobileModalOpenEdit(false);
		}
	};

	const handleShowModalAddFormTablet = () => {
		setisTabletModalOpenAdd(true);
		setisTabletModalOpenEdit(false);
	};

	const handleShowModalEditFormTablet = () => {
		setisTabletModalOpenEdit(true);
		setisTabletModalOpenAdd(false);
	};

	const handleCloseModalFormTablet = () => {
		if (isTabletModalOpenAdd || isTabletModalOpenEdit) {
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
					setisTabletModalOpenAdd(false);
					setisTabletModalOpenEdit(false);
				}
			});
		} else {
			setisTabletModalOpenAdd(false);
			setisTabletModalOpenEdit(false);
		}
	};

	const handleCreateMateriSubmit: SubmitHandler<IMateriGuru> = (data) => {
		createMateriMutation.mutate(data, {
			onSuccess: () => {
				Swal.fire({
					title: "Success",
					text: "Materi Berhasil",
					icon: "success",
					confirmButtonColor: "#3085d6",
					confirmButtonText: "Ok",
				}).then((result) => {
					if (result.isConfirmed) {
						setShowAddForm(false);
						reset();
					}
				});
			},
		});
	};

	// const getTeacherIdFromToken = (): string | null => {
	// 	const token = localStorage.getItem("token");
	// 	if (token) {
	// 		const payload = token.split(".")[1];
	// 		const decodedPayload = JSON.parse(atob(payload));
	// 		return decodedPayload?.TeacherId || null;
	// 	}
	// 	return null;
	// };

	// const teacherId = getTeacherIdFromToken();

	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
					{/* left side */}
					<div>
						<div className=" mt-14 flex justify-between">
							<h1 className="text-3xl font-bold font-mono">Materi</h1>
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
										className="block md:w-96 w-56 p-2 ps-7 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
									Materi
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
									Materi
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
									Materi
								</button>
							)}
						</div>

						<div className="mt-8 flex flex-col gap-3">
							{formData?.courses.map((card) => (
								<div key={card.id} className="cursor-pointer">
									<div className="flex justify-between items-center  rounded-lg shadow-sm p-3 gap-2 bg-white">
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
														fillRule="evenodd"
														d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2c.6 0 1-.4 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
											<div className="flex flex-col">
												<p className="text-sm capitalize text-gray-500">
													{
														formData.lessons.find(
															(lesson) =>
																lesson.uniqueNumberOfLesson ===
																card.uniqueNumberOfLesson
														)?.lessonName
													}
												</p>
												<p className="text-base font-medium capitalize">
													{card.courseName}
												</p>
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
										Upload Materi
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
								<form onSubmit={handleSubmit(handleCreateMateriSubmit)}>
									{/* <input type="hidden" value={teacherId} {...register("teacherId")} /> */}
									<hr className="my-3" />
									<p className="mt-2">Nama Materi</p>
									<TextInput
										className="mt-2"
										id="lessonName"
										placeholder="Masukkan nama materi disini..."
										required
										{...register("courses.0.lessonName")}
									/>
									<p className="mt-2">Kelas</p>
									<p className="mt-2">Deskripsi</p>
									<Textarea
										className="mt-2"
										id="comment"
										placeholder="Masukkan deskripsi tugas disini..."
										required
										rows={4}
										{...register("courses.0.description")}
									/>

									<p className="mt-2">Modul</p>
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
											<FileInput
												id="file"
												{...register("courses.0.fileData")}
											/>
										</div>
									)}
									{selectedOption === "link" && (
										<div id="linkInput" className="mt-4">
											<TextInput
												id="link"
												type="text"
												placeholder="Masukkan url atau link yang valid disini"
												{...register("courses.0.linkCourse")}
											/>
										</div>
									)}
									<input
										type="submit"
										disabled={createMateriMutation.isPending}
										value={
											createMateriMutation.isPending ? "Loading..." : "Simpan"
										}
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
									/>
								</form>
							</div>
						</div>
					)}
					{showEditForm && (
						<div>
							<div className="border rounded-lg shadow-sm p-3 mt-14 bg-white">
								<div className="flex justify-between">
									<p className="text-gray-500 text-xl font-bold">Edit Materi</p>
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
								<p className="mt-2">Deskripsi</p>
								<Textarea
									className="mt-2"
									id="comment"
									placeholder="Masukkan deskripsi tugas disini..."
									required
									rows={4}
									value={selectedCardDescription}
									onChange={(e) => setSelectedCardDescription(e.target.value)}
								/>

								<p className="mt-2">Modul</p>
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
						</div>
					)}
					{isMobileModalOpenAdd && (
						<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
							<div className="bg-white p-4 rounded-lg w-full sm:max-w-md">
								<div className="flex justify-between">
									<p className="text-gray-500 text-xl font-bold">
										Upload Materi
									</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseModalFormMobile}
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
								<div>
									<p className="mt-2">Deskripsi</p>
									<Textarea
										className="mt-2"
										id="comment"
										placeholder="Masukkan deskripsi tugas disini..."
										required
										rows={4}
										value={selectedCardDescription}
										onChange={(e) => setSelectedCardDescription(e.target.value)}
									/>

									<p className="mt-2">Modul</p>
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
										className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
									>
										Kirim
									</button>
								</div>
							</div>
						</div>
					)}
					{isMobileModalOpenEdit && (
						<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
							<div className="bg-white p-4 rounded-lg w-full sm:max-w-md">
								<div className="flex justify-between">
									<p className="text-gray-500 text-xl font-bold">Edit Materi</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseModalFormMobile}
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
								<div>
									<p className="mt-2">Deskripsi</p>
									<Textarea
										className="mt-2"
										id="comment"
										placeholder="Masukkan deskripsi tugas disini..."
										required
										rows={4}
										value={selectedCardDescription}
										onChange={(e) => setSelectedCardDescription(e.target.value)}
									/>

									<p className="mt-2">Modul</p>
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
										className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
									>
										Kirim
									</button>
								</div>
							</div>
						</div>
					)}
					{isTabletModalOpenAdd && (
						<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
							<div className="bg-white p-4 rounded-lg w-full sm:max-w-md">
								<div className="flex justify-between">
									<p className="text-gray-500 text-xl font-bold">
										Upload Materi
									</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseModalFormTablet}
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
								<div>
									<p className="mt-2">Deskripsi</p>
									<Textarea
										className="mt-2"
										id="comment"
										placeholder="Masukkan deskripsi tugas disini..."
										required
										rows={4}
										value={selectedCardDescription}
										onChange={(e) => setSelectedCardDescription(e.target.value)}
									/>

									<p className="mt-2">Modul</p>
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
										className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
									>
										Kirim
									</button>
								</div>
							</div>
						</div>
					)}
					{isTabletModalOpenEdit && (
						<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
							<div className="bg-white p-4 rounded-lg w-full sm:max-w-md">
								<div className="flex justify-between">
									<p className="text-gray-500 text-xl font-bold">Edit Materi</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseModalFormTablet}
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
								<div>
									<p className="mt-2">Deskripsi</p>
									<Textarea
										className="mt-2"
										id="comment"
										placeholder="Masukkan deskripsi tugas disini..."
										required
										rows={4}
										value={selectedCardDescription}
										onChange={(e) => setSelectedCardDescription(e.target.value)}
									/>

									<p className="mt-2">Modul</p>
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
										className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
									>
										Kirim
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MateriGuru;
