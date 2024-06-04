import { useEffect, useState } from "react";
import Navigation from "../../../../component/Navigation/Navigation";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useLessonsIds } from "../../../../services/queries";
const EditJadwalAdmin = () => {
  const { id } = useParams();
  const [selectedLesson, setSelectedLesson] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    day: "",
    startTime: "",
    endTime: "",
    lessonName: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/Schedules/${id}`,
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
        });
        setSelectedLesson(response.data.lessonName || "");
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setSelectedLesson(formData.lessonName || "");
  }, [formData]);

  const jadwalQuery = useLessonsIds();
  const { data: dataJadwal } = jadwalQuery;

  const handleSubmitEdit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/Schedules/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Jadwal Pelajaran Berhasil diperbarui!",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/jadwal-admin");
        }
      });

      return response.data;
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data,
        confirmButtonText: "Ok",
      });
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
      text: "Apakah Anda yakin? Perubahan tidak akan tersimpan!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, batalkan",
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
                      className="flex w-32 items-center text-center justify-center  px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 text-white capitalize"
                      disabled={loading}
                      onClick={handleSubmitEdit}
                    >
                      {loading ? (
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
