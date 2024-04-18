import { useState } from "react";
import { useGetAbsensi } from "../../../services/queries";

const TabelAbsensi = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("januari");

  const absensiQuery = useGetAbsensi();
  const { data, isLoading: isAbsensiLoading } = absensiQuery;

  // Fungsi untuk mendapatkan jumlah hari dalam bulan
  const getDaysInMonth = (month: string) => {
    // Definisikan jumlah hari dalam setiap bulan
    const daysInMonthMap: { [key: string]: number } = {
      januari: 31,
      februari: 29, // Anda mungkin perlu penanganan khusus untuk tahun kabisat
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

    return daysInMonthMap[month];
  };

  const [selectedClass, setSelectedClass] = useState("semua");

  const filteredData =
    selectedClass === "semua"
      ? data
      : data?.filter(
          ({ uniqueNumberOfClassRoom }) =>
            uniqueNumberOfClassRoom === selectedClass
        ) || [];

  return (
    <div className="shadow-md sm:rounded-lg bg-white">
      <div className="flex flex-column sm:flex-row flex-wrap items-center justify-between pt-3 pb-4 px-4 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="border border-gray-300 bg-gray-50 p-1 rounded-lg capitalize"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} data
              </option>
            ))}
          </select> */}

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

      <div className="w-full overflow-y-auto overflow-x-auto">
        <table className="w-full h-5 text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
            <tr>
              <th
                rowSpan={3}
                className="sticky left-0 bg-gray-100 border-2 px-6 py-3 text-center"
              >
                No
              </th>
              <th
                rowSpan={3}
                className="sticky left-0 bg-gray-100 border-2 px-6 py-3 text-center"
              >
                Nama lengkap
              </th>

              <th
                colSpan={getDaysInMonth(selectedMonth) * 3}
                className="border-2 px-2 py-2"
              >
                Tanggal
              </th>
            </tr>

            <tr>
              {[...Array(getDaysInMonth(selectedMonth)).keys()].map((day) => (
                <th
                  key={day + 1}
                  colSpan={3}
                  className="border-2 text-center py-2"
                >
                  {day + 1}
                </th>
              ))}
            </tr>
            <tr>
              {[...Array(getDaysInMonth(selectedMonth)).keys()].map((day) => (
                <>
                  <th key={day + 1} className="border-2 text-center px-6 py-3">
                    Hadir
                  </th>
                  <th key={day + 1} className="border-2 text-center px-6 py-3">
                    ijin
                  </th>
                  <th key={day + 1} className="border-2 text-center px-6 py-3">
                    Alfa
                  </th>
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
                            {absensi.attendanceStudent &&
                            absensi.attendanceStudent[day]?.status === 1
                              ? "✅"
                              : "-"}
                          </td>
                          <td key={day + 1} className="border-2 text-center">
                            {absensi.attendanceStudent &&
                            absensi.attendanceStudent[day]?.status === 2
                              ? "✅"
                              : "-"}
                          </td>
                          <td key={day + 1} className="border-2 text-center">
                            {absensi.attendanceStudent &&
                            absensi.attendanceStudent[day]?.status === 3
                              ? "✅"
                              : "-"}
                          </td>
                        </>
                      )
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={getDaysInMonth(selectedMonth) + 2}
                    className="text-center"
                  >
                    No data available
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* <span className="flex items-center gap-1">
            <div className="capitalize">halaman</div>
            <strong className="capitalize">
              {table.getState().pagination.pageIndex + 1} dari{" "}
              {table.getPageCount()}
            </strong>
          </span>

          <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-10 text-base">
              <li>
                <button
                  className="flex items-center justify-center px-4 h-9 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
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
              </li>
              <li>
                <button
                  className="flex items-center justify-center px-4 h-9 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white "
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
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
              </li>
              <li>
                <input
                  type="number"
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                  }}
                  className="flex items-center justify-center w-14 text-center h-9 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  placeholder="1"
                />
              </li>
              <li>
                <button
                  className="flex items-center justify-center px-4 h-9 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
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
              </li>
              <li>
                <button
                  className="flex items-center justify-center px-4 h-9 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
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
              </li>
            </ul>
          </nav> */}
        </div>
      </div>
    </div>
  );
};

export default TabelAbsensi;
