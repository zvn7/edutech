import { useState, useEffect } from "react";
import Navigation from "../../../component/Navigation/Navigation";
import {
  useCourseClassroom,
  useLessonsClassroom,
} from "../../../services/queries";
import axios from "axios";
import TabsMateriSiswa from "../../../component/TabsMateriSiswa/TabsMateriSiswa";

const MateriSiswa = () => {
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [selectedCardId, setSelectedCardId] = useState<any>(null);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lessonsQueries = useLessonsClassroom();
  const { data: formLesson } = lessonsQueries;
  const [selectedSubject, setSelectedSubject] = useState("semua mapel");
  const courseClassroom = useCourseClassroom();
  const { data: formData, isLoading: isLoadingCourse } = courseClassroom;

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCardClick = async (id: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/Courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      if (data) {
        setSelectedCardId(id);
        setSelectedCard(data);
      } else {
        console.error("No data received from API");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const handleFileDownload = async (id: any, fileName: any) => {
    if (id === "No File available") {
      alert("No file available to download");
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/Courses/download/${id}`,
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
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Error downloading file. Please try again later.");
    }
  };

  const filteredCourses =
    selectedSubject === "semua mapel"
      ? formData
      : formData?.filter(({ lessonName }) => lessonName === selectedSubject) ||
        [];

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const searchFilter = (lesson: any) => {
    return (
      lesson.courseName &&
      lesson.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="mt-14">
            <h1 className="text-3xl font-bold">Materi</h1>
            <div className="flex justify-between mb-2 mt-8 gap-4">
              <div className="flex items-center w-auto">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                    <img
                      src="/gif/search.gif"
                      alt="search"
                      className="w-5 h-5"
                    />
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block md:w-80 w-full p-2.5 ps-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-gray-200 focus:border-none capitalize"
                    placeholder="temukan materi disini...."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <select
                id="subject"
                className="w-32 md:w-auto lg:w-auto py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm capitalize"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option selected>semua mapel</option>
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
              <div className=" flex flex-col gap-3 mt-2">
                {isLoadingCourse ? (
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
                ) : filteredCourses && filteredCourses.length > 0 ? (
                  filteredCourses.filter(searchFilter).length > 0 ? (
                    <div className="cursor-pointer rounded-lg">
                      {filteredCourses.filter(searchFilter).map((course) => (
                        <div
                          key={course.id}
                          className={`flex items-center shadow-sm p-3 gap-2 mb-2 rounded-lg ${
                            selectedCardId === course.id
                              ? "bg-[#fff8e5]"
                              : "bg-white"
                          } hover:bg-[#fdefc8]`}
                          onClick={() => handleCardClick(course.id)}
                        >
                          <div className="flex gap-3">
                            <div className="bg-blue-100 rounded-lg h-14 flex items-center">
                              <svg
                                className="w-12 h-12 text-blue-600 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2c.6 0 1-.4 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-sm capitalize text-gray-500">
                                {course.lessonName}
                              </p>
                              <p className="text-md font-semibold text-gray-900">
                                {course.courseName}
                              </p>
                              <p className="text-sm capitalize text-gray-500">
                                {course.nameTeacher}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">
                      Tidak ada hasil pencarian yang sesuai.
                    </p>
                  )
                ) : (
                  <p className="text-center text-gray-400">
                    Tidak ada data yang sesuai dengan pilihan pelajaran yang
                    dipilih.
                  </p>
                )}
              </div>
            </div>
          </div>
          {selectedCard &&
            (isMobileView ? (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
                <div className="bg-white p-4 rounded-lg w-full sm:max-w-md">
                  <div className="flex justify-end">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        closeModal();
                        setSelectedCardId(null);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
                  <TabsMateriSiswa
                    selectedCard={selectedCard}
                    isLoading={isLoading}
                    handleFileDownload={handleFileDownload}
                  />
                </div>
              </div>
            ) : (
              <div
                className="overflow-y-auto pb-16"
                style={{ scrollbarWidth: "none" }}
              >
                <div className="border rounded-lg shadow-sm p-3 mt-14 bg-white">
                  <div className="flex justify-between p-2">
                    <h1 className="text-xl font-bold">Detail Materi</h1>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        closeModal();
                        setSelectedCardId(null);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
                  <TabsMateriSiswa
                    selectedCard={selectedCard}
                    isLoading={isLoading}
                    handleFileDownload={handleFileDownload}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MateriSiswa;
