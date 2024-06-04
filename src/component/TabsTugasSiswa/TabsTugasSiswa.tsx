import { FileInput, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Pengumpulan } from "../../types/pengumpulan";
import { format } from "date-fns";

interface TabsTugasSiswaProps {
	isLoading: boolean;
	selectedCard: {
		id: string;
		assignmentDescription?: string;
		assignmentFileName?: string;
		assignmentFileData?: string;
		assignmentFilePath?: string;
		assignmentLink?: string;
		assignmentName?: string;
		assignmentDeadline?: string;
		assignmentSubmissionStatus?: string;
		typeOfSubmission?: number;
	} | null;
	handleFileDownload: (id: string, fileName: string) => void;
	handleSubmit: UseFormHandleSubmit<Pengumpulan>;
	handleCreatePengumpulanSubmit: (data: Pengumpulan) => void;
	handleOptionChange: (option: string) => void;
	selectedOption: string;
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	register: UseFormRegister<Pengumpulan>;
	dataSubmissions?: {
		submissionTimeStatus?: string | undefined;
		grade?: number | undefined;
		comment?: string | undefined;
	} | null;
	formatDate: (date: string) => string;
}

const TabsTugasSiswa: React.FC<TabsTugasSiswaProps> = ({
	isLoading,
	selectedCard,
	handleFileDownload,
	handleSubmit,
	handleCreatePengumpulanSubmit,
	handleOptionChange,
	selectedOption,
	handleFileChange,
	register,
	dataSubmissions,
}) => {
	const [activeTab, setActiveTab] = useState("Deskripsi");
	const [isDownLoading, setIsDownLoading] = useState(false);
	const [createLoading, setCreateLoading] = useState(false);
	const handleDownLoadClick = async (id: any, fileName: any) => {
		setIsDownLoading(true);
		try {
			await handleFileDownload(id, fileName);
		} catch (error) {
			console.log(error);
		} finally {
			setIsDownLoading(false);
		}
	};

	const handleCreateAssignment = async (assignmentId: any) => {
		setCreateLoading(true);
		try {
			await handleCreatePengumpulanSubmit(assignmentId);
		} catch (error) {
			console.log(error);
		} finally {
			setCreateLoading(false);
		}
	};

	const getFormattedDate = (date: any) => {
		return date
			? format(new Date(date), "d MMMM yyyy hh:mm a")
			: "Tanggal tidak tersedia";
	};

	return (
		<div>
			<div className="bg-white  flex flex-col">
				<nav className="flex flex-row fixed-top bg-white">
					<button
						onClick={() => setActiveTab("Deskripsi")}
						className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
							activeTab === "Deskripsi"
								? "border-b-2 font-medium border-blue-500"
								: ""
						}`}
					>
						Deskripsi
					</button>
					<button
						onClick={() => setActiveTab("Pengumpulan")}
						className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
							activeTab === "Pengumpulan"
								? "border-b-2 font-medium border-blue-500"
								: ""
						}`}
					>
						Pengumpulan
					</button>
					<button
						onClick={() => setActiveTab("Nilai")}
						className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
							activeTab === "Nilai"
								? "border-b-2 font-medium border-blue-500"
								: ""
						}`}
					>
						Nilai
					</button>
				</nav>
			</div>
			<div className="overflow-y-auto">
				{activeTab === "Deskripsi" && (
					<div className="p-4">
						<p>
							{isLoading
								? "Memuat File ..."
								: selectedCard?.assignmentDescription}
						</p>

						<p className="mt-8 text-lg font-bold">Tugas</p>
						{selectedCard ? (
							selectedCard.assignmentFilePath ? (
								<div
									className="mt-2 flex justify-between items-center border rounded-lg shadow-sm p-3 gap-2 bg-[#E7F6FF]"
									onClick={() =>
										handleDownLoadClick(
											selectedCard.id,
											selectedCard.assignmentFileName
										)
									}
									style={{ cursor: "pointer" }}
								>
									<div className="flex gap-3">
										<div className="flex items-center bg-white rounded-lg h-14">
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
										<div className="flex flex-col justify-center">
											<p className="text-lg font-semibold">
												{isDownLoading
													? "Download File ..."
													: selectedCard.assignmentFileName}
											</p>
										</div>
									</div>
								</div>
							) : (
								selectedCard.assignmentLink && (
									<div className="mt-2 flex justify-between items-center border rounded-lg shadow-sm p-3 gap-2 bg-[#E7F6FF]">
										<div className="flex gap-3">
											<a
												href={selectedCard.assignmentLink}
												className="hover:text-blue-500 hover:underline w-96 h-auto dark:text-white"
												target="_blank"
												rel="noopener noreferrer"
											>
												{isDownLoading
													? "Memuat Link ..."
													: selectedCard.assignmentLink.length > 40
													? `${selectedCard.assignmentLink.slice(0, 40)}...`
													: selectedCard.assignmentLink}
											</a>
										</div>
									</div>
								)
							)
						) : (
							<p>No assignment selected</p>
						)}
					</div>
				)}

				{activeTab === "Pengumpulan" && (
					<div className="p-4">
						<p className="font-bold text-lg">Informasi Pengumpulan</p>
						<div className="relative mt-4 overflow-x-auto">
							<table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
								<tbody>
									<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
										<td className="px-6 py-4">Judul Tugas</td>
										<td className="px-6 py-4 float-end">
											{isLoading
												? "Memuat File ..."
												: selectedCard?.assignmentName}
										</td>
									</tr>
									<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
										<td className="px-6 py-4">Jenis Pengumpulan</td>
										<td className="px-6 py-4 float-end">
											{isLoading
												? "Memuat File ..."
												: selectedCard?.typeOfSubmission === 1
												? "File"
												: "Link"}
										</td>
									</tr>
									<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
										<td className="px-6 py-4">Batas Pengumpulan</td>
										<td className="px-6 py-4 float-end">
											<div className="w-44 p-1 bg-orange-200 border-2 border-orange-400 rounded-2xl">
												<p className="text-sm font-semibold text-center text-orange-500">
													{isLoading
														? "Memuat File ..."
														: getFormattedDate(
																selectedCard?.assignmentDeadline
														  )}
												</p>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div>
							<form action="" onSubmit={handleSubmit(handleCreateAssignment)}>
								<input type="hidden" {...register("assignmentId")} />
								<p className="mt-4 font-bold text-md">Pengumpulan Tugas</p>
								<div className="p-1 mt-3 bg-orange-200 border-2 border-orange-400 rounded-2xl">
									<h2 className="p-2 text-sm font-semibold text-orange-500">
										Mengumpulkan jawaban setelah deadline berakhir akan mendapat
										pengurangan nilai
									</h2>
								</div>
								<div className="flex gap-5">
									<div
										className="flex items-center gap-2 mt-5"
										onClick={() => handleOptionChange("file")}
									>
										<input
											type="radio"
											id="file"
											name="submissionOption"
											value="file"
											checked={selectedOption === "file"}
										/>
										<label htmlFor="file">File</label>
									</div>
									<div
										className="flex items-center gap-2 mt-5"
										onClick={() => handleOptionChange("link")}
									>
										<input
											type="radio"
											id="link"
											name="submissionOption"
											value="link"
											checked={selectedOption === "link"}
										/>
										<label htmlFor="link">Link</label>
									</div>
								</div>
								{selectedOption === "file" && (
									<div id="fileUpload" className="mt-4">
										<FileInput
											id="fileData"
											{...register("fileData")}
											onChange={(e) => {
												handleFileChange(e);
											}}
										/>
									</div>
								)}
								{selectedOption === "link" && (
									<div id="linkInput" className="mt-4">
										<TextInput
											id="link"
											type="text"
											placeholder="Masukkan url atau link yang valid disini"
											{...register("link")}
										/>
									</div>
								)}
								<button
									type="submit"
									className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-32 ${
										selectedCard?.assignmentSubmissionStatus ===
										"Sudah mengerjakan"
											? "opacity-50 cursor-not-allowed"
											: selectedCard?.assignmentSubmissionStatus ===
											  "Sudah dinilai"
											? "opacity-50 cursor-not-allowed"
											: ""
									}`}
									disabled={
										selectedCard?.assignmentSubmissionStatus ===
										"Sudah mengerjakan"
											? true
											: selectedCard?.assignmentSubmissionStatus ===
											  "Sudah dinilai"
											? true
											: false
									}
								>
									{createLoading ? (
										<div className="text-center">
											<div role="status">
												<svg
													aria-hidden="true"
													className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
													viewBox="0 0 100 101"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
														fill="currentColor"
													/>
													<path
														d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
														fill="currentFill"
													/>
												</svg>
												<span className="sr-only">Loading...</span>
											</div>
										</div>
									) : (
										"Kirim"
									)}
								</button>
							</form>
						</div>
					</div>
				)}

				{activeTab === "Nilai" && (
					<div className="p-4">
						<p className="font-bold text-lg">Informasi Tugas</p>
						<div className="relative mt-4 overflow-x-auto sm:rounded-lg">
							<table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
								<tbody>
									<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
										<td className="px-6 py-4">Judul Tugas</td>
										<td className="px-6 py-4 float-end">
											{isLoading
												? "Memuat File ..."
												: selectedCard?.assignmentName}
										</td>
									</tr>
									<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
										<td className="px-6 py-4">Batas Pengumpulan</td>
										<td className="px-6 py-4 float-end">
											{isLoading
												? "Memuat File ..."
												: getFormattedDate(selectedCard?.assignmentDeadline)}
										</td>
									</tr>
									<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
										<td className="px-6 py-4">Status</td>
										<td className="px-6 py-4 float-end">
											{dataSubmissions
												? dataSubmissions.submissionTimeStatus
												: "-"}
										</td>
									</tr>
									<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
										<td className="px-6 py-4">Nilai</td>
										<td className="px-6 py-4 float-end">
											{dataSubmissions
												? dataSubmissions.grade
												: "Belum Dinilai"}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div>
							<p className="mt-4 font-bold text-md">Review Guru</p>
							<div className="p-1 mt-3 bg-orange-200 border-2 border-orange-400 rounded-2xl">
								<h2 className="p-2 text-sm font-semibold text-orange-500">
									{dataSubmissions ? dataSubmissions.comment : "-"}
								</h2>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default TabsTugasSiswa;
