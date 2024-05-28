import { Link } from "react-router-dom";
import Navigation from "../../../component/Navigation/Navigation";
import { Table } from "flowbite-react";
import {
	useAssignments,
	useAttendances,
	useAttendancesIds,
	useCourseClassroom,
} from "../../../services/queries";

const BerandaSiswa = () => {
	const assignmentsIdsQuery = useAssignments();
	const { data: dataTugas, isLoading: isLoadingTugas } = assignmentsIdsQuery;

	const courseClassroom = useCourseClassroom();
	const { data: formData, isLoading: isDataLoading } = courseClassroom;

	const attendancesIdsQuery = useAttendancesIds();
	const attendancesIds = attendancesIdsQuery.data?.map(Number) ?? [];
	const attendancesQueries = useAttendances(attendancesIds);

	const getNameStudentFromToken = (): string | null => {
		const token = localStorage.getItem("token");
		if (token) {
			const payload = token.split(".")[1];
			const decodedPayload = JSON.parse(atob(payload));
			return decodedPayload?.NameStudent || null;
		}
		return null;
	};

	const nameStudent = getNameStudentFromToken();

	const formatDate = (dateString: any) => {
		try {
			const parsedDate = new Date(dateString);
			// Periksa apakah parsedDate adalah waktu yang valid
			if (isNaN(parsedDate.getTime())) {
				// Jika parsedDate tidak valid, kembalikan string "Invalid Date"
				return "Invalid Date";
			}
			const options = { day: "numeric", month: "long", year: "numeric" };
			const dateFormatter = new Intl.DateTimeFormat("id-ID", options);
			return dateFormatter.format(parsedDate);
		} catch (error) {
			console.error("Error formatting date:", error);
			// Jika terjadi kesalahan dalam pemformatan, kembalikan string kosong
			return "";
		}
	};

	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				<div className=" mt-14">
					<h1 className="font-mono text-3xl font-bold">Beranda</h1>
					<h3 className="mt-3 font-sans text-lg font-semibold capitalize">
						Selamat Datang, {nameStudent}
					</h3>
					<p className="capitalize text-stone-500">
						Yuk, temukan pengetahuan baru hari ini! 📚
					</p>
				</div>
				<div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-1 lg:grid-cols-2">
					<div>
						{/* materi terbaru */}
						<div className="flex flex-col gap-3">
							<h1 className="mb-3 text-xl font-bold">Materi Terbaru</h1>

							{isDataLoading
								? Array.from({ length: 5 }).map((_, index) => (
										<div
											key={index}
											className="flex items-center shadow-sm p-3 gap-2 bg-white mb-2 rounded-lg animate-pulse"
										>
											<div className="flex gap-3">
												<div className="bg-blue-100 rounded-lg h-14 w-14"></div>
												<div className="flex flex-col space-y-2">
													<div className="bg-gray-200 h-4 w-40 rounded"></div>
													<div className="bg-gray-200 h-4 w-48 rounded"></div>
													<div className="bg-gray-200 h-4 w-32 rounded"></div>
												</div>
											</div>
										</div>
								  ))
								: formData?.slice(0, 5).map((course) => (
										<div key={course.id} className="cursor-pointer">
											<div className="flex items-center rounded-lg shadow-sm p-3 gap-2 bg-white mb-2 hover:bg-[#fdefc8]">
												<div className="flex gap-3">
													<div className="flex items-center bg-blue-100 rounded-lg h-14">
														<svg
															className="w-12 h-12 text-blue-600 dark:text-white"
															aria-hidden="true"
															xmlns="http://www.w3.org/2000/svg"
															fill="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																fillRule="evenodd"
																d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2c.6 0 1-.4 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
																clipRule="evenodd"
															/>
														</svg>
													</div>
													<div className="flex flex-col">
														<p className="text-sm text-gray-500 capitalize">
															{course.lessonName}
														</p>
														<p className="font-semibold text-gray-900 text-md">
															{course.courseName}
														</p>
														<p className="text-sm text-gray-500 capitalize">
															{course.nameTeacher}
														</p>
													</div>
												</div>
											</div>
										</div>
								  ))}

							<Link
								to="/materi-siswa"
								className="p-2 text-blue-700 bg-white rounded hover:bg-gray-200 hover:text-blue-500"
							>
								Selengkapnya...
							</Link>
						</div>
						{/* tugas */}
						<div className="flex flex-col gap-3 mt-8">
							<h1 className="mb-3 text-xl font-bold">Daftar Tugas</h1>
							{isLoadingTugas
								? Array.from({ length: 5 }).map((_, index) => (
										<div
											key={index}
											className="flex items-center shadow-sm p-3 gap-2 bg-white mb-2 rounded-lg animate-pulse"
										>
											<div className="flex gap-3">
												<div className="bg-blue-100 rounded-lg h-14 w-14"></div>
												<div className="flex flex-col space-y-2">
													<div className="bg-gray-200 h-4 w-40 rounded"></div>
													<div className="bg-gray-200 h-4 w-48 rounded"></div>
													<div className="bg-gray-200 h-4 w-32 rounded"></div>
												</div>
											</div>
										</div>
								  ))
								: dataTugas?.slice(0, 5).map((item) => (
										<div
											key={item?.id}
											className="flex flex-col gap-3 cursor-pointer"
										>
											<div className="flex justify-between items-center bg-white rounded-lg shadow-sm p-3 gap-2 hover:bg-[#fdefc8]">
												<div className="flex gap-3">
													<div className="flex items-center bg-blue-100 rounded-lg h-14">
														<svg
															className="w-12 h-12 text-blue-600 dark:text-white"
															aria-hidden="true"
															xmlns="http://www.w3.org/2000/svg"
															fill="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																fillRule="evenodd"
																d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm-.3 9.3c.4.4.4 1 0 1.4L9.4 14l1.3 1.3a1 1 0 0 1-1.4 1.4l-2-2a1 1 0 0 1 0-1.4l2-2a1 1 0 0 1 1.4 0Zm2.6 1.4a1 1 0 0 1 1.4-1.4l2 2c.4.4.4 1 0 1.4l-2 2a1 1 0 0 1-1.4-1.4l1.3-1.3-1.3-1.3Z"
																clipRule="evenodd"
															/>
														</svg>
													</div>
													<div className="flex flex-col">
														<p className="text-sm font-normal text-gray-500">
															{item?.lessonName}
														</p>
														<h2 className="font-medium text-md">
															{item?.assignmentName}
														</h2>
														<div className="flex flex-wrap gap-2 ">
															<div className="flex gap-1">
																<svg
																	className="w-5 h-5 text-gray-500"
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
																		d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
																	/>
																</svg>
																<span className="text-sm text-gray-500">
																	{formatDate(item?.assignmentDate)}
																</span>
															</div>
														</div>
													</div>
												</div>
												<span className="bg-orange-200 text-orange-500 text-xs w-32 md:w-24 md:sm font-medium px-1 py-1 md:px-1.5 md:py-1.5 rounded-full text-center border border-orange-500 capitalize">
													{item?.assignmentSubmissionStatus}
												</span>
											</div>
										</div>
								  ))}
							<Link
								to="/tugas-siswa"
								className="p-2 text-blue-700 bg-white rounded hover:bg-gray-200 hover:text-blue-500"
							>
								Selengkapnya...
							</Link>
						</div>
					</div>
					{/* tabel kehadiran */}
					<div>
						<h1 className="mb-5 font-sans text-xl font-bold">
							Daftar kehadiran
						</h1>
						{attendancesQueries.map((query, index) => {
							if (index === 0) {
								return (
									<div key={index}>
										{query.isLoading && (
											<div>
												<table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
													<thead className="bg-gray-200">
														<tr>
															<th
																scope="col"
																className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
															>
																<div className="w-full h-[20px] bg-gray-300 animate-pulse rounded-lg"></div>
															</th>
															<th
																scope="col"
																className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
															>
																<div className="w-full h-[20px] bg-gray-300 animate-pulse rounded-lg"></div>
															</th>
														</tr>
													</thead>
													<tbody className="bg-white divide-y divide-gray-200">
														{Array.from({ length: 3 }).map((_, i) => (
															<tr key={i}>
																<td className="px-6 py-4 whitespace-nowrap">
																	<div className="w-full h-[20px] bg-gray-300 animate-pulse rounded-lg"></div>
																</td>
																<td className="px-6 py-4 whitespace-nowrap">
																	<div className="w-full h-[20px] bg-gray-300 animate-pulse rounded-lg"></div>
																</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										)}
										{query.isError && <div>Error fetching data</div>}
										{query.isSuccess && query.data && (
											<Table>
												<Table.Head>
													<Table.HeadCell className="text-black bg-gray-200">
														Tanggal
													</Table.HeadCell>
													<Table.HeadCell className="text-black bg-gray-200">
														Status
													</Table.HeadCell>
												</Table.Head>
												<Table.Body className="divide-y">
													{((query.data as unknown as any[]) || []).length >
													0 ? (
														((query.data as unknown as any[]) || [])
															.slice(0, 5)
															.map((attendance) => (
																<Table.Row
																	key={attendance.id}
																	className="bg-white dark:border-gray-700 dark:bg-gray-800"
																>
																	<Table.Cell className="font-medium text-gray-900">
																		{formatDate(attendance.date)}
																	</Table.Cell>

																	<Table.Cell>
																		<span
																			className={`text-base font-medium text-center me-2 px-2.5 py-0.5 rounded capitalize ${(() => {
																				switch (attendance.status) {
																					case 1:
																						return "bg-blue-100 text-blue-800";
																					case 2:
																						return "bg-yellow-100 text-yellow-600";
																					case 3:
																						return "bg-red-100 text-red-800";
																					default:
																						return "";
																				}
																			})()}`}
																		>
																			{(() => {
																				switch (attendance.status) {
																					case 1:
																						return "Hadir";
																					case 2:
																						return "Izin";
																					case 3:
																						return "Alfa";
																					default:
																						return "";
																				}
																			})()}
																		</span>
																	</Table.Cell>
																</Table.Row>
															))
													) : (
														<td
															colSpan={6}
															className="py-4 text-center capitalize"
														>
															Data belum tersedia.
														</td>
													)}
												</Table.Body>
											</Table>
										)}
									</div>
								);
							}
							return null;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BerandaSiswa;
