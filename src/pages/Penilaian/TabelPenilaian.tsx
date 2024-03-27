import { useState } from "react";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";

type Nilai = {
	namaSiswa: string;
	tugas: string;
	nilai: string;
	tanggalPengumpulan: string;
};

const defaultData: Nilai[] = [
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

const columnHelper = createColumnHelper<Nilai>();

const TabelPenilaian = () => {
	const [data, setData] = useState(() => [...defaultData]);

	const columns = [
		columnHelper.accessor("nilai", {
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
			header: "Action",
			footer: (info) => info.column.id,
			cell: (info) => (
				<Link to="/penilaian/koreksi">
					<button className="bg-blue-500 text-white  py-1 px-2 rounded">
						Koreksi
					</button>
				</Link>
			),
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
								<option key={pageSize} value={pageSize}>
									{pageSize} data
								</option>
							))}
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
									placeholder="Cari jadwal disini..."
								/>
							</div>
						</div>
					</div>
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
		</>
	);
};

export default TabelPenilaian;
