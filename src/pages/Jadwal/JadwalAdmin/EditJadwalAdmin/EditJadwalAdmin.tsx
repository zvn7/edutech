import { useEffect, useState } from "react";
import Navigation from "../../../../component/Navigation/Navigation";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Mapel } from "../../../../types/mapel";
import { useLessonsIds } from "../../../../services/queries";
const EditJadwalAdmin = () => {
  const { id } = useParams();
  const [selectedLesson, setSelectedLesson] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    day: "",
    startTime: "",
    endTime: "",
    lessonName: "",
    className: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.66.239:13311/api/Schedules/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFormData({
          ...formData,
          day: response.data.day || "",
          startTime: response.data.startTime || "",
          endTime: response.data.endTime || "",
          lessonName: response.data.lessonName || "",
          className: response.data.className || "",
        });
        setSelectedLesson(response.data.lessonName || "");
        setSelectedClass(response.data.className || "");
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setSelectedLesson(formData.lessonName || "");
    setSelectedClass(formData.className || "");
  }, [formData]);

  const jadwalQuery = useLessonsIds();
  const { data: dataJadwal } = jadwalQuery;

  const handleSubmitEdit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `http://192.168.66.239:13311/api/Schedules/${id}`,
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
        text: "Jadwal Berhasil diperbarui!",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/jadwal-admin");
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonChange = (e: any) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      lessonName: value,
    });
    setSelectedLesson(value);
  };

  const handleClassChange = (e: any) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      className: value,
    });
    setSelectedClass(value);
  };

  const handleInputChange = (e: any) => {
    const { value, name } = e.target;

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
        navigate("/jadwal-admin");
      }
    });
  };
  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <button className="mt-14 flex gap-2 items-center" onClick={handleBatal}>
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
          <h1 className="text-2xl font-bold capitalize">kembali</h1>
        </button>

        <div className="mt-6">
          <section className="bg-white rounded-lg">
            <div className="py-6 px-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900 capitalize">
                edit Jadwal Pelajaran
              </h2>
              <div>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      Mata pelajaran
                    </label>
                    <select
                      name="lessonName" // Menambahkan properti name
                      value={formData.lessonName || selectedLesson}
                      onChange={handleLessonChange} //
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 capitalize"
                      required
                      onInvalid={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        e.currentTarget.setCustomValidity(
                          "Pilih mapel tidak boleh kosong!"
                        )
                      }
                      onInput={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        e.currentTarget.setCustomValidity("")
                      }
                    >
                      <option selected>Pilih Mata Pelajaran</option>
                      {dataJadwal?.map((mapel) => (
                        <option value={mapel.lessonName}>
                          {mapel.lessonName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      hari
                    </label>
                    <select
                      name="day"
                      onChange={handleInputChange}
                      value={formData.day}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 capitalize"
                    >
                      <option selected>Pilih hari</option>
                      <option value="1">senin</option>
                      <option value="2">selasa</option>
                      <option value="3">rabu</option>
                      <option value="4">kamis</option>
                      <option value="5">jum'at</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-blue-700 capitalize"
                    >
                      jam mulai
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Jam Mulai"
                      step="1"
                      required
                      onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity(
                          "Jam Mulai tidak boleh kosong!"
                        )
                      }
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity("")
                      }
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-blue-700 capitalize"
                    >
                      Jam Selesai
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Jam Selesai"
                      step="1"
                      required
                      onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity(
                          "Jam Selesai tidak boleh kosong!"
                        )
                      }
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity("")
                      }
                    />
                  </div>

                  <div className="flex gap-2 items-center">
                    <button
                      type="submit"
                      className="flex w-20 items-center text-center justify-center  px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 text-white capitalize"
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
                      type="submit"
                      onClick={handleBatal}
                      className="flex w-20 items-center text-center justify-center  px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 capitalize"
                    >
                      batal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EditJadwalAdmin;
