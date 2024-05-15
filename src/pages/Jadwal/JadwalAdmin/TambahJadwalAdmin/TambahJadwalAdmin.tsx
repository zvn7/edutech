import { useState } from "react";
import Navigation from "../../../../component/Navigation/Navigation";
import { Link, useNavigate } from "react-router-dom";
import { useLessonsIds } from "../../../../services/queries";
import { useCreateJadwalAdmin } from "../../../../services/mutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Jadwal } from "../../../../types/jadwal";
import Swal from "sweetalert2";

const TambahJadwalAdmin = () => {
  const [selectedLesson, setSelectedLesson] = useState("");
  const [form, setForm] = useState({
    day: 0,
    startTime: 0,
    endTime: 0,
    lessonName: "",
    className: "",
  });

  const jadwalQuery = useLessonsIds();
  const { data: dataJadwal } = jadwalQuery;

  const handleLessonChange = (e: any) => {
    setSelectedLesson(e.target.value);
  };

  const handleInputChange = (e: any) => {
    const { value, name } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const createJadwalMutation = useCreateJadwalAdmin();

  const { register, handleSubmit, reset } = useForm<Jadwal>();

  const navigate = useNavigate();
  const handleCreateJadwalSubmit: SubmitHandler<Jadwal> = (data) => {
    createJadwalMutation.mutate(data, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Jadwal Pelajaran Berhasil ditambahkan!",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            reset();
            navigate("/jadwal-admin");
          }
        });
      },

      onError: (error: any) => {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.toString(),
          confirmButtonText: "Ok",
        });
      },
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
      confirmButtonText: "Ya, lanjutkan",
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
                Tambah Jadwal Pelajaran
              </h2>
              <form onSubmit={handleSubmit(handleCreateJadwalSubmit)}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-blue-700 capitalize"
                    >
                      Mata pelajaran
                    </label>
                    <select
                      id="mapel"
                      {...register("lessonName")}
                      value={selectedLesson}
                      onChange={handleLessonChange}
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
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-blue-700 capitalize"
                    >
                      hari
                    </label>
                    <select
                      id="category"
                      {...register("day")}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 capitalize"
                      required
                      onInvalid={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        e.currentTarget.setCustomValidity(
                          "Pilih hari tidak boleh kosong!"
                        )
                      }
                      onInput={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        e.currentTarget.setCustomValidity("")
                      }
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
                      {...register("startTime")}
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
                      {...register("endTime")}
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
                    <input
                      type="submit"
                      className="flex w-30 items-center text-center justify-center  px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
                      disabled={createJadwalMutation.isPending}
                      value={
                        createJadwalMutation.isPending
                          ? "Menyimpan...."
                          : "Simpan"
                      }
                    />

                    <button
                      type="submit"
                      onClick={handleBatal}
                      className="flex w-20 items-center text-center justify-center  px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 capitalize"
                    >
                      batal
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TambahJadwalAdmin;
