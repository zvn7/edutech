import { useState } from "react";

// Definisikan tipe untuk properti yang diterima oleh TabsMateriSiswa
interface TabsMateriSiswaProps {
	selectedCard: {
		description: string;
		linkCourse?: string;
		fileData?: any;
		id?: string;
		fileName?: string;
	};
	isLoading: boolean;
	handleFileDownload: (id: string, fileName: string) => void;
}

const TabsMateriSiswa: React.FC<TabsMateriSiswaProps> = ({
	selectedCard,
	isLoading,
	handleFileDownload,
}) => {
	const [activeTab, setActiveTab] = useState("Deskripsi");
	const [isDownLoading, setIsDownLoading] = useState(false);

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

	return (
		<div className="bg-white h-96 flex flex-col">
			<nav className="flex flex-row fixed-top bg-white">
				<button
					onClick={() => setActiveTab("Deskripsi")}
					className={`flex-1 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
						activeTab === "Deskripsi"
							? "border-b-2 font-medium border-blue-500"
							: ""
					}`}
				>
					Deskripsi
				</button>
				<button
					onClick={() => setActiveTab("Sumber")}
					className={`flex-1 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
						activeTab === "Sumber"
							? "border-b-2 font-medium border-blue-500"
							: ""
					}`}
				>
					Sumber
				</button>
			</nav>
			<div className="overflow-y-auto">
				{activeTab === "Deskripsi" && (
					<div className="p-4">
						<p className="text-gray-700">
							{isLoading ? "Memuat ..." : selectedCard.description}
						</p>
					</div>
				)}

				{activeTab === "Sumber" && (
					<div className="p-4">
						{selectedCard.linkCourse ? (
							<div className="w-full overflow-hidden">
								<table className="w-full text-sm text-left mb-4 text-gray-500 dark:text-gray-400">
									<tbody>
										<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
											<td className="px-6 py-4">Link</td>
											<td className="px-6 py-4">
												<a
													href={selectedCard.linkCourse}
													target="_blank"
													className="break-all hover:underline hover:text-blue-600"
												>
													{isLoading
														? "Memuat link..."
														: selectedCard.linkCourse.length > 50
														? `${selectedCard.linkCourse.slice(0, 50)}...`
														: selectedCard.linkCourse}
												</a>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						) : null}

						{selectedCard.fileData ? (
							<div
								className="flex justify-between items-center border rounded-lg shadow-sm p-3 gap-2 bg-[#E7F6FF]"
								onClick={() =>
									handleDownLoadClick(selectedCard.id, selectedCard.fileName)
								}
								style={{ cursor: "pointer" }}
							>
								<div className="flex gap-3">
									<div className="bg-white rounded-lg h-14 flex items-center">
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
									<div className="flex flex-col justify-center hover:text-blue-700">
										<p className="text-lg font-semibold">
											{isDownLoading
												? "Downloading File ..."
												: selectedCard.fileName}
										</p>
									</div>
								</div>
							</div>
						) : null}
					</div>
				)}
			</div>
		</div>
	);
};

export default TabsMateriSiswa;
