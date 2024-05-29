import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetGuru, useGuruDetail } from "../../../services/queries";
import { Button, Modal } from "flowbite-react";
import { useDeleteGuru } from "../../../services/mutation";
import Swal from "sweetalert2";

const TabelGuru = ({ id }: { id: (string | undefined)[] }) => {
  const [openModal, setOpenModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const guruQuery = useGetGuru();
  const { data, isLoading: isGuruLoading } = guruQuery;

  const handlePageSize = (e: any) => {
    setPageSize(Number(e.target.value));
  };

  const totalPages = Math.ceil((data ? data.length : 0) / pageSize);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(Math.max(0, Math.min(pageNumber, totalPages - 1)));
  };

  const searchFilter = (guru: any) => {
    return guru.nameTeacher.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const [selectedGuruId, setSelectedGuruId] = useState<string | null>(null);
  const { data: selectedGuru } = useGuruDetail(selectedGuruId ?? "");

  const handleDetailClick = (id: string) => {
    setOpenModal(true);
    setSelectedGuruId(id);
  };

  const formatBirthDate = (birthDate: string): string => {
    const parts = birthDate.split("-");
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const date = parseInt(parts[2], 10);

    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    return `${date} ${months[month - 1]} ${year}`;
  };

  const deleteGuru = useDeleteGuru();

  const handleDelete = async (id: any) => {
    const confirmation = await Swal.fire({
      title: "Anda yakin ingin menonaktifkan guru ini?",
      text: "Aksi ini tidak dapat dibatalkan!.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });
    if (confirmation.isConfirmed) {
      try {
        await deleteGuru.mutateAsync(id);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Guru Berhasil dinonaktifkan!",
          confirmButtonText: "Ok",
        });
      } catch (error: any) {
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
    <>
      <div className="shadow-md sm:rounded-lg bg-white">
        <div className="p-4 capitalize">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-500 capitalize">
              Data Guru
            </h1>
            <Link to="/pengguna-guru/tambah-guru">
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
        <div className="p-2 ml-2 mr-2 pt-4 mb-3 flex gap-2 justify-between flex-wrap">
          <div className="flex gap-2 items-center ">
            <select
              value={pageSize}
              onChange={handlePageSize}
              className="border border-gray-300 bg-gray-50 p-2 rounded-lg capitalize"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize} className="text-normal">
                  {pageSize} data
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 items-center">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <img src="/gif/search.gif" alt="calendar" className="w-6 h-6" />
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 capitalize"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="temukan guru disini..."
              />
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full uppertext-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
            <thead className="text-xs text-gray-900 uppercase bg-gray-100 ">
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Nama guru</th>
              <th className="px-6 py-3">mapel</th>
              <th className="px-6 py-3">jurusan</th>
              <th className="px-6 py-3">aksi</th>
            </thead>
            <tbody>
              {isGuruLoading ? (
                Array.from({ length: pageSize }).map((_, index) => (
                  <tr key={index} className="bg-white border-b animate-pulse">
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                    </td>
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
                    </td>
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                    </td>
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap uppercase">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
                    </td>
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap uppercase">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
                    </td>
                  </tr>
                ))
              ) : !isGuruLoading && data && data.length > 0 ? (
                data.filter(searchFilter).length > 0 ? (
                  data
                    ?.filter(searchFilter)
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map((item, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 "
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{item.nameTeacher}</td>
                        <td className="px-6 py-4">
                          {item.lessonNames.map((item) => (
                            <div className="text-gray-900 font-medium capitalize">
                              {item}
                            </div>
                          ))}
                        </td>
                        <td className="px-6 py-4">
                          {item.classNames.map((item) => (
                            <span className="bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                              {item}
                            </span>
                          ))}
                        </td>
                        <td className="px-6 py-4">
                          <Button.Group>
                            <Button
                              color="info"
                              onClick={() => handleDetailClick(item.id)}
                            >
                              Detail
                            </Button>
                            <Link to={`/pengguna-guru/edit-guru/${item.id}`}>
                              <Button color="warning" className="rounded-none">
                                Edit
                              </Button>
                            </Link>
                            <Button
                              color="failure"
                              onClick={() => handleDelete(item.id)}
                            >
                              Hapus
                            </Button>
                          </Button.Group>
                        </td>
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

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="capitalize">
          Detail Guru {selectedGuru?.nameTeacher}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <table className="text-sm">
                <tbody>
                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      nama lengkap
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      {selectedGuru?.nameTeacher}
                    </td>
                  </tr>

                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      nip
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      {selectedGuru?.nip}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      Tempat, tanggal lahir
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      {selectedGuru?.birthPlace},{" "}
                      {formatBirthDate(
                        selectedGuru?.birthDate || "No birth date available"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      alamat
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      {selectedGuru?.address}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      Nomor telepon
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      {selectedGuru?.phoneNumber}
                    </td>
                  </tr>

                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      pengajar di
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      {selectedGuru?.lessonNames.map((item) => (
                        <span className="bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                          {item}
                        </span>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TabelGuru;
