import { FileInput, TextInput } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useGetLessonByGuru } from "../../../services/queries";
import { useCreateMateri } from "../../../services/mutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { UploadMateri } from "../../../types/materi";

const MateriAddMobile = ({
	setisMobileModalOpenAdd,
}: {
	setisMobileModalOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [selectedOption, setSelectedOption] = useState("file");

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
		setForm({
			...form,
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
			formData.append("LessonName", data.LessonName);
			formData.append("TeacherId", data.TeacherId);
			if (uploadedFile) {
				formData.append("FileData", uploadedFile);
			}

			if (data.LinkCourse) {
				formData.append("LinkCourse", data.LinkCourse);
			}

			// Mengirim data materi ke API menggunakan createMateri.mutateAsync
			await createMateri.mutate(formData, {
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
							setisMobileModalOpenAdd(false);
							setUploadedFile(null);
						}
					});
				},
			});
		} catch (error: any) {
			Swal.fire({
				icon: "error",
				title: "Gagal",
				text: error.toString(),
				confirmButtonText: "Ok",
			});
		}
	};

	const queryMapel = useGetLessonByGuru();
	const { data: dataMapel } = queryMapel;

	// Handler untuk mengubah file
	const handleFileChange = (e: any) => {
		const file = e.target.files[0];
		setUploadedFile(file);
	};

	const handleBatal = () => {
		Swal.fire({
			icon: "warning",
			title: "Peringatan",
			text: "Apakah Anda yakin? Perubahan tidak akan tersimpan!",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Ya, lanjutkan",
			cancelButtonText: "Tidak",
		}).then((result) => {
			if (result.isConfirmed) {
				setisMobileModalOpenAdd(false);
				reset();
			}
		});
	};

	return (
		<form onSubmit={handleSubmit(handleCreateMateriSubmit)}>
			<hr className="my-3" />
			<div className="space-y-3">
				<div>
					<label
						htmlFor="name"
						className="block mb-2 text-sm font-medium text-blue-700 capitalize"
					>
						nama materi
					</label>
					<input
						type="text"
						{...register(`CourseName`, { required: true })}
						onChange={handleInputChange}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 capitalize"
						placeholder="Masukkan nama lengkap"
						required
						onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
							e.target.setCustomValidity("Nama materi tidak boleh kosong")
						}
						onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
							e.target.setCustomValidity("")
						}
					/>
				</div>
				<div>
					<label
						htmlFor="name"
						className="block mb-2 text-sm font-medium text-blue-700 capitalize"
					>
						Mata Pelajaran
					</label>
					<select
						{...register("LessonName")}
						className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-200 focus:border-none block w-full p-2.5 capitalize"
						required
						onInvalid={(e: React.ChangeEvent<HTMLSelectElement>) =>
							e.target.setCustomValidity("Harap pilih mata pelajaran")
						}
						onInput={(e: React.ChangeEvent<HTMLSelectElement>) =>
							e.target.setCustomValidity("")
						}
					>
						<option value="">Pilih Mata Pelajaran</option>
						{dataMapel &&
							dataMapel.map((mapel) => (
								<option key={mapel.lessonId} value={mapel.lessonName}>
									{mapel.lessonName}
								</option>
							))}
					</select>
				</div>
				<div>
					<label
						htmlFor="name"
						className="block mb-2 text-sm font-medium text-blue-700 capitalize"
					>
						Deskripsi
					</label>
					<textarea
						className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 capitalize"
						id="Description"
						{...register(`Description`, { required: true })}
						onChange={handleInputChange}
						placeholder="Masukkan deskripsi tugas disini..."
						required
						onInvalid={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							e.target.setCustomValidity("Deskripsi tidak boleh kosong")
						}
						onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							e.target.setCustomValidity("")
						}
						rows={4}
					/>
				</div>
				{/* Modul */}
				<div>
					<label
						htmlFor="name"
						className="block mb-2 text-sm font-medium text-blue-700 capitalize"
					>
						Modul
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

					{/* File atau link input */}
					{selectedOption === "file" && (
						<div id="fileUpload" className="mt-4">
							<FileInput
								id="FileData"
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
				</div>

				{/* Tombol submit */}
				<div>
					<div className="flex items-center gap-2">
						<input
							type="submit"
							disabled={createMateri.isPending}
							value={createMateri.isPending ? "Menyimpan..." : "Simpan"}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-32"
						/>
						<button
							onClick={handleBatal}
							type="submit"
							className="flex w-20 items-center text-center justify-center  px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 capitalize"
						>
							batal
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};
export default MateriAddMobile;
