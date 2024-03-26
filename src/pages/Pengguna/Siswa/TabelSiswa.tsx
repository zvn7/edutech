import { useState } from "react";
import Navigation from "../../../component/Navigation/Navigation";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";

type Siswa = {
  nama: string;
  nis: number;
  jurusan: string;
  ttgl: string;
};
import { Button, Modal } from "flowbite-react";

const defaultData: Siswa[] = [
  {
    nama: "ningsih",
    nis: 30020801,
    jurusan: "Rekayasa Perangkat Lunak",
    ttgl: "Madiun, 02-12-2010",
  },
];

const columnHelper = createColumnHelper<Siswa>();

const TabelSiswa = () => {
  const [data, setData] = useState(() => [...defaultData]);
  const [openModal, setOpenModal] = useState(false);

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
    columnHelper.accessor("nis", {
      header: () => <span>nis</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("jurusan", {
      header: () => <span>Jurusan</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("ttgl", {
      header: () => <span>Tempat,tanggal lahir</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("ttgl", {
      header: "Aksi",
      footer: (info) => info.column.id,
      cell: () => {
        return (
          <Button.Group>
            <Button color="info" onClick={() => setOpenModal(true)}>
              Detail
            </Button>
            <Link to="/pengguna-siswa/edit-siswa">
              <Button color="warning" className="rounded-none">
                Edit
              </Button>
            </Link>
            <Button color="failure">Hapus</Button>
          </Button.Group>
        );
      },
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
  return (
    <>
      <div className="shadow-md sm:rounded-lg bg-white">
        <div className="p-2 ml-2 mr-2 pt-4 mb-3 flex gap-2 justify-between">
          <div className="flex gap-2 items-center flex-wrap">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="border border-gray-300 bg-gray-50 p-1 rounded-lg capitalize"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize} className="text-normal">
                  {pageSize} data
                </option>
              ))}
            </select>

            <select className="border border-gray-300 bg-gray-50 p-1 rounded-lg capitalize">
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
                  placeholder="Cari siswa disini..."
                />
              </div>
            </div>
          </div>
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
        <div className="relative overflow-x-auto">
          <table className="w-full uppertext-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-900 uppercase bg-gray-100 ">
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
                      className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize"
                    >
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
        <div className="flex items-center justify-between flex-wrap gap-2 p-4">
          <span className="flex items-center gap-1">
            <div className="capitalize">halaman</div>
            <strong className="capitalize">
              {table.getState().pagination.pageIndex + 1} dari{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <div className="flex gap-2 items-center">
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
      
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Detail siswa *nama siswa</Modal.Header>
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
                      ningsih, S.Pd
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      nis
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      30020801
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      Tempat, tanggal lahir
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      surabaya, 12 juni 1993
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      alamat
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      jln. jendral sudirman
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      Nomor telepon
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      +62 813 1234 5678
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      nama pengguna
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 text-[16px]">ningsih1234</td>
                  </tr>
                  <tr>
                    <td className="pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      jurusan
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 uppercase text-[16px]">tkr</td>
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

export default TabelSiswa;
