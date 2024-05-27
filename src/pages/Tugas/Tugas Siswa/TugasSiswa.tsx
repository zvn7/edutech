import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navigation from "../../../component/Navigation/Navigation";
import { useCreatePengumpulan } from "../../../services/mutation";
import {
  useAssignments,
  useAssignmentSubmissionsById,
  useLessonsClassroom,
} from "../../../services/queries";
import { Pengumpulan } from "../../../types/pengumpulan";
import axios from "axios";
import Swal from "sweetalert2";
import TabsTugasSiswa from "../../../component/TabsTugasSiswa/TabsTugasSiswa";

const TugasSiswa = () => {
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("file");
  const [selectedAssignment, setSelectedAssignment] = useState("semua tugas");
  const assignmentsIdsQuery = useAssignments();
  const { data: dataTugas, isLoading: isLoadingTugas } = assignmentsIdsQuery;
  const selectedCardId = selectedCard ? selectedCard.id : "";
  const assignmentSubmission = useAssignmentSubmissionsById(selectedCardId);
  const { data: dataSubmissions } = assignmentSubmission;

  const lessonsQueries = useLessonsClassroom();
  const { data: formLesson } = lessonsQueries;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleCardClick = (id: any) => {
    const clickedCard = dataTugas?.find((item) => item.id === id);
    if (clickedCard) {
      setValue("assignmentId", id); // Set assignmentId pada form
      setSelectedCard(clickedCard);
      setUploadedFile(null);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      // Fungsi untuk menentukan apakah tampilan sedang pada mode mobile atau tidak
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // Pengecekan awal saat komponen dipasang
    handleResize();

    // Membersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setSelectedCard(null);
  };

  const formatDate = (dateString: any) => {
    try {
      const parsedDate = new Date(dateString);
      // Periksa apakah parsedDate adalah waktu yang valid
      if (isNaN(parsedDate.getTime())) {
        // Jika parsedDate tidak valid, kembalikan string "Invalid Date"
        return "Invalid Date";
      }
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric" as const,
      };
      const dateFormatter = new Intl.DateTimeFormat("id-ID", options);
      return dateFormatter.format(parsedDate);
    } catch (error) {
      console.error("Error formatting date:", error);
      // Jika terjadi kesalahan dalam pemformatan, kembalikan string kosong
      return "";
    }
  };

  const handleFileDownload = async (id: any, assignmentfileName: any) => {
    if (id === "No File available") {
      alert("No file available to download");
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/Assignments/download/${id}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", assignmentfileName);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
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

  // filter
  const [selectedLesson, setSelectedLesson] = useState("semua tugas");

  const handleLessonChange = (e: any) => {
    setSelectedLesson(e.target.value);
  };

  const createPengumpulan = useCreatePengumpulan();
  const { register, handleSubmit, setValue, reset } = useForm<Pengumpulan>();
  const handleCreatePengumpulanSubmit = async (data: Pengumpulan) => {
    if (!data.assignmentId) {
      console.error("Assignment ID is missing.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("assignmentId", data.assignmentId.toString());
      formData.append("link", data.link);
      if (uploadedFile) {
        formData.append("fileData", uploadedFile);
      }

      const pengumpulanData: Pengumpulan = {
        id: "",
        assignmentId: data.assignmentId,
        classroomId: 0,
        submissionTime: "",
        status: "",
        submissionTimeStatus: "",
        link: data.link,
        fileData: uploadedFile ? uploadedFile : "",
      };

      await createPengumpulan.mutateAsync(pengumpulanData, {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Tugas berhasil dikumpulkan!",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              setSelectedCard(null);
              reset();
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

  // State untuk menyimpan file yang diunggah
  const [uploadedFile, setUploadedFile] = useState(null);

  // Handler untuk mengubah file
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  const filteredData =
    selectedAssignment === "semua tugas"
      ? dataTugas
      : dataTugas?.filter(
          ({ lessonName }) => lessonName === selectedAssignment
        );

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const searchFilter = (tugas: any) => {
    return tugas.assignmentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  };
  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          {/* left side */}
          <div>
            <div className="mt-14">
              <h1 className="text-3xl font-bold">Tugas</h1>
            </div>
            <div className="flex justify-between mb-2 mt-8">
              <div className="flex gap-2 items-center">
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                    <img
                      src="/gif/search.gif"
                      alt="search"
                      className="w-5 h-5"
                    />
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    className="block p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-white focus:ring-gray-200 focus:border-none capitalize"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="temukan tugas disini..."
                  />
                </div>
              </div>
              <select
                id="subject"
                value={selectedLesson}
                onChange={handleLessonChange}
                className="block px-3 py-2 capitalize bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              >
                <option selected>semua tugas</option>
                {formLesson?.map((item) => (
                  <option key={item?.id} value={item?.lessonName}>
                    {item?.lessonName}
                  </option>
                ))}
              </select>
            </div>
            <div
              className="overflow-y-auto overflow-clip max-h-[calc(100vh-100px)]"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="flex flex-col gap-3 mt-2">
                {isLoadingTugas ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center shadow-sm p-3 gap-2 bg-white mb-2 rounded-lg animate-pulse"
                    >
                      <div className="flex gap-3">
                        <div className="bg-blue-100 rounded-lg h-14 w-14"></div>
                        <div className="flex flex-col space-y-2">
                          <div className="bg-gray-200 h-4 w-40 rounded"></div>
                          <div className="bg-gray-200 h-4 w-48 rounded"></div>
                          <div className="bg-gray-200 h-4 w-32 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : filteredData && filteredData.length > 0 ? (
                  filteredData.filter(searchFilter).length > 0 ? (
                    filteredData.filter(searchFilter).map((items) => (
                      <div
                        key={items?.id}
                        onClick={() => handleCardClick(items?.id)}
                        className={`cursor-pointer flex flex-col gap-3 bg-white rounded-lg `}
                      >
                        <div
                          className={`flex justify-between items-center  shadow-sm p-3 gap-2 hover:bg-[#fdefc8] hover:rounded-lg ${
                            selectedCardId === items?.id
                              ? "bg-[#fff8e5] rounded-lg"
                              : ""
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className="flex items-center bg-blue-100 rounded-lg h-14">
                              <svg
                                className="w-12 h-12 text-blue-600 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm-.3 9.3c.4.4.4 1 0 1.4L9.4 14l1.3 1.3a1 1 0 0 1-1.4 1.4l-2-2a1 1 0 0 1 0-1.4l2-2a1 1 0 0 1 1.4 0Zm2.6 1.4a1 1 0 0 1 1.4-1.4l2 2c.4.4.4 1 0 1.4l-2 2a1 1 0 0 1-1.4-1.4l1.3-1.3-1.3-1.3Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-sm font-normal text-gray-500">
                                {items?.lessonName}
                              </p>
                              <h2 className="font-medium text-md">
                                {items?.assignmentName}
                              </h2>
                              <div className="flex flex-wrap gap-2 ">
                                <div className="flex gap-1">
                                  <svg
                                    className="w-5 h-5 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
                                    />
                                  </svg>
                                  <span className="text-sm text-gray-500">
                                    {formatDate(items?.assignmentDate)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <span className="bg-orange-200 text-orange-500 text-xs w-32 md:w-24 md:sm font-medium px-1 py-1 md:px-1.5 md:py-1.5 rounded-full text-center border border-orange-500 capitalize">
                            {items?.assignmentSubmissionStatus}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      Tidak ada hasil pencarian yang sesuai.
                    </p>
                  )
                ) : (
                  <p className="text-center text-gray-400">
                    Tidak ada data yang sesuai dengan pilihan tugas yang
                    dipilih.
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* right side */}
          {selectedCard &&
            (isMobileView ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                <div className="w-full h-full p-4 overflow-y-auto bg-white rounded-lg sm:max-w-md">
                  <div className="flex justify-end">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        closeModal();
                        setSelectedCard(null);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <TabsTugasSiswa
                    isLoading={isLoading}
                    selectedCard={selectedCard}
                    handleFileDownload={handleFileDownload}
                    handleSubmit={handleSubmit}
                    handleCreatePengumpulanSubmit={
                      handleCreatePengumpulanSubmit
                    }
                    handleOptionChange={handleOptionChange}
                    selectedOption={selectedOption}
                    handleFileChange={handleFileChange}
                    register={register}
                    dataSubmissions={dataSubmissions}
                    formatDate={formatDate}
                  />
                </div>
              </div>
            ) : (
              <div
                className="overflow-y-auto top-6"
                style={{ scrollbarWidth: "none" }}
              >
                <div className="p-3 px-4 bg-white border rounded-lg shadow-sm mt-14">
                  <div className="flex justify-between p-2">
                    <h1 className="text-xl font-bold">Detail Tugas</h1>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        closeModal();
                        setSelectedCard(null);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <TabsTugasSiswa
                    isLoading={isLoading}
                    selectedCard={selectedCard}
                    handleFileDownload={handleFileDownload}
                    handleSubmit={handleSubmit}
                    handleCreatePengumpulanSubmit={
                      handleCreatePengumpulanSubmit
                    }
                    handleOptionChange={handleOptionChange}
                    selectedOption={selectedOption}
                    handleFileChange={handleFileChange}
                    register={register}
                    dataSubmissions={dataSubmissions}
                    formatDate={formatDate}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TugasSiswa;
