import { Link, useNavigate, useParams } from "react-router-dom";
import Navigation from "../../../component/Navigation/Navigation";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Koreksi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nameStudent: "",
    assignmentName: "",
    submissionTime: "",
    submissionTimeStatus: "",
    comment: "",
    link: "",
    grade: "",
    fileData: "",
    fileName: "",
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.110.239:13311/api/AssignmentSubmissions/getSubmissionForTeacherBySubmissionId/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFormData({
          ...formData,
          nameStudent: response.data.nameStudent,
          assignmentName: response.data.assignmentName,
          submissionTime: response.data.submissionTime,
          submissionTimeStatus: response.data.submissionTimeStatus,
          comment: response.data.comment,
          link: response.data.link,
          grade: response.data.grade,
          fileData: response.data.fileData,
          fileName: response.data.fileName,
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const shortenLink = (link: any, maxLength: any) => {
    if (link.length > maxLength) {
      return link.substring(0, maxLength) + "...";
    } else {
      return link;
    }
  };

  const handleSubmitEdit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `http://192.168.110.239:13311/api/AssignmentSubmissions/teacher/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Penilaian Berhasil dilakukan!",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/penilaian");
        }
      });
      navigate("/penilaian");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleInputChange = (e: any) => {
    const { value, name } = e.target;

    if (name === "grade") {
      const grades = value.split(",");
      for (let i = 0; i < grades.length; i++) {
        const grade = grades[i].trim();

        if (isNaN(grade) || parseInt(grade) < 1 || parseInt(grade) > 100) {
          console.log("Nilai grade tidak valid!");
          return; // Keluar dari fungsi jika nilai tidak valid
        }
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBatal = () => {
    Swal.fire({
      icon: "warning",
      title: "Peringatan",
      text: "Apakah Anda yakin ingin membatalkan?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/penilaian");
      }
    });
  };

  const formatDate = (dateString: any) => {
    // Mendapatkan tanggal dari string tanggal
    const date = new Date(dateString);

    // Mengambil komponen tanggal
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // Menggabungkan komponen tanggal ke dalam format yang diinginkan
    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;
  };

  // Menggunakan fungsi formatDate
  const formattedDate = formatDate(formData.submissionTime);

  // Output hasilnya
  console.log(formattedDate);

  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className="mt-14">
          <button
            className="mt-14 flex gap-2 items-center"
            onClick={handleBatal}
          >
            <div className="bg-white p-2 rounded-full shadow-sm hover:bg-slate-300 hover:cursor-pointer">
              <svg
                className="w-7 h-7 text-blue-800 hover:text-white"
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
                  d="M5 12h14M5 12l4-4m-4 4 4 4"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold capitalize">Kembali</h1>
          </button>

          {/* card */}
          <div className="bg-white p-5 rounded-2xl border flex-col gap-2 items-center shadow-lg mt-5">
            <p className="text-xl  font-bold">Form Penilaian</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mt-6">
              <Card className="max-w-auto bg-blue-100 border-0">
                <table>
                  <tr>
                    <td className="text-md text-gray-900 dark:text-white">
                      Nama
                    </td>
                    <td className="text-md text-gray-900 dark:text-white">
                      : <span className="ml-2">{formData.nameStudent}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-md text-gray-900 dark:text-white">
                      Tugas
                    </td>
                    <td className="text-md text-gray-900 dark:text-white">
                      : <span className="ml-2"> {formData.assignmentName}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-md text-gray-900 dark:text-white">
                      Tanggal Pengumpulan
                    </td>
                    <td className="text-md text-gray-900 dark:text-white">
                      :{" "}
                      <span className="ml-2">
                        {formatDate(formData.submissionTime)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-md text-gray-900 dark:text-white">
                      Status pengumpulan
                    </td>
                    <td className="text-md text-gray-900 dark:text-white">
                      :{" "}
                      <span
                        className={`ml-2 text-xs font-medium me-2 px-2.5 py-1.5 rounded ${
                          formData.submissionTimeStatus === "Terlambat"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        }`}
                      >
                        {formData.submissionTimeStatus === "Terlambat"
                          ? "Terlambat"
                          : "Tepat Waktu"}
                      </span>
                    </td>
                  </tr>
                </table>
              </Card>
              <Card className="max-w-auto bg-blue-100 border-0">
                {formData.fileData ? (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-md text-gray-900 dark:text-white">
                        {formData.fileName}
                      </p>
                      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">
                        Download
                      </button>
                    </div>
                    <svg
                      className="w-24 h-24 text-blue-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="">
                    <table className="w-full">
                      <tr>
                        <td className="text-md text-gray-900  font-semibold">
                          Link
                        </td>
                        <td className="text-md text-blue-500 ">
                          :{" "}
                          <a
                            href={formData.link}
                            className="hover:underline"
                            target="_blank"
                          >
                            {shortenLink(formData.link, 50)}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>
                )}
              </Card>
            </div>
            <div>
              <p className="text-lg mt-4 font-bold ">Review</p>
              <textarea
                name="comment"
                className=" rounded-md h-24 shadow-md border-none w-1/2 bg-blue-100 border-0"
                placeholder="Masukkan review"
                value={formData.comment}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p className="text-lg mt-4 font-bold ">Nilai</p>
              <input
                type="number"
                name="grade"
                className=" rounded-md shadow-md border-none w-1/2 bg-blue-100 border-0"
                placeholder="Masukkan Nilai"
                value={formData.grade}
                onChange={handleInputChange}
                min={0}
                max={100}
              />
            </div>
            <div className="flex mt-5 space-x-4">
              <button
                type="submit"
                className="flex w-20 items-center text-center justify-center  px-5 py-2.5  text-sm font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
                disabled={loading}
                onClick={handleSubmitEdit}
              >
                {loading ? (
                  <svg
                    className="animate-spin w-5 h-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.585l-2.829 2.829zm0 8.446a8.045 8.045 0 01-2.38-2.38l2.38-2.83v5.21zM12 20.528a7.995 7.995 0 01-4-.943v-3.585L9.172 16.7c.258.258.563.465.896.605zm4-1.947l2.829-2.83 2.83 2.83-2.83 2.83v-5.22a8.045 8.045 0 01-2.38 2.38zm2.39-8.38L19.528 12h-5.21l2.83-2.829 2.83 2.829zM12 5.473V1.548A8.045 8.045 0 0115.473 4.39L12 7.863zm-2.829-.707L7.17 4.39A8.045 8.045 0 0110.39 1.548l-1.219 1.218zm1.219 13.123l-1.22 1.219a8.045 8.045 0 012.38 2.38l1.22-1.22zM16.832 16.7l1.219 1.22a8.045 8.045 0 012.38-2.38l-1.218-1.219z"
                    ></path>
                  </svg>
                ) : (
                  "Simpan"
                )}
              </button>
              <button
                onClick={handleBatal}
                className="flex w-20 items-center text-center justify-center  px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 capitalize"
              >
                batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Koreksi;
