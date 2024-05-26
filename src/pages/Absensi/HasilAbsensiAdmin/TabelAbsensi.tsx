import { useState } from "react";
import {
  useAttendacesCalculate,
  useClassrooms,
  useGetAbsensi,
} from "../../../services/queries";

const TabelAbsensi = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedClass, setSelectedClass] = useState("003");
  const [searchTerm, setSearchTerm] = useState("");

  const absensiQuery = useGetAbsensi();
  const { data, isLoading: isAbsensiLoading } = absensiQuery;

  const kelasQuery = useClassrooms();
  const { data: dataKelas } = kelasQuery;

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

  const getClassFullName = (classNumber: any) => {
    switch (classNumber) {
      case "001":
        return "TKJ";
      case "002":
        return "TKR";
      case "003":
        return "RPL";
      default:
        return "";
    }
  };

  // Fungsi untuk menangani klik tombol unduh
  const handleDownloadClick = () => {
    setIsDownloading(true);

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/Attendances/download-attendance?uniqueNumberOfClassRoom=${selectedClass}&year=${selectedYear}&month=${selectedMonth}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to download attendance.");
        }
        return response.blob();
      })
      .then((blob) => {
        const classFullName = getClassFullName(selectedClass);
        const fileName = `${classFullName}_${selectedMonth}_${selectedYear}_absensi.xlsx`;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        setIsDownloading(false);
      })
      .catch((error) => {
        console.error("Error downloading attendance:", error);
        setIsDownloading(false);
      });
  };

  return (
    <>
      <div className="flex mt-16">
        <div className="w-full h-full bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-2 gap-2 py-4 md:grid-cols-3 lg:grid-cols-3">
            <div className="flex items-center justify-center gap-2 md:gap-4 border-e-2">
              <div className="p-1 bg-blue-200 rounded-full md:p-2">
                <img src="/gif/check.gif" alt="check" className="w-12 h-12" />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-xs font-bold capitalize md:text-xl">
                  {calculateAbsensi?.presentCount}
                  <span className="ml-2 text-xs text-gray-600 md:text-xl">
                    siswa
                  </span>
                </h2>
                <p className="md:text-sm text-[8px] border-2 first:border-blue-200 text-center rounded-md capitalize font-bold text-blue-700">
                  hadir
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:gap-6 border-e-2">
              <div className="p-1 bg-red-200 rounded-full md:p-2">
                <img src="/gif/cross.gif" alt="check" className="w-12 h-12" />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-xs font-bold md:text-xl">
                  {calculateAbsensi?.absentCount}
                  <span className="ml-2 text-xs text-gray-600 capitalize md:text-xl">
                    siswa
                  </span>
                </h2>
                <p className="md:text-sm text-[8px] border-2  border-red-200 text-center rounded-md capitalize font-bold text-red-700">
                  alfa
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <div className="p-1 bg-orange-200 rounded-full md:p-2">
                <img src="/gif/alert.gif" alt="check" className="w-12 h-12" />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-xs font-bold md:text-xl">
                  {calculateAbsensi?.excusedCount}
                  <span className="ml-2 text-xs text-gray-600 capitalize md:text-xl">
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
          <div className="bg-white shadow-md sm:rounded-lg">
            <div className="p-4 capitalize">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-500">
                  Data Absensi
                </h1>
                <button
                  type="button"
                  className="flex items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 capitalize"
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
                  <span className="capitalize ps-1 text-[16px]">
                    {" "}
                    {isDownloading ? "Downloading..." : "Download Excel"}
                  </span>
                </button>
              </div>
            </div>
            <hr className="ml-3 mr-3 mb-2 border-gray-200" />
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-3 pb-4 flex-column sm:flex-row">
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className="p-2 capitalize border border-gray-300 rounded-lg bg-gray-50"
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
                  className="p-2 capitalize border border-gray-300 rounded-lg bg-gray-50"
                >
                  {dataKelas?.map((kelas) => (
                    <option
                      key={kelas.className}
                      value={kelas.uniqueNumberOfClassRoom}
                    >
                      {kelas.longClassName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none rtl:inset-r-0 rtl:right-0 ps-3">
                    <img
                      src="/gif/search.gif"
                      alt="search"
                      className="w-6 h-6"
                    />
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-gray-200 focus:border-none"
                    placeholder="Temukan nama siswa disini..."
                  />
                </div>
              </div>
            </div>
            <div className="pl-4 pb-5 mt-3 flex items-center gap-2 flex-wrap">
              <h1 className="capitalize text-lg">filter bulan & tahun :</h1>
              <select
                className="p-2 capitalize border border-gray-300 rounded-lg bg-gray-50"
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
                className="p-2 capitalize border border-gray-300 rounded-lg bg-gray-50"
                value={selectedYear}
                onChange={handleYearChange}
              >
                {Array.from({ length: 10 }, (_, i) => getCurrentYear() - i).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="w-full overflow-x-auto overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500 border-collapse rtl:text-right">
                <thead className="sticky top-0 z-20 text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th
                      rowSpan={3}
                      className="sticky left-0 z-20 px-6 py-3 text-center bg-gray-200"
                    >
                      No
                    </th>
                    <th
                      rowSpan={3}
                      className="sticky z-20 px-6 py-3 text-center bg-gray-200 left-16"
                    >
                      Nama lengkap
                    </th>
                    <th
                      colSpan={10}
                      className="sticky top-0 z-20 px-6 py-3 bg-gray-200 left-[160px] text-center"
                    >
                      Tanggal
                    </th>
                  </tr>

                  <tr>
                    {datesInMonth.map((date, index) => (
                      <th key={index} className="py-2 text-center">
                        {date + 1}
                      </th>
                    ))}
                  </tr>

                  <tr>
                    {datesInMonth.map((date) => (
                      <th key={date} className="px-6 py-3 text-center">
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
                        <td className="px-6 py-4 font-normal text-gray-900 capitalize whitespace-nowrap">
                          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                        </td>
                        <td className="px-6 py-4 font-normal text-gray-900 capitalize whitespace-nowrap">
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
                        </td>
                        <td className="px-6 py-4 font-normal text-gray-900 capitalize whitespace-nowrap">
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                        </td>

                        {Array.from(
                          { length: datesInMonth.length },
                          (_, index) => (
                            <td
                              key={index}
                              className="px-6 py-4 font-normal text-gray-900 uppercase whitespace-nowrap"
                            >
                              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                            </td>
                          )
                        )}
                      </tr>
                    ))
                  ) : !isAbsensiLoading &&
                    filteredData &&
                    filteredData.length > 0 ? (
                    filteredData.filter(searchFilter).length > 0 ? (
                      filteredData
                        .filter(searchFilter)
                        .map((absensi, index) => (
                          <tr className="bg-white border-2 hover:bg-gray-50">
                            {index >= currentPage * pageSize &&
                              index < (currentPage + 1) * pageSize && (
                                <>
                                  <td className="sticky left-0 px-6 py-4 font-medium text-gray-900 capitalize bg-white ">
                                    {index + 1}
                                  </td>
                                  <td className="sticky px-4 py-4 font-medium text-gray-900 capitalize bg-white border-2 left-16 whitespace-nowrap">
                                    {absensi.nameStudent}
                                  </td>

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
                                            attendance.date ===
                                            absensiDateString
                                        )?.status;

                                      return (
                                        <td
                                          key={index}
                                          className="font-medium text-center text-black border-2"
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
                        <td colSpan={10} className="p-4 text-center">
                          Tidak ada hasil pencarian yang sesuai
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan={10} className="text-center p-8 capitalize">
                        Data belum tersedia.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 p-4">
              <span className="flex items-center gap-1">
                <div className="capitalize">halaman</div>
                <strong className="capitalize">
                  {currentPage + 1} dari {totalPages}
                </strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 0}
                  className="h-10 px-4 py-2 mr-2 text-gray-800 bg-gray-200 rounded"
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
                  className="h-10 px-4 py-2 ml-1 text-gray-800 bg-gray-200 rounded"
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
