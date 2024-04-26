import Navigation from "../../component/Navigation/Navigation";
import TabelPenilaian from "./TabelPenilaian";

const Penilaian = () => {
	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				<div className=" mt-14">
					<h1 className="text-3xl font-bold">Penilaian</h1>
				</div>
				<div className="mt-4">
					<div className="bg-[#F5EBB6] p-3 rounded-2xl flex gap-2 items-center">
						<svg
							className="w-16 h-16 text-[#f0cc00] dark:text-white"
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
					<div className="mt-4 flex items-center bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
						<label
							htmlFor="countries"
							className="text-gray-700 dark:text-white mr-4"
						>
							Jurusan:
						</label>
						<select
							id="countries"
							className="border-none bg-transparent w-full"
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
					<div className="mt-4 flex items-center bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
						<label
							htmlFor="countries"
							className="text-gray-700 dark:text-white mr-4"
						>
							Tugas:
						</label>
						<select
							id="countries"
							className="border-none bg-transparent w-full"
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
				</div>
				<div className="mt-4 grid grid-cols-2 gap-4">
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
							<h2 className="text-white font-semibold text-sm w-full">
								Tugas Belum Dinilai
								<span className="ml-4 underline">8 Siswa</span>
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
							<h2 className="text-white font-semibold text-sm w-full">
								Tugas Sudah Dinilai
								<span className="ml-4 underline">10 Siswa</span>
							</h2>
						</div>
					</div>
				</div>
				<div className="mt-4">
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
						<TabelPenilaian />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Penilaian;
