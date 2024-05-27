import { useState } from "react";
import { Button } from "flowbite-react";
import { useClassrooms, useSchedulesAdmin } from "../../../services/queries";
import { useDeleteSchedules } from "../../../services/mutation";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const TabelJadwalAdmin = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedClass, setSelectedClass] = useState("semua");
  const [searchTerm, setSearchTerm] = useState("");

  const kelasQuery = useClassrooms();
  const { data: dataKelas} = kelasQuery;

  const jadwalQuery = useSchedulesAdmin();
  const { data, isLoading: isJadwalLoading } = jadwalQuery;

  const handlePageSizeChange = (e: any) => {
    setPageSize(Number(e.target.value));
  };

  const handleClassChange = (e: any) => {
    setSelectedClass(e.target.value);
  };

  const filteredData =
    selectedClass === "semua"
      ? data
      : data?.filter(({ className }) => className === selectedClass) || [];

  const totalPages = Math.ceil(
    (filteredData ? filteredData.length : 0) / pageSize
  );

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(Math.max(0, Math.min(pageNumber, totalPages - 1)));
  };

  const getDay = (day: number) => {
    switch (day) {
      case 1:
        return "Senin";
      case 2:
        return "Selasa";
      case 3:
        return "Rabu";
      case 4:
        return "Kamis";
      case 5:
        return "Juma'at";
      default:
        return day;
    }
  };

  const searchFilter = (jadwal: any) => {
    return (
      jadwal.lessonName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jadwal.nameTeacher?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const deleteJadwal = useDeleteSchedules();

  const handleDelete = async (id: any) => {
    const confirmation = await Swal.fire({
      title: "Peringatan",
      text: "Apakah anda yakin ingin menghapus jadwal ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, lanjutkan",
      cancelButtonText: "Batal",
    });
    if (confirmation.isConfirmed) {
      try {
        await deleteJadwal.mutateAsync(id);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Jadwal Pelajaran Berhasil dihapus!",
          confirmButtonText: "Ok",
        });
      } catch (error: any) {
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
      }
    }
  };
  return (
    <>
      <div className="shadow-md sm:rounded-lg bg-white">
        <div className="p-4 capitalize">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-500">Data Jadwal</h1>
            <Link to="/jadwal-admin/tambah-jadwal">
              <button
                type="button"
                className="flex items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2 capitalize"
              >
                <svg
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
                <span className="ps-1 capitalize">tambah</span>
              </button>
            </Link>
          </div>
        </div>
        <hr className="ml-3 mr-3 border-gray-200" />
        <div className="p-2 ml-2 mr-2 mt-2 pt-4 mb-3 flex gap-2 justify-between flex-wrap">
          <div className="flex gap-2 items-center ">
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="border border-gray-300 bg-gray-50 p-2 rounded-lg capitalize"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize} data
                </option>
              ))}
            </select>
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="border border-gray-300 bg-gray-50 p-2 rounded-lg capitalize"
            >
              <option selected>semua</option>
              {dataKelas?.map((item) => (
                <option value={item.className}>{item.className}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <img src="/gif/search.gif" alt="search" className="w-6 h-6" />
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-gray-200 focus:border-none"
                placeholder="Temukan mapel & guru disini..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full uppertext-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-900 uppercase bg-gray-100">
              <th className="px-6 py-3">no</th>
              <th className="px-6 py-3">mata pelajaran</th>
              <th className="px-6 py-3">hari</th>
              <th className="px-6 py-3">jam pembelajaran</th>
              <th className="px-6 py-3">guru</th>
              <th className="px-6 py-3">aksi</th>
            </thead>
            <tbody>
              {isJadwalLoading ? (
                Array.from({ length: pageSize }).map((_, index) => (
                  <tr key={index} className="bg-white border-b animate-pulse">
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
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
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
                    </td>
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap uppercase">
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                    </td>
                  </tr>
                ))
              ) : !isJadwalLoading &&
                filteredData &&
                filteredData.length > 0 ? (
                filteredData.filter(searchFilter).length > 0 ? (
                  filteredData
                    .filter(searchFilter)
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map((jadwal, index) => (
                      <tr
                        key={jadwal.id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <>
                          <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                            {jadwal.lessonName}
                          </td>
                          <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                            {getDay(jadwal.day)}
                          </td>
                          <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap uppercase">
                            {jadwal.startTime.toString().slice(0, -3)} -{" "}
                            {jadwal.endTime.toString().slice(0, -3)} wib
                          </td>
                          <td
                            scope="row"
                            className={`px-6 py-4 font-normal whitespace-nowrap capitalize ${
                              jadwal.nameTeacher === "Belum Ada Guru"
                                ? "text-gray-500"
                                : "text-gray-900"
                            }`}
                          >
                            {jadwal.nameTeacher}
                          </td>
                          <td>
                            <Button.Group>
                              <Link
                                to={`/jadwal-admin/edit-jadwal/${jadwal.id}`}
                              >
                                <Button
                                  color="warning"
                                  className="rounded-e-sm"
                                >
                                  Edit
                                </Button>
                              </Link>
                              <Button
                                color="failure"
                                onClick={() => handleDelete(jadwal.id)}
                              >
                                Hapus
                              </Button>
                            </Button.Group>
                          </td>
                        </>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center p-10">
                      Tidak ada hasil pencarian yang sesuai.
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center capitalize">
                    Data belum tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2 p-4">
          <span className="flex items-center gap-1">
            <div className="capitalize">halaman</div>
            <strong className="capitalize">
              {currentPage + 1} dari {totalPages}
            </strong>
          </span>
          <div className="flex gap-2 items-center">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              className="mr-2 px-4 py-2 h-10 bg-gray-200 text-gray-800 rounded"
            >
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`mr-2 px-4 py-2 h-10 ${
                  currentPage === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } rounded`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className="ml-1 px-4 py-2 h-10 bg-gray-200 text-gray-800 rounded"
            >
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabelJadwalAdmin;
