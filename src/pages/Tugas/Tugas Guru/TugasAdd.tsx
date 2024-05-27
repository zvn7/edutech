import { FileInput, TextInput } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useTeacherinfo, useGetLessonByGuru } from "../../../services/queries";
import { useCreateTugas } from "../../../services/mutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Tugas } from "../../../types/tugas";

const TugasAdd = ({
  setShowAddForm,
}: {
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
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
<<<<<<< HEAD
    AssignmentFileData: "",
=======
    assignmentFileData: "",
>>>>>>> 5834949 (perbaikan fungsi pengumpulan dan perbaikan tampilan)
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
<<<<<<< HEAD
        formData.append("AssignmentFileData", uploadedFile);
=======
        formData.append("assignmentFileData", uploadedFile);
>>>>>>> 5834949 (perbaikan fungsi pengumpulan dan perbaikan tampilan)
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
            title: "Berhasil",
            text: "Tugas Berhasil ditambahkan",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              setShowAddForm(false);
              reset();
              setForm({
                assignmentId: "",
                assignmentName: "",
                assignmentDate: "",
                assignmentDeadline: "",
                assignmentDescription: "",
<<<<<<< HEAD
                AssignmentFileData: "",
=======
                assignmentFileData: "",
>>>>>>> 5834949 (perbaikan fungsi pengumpulan dan perbaikan tampilan)
                assignmentLink: "",
                courseId: "",
                typeOfSubmission: 0,
              });
              setUploadedFile(null);
            }
          });
        },

        onError: (error: any) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            const errors = error.response.data.errors;
            const errorMessage = Object.keys(errors)
              .map((key) => errors[key].join(", "))
            const errors = error.response.data.errors;
            const errorMessage = Object.keys(errors)
              .map((key) => errors[key].join(", "))
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
        },
      });
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        const errorMessage = Object.keys(errors)
          .map((key) => errors[key].join(", "))
        const errors = error.response.data.errors;
        const errorMessage = Object.keys(errors)
          .map((key) => errors[key].join(", "))
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
        setShowAddForm(false);
        reset();
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
          Mata Pelajaran
        </label>
        <select
          id="countries"
          value={selectedLesson}
          onChange={handleLessonChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            required
            onInvalid={(e: React.ChangeEvent<HTMLSelectElement>) =>
              e.target.setCustomValidity("Materi harus dipilih")
            }
            onInput={(e: React.ChangeEvent<HTMLSelectElement>) =>
              e.target.setCustomValidity("")
            }
          >
            <option selected disabled>
              Pilih Materi
            </option>
            {filteredCourseData && filteredCourseData.length > 0 ? (
              filteredCourseData.map((course) => (
                <option key={course.courseName} value={course.courseId}>
                  {course.courseName}
                </option>
              ))
            ) : (
              <option className="text-center text-gray-400">
                Tidak ada materi
              </option>
            )}
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Masukkan Deskripsi Tugas"
            {...register("assignmentDescription")}
            onChange={handleInputChange}
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
            id="nama_tugas"
            {...register("assignmentDate")}
            onChange={handleInputChange}
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
            id="nama_tugas"
            {...register("assignmentDeadline", {
              setValueAs: (value) => value + "Z",
            })}
            onChange={handleInputChange}
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
          {/* select */}
          <select
            id="typeOfSubmission"
            {...register("typeOfSubmission")}
            onChange={handleInputChange}
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
<<<<<<< HEAD
                id="AssignmentFileData"
                {...register("AssignmentFileData")}
=======
                id="assignmentFileData"
                {...register("assignmentFileData")}
>>>>>>> 5834949 (perbaikan fungsi pengumpulan dan perbaikan tampilan)
                onChange={(e) => {
                  handleFileChange(e);
                }}
              />
              <span className="text-gray-500 capitalize text-xs">
                * pastikan file yang di upload sudah benar
              </span>
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

        <div>
          <div className="flex items-center gap-3 mt-6">
            <button
              type="submit"
              disabled={createTugas.isPending}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-32"
            >
              {createTugas.isPending ? (
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

export default TugasAdd;
