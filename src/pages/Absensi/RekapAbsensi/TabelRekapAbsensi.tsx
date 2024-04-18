import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";

type Absensi = {
  nama: string;
  tanggal?: string;
  status?: "hadir" | "alfa" | "izin"; // Tiga status baru
  kelas?: string;
};

const defaultData: Absensi[] = [
  {
    nama: "Ningsih",
  },
  {
    nama: "Ningsih",
  },
  {
    nama: "Ningsih",
  },
  {
    nama: "Ningsih",
  },
  {
    nama: "Ningsih",
  },
  {
    nama: "Ningsih",
  },
  {
    nama: "Ningsih",
  },
  {
    nama: "Ningsih",
  },
  {
    nama: "Ningsih",
  },
  {
    nama: "Ningsih",
  },
  {
    nama: "Ningsih",
  },
  {
    nama: "Ningsih",
  },
  {
    nama: "Ningsih",
  },
  {
    nama: "Ningsih",
  },
  {
    nama: "Ningsih",
  },
];

const columnHelper = createColumnHelper<Absensi>();

const TabelRekapAbsensi = () => {
  const [data, setData] = useState(() => [...defaultData]);
  const [selectedDate, setSelectedDate] = useState("");

  const handleStatusChange = (
    rowIndex: number,
    newStatus: "hadir" | "alfa" | "izin"
  ) => {
    const newData = [...data];
    newData[rowIndex].status = newStatus;
    setData(newData);
  };

  const columns = [
    columnHelper.accessor("nama", {
      id: "index",
      header: () => "NO",
      cell: (info) => info.row.index + 1,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("nama", {
      cell: (info) => info.getValue(),
      header: () => <span>Nama</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("status", {
      header: () => (
        <span>
          <div>Hadir</div>
        </span>
      ),
      cell: (info) => {
        const status = info.getValue();
        return (
          <div>
            <input
              id={`hadir-${info.row.index}`}
              type="radio"
              name={`status-${info.row.index}`}
              checked={status === "hadir"}
              onChange={() => handleStatusChange(info.row.index, "hadir")}
            />
          </div>
        );
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("status", {
      header: () => (
        <span>
          <div>Alfa</div>
        </span>
      ),
      cell: (info) => {
        const status = info.getValue();
        return (
          <div>
            <input
              id={`alfa-${info.row.index}`}
              type="radio"
              name={`status-${info.row.index}`}
              checked={status === "alfa"}
              onChange={() => handleStatusChange(info.row.index, "alfa")}
            />
          </div>
        );
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("status", {
      header: () => (
        <span>
          <div>Izin</div>
        </span>
      ),
      cell: (info) => {
        const status = info.getValue();
        return (
          <div>
            <input
              id={`izin-${info.row.index}`}
              type="radio"
              name={`status-${info.row.index}`}
              checked={status === "izin"}
              onChange={() => handleStatusChange(info.row.index, "izin")}
            />
          </div>
        );
      },
      footer: (info) => info.column.id,
    }),
  ];

  const getTwoDaysAgo = () => {
    const today = new Date();
    today.setDate(today.getDate() - 3);
    return today.toISOString().split("T")[0];
  };

  // Fungsi untuk mendapatkan tanggal hari ini dalam format yyyy-mm-dd
  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });
  return (
    <div className="shadow-md sm:rounded-lg bg-white">
      <div className="flex flex-column sm:flex-row flex-wrap items-center justify-between pt-2 pb-4 px-4">
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
            id="countries"
            className="border border-gray-300 bg-gray-50 p-1 rounded-lg capitalize"
          >
            <option value="">Pilih Kelas</option>
            <option value="US">Semua</option>
            <option value="CA">rpl</option>
            <option value="FR">tkj</option>
            <option value="DE">tkr</option>
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
        </div>
      </div>
      <div className="flex flex-column items-center gap-2 py-4 px-4">
        <label
          htmlFor="countries"
          className="block text-sm font-medium text-gray-900 capitalize"
        >
          tanggal
        </label>
        <input
          type="date"
          id="dateInput"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 "
          placeholder="Hari & Tanggal"
          value={selectedDate}
          min={getTwoDaysAgo()} // Tanggal minimum adalah dua hari yang lalu
          max={getToday()} // Tanggal maksimum adalah hari ini
          onChange={(e) => setSelectedDate(e.target.value)}
          required
        />
      </div>

      <div className="w-full max-h-80 overflow-y-auto">
        <table className="w-full h-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} scope="col" className="px-6 py-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-2 py-4 flex items-center justify-end">
        <div className="flex items-center">
          <button
            type="button"
            className="w-20 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2 capitalize"
          >
            simpan
          </button>
          <Link to="/data-abse">
            <button
              type="button"
              className="w-20 text-center mb-2 px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 capitalize"
            >
              batal
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TabelRekapAbsensi;
