import React, { useRef } from "react";
import Navigation from "../../component/Navigation/Navigation";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Tabs } from "flowbite-react";
import { Link } from "react-router-dom";

type Task = {
  namaSiswa: string;
  tugas: string;
  nilai: string;
  tanggalPengumpulan: string;
};

const defaultData: Task[] = [
  {
    namaSiswa: "John Doe",
    tugas: "Tugas 1",
    nilai: "80",
    tanggalPengumpulan: "2024-03-15",
  },
  {
    namaSiswa: "Jane Smith",
    tugas: "Tugas 2",
    nilai: "70",
    tanggalPengumpulan: "2024-03-16",
  },
  {
    namaSiswa: "Alice Johnson",
    tugas: "Tugas 3",
    nilai: "90",
    tanggalPengumpulan: "2024-03-17",
  },
];

const columnHelper = createColumnHelper<Task>();

const columns = [
  columnHelper.accessor("namaSiswa", {
    id: "index",
    header: () => "ID",
    cell: (info) => info.row.index + 1,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("namaSiswa", {
    header: "Nama Siswa",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("tugas", {
    header: "Tugas",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("tanggalPengumpulan", {
    header: "Tanggal Pengumpulan",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("nilai", {
    header: "Nilai",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("nilai", {
    header: "Aksi",
    footer: (info) => info.column.id,
    cell: () => (
      <Link to="/penilaian/koreksi">
        <button className="bg-blue-500 text-white  py-1 px-2 rounded">
          Koreksi
        </button>
      </Link>
    ),
  }),
];

const Penilaian = () => {
  const tabsRef = useRef(null);
  const tasksNotEvaluatedCount = 8;
  const [data, setData] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className=" mt-14">
          <h1 className="text-3xl font-bold capitalize">Penilaian</h1>
        </div>
        <div className="mt-4">
          <div className="bg-[#F5EBB6] p-3 rounded-2xl border-0 flex gap-2 items-center">
            <svg
              className="w-16 h-16 text-[#f0cc00]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                clip-rule="evenodd"
              />
            </svg>
            <div className="flex flex-col gap-1">
              <h2 className=" text-black font-semibold text-sm w-full">
                Terdapat beberapa siswa yang belum dilakukan penilaian
              </h2>
              <h2 className=" text-black font-semibold text-sm w-full">
                Pembuatan Flowchart - 6 Siswa belum di nilai
              </h2>
              <h2 className=" text-black font-semibold text-sm w-full">
                Segera lakukan penilaian
              </h2>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-4 flex items-center bg-white border border-gray-300 text-gray-900 text-sm rounded-lg w-full px-2.5">
            <label
              htmlFor="countries"
              className="text-gray-700 dark:text-white mr-4"
            >
              Tugas:
            </label>
            <select
              id="countries"
              className="border-none bg-transparent w-full focus:ring-0"
            >
              <option selected disabled hidden>
                Pilih Tugas
              </option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="mt-4 flex items-center bg-white border border-gray-300 text-gray-900 text-sm rounded-lg w-full px-2.5 ">
            <label
              htmlFor="countries"
              className="text-gray-700 dark:text-white mr-4"
            >
              Jurusan:
            </label>
            <select
              id="countries"
              className="border-none bg-transparent w-full focus:ring-0"
            >
              <option selected disabled hidden>
                Pilih Jurusan
              </option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-col gap-3">
            <Tabs aria-label="Default tabs" style="default" ref={tabsRef}>
              <Tabs.Item
                active
                title={
                  <span className="tab-title">
                    Tugas belum dinilai
                    <span className="count ml-4 bg-[#f8b5b5] py-1 px-3 text-lg rounded-full text-[#9c0808]">
                      {tasksNotEvaluatedCount}
                    </span>
                  </span>
                }
              >
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <th
                              key={header.id}
                              scope="col"
                              className="px-6 py-3"
                            >
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
                        <tr
                          key={row.id}
                          className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700`}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-6 py-4">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Tabs.Item>
              <Tabs.Item
                title={
                  <span className="tab-title">
                    Tugas sudah dinilai
                    <span className="count ml-4 bg-[#f8b5b5] py-1 px-3 text-lg rounded-full text-[#9c0808]">
                      {tasksNotEvaluatedCount}
                    </span>
                  </span>
                }
              >
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <th
                              key={header.id}
                              scope="col"
                              className="px-6 py-3"
                            >
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
                        <tr
                          key={row.id}
                          className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-6 py-4">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Tabs.Item>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Penilaian;
