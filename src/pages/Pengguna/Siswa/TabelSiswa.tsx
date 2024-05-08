import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useGetSiswaId, useSiswaDetail } from "../../../services/queries";
import UploadFile from "./UploadFile";
import Swal from "sweetalert2";
import { useDeleteSiswa } from "../../../services/mutation";

const TabelSiswa = (
  { id }: { id: (string | undefined)[] }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalExcel, setOpenModalExcel] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedClass, setSelectedClass] = useState("semua");
  const [searchTerm, setSearchTerm] = useState("");

  const siswaQuery = useGetSiswaId();

  const { data, isLoading: isSiswaLoading } = siswaQuery;
  // const siswa = useSiswa(id);

  const [file, setFile] = useState();

  // Fungsi untuk mengubah nilai pageSize saat dropdown diubah
  const handlePageSizeChange = (e: any) => {
    setPageSize(Number(e.target.value));
  };

  // Fungsi untuk mengatur nilai kelas yang dipilih saat dropdown berubah
  const handleClassChange = (e: any) => {
    setSelectedClass(e.target.value);
  };

  // Menyaring data berdasarkan kelas yang dipilih
  const filteredData =
    selectedClass === "semua"
      ? data
      : data?.filter(({ className }) => className === selectedClass) || [];

  // Menghitung total halaman
  const totalPages = Math.ceil(
    (filteredData ? filteredData.length : 0) / pageSize
  );

  // Fungsi untuk pindah ke halaman sebelumnya
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  // Fungsi untuk pindah ke halaman berikutnya
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  // Fungsi untuk pindah ke halaman tertentu
  const goToPage = (pageNumber: number) => {
    setCurrentPage(Math.max(0, Math.min(pageNumber, totalPages - 1)));
  };

  const [selectedSiswaId, setSelectedSiswaId] = useState<string | null>(null);

  const { data: selectedSiswa, isLoading: isSelectedSiswaLoading } =
    useSiswaDetail(selectedSiswaId ?? "");

  const handleDetailClick = (id: string) => {
    setSelectedSiswaId(id);
    setOpenModal(true);
  };

  const getClassName = (className: string) => {
    switch (className) {
      case "TKJ":
        return "Teknik Komputer Jaringan";
      case "RPL":
        return "Rekayasa Perangkat Lunak";
      case "TKR":
        return "Teknik Kendaraan Ringan";
      default:
        return className; // Kembalikan nilai className apa adanya jika tidak sesuai dengan kasus di atas
    }
  };

  const getGender = (gender: number) => {
    switch (gender) {
      case 1:
        return "Laki- Laki";
      case 2:
        return "Perempuan";
      default:
        return gender;
    }
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

  // Fungsi untuk mencari data berdasarkan nama lengkap dan NIS
  const searchFilter = (siswa: any) => {
    return (
      siswa.nameStudent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      siswa.className.toUpperCase().includes(searchTerm.toUpperCase())
    );
  };

  const deleteSiswa = useDeleteSiswa();
  const handleDelete = async (id: any) => {
    const confirmation = await Swal.fire({
      title: "Anda yakin ingin menonaktifkan siswa ini?",
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
        await deleteSiswa.mutateAsync(id);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Siswa Berhasil dinonaktifkan!",
          confirmButtonText: "Ok",
        });
      } catch (error) {
        console.log("gagal");
      }
    }
  };

  return (
    <>
      <div className="shadow-md sm:rounded-lg bg-white">
        <div className="p-2 ml-2 mr-2 pt-4 mb-3 flex gap-2 justify-between">
          <div className="flex gap-2 items-center flex-wrap">
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="border border-gray-300 bg-gray-50 p-1 rounded-lg capitalize"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize} className="text-normal">
                  {pageSize} data
                </option>
              ))}
            </select>

            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="border border-gray-300 bg-gray-50 p-1 rounded-lg capitalize"
            >
              <option selected>semua</option>
              <option value="TKR">TKR</option>
              <option value="TKJ">TKJ</option>
              <option value="RPL">RPL</option>
            </select>

            <div className="flex gap-2 items-center">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari nama lengkap & jurusan disini..."
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setOpenModalExcel(true)}
              className="flex items-center text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm p-2 capitalize"
            >
              <svg
                className="w-5 h-5 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"
                />
              </svg>

              <span className="ps-1 capitalize">upload excel</span>
            </button>
            <Link to="/pengguna-siswa/tambah-siswa">
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
        <div className="relative overflow-x-auto">
          <table className="w-full uppertext-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-900 uppercase bg-gray-100">
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Nama Lengkap</th>
              <th className="px-6 py-3">nis</th>
              <th className="px-6 py-3">Jurusan</th>
              <th className="px-6 py-3">Tempat, tanggal Lahir</th>
              <th className="px-6 py-3">Aksi</th>
            </thead>
            <tbody>
              {isSiswaLoading ? (
                <div className="text-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-10 h-10 text-gray-200 animate-spin fill-blue-600"
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
              ) : !isSiswaLoading &&
                filteredData &&
                filteredData.filter(searchFilter).length > 0 ? (
                filteredData
                  .filter(searchFilter)
                  .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                  .map((siswa, index) => (
                    <tr
                      key={siswa.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                        {siswa.nameStudent}
                      </td>

                      <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                        {siswa.nis}
                      </td>
                      <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                        {siswa.className}
                      </td>
                      <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                        {siswa.birthPlace},{" "}
                        {formatBirthDate(
                          siswa.birthDate || "No birth date available"
                        )}
                      </td>
                      <td>
                        <Button.Group>
                          <Button
                            color="info"
                            onClick={() => handleDetailClick(siswa.id)}
                          >
                            Detail
                          </Button>
                          <Link to={`/pengguna-siswa/edit-siswa/${siswa.id}`}>
                            <Button color="warning" className="rounded-none">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            color="failure"
                            onClick={() => handleDelete(siswa.id)}
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
      {/* modal detail */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="capitalize">
          Detail Siswa {selectedSiswa?.nameStudent}
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
                      {selectedSiswa?.nameStudent}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      jenis kelamin
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>

                    <td className="px-2 py-2 capitalize text-[16px]">
                      {getGender(selectedSiswa?.gender || 0)}
                    </td>
                  </tr>

                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      nis
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      {selectedSiswa?.nis}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      Tempat, tanggal lahir
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      {selectedSiswa?.birthPlace},{" "}
                      {formatBirthDate(
                        selectedSiswa?.birthDate || "No birth date available"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      alamat
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      {selectedSiswa?.address}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      Nomor telepon
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      {selectedSiswa?.phoneNumber}
                    </td>
                  </tr>

                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      jurusan
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      {getClassName(selectedSiswa?.className || "")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* modal upload excel */}
      <Modal show={openModalExcel} onClose={() => setOpenModalExcel(false)}>
        <UploadFile />
      </Modal>
    </>
  );
};

export default TabelSiswa;
