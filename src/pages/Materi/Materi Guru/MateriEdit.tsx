import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useGetLessonByGuru } from "../../../services/queries";
import axios from "axios";
import { TextInput } from "flowbite-react";

interface MateriEditProps {
  id: string;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const MateriEdit = ({ id, setShowEditForm }: MateriEditProps) => {
  const [selectedOption, setSelectedOption] = useState("file");
  const [loading, setLoading] = useState(false);
  const [formUpdate, setFormUpdate] = useState<{
    id: string;
    courseName: string;
    description: string;
    fileData: string;
    linkCourse: string;
    lessonName: string;
    fileName: string;
  }>({
    id: "",
    courseName: "",
    description: "",
    fileData: "",
    linkCourse: "",
    lessonName: "",
    fileName: "",
  });

  const queryMapel = useGetLessonByGuru();
  const { data: dataMapel } = queryMapel;

  useEffect(() => {
    const fetchMateri = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/Courses/${id}`,
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
          fileName: materi.fileName,
        });

        // Set selectedOption based on the data
        if (materi.fileData) {
          setSelectedOption("file");
        } else if (materi.linkCourse) {
          setSelectedOption("link");
        }
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
      setLoading(false);
      return;
    }

    // Jika opsi 'file' dipilih, periksa apakah file telah dipilih
    if (selectedOption === "file") {
      if (!formUpdate.fileData) {
        setLoading(false);
        return;
      }
    } else {
      // Jika opsi 'link' dipilih, periksa apakah link disediakan
      if (!formUpdate.linkCourse) {
        setLoading(false);
        return;
      }
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

      await axios.put(
        `${import.meta.env.VITE_API_URL}/Courses/${formUpdate.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
            fileData: "",
            linkCourse: "",
            lessonName: "",
            fileName: "",
          });
          setShowEditForm(false); // Tutup formulir setelah berhasil
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
    <form onSubmit={handleSubmitEdit}>
      <div className="space-y-3">
        <div>
          <label
            htmlFor="courseName"
            className="block mb-2 text-sm font-medium text-blue-700 capitalize"
          >
            Nama Materi
          </label>
          <input
            type="text"
            name="courseName"
            value={formUpdate.courseName}
            onChange={handleInputEditChange}
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
          <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
            Mata Pelajaran
          </label>
          <select
            name="lessonName"
            value={formUpdate.lessonName}
            onChange={handleInputEditChange}
            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-200 focus:border-none block w-full p-2.5 capitalize"
            required
            onInvalid={(e: React.ChangeEvent<HTMLSelectElement>) =>
              e.target.setCustomValidity("Harap pilih mata pelajaran")
            }
            onInput={(e: React.ChangeEvent<HTMLSelectElement>) =>
              e.target.setCustomValidity("")
            }
          >
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
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-blue-700 capitalize"
          >
            Deskripsi
          </label>
          <textarea
            name="description"
            value={formUpdate.description}
            onChange={handleInputEditChange}
            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 capitalize"
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
                onChange={() => {}}
                required
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
                onChange={() => {}}
                required
              />
              <label htmlFor="link">Link</label>
            </div>
          </div>
          {selectedOption === "file" && (
            <div id="fileUpload" className="mt-4">
              {formUpdate.fileName && (
                <>
                  <div className="w-full bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-2 rounded ">
                    {formUpdate.fileName}
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
                name="linkCourse"
                type="text"
                onChange={handleInputEditChange}
                value={formUpdate.linkCourse}
                placeholder="Masukkan url atau link yang valid disini"
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex w-32 items-center text-center justify-center  px-5 py-2.5  text-sm font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
          >
            {loading ? (
              <div className="text-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            type="button"
            className="flex w-20 items-center text-center justify-center  px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 capitalize"
          >
            batal
          </button>
        </div>
      </div>
    </form>
  );
};

export default MateriEdit;
