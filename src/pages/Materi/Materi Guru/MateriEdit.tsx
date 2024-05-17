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
        console.log("File harus diunggah jika opsi file dipilih!");
        setLoading(false);
        return;
      }
    } else {
      // Jika opsi 'link' dipilih, periksa apakah link disediakan
      if (!formUpdate.linkCourse) {
        console.log("Link harus disediakan jika opsi link dipilih!");
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
            placeholder="masukkan deskripsi materi"
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
              {/* <input
								type="file"
								name="fileData"
								onChange={handleFileChange}
								// value={formUpdate.fileData}
								className="w-full bg-slate-100 border rounded-lg mb-4"
							/> */}
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
                required
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
            className="flex w-20 items-center text-center justify-center  px-5 py-2.5  text-sm font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
          >
            {loading ? "Loading..." : "Kirim"}
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
