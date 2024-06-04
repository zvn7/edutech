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

        onError: (error: any) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
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
        },
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
            placeholder="Masukkan nama materi"
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
            placeholder="Masukkan deskripsi materi disini..."
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
                required
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
                {...register("LinkCourse")}
                onChange={handleInputChange}
                placeholder="Masukkan url atau link yang valid disini"
                required
              />
            </div>
          )}
        </div>

        {/* Tombol submit */}
        <div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={createMateri.isPending}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-32"
            >
              {createMateri.isPending ? (
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
      </div>
    </form>
  );
};
export default MateriAddMobile;
