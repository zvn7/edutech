import { useState } from "react";
import { useGetAbsensi } from "../../../services/queries";

const TabelAbsensi = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("januari");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedClass, setSelectedClass] = useState("semua");
  const [searchTerm, setSearchTerm] = useState("");

  const absensiQuery = useGetAbsensi();
  const { data, isLoading: isAbsensiLoading } = absensiQuery;

  // Fungsi untuk mendapatkan jumlah hari dalam bulan
  const getDaysInMonth = (month: string) => {
    // Ubah bulan menjadi huruf kecil untuk konsistensi
    const lowercaseMonth = month.toLowerCase();

    // Definisikan jumlah hari dalam setiap bulan
    const daysInMonthMap: { [key: string]: number } = {
      januari: 31,
      februari: 28, // Ubah menjadi 28 untuk tahun non-kabisat
      maret: 31,
      april: 30,
      mei: 31,
      juni: 30,
      juli: 31,
      agustus: 31,
      september: 30,
      oktober: 31,
      november: 30,
      desember: 31,
    };

    // Penanganan khusus untuk bulan Februari pada tahun kabisat
    if (lowercaseMonth === "februari") {
      const currentYear = new Date().getFullYear();
      // Tambahkan pengecekan tahun kabisat
      if (
        (currentYear % 4 === 0 && currentYear % 100 !== 0) ||
        currentYear % 400 === 0
      ) {
        // Jika tahun kabisat, ubah jumlah hari Februari menjadi 29
        daysInMonthMap.februari = 29;
      }
    }

    return daysInMonthMap[lowercaseMonth];
  };

  const filteredData =
    selectedClass === "semua"
      ? data
      : data?.filter(
          ({ uniqueNumberOfClassRoom }) =>
            uniqueNumberOfClassRoom === selectedClass
        ) || [];

  const totalPages = Math.ceil(
    (filteredData ? filteredData.length : 0) / pageSize
  );

  const handlePageSizeChange = (e: any) => {
    setPageSize(Number(e.target.value));
  };

  const handleClassChange = (e: any) => {
    setSelectedClass(e.target.value);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(Math.max(0, Math.min(pageNumber, totalPages - 1)));
  };

  const searchFilter = (absensi: any) => {
    return absensi.nameStudent.toLowerCase().includes(searchTerm.toLowerCase());
  };
  return (
    <div className="shadow-md sm:rounded-lg bg-white">
      <div className="flex flex-column sm:flex-row flex-wrap items-center justify-between pt-3 pb-4 px-4 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
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
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-300 bg-gray-50 p-1 rounded-lg capitalize"
          >
            {/* <option value="">Pilih Kelas</option> */}
            <option selected>semua</option>
            <option value="001">TKJ</option>
            <option value="002">TKR</option>
            <option value="003">RPL</option>
          </select>
          <select
            className="border border-gray-300 bg-gray-50 p-1 rounded-lg capitalize"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="januari">januari</option>
            <option value="februari">februari</option>
            <option value="maret">maret</option>
            <option value="april">april</option>
            <option value="mei">mei</option>
            <option value="juni">juni</option>
            <option value="juli">juli</option>
            <option value="agustus">agustus</option>
            <option value="september">september</option>
            <option value="oktober">oktober</option>
            <option value="november">november</option>
            <option value="desember">desember</option>
          </select>
        </div>

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block p-1.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-56 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 capitalize"
              placeholder="Cari absensi disini..."
            />
          </div>
          <button
            type="button"
            className="flex items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-1.5 capitalize"
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
                d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
              />
            </svg>
            <span className="ps-1 capitalize">unduh</span>
          </button>
        </div>
      </div>

      <div className="w-full overflow-y-auto overflow-x-auto h-96">
        <table className="w-full border-collapse text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-white sticky top-0 z-50">
            <tr className="border-2">
              <th
                rowSpan={3}
                className="bg-white left-0 z-50 border-2 px-6 py-3 text-center"
              >
                No
              </th>
              <th
                rowSpan={3}
                className="bg-white left-16 z-50 border-2 px-6 py-3 text-center"
              >
                Nama lengkap
              </th>
              <th
                colSpan={getDaysInMonth(selectedMonth)}
                className="px-2 py-2 border-2"
              >
                Tanggal
              </th>
            </tr>

            <tr className="border-2">
              {[...Array(getDaysInMonth(selectedMonth)).keys()].map((day) => {
                // Tambahkan 1 pada indeks bulan untuk mendapatkan tanggal yang sesuai
                const date = day;
                return (
                  <th
                    key={day + 1}
                    // colSpan={3}
                    className="text-center py-2 border-2"
                  >
                    {date}
                  </th>
                );
              })}
            </tr>
            <tr className="border-2">
              {[...Array(getDaysInMonth(selectedMonth)).keys()].map((day) => (
                <>
                  <th key={day + 1} className="border-2 text-center px-6 py-3">
                    keterangan
                  </th>
                  {/* <th key={day + 1} className="border-2 text-center px-6 py-3">
                    ijin
                  </th>
                  <th key={day + 1} className="border-2 text-center px-6 py-3">
                    Alfa
                  </th> */}
                </>
              ))}
            </tr>
          </thead>

          <tbody>
            {isAbsensiLoading && (
              <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 text-center">
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
            )}

            {/* {!isAbsensiLoading &&
              filteredData &&
              filteredData.map((absensi, index) => (
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="sticky left-0 bg-white border-e-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">
                    {index + 1}
                  </td>
                  <td className="sticky left-0 bg-white border-e-2 px-4 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">
                    {absensi.nameStudent}
                  </td>

                  {[...Array(getDaysInMonth(selectedMonth)).keys()].map(
                    (day) => (
                      <>
                        <td key={day + 1} className="border-2 text-center">
                          {absensi.attendanceStudent[day]?.status === 1
                            ? "✅"
                            : "-"}
                        </td>
                        <td key={day + 1} className="border-2 text-center">
                          {absensi.attendanceStudent[day]?.status === 2
                            ? "✅"
                            : "-"}
                        </td>
                        <td key={day + 1} className="border-2 text-center">
                          {absensi.attendanceStudent[day]?.status === 3
                            ? "✅"
                            : "-"}
                        </td>
                      </>
                    )
                  )}
                </tr>
              ))} */}
            {!isAbsensiLoading &&
              (filteredData && filteredData.length > 0 ? (
                filteredData.filter(searchFilter).map((absensi, index) => (
                  <tr className="bg-white border-2 hover:bg-gray-50">
                    {index >= currentPage * pageSize &&
                      index < (currentPage + 1) * pageSize && (
                        <>
                          <td className=" sticky left-0 bg-white px-6 py-4 font-medium text-gray-900 capitalize">
                            {index + 1}
                          </td>
                          <td className="sticky left-16 bg-white border-2 px-4 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">
                            {absensi.nameStudent}
                          </td>

                          {/* {[...Array(getDaysInMonth(selectedMonth)).keys()].map(
                      (day) => {
                        const absensiDate = new Date(
                          `${selectedMonth} ${
                            day + 1
                          }, ${new Date().getFullYear()}`
                        );
                        const absensiDateString = absensiDate
                          .toISOString()
                          .slice(0, 10);
                        const attendance = absensi.attendanceStudent || [];
                        const attendanceStatus = attendance.find(
                          (attendance) => attendance.date === absensiDateString
                        )?.status;
                        return (
                          <td
                            key={day + 1}
                            className="border-2 text-center font-medium text-black"
                          >
                            {attendanceStatus
                              ? attendanceStatus === 1
                                ? "Hadir"
                                : attendanceStatus === 2
                                ? "Ijin"
                                : "Alfa"
                              : "-"}
                          </td>
                        );
                      }
                    )} */}
                          {[...Array(getDaysInMonth(selectedMonth)).keys()].map(
                            (day) => {
                              // Tambahkan 1 pada indeks bulan untuk mendapatkan tanggal yang sesuai
                              const date = day + 1;
                              // Buat tanggal dengan format yang sesuai
                              const absensiDate = new Date(
                                `${selectedMonth} ${date}, ${new Date().getFullYear()}`
                              );
                              // Ubah tanggal menjadi string dengan format ISO
                              const absensiDateString = absensiDate
                                .toISOString()
                                .slice(0, 10);
                              // Temukan status kehadiran siswa untuk tanggal yang bersangkutan
                              const attendanceStatus =
                                absensi?.attendanceStudent?.find(
                                  (attendance) =>
                                    attendance.date === absensiDateString
                                )?.status;

                              return (
                                <td
                                  key={day + 1}
                                  className="border-2 text-center font-medium text-black"
                                >
                                  {attendanceStatus ? (
                                    attendanceStatus === 1 ? (
                                      <span className="bg-blue-100 text-blue-800 text-base font-medium me-2 px-2.5 py-0.5 rounded capitalize">
                                        Hadir
                                      </span>
                                    ) : attendanceStatus === 2 ? (
                                      <span className="bg-yellow-100 text-yellow-600 text-base font-medium me-2 px-2.5 py-0.5 rounded capitalize">
                                        Ijin
                                      </span>
                                    ) : (
                                      <span className="bg-red-100 text-red-800 text-base font-medium me-2 px-2.5 py-0.5 rounded capitalize">
                                        alfa
                                      </span>
                                    )
                                  ) : (
                                    "-"
                                  )}
                                </td>
                              );
                            }
                          )}
                        </>
                      )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={getDaysInMonth(selectedMonth) + 2}>
                    No data available
                  </td>
                </tr>
              ))}
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
  );
};

export default TabelAbsensi;
