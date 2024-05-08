import { useState, useEffect } from "react";

import {
	useAssignmentsByTeacherId,
	useGetLessonByGuru,
	useListAssignment,
} from "../../services/queries";
import { Tabs } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { components } from "react-select";



const TabelPenilaian = () => {
	const [selectedLesson, setSelectedLesson] = useState(() => {
		return localStorage.getItem("selectedLesson") || "";
	});
	const [selectedAssignment, setSelectedAssignment] = useState(() => {
		return localStorage.getItem("selectedAssignment") || "";
	});
	const [pageSize, setPagesize] = useState(10);
	const [currentPage, setCurrentPage] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");

	// untuk belum dikumpulkan
	const [totalSize, setTotalSize] = useState(10);
	const [dataPage, setDataPage] = useState(0);

	const handlePageSizeChange = (event: any) => {
		setPagesize(event.target.value);
	};

	const handelTotalSizeChange = (event: any) => {
		setTotalSize(event.target.value);
	};

	const mapelQuery = useGetLessonByGuru();
	const { data: dataMapel, isLoading: mapelIsLoading } = mapelQuery;

	const tugasQuery = useAssignmentsByTeacherId();
	const { data: dataTugas, isLoading: tugasIsLoading } = tugasQuery;

	const assignmentQuery = useListAssignment(selectedLesson, selectedAssignment);
	const { data: assignmentData, isLoading: assignmentIsLoading } =
		assignmentQuery;

	const totalPages = Math.ceil(
		(assignmentData?.assignmentSubmissionList
			? assignmentData?.assignmentSubmissionList.length
			: 0) / pageSize
	);

	const dataTotal = Math.ceil(
		(assignmentData?.notYetSubmit ? assignmentData?.notYetSubmit.length : 0) /
			totalSize
	);

	const goToPreviousPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
		setDataPage((prevPage) => Math.max(prevPage - 1, 0));
	};

	const goToNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
		setDataPage((prevPage) => Math.min(prevPage + 1, dataTotal - 1));
	};

	const goToPage = (pageNumber: number) => {
		setCurrentPage(Math.max(0, Math.min(pageNumber, totalPages - 1)));
		setDataPage(Math.max(0, Math.min(pageNumber, dataTotal - 1)));
	};
	const handleLessonChange = (event: any) => {
		setSelectedLesson(event.target.value);
		localStorage.setItem("selectedLesson", event.target.value);
	};

	const handleAssignmentChange = (event: any) => {
		setSelectedAssignment(event.target.value);
		localStorage.setItem("selectedAssignment", event.target.value);
	};

	useEffect(() => {
		const lastSelectedLesson = localStorage.getItem("selectedLesson");
		if (lastSelectedLesson) {
			setSelectedLesson(lastSelectedLesson);
		}
		const lastSelectedAssignment = localStorage.getItem("selectedAssignment");
		if (lastSelectedAssignment) {
			setSelectedAssignment(lastSelectedAssignment);
		}
	}, []);

	const searchFilter = (pengumpulan: any) => {
		return pengumpulan.studentName
			?.toLowerCase()
			.includes(searchTerm.toLowerCase());
	};

	const searchFilterData = (penilaian: any) => {
		return (
			penilaian.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			penilaian.submissionTimeStatus
				?.toLowerCase()
				.includes(searchTerm.toLowerCase())
		);
	};
	return (
		<>
			<div className="grid grid-cols-2 gap-4 mt-4">
				<div className="bg-[#68b3f1] p-3 rounded-2xl flex gap-2 items-center">
					<svg
						className="w-8 h-8 text-white dark:text-white"
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
						<h2 className="w-full text-sm font-semibold text-white capitalize">
							Tugas Belum Dinilai
							<span className="ml-2 mr-2 underline">
								{assignmentData?.notAlreadyGrades}
							</span>
							siswa
						</h2>
					</div>
				</div>
				<div className="bg-[#68b3f1] p-3 rounded-2xl flex gap-2 items-center">
					<svg
						className="w-8 h-8 text-white dark:text-white"
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
						<h2 className="w-full text-sm font-semibold text-white capitalize">
							Tugas Sudah Dinilai
							<span className="ml-2 mr-2 underline">
								{assignmentData?.alreadyGrades}
							</span>
							siswa
						</h2>
					</div>
				</div>
			</div>
			<div className="mt-4">
				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<div className="bg-white shadow-md sm:rounded-lg">
						<div className="p-4">
							<div className="mt-4 flex items-center bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full px-2.5">
								<label htmlFor="countries" className="mr-4 text-gray-700">
									Mapel
									{/* <sup className="ml-1 text-red-500">*</sup> */}
								</label>
								<select
									id="countries"
									value={selectedLesson}
									onChange={handleLessonChange}
									className="w-full bg-transparent border-none"
								>
									<option selected>Pilih Mapel</option>
									{dataMapel?.map((item) => (
										<option value={item.lessonId}>{item.lessonName}</option>
									))}
								</select>
							</div>
							<div className="mt-4 flex items-center bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full px-2.5">
								<label
									htmlFor="countries"
									className="mr-4 text-gray-700 dark:text-white"
								>
									Tugas
									{/* <sup className="ml-1 text-red-500">*</sup> */}
								</label>
								<select
									id="countries"
									value={selectedAssignment}
									onChange={handleAssignmentChange}
									className="w-full bg-transparent border-none"
								>
									<option selected>Pilih Tugas</option>

									{dataTugas
										?.filter((lesson) => lesson.lessonId === selectedLesson)
										.map((assignment) => (
											<option
												key={assignment.assignmentId}
												value={assignment.assignmentId}
											>
												{assignment.assignmentName}
											</option>
										))}
								</select>
							</div>
						</div>
						<div className="p-4">
							<Tabs aria-label="Default tabs" style="default">
								<Tabs.Item
									active
									title="Sudah Mengumpulkan"
									icon={HiUserCircle}
								>
									<div className="flex justify-between gap-2 mb-4 mr-2">
										<div className="flex flex-wrap items-center gap-2">
											<select
												value={pageSize}
												onChange={handlePageSizeChange}
												className="p-1 capitalize border border-gray-300 rounded-lg bg-gray-50"
											>
												{[10, 20, 30, 40, 50].map((pageSize) => (
													<option key={pageSize} value={pageSize}>
														{pageSize} data
													</option>
												))}
											</select>

											<div className="flex items-center gap-2">
												<label htmlFor="table-search" className="sr-only">
													Search
												</label>
												<div className="relative">
													<div className="absolute inset-y-0 left-0 flex items-center pointer-events-none rtl:inset-r-0 rtl:right-0 ps-3">
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
														placeholder="Cari nama siswa & status pengumpulan disini"
														value={searchTerm}
														onChange={(e) => setSearchTerm(e.target.value)}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="relative overflow-x-auto">
										<table className="w-full text-left text-gray-500 uppertext-sm rtl:text-right dark:text-gray-400">
											<thead className="text-xs text-gray-900 uppercase bg-gray-100 ">
												<th className="px-6 py-3">no</th>
												<th className="px-6 py-3">nama siswa</th>
												<th className="px-6 py-3">tugas</th>
												<th className="px-6 py-3">tanggal pengumpulan</th>
												<th className="px-6 py-3">nilai</th>
												<th className="px-6 py-3 text-center">
													status pengumpulan
												</th>
												<th className="px-6 py-3 text-center">aksi</th>
											</thead>
											<tbody>
												{assignmentIsLoading ? (
													Array.from({ length: 5 }).map((_, index) => (
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
															<td className="px-6 py-4 font-normal text-gray-900 uppercase whitespace-nowrap">
																<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
															</td>
															<td className="px-6 py-4 font-normal text-gray-900 uppercase whitespace-nowrap">
																<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
															</td>
															<td className="px-6 py-4 font-normal text-gray-900 uppercase whitespace-nowrap">
																<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
															</td>
														</tr>
													))
												) : assignmentData &&
												  assignmentData.assignmentSubmissionList.length > 0 ? (
													assignmentData?.assignmentSubmissionList.filter(
														searchFilterData
													).length > 0 ? (
														assignmentData?.assignmentSubmissionList
															.filter(searchFilterData)
															.slice(
																currentPage * pageSize,
																(currentPage + 1) * pageSize
															)
															.map((submission, index) => (
																<tr className="bg-white border-b hover:bg-gray-50">
																	<td className="px-6 py-4 font-normal text-gray-900 capitalize whitespace-nowrap">
																		{index + 1}
																	</td>
																	<td className="px-6 py-4 font-normal text-gray-900 capitalize whitespace-nowrap">
																		{submission.studentName}
																	</td>
																	<td className="px-6 py-4 font-normal text-gray-900 capitalize whitespace-nowrap">
																		{submission.assignmentName}
																	</td>
																	<td className="px-6 py-4 font-normal text-gray-900 capitalize whitespace-nowrap">
																		{new Intl.DateTimeFormat("id-ID", {
																			day: "numeric",
																			month: "long",
																			year: "numeric",
																		}).format(
																			new Date(submission.submissionTime)
																		)}
																	</td>
																	<td className="px-6 py-4 font-normal text-gray-900 capitalize whitespace-nowrap">
																		{submission.grade === 0
																			? "-"
																			: submission.grade}
																	</td>
																	<td className="px-6 py-4 font-normal text-center text-gray-900 capitalize whitespace-nowrap">
																		<span
																			className={`text-xs font-medium me-2 px-2.5 py-1.5 rounded ${
																				submission.submissionTimeStatus ===
																				"Terlambat"
																					? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
																					: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
																			}`}
																		>
																			{submission.submissionTimeStatus ===
																			"Terlambat"
																				? "Terlambat"
																				: "Tepat Waktu"}
																		</span>
																	</td>
																	<td className="px-6 py-4 font-normal text-center text-gray-900 capitalize whitespace-nowrap">
																		<Link
																			to={`/penilaian/koreksi/${submission.id}`}
																		>
																			<button className="p-2 font-normal text-white bg-blue-500 rounded-lg">
																				koreksi
																			</button>
																		</Link>
																	</td>
																</tr>
															))
													) : (
														<tr>
															<td
																colSpan={6}
																className="py-4 text-center capitalize"
															>
																data tidak ditemukan
															</td>
														</tr>
													)
												) : assignmentData &&
												  Number(
														assignmentData.assignmentSubmissionList.length
												  ) === 0 ? (
													<tr>
														<td
															colSpan={6}
															className="py-4 text-center capitalize"
														>
															Belum ada data pengumpulan
														</td>
													</tr>
												) : (
													<>
														<tr>
															<td
																colSpan={6}
																className="py-4 text-center capitalize"
															>
																Tidak ada tugas dan mapel yang terpilih
															</td>
														</tr>
													</>
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
								</Tabs.Item>
								<Tabs.Item title="Belum Mengumpulkan" icon={MdDashboard}>
									<div className="flex justify-between gap-2 mb-4 mr-2">
										<div className="flex flex-wrap items-center gap-2">
											<select
												value={totalSize}
												onChange={handelTotalSizeChange}
												className="p-1 capitalize border border-gray-300 rounded-lg bg-gray-50"
											>
												{[10, 20, 30, 40, 50].map((totalSize) => (
													<option key={totalSize} value={totalSize}>
														{totalSize} data
													</option>
												))}
											</select>

											<div className="flex items-center gap-2">
												<label htmlFor="table-search" className="sr-only">
													Search
												</label>
												<div className="relative">
													<div className="absolute inset-y-0 left-0 flex items-center pointer-events-none rtl:inset-r-0 rtl:right-0 ps-3">
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
														placeholder="Cari nama siswa disini..."
														value={searchTerm}
														onChange={(e) => setSearchTerm(e.target.value)}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="relative overflow-x-auto">
										<table className="w-full text-left text-gray-500 uppertext-sm rtl:text-right dark:text-gray-400">
											<thead className="text-xs text-gray-900 uppercase bg-gray-100 ">
												<th className="px-6 py-3">no</th>
												<th className="px-6 py-3">nama siswa</th>
												<th className="px-6 py-3 text-center">tugas</th>
												<th className="px-6 py-3 text-center">
													tanggal pengumpulan
												</th>
											</thead>
											<tbody>
												{assignmentIsLoading ? (
													Array.from({ length: 5 }).map((_, index) => (
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
															<td className="px-6 py-4 font-normal text-gray-900 uppercase whitespace-nowrap">
																<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
															</td>
															<td className="px-6 py-4 font-normal text-gray-900 uppercase whitespace-nowrap">
																<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
															</td>
														</tr>
													))
												) : assignmentData &&
												  assignmentData?.studentNotYetSubmit.length > 0 ? (
													assignmentData?.studentNotYetSubmit.filter(
														searchFilter
													).length > 0 ? (
														assignmentData?.studentNotYetSubmit
															.filter(searchFilter)
															.slice(
																dataPage * totalSize,
																(dataPage + 1) * totalSize
															)
															.map((submission, index) => (
																<tr className="bg-white border-b hover:bg-gray-50">
																	<td className="px-6 py-4 font-normal text-gray-900 capitalize">
																		{index + 1}
																	</td>
																	<td className="px-6 py-4 font-normal text-gray-900 capitalize">
																		{submission.studentName}
																	</td>
																	<td className="px-6 py-4 font-normal text-center text-gray-900 capitalize whitespace-nowrap">
																		-
																	</td>
																	<td className="px-6 py-4 font-normal text-center text-gray-900 capitalize whitespace-nowrap">
																		-
																	</td>
																</tr>
															))
													) : (
														<tr>
															<td
																colSpan={6}
																className="py-4 text-center capitalize"
															>
																data tidak ditemukan
															</td>
														</tr>
													)
												) : assignmentData &&
												  Number(assignmentData?.studentNotYetSubmit.length) ===
														0 ? (
													<tr>
														<td
															colSpan={6}
															className="py-4 text-center capitalize"
														>
															Belum ada data pengumpulan
														</td>
													</tr>
												) : (
													<tr>
														<td
															colSpan={6}
															className="py-4 text-center capitalize"
														>
															Tidak ada tugas dan mapel yang terpilih
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
												{dataPage + 1} dari {dataTotal}
											</strong>
										</span>
										<div className="flex items-center gap-2">
											<button
												onClick={goToPreviousPage}
												disabled={dataPage === 0}
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
											{Array.from({ length: dataTotal }, (_, index) => (
												<button
													key={index}
													onClick={() => goToPage(index)}
													className={`mr-2 px-4 py-2 h-10 ${
														dataPage === index
															? "bg-blue-500 text-white"
															: "bg-gray-200 text-gray-800"
													} rounded`}
												>
													{index + 1}
												</button>
											))}
											<button
												onClick={goToNextPage}
												disabled={dataPage === dataTotal - 1}
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
								</Tabs.Item>
							</Tabs>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TabelPenilaian;
