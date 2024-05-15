import { useState, useEffect } from "react";
import Navigation from "../../../component/Navigation/Navigation";
import { Tabs } from "flowbite-react";
import {
  useCourseClassroom,
  useLessonsClassroom,
} from "../../../services/queries";
import axios from "axios";

const MateriSiswa = () => {
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [selectedCardId, setSelectedCardId] = useState<any>(null);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lessonsQueries = useLessonsClassroom();
  const { data: formLesson } = lessonsQueries;
  const [selectedSubject, setSelectedSubject] = useState(
    "semua mata pelajaran"
  );
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
    setIsLoading(true); // Set isLoading menjadi true sebelum memuat data
    try {
      const response = await fetch(
        `http://192.168.110.239:13311/api/Courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log("data", data);

      if (data) {
        setSelectedCardId(id);
        console.log("selectedCardId", selectedCardId);

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
        `http://192.168.110.239:13311/api/Courses/download/${id}`,
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
    selectedSubject === "semua mata pelajaran"
      ? formData
      : formData?.filter(({ lessonName }) => lessonName === selectedSubject) ||
        [];

  

  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <div className="mt-14 flex justify-between mb-2">
              <h1 className="text-3xl font-bold">Materi</h1>
              <select
                id="subject"
                className="block  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm capitalize"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option selected>semua mata pelajaran</option>
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
                  <p>loading...</p>
                ) : (
                  <div className="cursor-pointer rounded-lg ">
                    {filteredCourses && filteredCourses.length > 0 ? (
                      filteredCourses.map((course) => (
                        <div
                          key={course.id}
                          className={`flex items-center shadow-sm p-3 gap-2 bg-white hover:bg-[#fdefc8] mb-2 rounded-lg hover:rounded-lg ${
                            selectedCardId === course.id
                              ? "bg-[#fdefc8] rounded-lg"
                              : ""
                          }`}
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
                      ))
                    ) : (
                      <p className="text-center text-gray-400">
                        Tidak ada data yang sesuai dengan pilihan tugas yang
                        dipilih.
                      </p>
                    )}
                  </div>
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
                        setSelectedCardId(null); // Atur selectedCardId menjadi null saat tombol close diklik
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
                  <Tabs aria-label="Tabs with underline" style="underline">
                    <Tabs.Item active title="Deskripsi">
                      <p>
                        {isLoading ? "Memuat ..." : selectedCard.description}
                      </p>
                    </Tabs.Item>
                    <Tabs.Item title="Sumber">
                      {selectedCard.linkCourse ? (
                        <table className="w-full text-sm text-left rtl:text-right mb-4 text-gray-500 dark:text-gray-400">
                          <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="px-6 py-4">Link</td>
                              <td className="px-6 py-4 float-end">
                                <a
                                  href={selectedCard.linkCourse}
                                  target="_blank"
                                  className="hover:underline hover:text-blue-600"
                                >
                                  {selectedCard.linkCourse}
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : null}

                      {selectedCard.fileData ? (
                        <div
                          className="flex justify-between items-center border rounded-lg shadow-sm p-3 gap-2 bg-[#E7F6FF]"
                          onClick={() =>
                            handleFileDownload(
                              selectedCard.id,
                              selectedCard.fileName
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <div className="flex gap-3">
                            <div className="bg-white rounded-lg h-14 flex items-center">
                              <svg
                                className="w-12 h-12 text-blue-600 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm-.3 9.3c.4.4.4 1 0 1.4L9.4 14l1.3 1.3a1 1 0 0 1-1.4 1.4l-2-2a1 1 0 0 1 0-1.4l2-2a1 1 0 0 1 1.4 0Zm2.6 1.4a1 1 0 0 1 1.4-1.4l2 2c.4.4.4 1 0 1.4l-2 2a1 1 0 0 1-1.4-1.4l1.3-1.3-1.3-1.3Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col justify-center hover:text-blue-700">
                              <p className="text-lg font-semibold">
                                {isLoading
                                  ? "Memuat File ..."
                                  : selectedCard.fileName}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </Tabs.Item>
                  </Tabs>
                </div>
              </div>
            ) : (
              <div
                className="fixed right-4 top-6 w-2/5 h-screen overflow-y-auto pb-16"
                style={{ scrollbarWidth: "none" }}
              >
                <div className="border rounded-lg shadow-sm p-3 mt-14 bg-white">
                  <div className="flex justify-between mb-4 p-2">
                    <h1 className="text-xl font-bold">Detail Materi</h1>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        closeModal();
                        setSelectedCardId(null); // Atur selectedCardId menjadi null saat tombol close diklik
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
                  <Tabs aria-label="Tabs with underline" style="underline">
                    <Tabs.Item active title="Deskripsi">
                      <p>
                        {isLoading ? "Memuat ..." : selectedCard.description}
                      </p>
                    </Tabs.Item>
                    <Tabs.Item title="Sumber">
                      {selectedCard.linkCourse ? (
                        <table className="w-full text-sm text-left rtl:text-right mb-4 text-gray-500 dark:text-gray-400">
                          <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="px-6 py-4">Link</td>
                              <td className="px-6 py-4 float-end">
                                <a
                                  href={selectedCard.linkCourse}
                                  target="_blank"
                                  className="hover:underline hover:text-blue-600"
                                >
                                  {selectedCard.linkCourse}
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : null}

                      {selectedCard.fileData ? (
                        <div
                          className="flex justify-between items-center border rounded-lg shadow-sm p-3 gap-2 bg-[#E7F6FF]"
                          onClick={() =>
                            handleFileDownload(
                              selectedCard.id,
                              selectedCard.fileName
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <div className="flex gap-3">
                            <div className="bg-white rounded-lg h-14 flex items-center">
                              <svg
                                className="w-12 h-12 text-blue-600 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm-.3 9.3c.4.4.4 1 0 1.4L9.4 14l1.3 1.3a1 1 0 0 1-1.4 1.4l-2-2a1 1 0 0 1 0-1.4l2-2a1 1 0 0 1 1.4 0Zm2.6 1.4a1 1 0 0 1 1.4-1.4l2 2c.4.4.4 1 0 1.4l-2 2a1 1 0 0 1-1.4-1.4l1.3-1.3-1.3-1.3Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col justify-center hover:text-blue-700">
                              <p className="text-lg font-semibold">
                                {isLoading
                                  ? "Memuat File ..."
                                  : selectedCard.fileName}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </Tabs.Item>
                  </Tabs>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MateriSiswa;
