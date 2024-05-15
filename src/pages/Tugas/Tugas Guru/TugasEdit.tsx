import { FileInput, TextInput } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGetLessonByGuru, useTeacherinfo } from "../../../services/queries";
import axios from "axios";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

type TugasEditProps = {
	id: string;
	setShowEditForm: Dispatch<SetStateAction<boolean>>;
};

const TugasEdit = ({ id, setShowEditForm }: TugasEditProps) => {
	const [selectedOption, setSelectedOption] = useState("file");
	const [loading, setLoading] = useState(false);
	const queryMapel = useTeacherinfo();
	const { data: dataMapel, refetch: refetchTugas } = queryMapel;
	const queryClient = useQueryClient();
	
	const [formUpdate, setFormUpdate] = useState({
		id: "",
		assignmentName: "",
		assignmentDate: "",
		assignmentDeadline: "",
		assignmentDescription: "",
		assignmentFileData: null,
		assignmentLink: "",
		courseId: "",
		courseName: "",
		typeOfSubmission: 0,
	});

	const [selectedLesson, setSelectedLesson] = useState("");

	const mapelQuery = useGetLessonByGuru();
	const { data: Mapel } = mapelQuery;

	const handleOptionChange = (option: string) => {
		setSelectedOption(option);
	};

	const handleLessonChange = (e: any) => {
		setSelectedLesson(e.target.value);
	};

	useEffect(() => {
		const fetchTugas = async () => {
			try {
				const response = await axios.get(
					`http://192.168.110.239:13311/api/Assignments/${id}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				const tugas = response.data;
				const assignmentDeadlineDate = tugas.assignmentDeadline.split("T")[0];
				setFormUpdate({
					id: tugas.id,
					assignmentName: tugas.assignmentName,
					assignmentDate: tugas.assignmentDate,
					assignmentDeadline: assignmentDeadlineDate,
					assignmentDescription: tugas.assignmentDescription,
					assignmentFileData: tugas.assignmentFileData,
					assignmentLink: tugas.assignmentLink,
					courseId: tugas.courseId,
					courseName: tugas.courseName,
					typeOfSubmission: tugas.typeOfSubmission,
				});
			} catch (error) {
				console.log(error);
			}
		};
		fetchTugas();
	}, [id]);

	const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		// Validasi data sebelum mengirim permintaan
		if (
			!formUpdate.assignmentName ||
			!formUpdate.assignmentDate ||
			!formUpdate.assignmentDeadline ||
			!formUpdate.assignmentDescription ||
			!formUpdate.typeOfSubmission ||
			(selectedOption === "file" && !formUpdate.assignmentFileData) ||
			(selectedOption === "link" && !formUpdate.assignmentLink)
		) {
			setLoading(false);
			return;
		}

		// Tambahan validasi untuk opsi 'file' atau 'link'
		if (selectedOption === "file" && !formUpdate.assignmentFileData) {
			console.log("File harus diunggah jika opsi file dipilih!");
			setLoading(false);
			return;
		} else if (selectedOption === "link" && !formUpdate.assignmentLink) {
			console.log("Link harus disediakan jika opsi link dipilih!");
			setLoading(false);
			return;
		}

		try {
			// Kirim permintaan PUT ke API
			const formData = new FormData();
			formData.append("assignmentName", formUpdate.assignmentName);
			formData.append("courseId", formUpdate.courseId);
			formData.append("assignmentDate", formUpdate.assignmentDate);
			formData.append("assignmentDeadline", formUpdate.assignmentDeadline);
			formData.append(
				"assignmentDescription",
				formUpdate.assignmentDescription
			);
			if (selectedOption === "file" && formUpdate.assignmentFileData) {
				formData.append("assignmentFileData", formUpdate.assignmentFileData);
			} else {
				formData.append("assignmentLink", formUpdate.assignmentLink);
			}
			formData.append(
				"typeOfSubmission",
				formUpdate.typeOfSubmission.toString()
			);

			const response = await axios.put(
				`http://192.168.110.239:13311/api/Assignments/${formUpdate.id}`,
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
				text: "Tugas Berhasil diperbarui!",
				confirmButtonText: "Ok",
			}).then((result) => {
				if (result.isConfirmed) {
					setFormUpdate({
						assignmentName: "",
						assignmentDate: "",
						assignmentDeadline: "",
						assignmentDescription: "",
						assignmentFileData: "",
						assignmentLink: "",
						courseId: "",
						courseName: "",
						typeOfSubmission: 0,
					});
					setShowEditForm(false); // Tutup formulir setelah berhasil
					refetchTugas();
					queryClient.invalidateQueries("mapel");
				}
			});
		} catch (error) {
			console.log(error);
			if (error.response && error.response.data) {
				console.log(error.response.data.errors);
			}
		} finally {
			setLoading(false);
		}
	};

	// Handler untuk mengubah file
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			setFormUpdate({
				...formUpdate,
				assignmentFileData: files[0],
			});
		}
	};

	const handleInputEditChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;

		if (name === "assignmentDeadline") {
			const formattedDateTime = new Date(value).toISOString();
			setFormUpdate((prevState) => ({
				...prevState,
				[name]: formattedDateTime,
			}));
		} else {
			setFormUpdate((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

  const filteredCourseData = dataMapel?.filter(
    (lesson) => lesson.lessonName === selectedLesson
  );

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
        setShowEditForm(false);
      }
    });
  };
  return (
    <>
      <div>
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-blue-600 capitalize dark:text-white"
        >
          Tugas
        </label>
        <select
          id="countries"
          value={selectedLesson}
          onChange={handleLessonChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Pilih Mapel</option>

          {Mapel?.map((mapel) => (
            <option key={mapel.lessonId} value={mapel.lessonName}>
              {mapel.lessonName}
            </option>
          ))}
        </select>
      </div>
      <form className="max-w-full mt-4" onSubmit={handleSubmitEdit}>
        <div className="mb-5">
          <label
            htmlFor="materi"
            className="block mb-2 text-sm font-medium text-blue-600 dark:text-white"
          >
            Materi
          </label>
          <select
            name="courseId"
            onChange={handleInputEditChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onInvalid={(e: React.ChangeEvent<HTMLSelectElement>) =>
              e.target.setCustomValidity("Materi harus dipilih")
            }
            onInput={(e: React.ChangeEvent<HTMLSelectElement>) =>
              e.target.setCustomValidity("")
            }
          >
            <option value={formUpdate.courseId}>{formUpdate.courseName}</option>
            {filteredCourseData?.map((mapel) => (
              <option key={mapel.courseId} value={mapel.courseId}>
                {mapel.courseName}
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
            name="assignmentName"
            value={formUpdate.assignmentName}
            onChange={handleInputEditChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Masukkan Nama Tugas"
            required
            onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.setCustomValidity("Nama tugas tidak boleh kosong")
            }
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.setCustomValidity("")
            }
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
            name="assignmentDescription"
            rows={4}
            value={formUpdate.assignmentDescription}
            onChange={handleInputEditChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Masukkan Deskripsi Tugas"
            defaultValue={""}
            required
            onInvalid={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              e.target.setCustomValidity("Deskripsi tidak boleh kosong")
            }
            onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              e.target.setCustomValidity("")
            }
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
            name="assignmentDate"
            value={formUpdate.assignmentDate}
            onChange={handleInputEditChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Masukkan Nama Tugas"
            required
            onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.setCustomValidity("Tanggal tugas tidak boleh kosong")
            }
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.setCustomValidity("")
            }
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
            name="assignmentDeadline"
            value={
              formUpdate.assignmentDeadline
                ? formUpdate.assignmentDeadline.replace("Z", "")
                : ""
            }
            onChange={handleInputEditChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Masukkan Nama Tugas"
            required
            onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.setCustomValidity("Deadline tidak boleh kosong")
            }
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.setCustomValidity("")
            }
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-blue-600 dark:text-white">
            Tipe Pengumpulan
          </label>
          <select
            value={formUpdate.typeOfSubmission}
            onChange={handleInputEditChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onInvalid={(e: React.ChangeEvent<HTMLSelectElement>) =>
              e.target.setCustomValidity("Tipe Pengumpulan harus dipilih")
            }
            onInput={(e: React.ChangeEvent<HTMLSelectElement>) =>
              e.target.setCustomValidity("")
            }
          >
            <option value="">Pilih Tipe Pengumpulan</option>
            <option value="1">File</option>
            <option value="2">Link</option>
          </select>
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
              <FileInput name="assignmentFile" onChange={handleFileChange} />
            </div>
          )}
          {selectedOption === "link" && (
            <div id="linkInput" className="mt-4">
              <TextInput
                type="text"
                name="assignmentLink"
                value={formUpdate.assignmentLink}
                onChange={handleInputEditChange}
                placeholder="Masukkan url atau link yang valid disini"
                required
              />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-3 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex w-20 items-center text-center justify-center  px-5 py-2.5  text-sm font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
            >
              {loading ? "Loading..." : "Kirim"}
            </button>
            <button
              onClick={handleBatal}
              type="submit"
              className="flex w-20 items-center text-center justify-center  px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 capitalize"
            >
              batal
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default TugasEdit;
