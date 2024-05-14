import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useGetLessonByGuru } from "../../../services/queries";
import axios from "axios";
import { FileInput, Textarea, TextInput } from "flowbite-react"; // Pastikan impor FileInput ada di sini

interface MateriEditProps {
	id: string;
	setisMobileModalOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const MateriEditMobile = ({ id, setisMobileModalOpenEdit }: MateriEditProps) => {
	const [selectedOption, setSelectedOption] = useState("file");
	const [loading, setLoading] = useState(false);
	const [formUpdate, setFormUpdate] = useState({
		id: "",
		courseName: "",
		description: "",
		fileData: null,
		linkCourse: "",
		lessonName: "",
	});

	const queryMapel = useGetLessonByGuru();
	const { data: dataMapel } = queryMapel;

	useEffect(() => {
		const fetchMateri = async () => {
			try {
				const response = await axios.get(
					`http://192.168.110.239:13311/api/Courses/${id}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				const materi = response.data;
				setFormUpdate({
					id: materi.id,
					courseName: materi.courseName,
					description: materi.description,
					fileData: materi.fileData,
					linkCourse: materi.linkCourse,
					lessonName: materi.lessonName,
				});
			} catch (error) {
				console.log(error);
			}
		};

		fetchMateri();
	}, [id]);

	const handleOptionChange = (option: string) => {
		setSelectedOption(option);
	};

	const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		// Validasi data sebelum mengirim permintaan
		if (
			!formUpdate.courseName ||
			!formUpdate.lessonName ||
			!formUpdate.description
		) {
			console.log("Semua kolom harus diisi!");
			setLoading(false);
			return;
		}

		// Tambahan validasi untuk opsi 'file' atau 'link'
		if (selectedOption === "file" && !formUpdate.fileData) {
			console.log("File harus diunggah jika opsi file dipilih!");
			setLoading(false);
			return;
		} else if (selectedOption === "link" && !formUpdate.linkCourse) {
			console.log("Link harus disediakan jika opsi link dipilih!");
			setLoading(false);
			return;
		}

		try {
			// Kirim permintaan PUT ke API
			const formData = new FormData();
			formData.append("courseName", formUpdate.courseName);
			formData.append("lessonName", formUpdate.lessonName);
			formData.append("description", formUpdate.description);
			if (selectedOption === "file" && formUpdate.fileData) {
				formData.append("fileData", formUpdate.fileData);
			} else {
				formData.append("linkCourse", formUpdate.linkCourse);
			}

			const response = await axios.put(
				`http://192.168.110.239:13311/api/Courses/${formUpdate.id}`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log(response.data);
			Swal.fire({
				icon: "success",
				title: "Berhasil!",
				text: "Materi Berhasil diperbarui!",
				confirmButtonText: "Ok",
			}).then((result) => {
				if (result.isConfirmed) {
					setFormUpdate({
						id: "",
						courseName: "",
						description: "",
						fileData: null,
						linkCourse: "",
						lessonName: "",
					});
					setisMobileModalOpenEdit(false); // Tutup formulir setelah berhasil
				}
			});
		} catch (error: any) {
			if (error.response && error.response.data) {
				console.log(error.response.data.errors);
			}
		} finally {
			setLoading(false);
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			setFormUpdate({
				...formUpdate,
				fileData: files[0],
			});
		}
	};

	const handleInputEditChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		setFormUpdate((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<form onSubmit={handleSubmitEdit}>
			<label className="block">Nama Materi</label>
			<TextInput
				name="courseName"
				value={formUpdate.courseName}
				onChange={handleInputEditChange}
				required
			/>
			<label className="mt-2 block">Mata Pelajaran</label>
			<select
				name="lessonName"
				value={formUpdate.lessonName}
				onChange={handleInputEditChange}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 capitalize"
			>
				{dataMapel &&
					dataMapel.map((mapel) => (
						<option key={mapel.lessonId} value={mapel.lessonName}>
							{mapel.lessonName}
						</option>
					))}
			</select>
			<p>{formUpdate.lessonName}</p>
			<label htmlFor="description" className="mt-2 block">
				Deskripsi
			</label>
			<Textarea
				name="description"
				value={formUpdate.description}
				onChange={handleInputEditChange}
				required
			/>

			<p className="mt-2">Modul</p>
			<div className="flex gap-5">
				<div
					className="flex items-center gap-2 mt-2"
					onClick={() => handleOptionChange("file")}
				>
					<input
						type="radio"
						id="file"
						name="submissionOption"
						value="file"
						checked={selectedOption === "file"}
						onChange={() => {}}
					/>
					<label htmlFor="file">File</label>
				</div>
				<div
					className="flex items-center gap-2 mt-2"
					onClick={() => handleOptionChange("link")}
				>
					<input
						type="radio"
						id="link"
						name="submissionOption"
						value="link"
						checked={selectedOption === "link"}
						onChange={() => {}}
					/>
					<label htmlFor="link">Link</label>
				</div>
			</div>
			{selectedOption === "file" && (
				<div id="fileUpload" className="mt-4">
					<div id="fileUpload" className="mt-4">
						<FileInput name="fileData" onChange={handleFileChange} />
					</div>
				</div>
			)}
			{selectedOption === "link" && (
				<div id="linkInput" className="mt-4">
					<TextInput
						name="linkCourse"
						type="text"
						value={formUpdate.linkCourse}
						onChange={handleInputEditChange}
						placeholder="Masukkan url atau link yang valid disini"
						required
					/>
				</div>
			)}
			<button
				type="submit"
				disabled={loading}
				className="mt-4 flex w-20 items-center text-center justify-center  px-5 py-2.5  text-sm font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
			>
				{loading ? "Loading..." : "Kirim"}
			</button>
		</form>
	);
};

export default MateriEditMobile;
