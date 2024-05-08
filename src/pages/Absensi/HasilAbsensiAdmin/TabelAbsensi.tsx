import { useState } from "react";
import {
  useAttendacesCalculate,
  useClassrooms,
  useGetAbsensi,
} from "../../../services/queries";
import * as XLSX from "xlsx";

const TabelAbsensi = () => {
  // const [selectedMonth, setSelectedMonth] = useState<string>("januari");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedClass, setSelectedClass] = useState("003");
  const [searchTerm, setSearchTerm] = useState("");

  const absensiQuery = useGetAbsensi();
  const { data, isLoading: isAbsensiLoading } = absensiQuery;

  const kelasQuery = useClassrooms();
  const { data: dataKelas, isLoading: isKelasLoading } = kelasQuery;

  // Fungsi untuk mendapatkan jumlah hari dalam bulan tertentu
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  // Fungsi untuk mendapatkan nama bulan dalam bahasa Indonesia
  const getMonthName = (month: number) => {
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
    return months[month - 1];
  };

  // Fungsi untuk mendapatkan tahun saat ini
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  // State untuk menyimpan bulan dan tahun yang dipilih
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState<number>(getCurrentYear());

  const calculateQuery = useAttendacesCalculate(
    selectedClass,
    selectedYear.toString(),
    selectedMonth.toString()
  );
  const { data: calculateAbsensi, isLoading: isCalculateLoading } =
    calculateQuery;
  // Event handler untuk memilih bulan
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  // Event handler untuk memilih tahun
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

  const datesInMonth = Array.from({ length: daysInMonth }, (_, index) => index);

  const filteredData =
    selectedClass === "003"
      ? data?.filter(
          ({ uniqueNumberOfClassRoom }) => uniqueNumberOfClassRoom === "003"
        )
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

  const [isDownloading, setIsDownloading] = useState(false);

  const convertToExcel = (data: any) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    return URL.createObjectURL(blob);
  };

  // Fungsi untuk menangani klik tombol unduh
  const handleDownloadClick = () => {
    setIsDownloading(true);
    const excelData = convertToExcel(filteredData?.filter(searchFilter) || []); // Filter data sebelum dikonversi
    const link = document.createElement("a");
    link.href = excelData;
    link.download = "absensi.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloading(false);
  };

  return (
    <>
      <div className="mt-16 flex">
        <div className="w-full h-full bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 py-4">
            <div className="flex items-center justify-center md:gap-4 gap-2 border-e-2">
              <div className="bg-blue-200 rounded-full md:p-2 p-1">
                <svg
                  className="md:w-9 md:h-9 lg:w-10 lg:h-10 h-6 w-6 text-blue-600 dark:text-white"
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
                    d="m5 12 4.7 4.5 9.3-9"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="md:text-xl text-xs font-bold capitalize">
                  {calculateAbsensi?.presentCount}
                  <span className="md:text-xl text-xs ml-2 text-gray-600">
                    siswa
                  </span>
                </h2>
                <p className="md:text-sm text-[8px] border-2 first:border-blue-200 text-center rounded-md capitalize font-bold text-blue-700">
                  hadir
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center md:gap-6 gap-2 border-e-2">
              <div className="bg-red-200 rounded-full md:p-2 p-1">
                <svg
                  className="md:w-9 md:h-9 lg:w-10 lg:h-10 h-6 w-6 text-red-600"
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
                    d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="md:text-xl text-xs font-bold">
                  {calculateAbsensi?.absentCount}
                  <span className="md:text-xl text-xs ml-2 text-gray-600 capitalize">
                    siswa
                  </span>
                </h2>
                <p className="md:text-sm text-[8px] border-2  border-red-200 text-center rounded-md capitalize font-bold text-red-700">
                  alfa
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center md:gap-4 gap-2">
              <div className="bg-orange-200 rounded-full md:p-2 p-1">
                <svg
                  className="md:w-9 md:h-9 lg:w-10 lg:h-10 h-6 w-6 text-orange-400 "
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
                    d="M10 11h2v5m-2 0h4m-2.6-8.5h0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="md:text-xl text-xs font-bold">
                  {calculateAbsensi?.excusedCount}
                  <span className="md:text-xl text-xs ml-2 text-gray-600 capitalize">
                    siswa
                  </span>
                </h2>
                <p className="md:text-sm text-[8px] border-2 border-orange-200 text-center rounded-md capitalize font-bold text-orange-500">
                  izin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="mt-6">
          <div className="shadow-md sm:rounded-lg bg-white">
            <div className="flex flex-column sm:flex-row flex-wrap items-center justify-between pt-3 pb-4 px-4 gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className="border border-gray-300 bg-gray-50 p-1 rounded-lg capitalize"
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option
                      key={pageSize}
                      value={pageSize}
                      className="text-normal"
                    >
                      {pageSize} data
                    </option>
                  ))}
                </select>

                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="border border-gray-300 bg-gray-50 p-1 rounded-lg capitalize"
                >
                  {dataKelas?.map((kelas) => (
                    <option
                      key={kelas.className}
                      value={kelas.uniqueNumberOfClassRoom}
                    >
                      {kelas.className}
                    </option>
                  ))}
                </select>
                <select
                  className="border border-gray-300 bg-gray-50 p-1 rounded-lg capitalize"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {getMonthName(month)}
                    </option>
                  ))}
                </select>

                <select
                  className="border border-gray-300 bg-gray-50 p-1 rounded-lg capitalize"
                  value={selectedYear}
                  onChange={handleYearChange}
                >
                  {Array.from(
                    { length: 10 },
                    (_, i) => getCurrentYear() - i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
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
                  onClick={handleDownloadClick}
                  disabled={isDownloading}
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
                  <span className="ps-1 capitalize">
                    {" "}
                    {isDownloading ? "Downloading..." : "Download Excel"}
                  </span>
                </button>
              </div>
            </div>

            <div className="w-full overflow-y-auto overflow-x-auto">
              <table className="w-full border-collapse text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 sticky top-0 z-20">
                  <tr>
                    <th
                      rowSpan={3}
                      className="bg-gray-200 left-0 z-20 px-6 py-3 text-center sticky"
                    >
                      No
                    </th>
                    <th
                      rowSpan={3}
                      className="bg-gray-200 left-16 z-20 px-6 py-3 text-center sticky"
                    >
                      Nama lengkap
                    </th>
                    <th
                      // colSpan={}
                      className="sticky left-96 bg-gray-200 z-20 px-2 py-2"
                    >
                      Tanggal
                    </th>
                  </tr>

                  <tr>
                    {datesInMonth.map((date, index) => (
                      <th key={index} className="text-center py-2">
                        {date + 1}
                      </th>
                    ))}
                  </tr>
                  <tr>
                    {datesInMonth.map((date) => (
                      <th key={date} className="text-center px-6 py-3">
                        keterangan
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {isAbsensiLoading ? (
                    Array.from({ length: 5 }, (_, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b animate-pulse"
                      >
                        <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                        </td>
                        <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
                        </td>
                        <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                        </td>
                        {Array.from(
                          { length: datesInMonth.length },
                          (_, index) => (
                            <td
                              key={index}
                              className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap uppercase"
                            >
                              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                            </td>
                          )
                        )}
                      </tr>
                    ))
                  ) : !isAbsensiLoading &&
                    filteredData &&
                    filteredData?.filter(searchFilter).length > 0 ? (
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

                              {/* {Array.from(
                                    {
                                      length: getDaysInMonth(
                                        selectedMonth,
                                        selectedYear
                                      ),
                                    },
                                    (_, index) => index + 1
                                  ).map((date, index) => {
                                    // Gunakan indeks dari map
                                    // Buat tanggal dengan format yang sesuai
                                    const absensiDate = new Date(
                                      `${selectedYear}-${selectedMonth}-${date}`
                                    );

                                    console.log("selectedYear:", selectedYear);
                                    console.log(
                                      "selectedMonth:",
                                      selectedMonth
                                    );
                                    console.log("date:", date);

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
                                        key={index} // Gunakan indeks dari map
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
                                              Alfa
                                            </span>
                                          )
                                        ) : (
                                          "-"
                                        )}
                                      </td>
                                    );
                                  })} */}

                              {Array.from(
                                {
                                  length: getDaysInMonth(
                                    selectedMonth,
                                    selectedYear
                                  ),
                                },
                                (_, index) => {
                                  // Gunakan indeks dari map sebagai tanggal
                                  const date = index + 2;
                                  const absensiDate = new Date(
                                    selectedYear,
                                    selectedMonth - 1,
                                    date
                                  );

                                  // Ubah tanggal menjadi string dengan format "YYYY-MM-DD"
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
                                      key={index}
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
                                            Alfa
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
                      <td colSpan={10} className="text-center p-4">
                        Tidak ada hasil pencarian yang sesuai
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
        </div>
      </div>
    </>
  );
};

export default TabelAbsensi;
