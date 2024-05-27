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
    assignmentFilePath: "",
    assignmentLink: "",
    courseId: "",
    courseName: "",
    typeOfSubmission: 0,
    assignmentFileName: "",
    assignmentFileData: "",
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
          `${import.meta.env.VITE_API_URL}/Assignments/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const tugas = response.data;
        // const assignmentDeadlineDate = tugas.assignmentDeadline.split("T")[0];
        setFormUpdate({
          id: tugas.id,
          assignmentName: tugas.assignmentName,
          assignmentDate: tugas.assignmentDate,
          assignmentDeadline: tugas.assignmentDeadline,
          assignmentDescription: tugas.assignmentDescription,
          assignmentFilePath: tugas.assignmentFilePath,
          assignmentLink: tugas.assignmentLink,
          courseId: tugas.courseId,
          courseName: tugas.courseName,
          typeOfSubmission: tugas.typeOfSubmission,
          assignmentFileName: tugas.assignmentFileName,
          assignmentFileData: tugas.assignmentFileData,
        });

        if (tugas.assignmentFileData) {
          setSelectedOption("file");
        } else if (tugas.assignmentLink) {
          setSelectedOption("link");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTugas();
  }, [id]);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const isoString = date.toISOString();
    return isoString.slice(0, 19) + "Z";
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
      (selectedOption === "file" && !formUpdate.assignmentFilePath) ||
      (selectedOption === "link" && !formUpdate.assignmentLink)
    ) {
      setLoading(false);
      return;
    }

    // Tambahan validasi untuk opsi 'file' atau 'link'
    if (selectedOption === "file" && !formUpdate.assignmentFilePath) {
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
      formData.append(
        "assignmentDeadline",
        formatDate(formUpdate.assignmentDeadline)
      ); // Ubah format tanggal disini
      formData.append(
        "assignmentDescription",
        formUpdate.assignmentDescription
      );
      if (selectedOption === "file" && formUpdate.assignmentFilePath) {
        formData.append("assignmentFilePath", formUpdate.assignmentFilePath);
      } else {
        formData.append("assignmentLink", formUpdate.assignmentLink);
      }
      formData.append(
        "typeOfSubmission",
        formUpdate.typeOfSubmission.toString()
      );

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/Assignments/${formUpdate.id}`,
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
            id: "",
            assignmentName: "",
            assignmentDate: "",
            assignmentDeadline: "",
            assignmentDescription: "",
            assignmentFilePath: "",
            assignmentLink: "",
            courseId: "",
            courseName: "",
            typeOfSubmission: 0,
            assignmentFileName: "",
            assignmentFileData: "",
          });
          setShowEditForm(false); // Tutup formulir setelah berhasil
          refetchTugas();
          queryClient.invalidateQueries("mapel");
        }
      });
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessage = Object.values(error.response.data.errors)
          .flat()
          .join(", ");
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: errorMessage,
          confirmButtonText: "Ok",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.toString(),
          confirmButtonText: "Ok",
        });
      }
    } finally {
      setLoading(false);
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
            step="1"
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
              {/* <input
								type="file"
								className="w-full bg-slate-100 border rounded-lg mb-4"
								name="assignmentFile"
								onChange={handleFileChange}
								// value={formUpdate.assignmentFilePath}
							/> */}
              {formUpdate.assignmentFileName && (
                <>
                  <div className="w-full bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-2 rounded ">
                    File sebelumnya: {formUpdate.assignmentFileName}
                  </div>
                  <span className="text-red-500 capitalize text-xs">
                    * file tidak dapat dirubah
                  </span>
                </>
              )}
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
              className="flex w-20 items-center text-center justify-center  px-5 py-2.5  text-sm font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
            >
              {loading ? (
                <div className="text-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                "Simpan"
              )}
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
