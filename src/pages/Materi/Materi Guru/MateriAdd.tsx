import { FileInput, TextInput } from "flowbite-react"; // Import Modal component
import { useState } from "react";
import Swal from "sweetalert2";
import { useGetLessonByGuru, useGetMapelByGuru } from "../../../services/queries";
import { useCreateMateri } from "../../../services/mutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { UploadMateri } from "../../../types/materi";

const MateriAdd = ({
	handleCloseForms,
	setShowAddForm,
}: {
	handleCloseForms: () => void;
	setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	// const [showEditForm, setShowEditForm] = useState(false);
	const [selectedOption, setSelectedOption] = useState("file");

	const [formUpdate, setFormUpdate] = useState<{
		id: string;
		courseName: string;
		description: string;
		fileData: File | null; // Update the type here
		linkCourse: string;
		lessonName: string;
	}>({
		id: "",
		courseName: "",
		description: "",
		fileData: null, // Initialize with null
		linkCourse: "",
		lessonName: "",
	});

	const handleOptionChange = (option: string) => {
		setSelectedOption(option);
	};

	const [form, setForm] = useState({
		CourseName: "",
		Description: "",
		FileData: "",
		LinkCourse: "",
		LessonName: "",
		TeacherId: "",
	});

	const handleInputChange = (e: any) => {
		const { value, name } = e.target;
		setFormUpdate({
			...formUpdate,
			[name]: value,
		});
		console.log("data form", form);
	};

	const createMateri = useCreateMateri();
	const { register, handleSubmit, reset } = useForm<UploadMateri>();

	const [uploadedFile, setUploadedFile] = useState(null);

	const handleCreateMateriSubmit: SubmitHandler<UploadMateri> = async (
		data
	) => {
		try {
			// Membuat objek FormData
			const formData = new FormData();
			formData.append("CourseName", data.CourseName);
			formData.append("Description", data.Description);
			formData.append("LinkCourse", data.LinkCourse);
			formData.append("LessonName", data.LessonName);
			formData.append("TeacherId", data.TeacherId);
			if (data.FileData) {
				formData.append("FileData", data.FileData[0]); // Mengambil file pertama dari array fileData
			}

			// Mengirim data materi ke API menggunakan createMateri.mutateAsync
			await createMateri.mutate(data, {
				onSuccess: () => {
					// Jika pengiriman sukses, lakukan tindakan setelah materi berhasil ditambahkan
					Swal.fire({
						icon: "success",
						title: "Berhasil!",
						text: "Materi Berhasil ditambahkan!",
						confirmButtonText: "Ok",
					}).then((result) => {
						if (result.isConfirmed) {
							reset();
							setForm({
								CourseName: "",
								Description: "",
								FileData: "",
								LinkCourse: "",
								LessonName: "",
								TeacherId: "",
							});
							setShowAddForm(false);
						}
					});
				},
			});
		} catch (error) {
			console.error("Error submitting materi:", error);
			// Handle error jika pengiriman data gagal
			Swal.fire({
				icon: "error",
				title: "Error!",
				text: "Terjadi kesalahan saat menambahkan materi.",
				confirmButtonText: "Ok",
			});
		}
	};

	const queryMapel = useGetLessonByGuru();
	const { data: dataMapel } = queryMapel;

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			setUploadedFile(file);
			setFormUpdate({
				...formUpdate,
				fileData: file, // Set fileData to the selected file
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(handleCreateMateriSubmit)}>
			<hr className="my-3" />
			<div>
				<label
					htmlFor="name"
					className="block mb-2 text-sm font-medium text-blue-700 capitalize"
				>
					nama materi
				</label>
				<input
					type="text"
					// value={form.CourseName}

					{...register(`CourseName`, { required: true })}
					onChange={handleInputChange}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 capitalize"
					placeholder="Masukkan nama lengkap"
					required
					onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
						e.target.setCustomValidity("Nama Lengkap tidak boleh kosong")
					}
					onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
						e.target.setCustomValidity("")
					}
				/>
			</div>
			<p className="mt-2">Mata Pelajaran</p>
			<select
				{...register("LessonName")}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<option value="">Pilih Mata Pelajaran</option>
				{dataMapel &&
					dataMapel.map((mapel) => (
						<option key={mapel.id} value={mapel.lessonName}>
							{mapel.lessonName}
						</option>
					))}
			</select>

			<p className="mt-2">Deskripsi</p>
			<textarea
				className="mt-2bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 capitalize"
				id="Description"
				{...register(`Description`, { required: true })}
				onChange={handleInputChange}
				placeholder="Masukkan deskripsi tugas disini..."
				required
				rows={4}
			/>

			{/* Modul */}
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

			{/* File atau link input */}
			{selectedOption === "file" && (
				<div id="fileUpload" className="mt-4">
					<FileInput
						id="fileData"
						{...register("FileData")}
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
						{...register("LinkCourse")}
						onChange={handleInputChange}
						placeholder="Masukkan url atau link yang valid disini"
					/>
				</div>
			)}

			{/* Tombol submit */}
			<input
				type="submit"
				disabled={createMateri.isPending}
				value={createMateri.isPending ? "Menyimpan..." : "Simpan"}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
			/>
		</form>
	);
};

export default MateriAdd;
