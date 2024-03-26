import { useState } from "react";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Absensi = {
  nama: string;
  tanggal: Date;
  status: "hadir" | "alfa" | "izin"; // Tiga status baru
  kelas?: string;
};

const defaultData: Absensi[] = [
  {
    nama: "Ningsih",
    tanggal: new Date("2022-01-01"),
    status: "hadir",
    kelas: "XII A",
  },
  {
    nama: "siska",
    tanggal: new Date("2022-01-01"),
    status: "alfa",
    kelas: "XII A",
  },
  {
    nama: "fuad",
    tanggal: new Date("2022-01-01"),
    status: "izin",
    kelas: "XII A",
  },
  {
    nama: "ningsih",
    tanggal: new Date("2022-01-02"),
    status: "hadir",
    kelas: "XII A",
  },
  {
    nama: "siska",
    tanggal: new Date("2022-01-02"),
    status: "alfa",
    kelas: "XII A",
  },
  {
    nama: "fuad",
    tanggal: new Date("2022-01-02"),
    status: "izin",
    kelas: "XII A",
  },
];

const columnHelper = createColumnHelper<Absensi>();

const TabelAbsensi = () => {
  const [data, setData] = useState(() => [...defaultData]);
  const [selectedMonth, setSelectedMonth] = useState<string>("januari");

  const columns = [
    columnHelper.accessor("nama", {
      id: "index",
      header: () => "NO",
      cell: (info) => info.row.index + 1,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("nama", {
      cell: (info) => info.getValue(),
      header: () => <span>Nama Lengkap</span>,
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const [state, setState] = useState(table.initialState);

  // Override the state managers for the table to your own
  table.setOptions((prev) => ({
    ...prev,
    state,
    onStateChange: setState,

    debugTable: state.pagination.pageIndex > 2,
  }));

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

  return (
    <div className="shadow-md sm:rounded-lg bg-white">
      <div className="flex flex-column sm:flex-row flex-wrap items-center justify-between pt-3 pb-4 px-4 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="border border-gray-300 bg-gray-50 p-1 rounded-lg capitalize"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} data
              </option>
            ))}
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
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    rowSpan={3}
                    key={header.id}
                    className="sticky left-0 bg-gray-100 border-2 px-6 py-3 text-center"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}

                <th
                  colSpan={getDaysInMonth(selectedMonth)}
                  className="border-2 px-2 py-2 pl-20"
                >
                  Tanggal
                </th>
              </tr>
            ))}
            <tr>
              {[...Array(getDaysInMonth(selectedMonth)).keys()].map((day) => (
                <th key={day + 1} className="border-2 text-center py-2">
                  {day + 1}
                </th>
              ))}
            </tr>
            <tr>
              {[...Array(getDaysInMonth(selectedMonth)).keys()].map((day) => (
                <th key={day + 1} className="border-2">
                  <td className="border-e-2 px-4 py-2">H</td>
                  <td className="border-e-2 px-4 py-2">A</td>
                  <td className="border-0 px-4 py-2">I</td>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="sticky left-0 bg-white border-e-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                {[...Array(getDaysInMonth(selectedMonth)).keys()].map((day) => (
                  <td key={day + 1} className="border-2 text-center">
                    {data.some(
                      (item) =>
                        item.tanggal === row.original.tanggal &&
                        item.status === "hadir" &&
                        new Date(item.tanggal).getDate() === day + 1
                    ) ? (
                      <td className="border-e-2 px-2 py-4">
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
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
                            d="M5 11.917 9.724 16.5 19 7.5"
                          />
                        </svg>
                      </td>
                    ) : (
                      <td className="border-e-2 px-5 py-4 text-xl"></td>
                    )}
                    {data.some(
                      (item) =>
                        item.tanggal === row.original.tanggal &&
                        item.status === "alfa" &&
                        new Date(item.tanggal).getDate() === day + 1
                    ) ? (
                      <td className="border-e-2 px-2 py-4">
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
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
                            d="M5 11.917 9.724 16.5 19 7.5"
                          />
                        </svg>
                      </td>
                    ) : (
                      <td className="border-e-2 px-5 py-4"></td>
                    )}
                    {data.some(
                      (item) =>
                        item.tanggal === row.original.tanggal &&
                        item.status === "izin" &&
                        new Date(item.tanggal).getDate() === day + 1
                    ) ? (
                      <td className="border-0 px-2 py-4">
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
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
                            d="M5 11.917 9.724 16.5 19 7.5"
                          />
                        </svg>
                      </td>
                    ) : (
                      <td className="border-0 px- py-4"></td>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-1">
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
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TabelAbsensi;
