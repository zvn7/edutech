import { FileInput, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Pengumpulan } from "../../types/pengumpulan";

interface TabsTugasSiswaProps {
  isLoading: boolean;
  selectedCard: {
    id: string;
    assignmentDescription?: string;
    assignmentFileName?: string;
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
  dataSubmissions: {
    submissionTimeStatus?: string;
    grade?: string;
    comment?: string;
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
  formatDate,
}) => {
  const [activeTab, setActiveTab] = useState("Deskripsi");

  return (
    <div>
      <div className="bg-white">
        <nav className="flex flex-col sm:flex-row mb-2">
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

      {activeTab === "Deskripsi" && (
        <div className="p-4">
          <p>
            {isLoading
              ? "Memuat File ..."
              : selectedCard?.assignmentDescription}
          </p>

					<p className="mt-8 text-lg font-bold">Tugas</p>
					{selectedCard?.assignmentFileName ? (
						<div
							className="mt-2 flex justify-between items-center border rounded-lg shadow-sm p-3 gap-2 bg-[#E7F6FF]"
							onClick={() =>
								handleFileDownload(
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
										{isLoading
											? "Memuat File ..."
											: selectedCard.assignmentFileName}
									</p>
								</div>
							</div>
						</div>
					) : (
						<div className="mt-2 flex justify-between items-center border rounded-lg shadow-sm p-3 gap-2 bg-[#E7F6FF]">
							<div className="flex gap-3">
								<a
									href={selectedCard?.assignmentLink}
									className="hover:text-blue-500 hover:underline"
									target="_blank"
								>
									{isLoading ? "Memuat File ..." : selectedCard?.assignmentLink}
								</a>
							</div>
						</div>
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
                      : selectedCard.assignmentName}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">Jenis Pengumpulan</td>
                  <td className="px-6 py-4 float-end">
                    {isLoading
                      ? "Memuat File ..."
                      : selectedCard.typeOfSubmission === 1
                      ? "File"
                      : "Link"}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">Batas Pengumpulan</td>
                  <td className="px-6 py-4 float-end">
                    <div className="w-32 p-1 bg-orange-200 border-2 border-orange-400 rounded-2xl">
                      <h2 className="text-sm font-semibold text-center text-orange-500">
                        {isLoading
                          ? "Memuat File ..."
                          : formatDate(selectedCard.assignmentDeadline)}
                      </h2>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <form
              action=""
              onSubmit={handleSubmit(handleCreatePengumpulanSubmit)}
            >
              <input type="hidden" {...register("assignmentId")} />
              <p className="mt-4 font-bold text-md">Pengumpulan Tugas</p>
              <div className="p-1 mt-3 bg-orange-200 border-2 border-orange-400 rounded-2xl">
                <h2 className="p-2 text-sm font-semibold text-orange-500">
                  Mengumpulkan ataupun mengubah jawaban setelah deadline
                  berakhir akan dikenai pengurangan nilai
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
                Kirim
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
                      : formatDate(selectedCard?.assignmentDeadline)}
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
                    {dataSubmissions ? dataSubmissions.grade : "Belum Dinilai"}
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
  );
};

export default TabsTugasSiswa;
