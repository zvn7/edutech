import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useClassrooms, useGetSiswaId } from "../../../services/queries";
import { useCreateAbsensi } from "../../../services/mutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateAbsensi } from "../../../types/absensi";
import Swal from "sweetalert2";

const TabelRekapAbsensi = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [form, setForm] = useState({
    date: "",
    attendanceStudentCreate: [
      {
        status: 0,
        studentId: "",
      },
    ],
  });
  const [selectedClass, setSelectedClass] = useState("RPL");

  const kelasQuery = useClassrooms();
  const { data, isLoading: isKelasLoading } = kelasQuery;

  const siswaQuery = useGetSiswaId();
  const { data: siswaData, isLoading: isSiswaLoading } = siswaQuery;
  const { register, handleSubmit, reset } = useForm<CreateAbsensi>();

  const handleClassChange = (e: any) => {
    setSelectedClass(e.target.value);
    reset();
  };

  const filteredData =
    selectedClass === "RPL"
      ? siswaData?.filter(({ className }) => className === "RPL")
      : siswaData?.filter(({ className }) => className === selectedClass);

  const getTwoDaysAgo = () => {
    const today = new Date();
    today.setDate(today.getDate() - 3);
    return today.toISOString().split("T")[0];
  };

  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };

  const handleInputChange = (e: any) => {
    const { value, name } = e.target;
    const index = parseInt(name.split(".")[1]); // Mendapatkan indeks dari nama input
    if (filteredData) {
      // Periksa apakah filteredData tidak bernilai undefined
      const newData = [...filteredData]; // Membuat salinan data yang sudah ada
      newData[index].status = parseInt(value).toString(); // Menetapkan nilai status yang baru
      setForm({
        ...form,
        [name]: newData,
      });
    }
  };

  const createAbsensiMutation = useCreateAbsensi();

  const navigate = useNavigate();
  const handleCreateAbsensiSubmit: SubmitHandler<CreateAbsensi> = (data) => {
    const attendanceStudentCreate =
      data.attendanceStudentCreate?.map((entry) => ({
        status: +entry.status, // Menggunakan operator + untuk konversi ke number
        studentId: entry.studentId,
      })) || [];

    const formattedData: any = {
      date: data.date,
      attendanceStudentCreate: attendanceStudentCreate,
    };

    createAbsensiMutation.mutate(formattedData, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Absensi Berhasil ditambahkan!",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/data-absensi");
          }
        });
      },
      onError: (error) => {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.toString(),
          confirmButtonText: "Ok",
        });
      },
    });
  };

  return (
    <div className="shadow-md sm:rounded-lg bg-white">
      <div className="flex flex-column sm:flex-row flex-wrap items-center justify-between pt-2 pb-4 px-4">
        <div className="flex gap-2 items-center">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-1.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-56 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 capitalize"
              placeholder="Cari absensi disini..."
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleCreateAbsensiSubmit)}>
        <div className="flex flex-column items-center gap-2 py-4 px-4">
          <div className="flex items-center bg-white border border-gray-300 text-gray-900 text-sm rounded-lg w-full px-2.5">
            <label htmlFor="countries" className="text-gray-700 mr-4">
              Jurusan:
            </label>
            <select
              id="countries"
              value={selectedClass}
              onChange={handleClassChange}
              className="border-none bg-transparent w-full"
            >
              {data?.map((item) => (
                <option value={item.className}>{item.longClassName}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center bg-white border border-gray-300 text-gray-900 text-sm rounded-lg w-full px-2.5">
            <label
              htmlFor="countries"
              className="text-gray-700 capitalize mr-4"
            >
              tanggal
              <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              {...register("date")}
              className="border-none w-full border border-gray-300 text-gray-900 text-sm rounded-lg "
              placeholder="Hari & Tanggal"
              value={selectedDate}
              min={getTwoDaysAgo()}
              max={getToday()}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
              onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
                e.target.setCustomValidity("Tanggal tidak boleh kosong!")
              }
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                e.target.setCustomValidity("")
              }
            />
          </div>
        </div>

        <div className="w-full max-h-80 overflow-y-auto">
          <table className="w-full h-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
              <tr>
                <th className="px-6 py-3" rowSpan={2}>
                  No
                </th>
                <th className="px-6 py-3" rowSpan={2}>
                  Nama Lengkap
                </th>
                <th className="px-6 py-3 text-center" colSpan={3}>
                  Keterangan
                </th>
              </tr>
              <tr className="text-center">
                <th className="px-6 py-3">Hadir</th>
                <th className="px-6 py-3">Ijin</th>
                <th className="px-6 py-3">Alfa</th>
              </tr>
            </thead>

            <tbody>
              {filteredData &&
                filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                      {item.nameStudent}
                      <input
                        type="text"
                        value={item.id}
                        {...register(
                          `attendanceStudentCreate.${index}.studentId` as const
                        )}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                    </td>

                    <td className="text-center px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                      <input
                        type="radio"
                        value={1}
                        {...register(
                          `attendanceStudentCreate.${index}.status` as const
                        )}
                        onChange={handleInputChange}
                        required
                      />{" "}
                    </td>
                    <td className="text-center px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                      <input
                        type="radio"
                        value={2}
                        {...register(
                          `attendanceStudentCreate.${index}.status` as const
                        )}
                        onChange={handleInputChange}
                        required
                      />
                    </td>
                    <td className="text-center px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                      <input
                        type="radio"
                        value={3}
                        {...register(
                          `attendanceStudentCreate.${index}.status` as const
                        )}
                        onChange={handleInputChange}
                        required
                      />{" "}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="px-2 py-4 flex items-center justify-end">
          <div className="flex items-center justify-center gap-2">
            <button
              type="submit"
              className="w-30 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-2.5 rounded"
            >
              {createAbsensiMutation.isPending ? (
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

            <Link to="/data-absensi">
              <button
                type="button"
                className="w-20 text-center px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 capitalize"
              >
                batal
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TabelRekapAbsensi;
