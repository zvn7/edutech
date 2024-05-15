import { FileInput, TextInput } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useTeacherinfo, useGetLessonByGuru } from "../../../services/queries";
import { useCreateTugas } from "../../../services/mutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Tugas } from "../../../types/tugas";

const TugasAddTablet = ({
	setisTabletModalOpenAdd,
}: {
	setisTabletModalOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [selectedOption, setSelectedOption] = useState("file");
	const createTugas = useCreateTugas();
	const { register, handleSubmit, reset } = useForm<Tugas>();
	const courseQueries = useTeacherinfo();
	const { data: courseData } = courseQueries;

	const [form, setForm] = useState({
		assignmentId: "",
		assignmentName: "",
		assignmentDate: "",
		assignmentDeadline: "",
		assignmentDescription: "",
		assignmentFileData: "",
		assignmentLink: "",
		courseId: "",
		typeOfSubmission: 0,
	});

	const [selectedLesson, setSelectedLesson] = useState("");

	const mapelQuery = useGetLessonByGuru();
	const { data: dataMapel } = mapelQuery;

	const handleInputChange = (e: any) => {
		const { value, name } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleLessonChange = (e: any) => {
		setSelectedLesson(e.target.value);
	};

	const handleCreateTugasSubmit: SubmitHandler<Tugas> = async (data) => {
		try {
			const formData = new FormData();
			formData.append("assignmentName", data.assignmentName);
			formData.append("assignmentDate", data.assignmentDate);
			formData.append("assignmentDeadline", data.assignmentDeadline);
			formData.append("assignmentDescription", data.assignmentDescription);
			formData.append("courseId", data.courseId);

			// Menambahkan file jika ada
			if (uploadedFile) {
				formData.append("assignmentFileData", uploadedFile);
			}
			// Menambahkan link jika ada
			if (data.assignmentLink) {
				formData.append("assignmentLink", data.assignmentLink);
			}

			formData.append("typeOfSubmission", data.typeOfSubmission.toString());

			// Mengirim data tugas ke API menggunakan createTugas.mutateAsync
			await createTugas.mutate(formData, {
				onSuccess: () => {
					// Jika pengiriman sukses, lakukan tindakan setelah tugas berhasil ditambahkan
					Swal.fire({
						icon: "success",
						title: "Tugas Berhasil",
						text: "Tugas Berhasil Berhasil",
						confirmButtonText: "Ok",
					}).then((result) => {
						if (result.isConfirmed) {
							setisTabletModalOpenAdd(false);
							reset();
							setForm({
								assignmentId: "",
								assignmentName: "",
								assignmentDate: "",
								assignmentDeadline: "",
								assignmentDescription: "",
								assignmentFileData: "",
								assignmentLink: "",
								courseId: "",
								typeOfSubmission: 0,
							});
							setUploadedFile(null); // Mengatur uploadedFile kembali menjadi null setelah pengiriman berhasil
						}
					});
				},
			});
		} catch (error) {
			console.error("Error submitting tugas:", error);
			// Handle error jika pengiriman data gagal
			Swal.fire({
				icon: "error",
				title: "Error!",
				text: "Terjadi kesalahan saat menambahkan tugas.",
				confirmButtonText: "Ok",
			});
		}
	};

	const handleOptionChange = (option: string) => {
		setSelectedOption(option);
	};

	const [uploadedFile, setUploadedFile] = useState(null);

	// Handler untuk mengubah file
	const handleFileChange = (e: any) => {
		const file = e.target.files[0];
		setUploadedFile(file);
	};

	const filteredCourseData = courseData?.filter(
		(lesson) => lesson.lessonName === selectedLesson
	);

	return (
		<>
			<div className="mt-4 flex items-center bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full px-2.5">
				<label
					htmlFor="countries"
					className="mr-4 text-gray-700 dark:text-white"
				>
					Tugas
				</label>
				<select
					id="countries"
					value={selectedLesson}
					onChange={handleLessonChange}
					className="w-full bg-transparent border-none"
				>
					<option selected>Pilih Mapel</option>

					{dataMapel?.map((mapel) => (
						<option key={mapel.lessonId} value={mapel.lessonName}>
							{mapel.lessonName}
						</option>
					))}
				</select>
			</div>
			<form
				className="max-w-full mt-4"
				onSubmit={handleSubmit(handleCreateTugasSubmit)}
			>
				<div className="mb-5">
					<label
						htmlFor="materi"
						className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
					>
						Materi
					</label>
					<select
						id="countries"
						{...register("courseId")}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option selected>Pilih Materi</option>
						{filteredCourseData?.map((course) => (
							<option key={course.courseName} value={course.courseId}>
								{course.courseName}
							</option>
						))}
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
						{...register("assignmentName")}
						onChange={handleInputChange}
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
						{...register("assignmentDescription")}
						onChange={handleInputChange}
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
						{...register("assignmentDate")}
						onChange={handleInputChange}
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
						type="datetime-local"
						id="nama_tugas"
						{...register("assignmentDeadline", {
							setValueAs: (value) => value + "Z",
						})}
						onChange={handleInputChange}
						step="1"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Masukkan Nama Tugas"
					/>
				</div>
				<div className="mb-2">
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
							<FileInput
								id="assignmentFileData"
								{...register("assignmentFileData")}
								onChange={(e) => {
									handleFileChange(e);
								}}
							/>
						</div>
					)}
					{selectedOption === "link" && (
						<div id="linkInput" className="mt-4">
							<TextInput
								id="link"
								type="text"
								{...register("assignmentLink")}
								onChange={handleInputChange}
								placeholder="Masukkan url atau link yang valid disini"
								required
							/>
						</div>
					)}
				</div>
				<div className="mb-5">
					<label className="block mb-2 text-sm font-medium text-blue-600 dark:text-white">
						Tipe Pengumpulan
					</label>
					{/* select */}
					<select
						id="typeOfSubmission"
						{...register("typeOfSubmission")}
						onChange={handleInputChange}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option value="">Pilih Tipe Pengumpulan</option>
						<option value="1">File</option>
						<option value="2">Link</option>
					</select>
				</div>
				<input
					type="submit"
					disabled={createTugas.isPending}
					value={createTugas.isPending ? "Menyimpan..." : "Simpan"}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
				/>
			</form>
		</>
	);
};

export default TugasAddTablet;
