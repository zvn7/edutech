import { useState } from "react";
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
  const { data } = kelasQuery;

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

  const isWeekend = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getUTCDay();
    return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
  };

  const handleInputChange = (e: any) => {
    const { value, name } = e.target;
    const index = parseInt(name.split(".")[1]); // Mendapatkan indeks dari nama input

    if (isWeekend(selectedDate)) {
      Swal.fire({
        icon: "warning",
        title: "Tanggal tidak valid",
        text: "Tanggal yang dipilih jatuh pada hari Sabtu atau Minggu, silakan pilih tanggal lain.",
        confirmButtonText: "Ok",
      });
      return; // Exit the function if it's a weekend
    }

    if (filteredData) {
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
  const handleCreateAbsensiSubmit: SubmitHandler<CreateAbsensi> = async (
    data
  ) => {
    try {
      const confirmationResult = await Swal.fire({
        title: "Konfirmasi",
        text: "Apakah data sudah benar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, simpan",
        cancelButtonText: "Batal",
      });

      if (confirmationResult.isConfirmed) {
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
          onError: (error: any) => {
            if (
              error.response &&
              error.response.data &&
              error.response.data.errors
            ) {
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
          },
        });
      }
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
    }
  };

  return (
    <div className="shadow-md sm:rounded-lg bg-white">
      <div className="p-4 capitalize">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-500">Data Rekap</h1>
        </div>
      </div>
      <hr className="ml-3 mr-3 mb-1 border-gray-200" />

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
              onChange={(e) => {
                setSelectedDate(e.target.value);
                if (isWeekend(e.target.value)) {
                  Swal.fire({
                    icon: "warning",
                    title: "Tanggal tidak valid",
                    text: "Tanggal yang dipilih jatuh pada hari Sabtu atau Minggu, silakan pilih tanggal lain.",
                    confirmButtonText: "Ok",
                  });
                }
              }}
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
              {isSiswaLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="bg-white border-b animate-pulse">
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
                    </td>
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
                    </td>
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                    </td>
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap uppercase">
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
                    </td>
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap uppercase">
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
                    </td>
                  </tr>
                ))
              ) : filteredData && filteredData.length > 0 ? (
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
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-8 capitalize">
                    Data belum tersedia.
                  </td>
                </tr>
              )}
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
