import { FileInput, TextInput } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGetLessonByGuru, useTeacherinfo } from "../../../services/queries";
import axios from "axios";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

type TugasEditProps = {
  id: string;
  setisTabletModalOpenEdit: Dispatch<SetStateAction<boolean>>;
};

// Define the TugasEdit component
const TugasEditTablet = ({ id, setisTabletModalOpenEdit }: TugasEditProps) => {
  const [selectedOption, setSelectedOption] = useState("file");
  const [loading, setLoading] = useState(false);
  const queryMapel = useTeacherinfo();
  const { data: dataMapel, refetch: refetchTugas } = queryMapel;
  console.log(dataMapel);
  const queryClient = useQueryClient();

  // State untuk menyimpan file yang diunggah
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formUpdate, setFormUpdate] = useState({
    id: "",
    assignmentName: "",
    assignmentDate: "",
    assignmentDeadline: "",
    assignmentDescription: "",
    assignmentFileData: null, // Inisialisasi dengan null
    assignmentLink: "",
    courseId: "",
    courseName: "",
  });

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
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
        console.log(tugas);

        // Mengambil hanya bagian tanggal dari assignmentDeadline
        const assignmentDeadlineDate = tugas.assignmentDeadline.split("T")[0];

        setFormUpdate({
          id: tugas.id,
          assignmentName: tugas.assignmentName,
          assignmentDate: tugas.assignmentDate,
          assignmentDeadline: assignmentDeadlineDate, // Menggunakan nilai tanggal saja
          assignmentDescription: tugas.assignmentDescription,
          assignmentFileData: tugas.assignmentFileData,
          assignmentLink: tugas.assignmentLink,
          courseId: tugas.courseId, // Atur courseId
          courseName: tugas.courseName,
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
      (selectedOption === "file" && !formUpdate.assignmentFileData) ||
      (selectedOption === "link" && !formUpdate.assignmentLink)
    ) {
      console.log("Semua kolom harus diisi!");
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
          });
          setisTabletModalOpenEdit(false); // Tutup formulir setelah berhasil
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
      // Ubah format tanggal dan waktu dari elemen input ke format yang diinginkan oleh backend
      const formattedDateTime = new Date(value).toISOString();
      setFormUpdate((prevState) => ({
        ...prevState,
        [name]: formattedDateTime,
      }));
    } else {
      // Jika bukan input 'assignmentDeadline', langsung set nilai tanpa perubahan
      setFormUpdate((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // const formattedDeadline = formUpdate.assignmentDeadline.replace("Z", "");
  // const displayDeadline =
  // 	formattedDeadline.split("T")[0] +
  // 	"T" +
  // 	formattedDeadline.split("T")[1].substring(0, 5) +
  // 	"Z";

  return (
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
        >
          <option value={formUpdate.courseId}>{formUpdate.courseName}</option>
          {dataMapel &&
            dataMapel.map((mapel) => (
              <option key={mapel.courseId} value={mapel.courseId}>
                {mapel.courseName}
              </option>
            ))}
        </select>

        {/* <p>{dataMapel?.map((mapel) => mapel.courseId)}</p> */}
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
          value={formUpdate.assignmentDescription}
          onChange={handleInputEditChange}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Masukkan Deskripsi Tugas"
          defaultValue={""}
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
        />
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

export default TugasEditTablet;
