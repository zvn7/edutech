import { useState } from "react";
import Navigation from "../../../component/Navigation/Navigation";
import { Tabs } from "flowbite-react";
import {
  FaComputer,
  FaNetworkWired,
  FaScrewdriverWrench,
} from "react-icons/fa6";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TabelAbsensi from "./TabelAbsensi";

type Absensi = {
  nama: string;
  tanggal: string;
  status: "hadir" | "alfa" | "izin"; // Tiga status baru
  kelas?: string;
};

const defaultData: Absensi[] = [
  {
    nama: "Ningsih",
    tanggal: "2022-01-01",
    status: "hadir",
  },
  {
    nama: "Ningsih",
    tanggal: "2022-01-01",
    status: "hadir",
  },
  {
    nama: "Ningsih",
    tanggal: "2022-01-01",
    status: "alfa",
  },
  {
    nama: "Ningsih",
    tanggal: "2022-01-01",
    status: "izin",
  },
];

const columnHelper = createColumnHelper<Absensi>();
const HasilAbsensiAdmin = () => {
  const [data, setData] = useState(() => [...defaultData]);

  // const handleStatusChange = (
  //   rowIndex: number,
  //   newStatus: "hadir" | "alfa" | "izin"
  // ) => {
  //   const newData = [...data];
  //   newData[rowIndex].status = newStatus;
  //   setData(newData);
  // };

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
    columnHelper.accessor("tanggal", {
      cell: (info) => info.getValue(),
      header: () => <span>Tanggal</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("status", {
      header: () => (
        <span>
          <div>keterangan</div>
        </span>
      ),
      cell: (info) => {
        const status = info.getValue();
        return (
          <div>
            {status === "hadir" && (
              <span className="bg-blue-200 text-blue-800 text-sm font-medium me-2 px-2 py-2 uppercase rounded-lg">
                hadir
              </span>
            )}
            {status === "alfa" && (
              <span className="bg-red-200 text-red-800 text-sm font-medium me-2 px-3 py-2 uppercase rounded-lg">
                alfa
              </span>
            )}
            {status === "izin" && (
              <span className="bg-yellow-200 text-yellow-800 text-sm font-medium me-2 px-4 py-2 uppercase rounded-lg">
                izin
              </span>
            )}
          </div>
        );
      },
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

  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
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
                    99{" "}
                    <span className="md:text-xl text-xs text-gray-600">
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
                    99{" "}
                    <span className="md:text-xl text-xs text-gray-600 capitalize">
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
                    99{" "}
                    <span className="md:text-xl text-xs text-gray-600 capitalize">
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
          <div className="flex items-center gap-4">
            {/* <label className="mb-2 text-lg font-semibold text-gray-900 uppercase">
              pilih kelas
            </label> */}
            <select
              id="countries"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 uppercase font-medium focus:ring-0"
            >
              <option selected>Pilih Kelas</option>
              <option value="US">Semua</option>
              <option value="CA">rpl</option>
              <option value="FR">tkj</option>
              <option value="DE">tkr</option>
            </select>
          </div>
          <div className="mt-6">
            <TabelAbsensi />
          </div>
          {/* <Tabs aria-label="Tabs with underline" style="underline">
            <Tabs.Item
              active
              title="Rekayasa Perangkat Lunak"
              icon={FaComputer}
            >
              <TabelAbsensi />
            </Tabs.Item>
            <Tabs.Item
              title="Teknik Komputer Dan Jaringan"
              icon={FaNetworkWired}
            >
              <TabelAbsensi />
            </Tabs.Item>
            <Tabs.Item
              title="Teknik Kendaraan Ringan"
              icon={FaScrewdriverWrench}
            >
              <TabelAbsensi />
            </Tabs.Item>
          </Tabs> */}
        </div>
      </div>
    </div>
  );
};

export default HasilAbsensiAdmin;
