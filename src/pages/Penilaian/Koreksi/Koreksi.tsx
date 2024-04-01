import { Link } from "react-router-dom";
import Navigation from "../../../component/Navigation/Navigation";
import { Card } from "flowbite-react";

const Koreksi = () => {
	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				<div className="mt-14">
					<Link to="/penilaian">
						<button className="mt-14 flex gap-2 items-center">
							<div className="bg-white p-2 rounded-full shadow-sm hover:bg-slate-300 hover:cursor-pointer">
								<svg
									className="w-7 h-7 text-blue-800 hover:text-white"
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
										d="M5 12h14M5 12l4-4m-4 4 4 4"
									/>
								</svg>
							</div>
							<h1 className="text-2xl font-bold capitalize">Kembali</h1>
						</button>
					</Link>
					{/* card */}
					<div className="bg-white p-5 rounded-2xl border flex-col gap-2 items-center shadow-lg mt-5">
						<p className="text-xl  font-bold">Form Penilaian</p>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mt-6">
							<Card className="max-w-auto bg-blue-100 border-0">
								<table>
									<tr>
										<td className="text-md text-gray-900 dark:text-white">
											Nama
										</td>
										<td className="text-md text-gray-900 dark:text-white">
											: Tono
										</td>
									</tr>
									<tr>
										<td className="text-md text-gray-900 dark:text-white">
											Tugas
										</td>
										<td className="text-md text-gray-900 dark:text-white">
											: Web
										</td>
									</tr>
									<tr>
										<td className="text-md text-gray-900 dark:text-white">
											Tanggal Pengumpulan
										</td>
										<td className="text-md text-gray-900 dark:text-white">
											: 09/09/2022
										</td>
									</tr>
									<tr>
										<td className="text-md text-gray-900 dark:text-white">
											Deadline
										</td>
										<td className="text-md text-gray-900 dark:text-white">
											: 10/09/2022
										</td>
									</tr>
								</table>
							</Card>
							<Card className="max-w-auto bg-blue-100 border-0">
								<div className="flex justify-between items-center">
									<div>
										<p className="text-md text-gray-900 dark:text-white">
											your_document.pdf
										</p>
										<button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">
											Download
										</button>
									</div>
									<svg
										className="w-24 h-24 text-blue-300"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											fill-rule="evenodd"
											d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z"
											clip-rule="evenodd"
										/>
										<path
											fill-rule="evenodd"
											d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
							</Card>
						</div>
						<div>
							<p className="text-lg mt-4 font-bold ">Review</p>
							<textarea
								className=" rounded-md h-24 shadow-md border-none w-1/2 bg-blue-100 border-0"
								placeholder="Masukkan review"
							/>
						</div>
						<div>
							<p className="text-lg mt-4 font-bold ">Nilai</p>
							<input
								type="number"
								className=" rounded-md shadow-md border-none w-1/2 bg-blue-100 border-0"
								placeholder="Masukkan Nilai"
							/>
						</div>
						<div className="flex mt-5 space-x-4">
							<button
								type="submit"
								className="flex w-20 items-center text-center justify-center  px-5 py-2.5  text-sm font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
							>
								Simpan
							</button>
							<button
								type="submit"
								className="flex w-20 items-center text-center justify-center  px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 capitalize"
							>
								batal
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Koreksi;
