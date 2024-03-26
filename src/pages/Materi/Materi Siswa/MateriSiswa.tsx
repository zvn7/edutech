import React, { useState, useEffect } from "react";
import Navigation from "../../../component/Navigation/Navigation";
import { Dropdown } from "flowbite-react";
import { Tabs } from "flowbite-react";

interface CardInfo {
	id: number;
	title: string;
	description: string;
	file: string;
}

const MateriSiswa = () => {
	const [selectedCard, setSelectedCard] = useState<number | null>(null); // State untuk menyimpan ID kartu yang dipilih
	const [isMobileView, setIsMobileView] = useState<boolean>(false); // State untuk menentukan apakah tampilan sedang pada mode mobile atau tidak

	// Data sampel untuk kartu
	const detailedCardInfo: CardInfo[] = [
		{
			id: 1,
			title: "Pemrograman Dasar",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			file: "pemrograman_dasar.pdf",
		},
		{
			id: 2,
			title: "Basic Pemrograman",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			file: "basic_pemrograman.pdf",
		},
	];

	useEffect(() => {
		const handleResize = () => {
			// Fungsi untuk menentukan apakah tampilan sedang pada mode mobile atau tidak
			setIsMobileView(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);

		// Pengecekan awal saat komponen dipasang
		handleResize();

		// Membersihkan event listener saat komponen di-unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Fungsi untuk menangani klik pada kartu
	const handleCardClick = (cardId: number) => {
		setSelectedCard(cardId);
	};

	// Fungsi untuk menutup modal
	const closeModal = () => {
		setSelectedCard(null);
	};

	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
					{/* left side */}
					<div>
						<div className=" mt-14 flex justify-between">
							<h1 className="text-3xl font-bold font-mono">Materi</h1>
							<Dropdown label="Mata Pelajaran" color="gray">
								<Dropdown.Item>Dashboard</Dropdown.Item>
								<Dropdown.Item>Settings</Dropdown.Item>
								<Dropdown.Item>Earnings</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item>Separated link</Dropdown.Item>
							</Dropdown>
						</div>

						<div className="mt-8 flex flex-col gap-3">
							{detailedCardInfo.map((card) => (
								<div
									key={card.id}
									className="cursor-pointer"
									onClick={() => handleCardClick(card.id)}
								>
									<div className="flex justify-between items-center border rounded-lg shadow-sm p-3 gap-2 bg-white">
										<div className="flex gap-3">
											<div className="bg-blue-100 rounded-lg h-14 flex items-center">
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
												<p className="text-lg font-semibold">{card.title}</p>
												<div className="flex flex-wrap gap-2 ">
													<div className="flex gap-1">
														<svg
															className="w-5 h-5 text-gray-800 dark:text-white"
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
														<span className="text-sm">01 Januari 2024</span>
													</div>
													<div className="flex gap-1">
														<svg
															className="w-5 h-5 text-gray-800 dark:text-white"
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
																d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
															/>
														</svg>
														<span className="text-sm">07:30 - 10:00</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* right side */}
					{selectedCard &&
						(isMobileView ? (
							<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
								<div className="bg-white p-4 rounded-lg w-full sm:max-w-md">
									<div className="flex justify-end">
										<button
											className="text-gray-500 hover:text-gray-700"
											onClick={closeModal}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
									<Tabs aria-label="Tabs with underline" style="underline">
										<Tabs.Item active title="Deskripsi">
											<p>{detailedCardInfo[selectedCard - 1].description}</p>
										</Tabs.Item>
										<Tabs.Item title="File">
											<div className="flex justify-between items-center border rounded-lg shadow-sm p-3 gap-2 bg-[#E7F6FF]">
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
													<div className="flex flex-col justify-center">
														<p className="text-lg font-semibold">
															{detailedCardInfo[selectedCard - 1].file}
														</p>
													</div>
												</div>
											</div>
										</Tabs.Item>
									</Tabs>
								</div>
							</div>
						) : (
							<div className="">
								<div className="border rounded-lg shadow-sm p-3 mt-14 bg-white">
									<div className="flex justify-end">
										<button
											className="text-gray-500 hover:text-gray-700"
											onClick={closeModal}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
									<Tabs aria-label="Tabs with underline" style="underline">
										<Tabs.Item active title="Deskripsi">
											<p>{detailedCardInfo[selectedCard - 1].description}</p>
										</Tabs.Item>
										<Tabs.Item title="File">
											<div className="flex justify-between items-center border rounded-lg shadow-sm p-3 gap-2 bg-[#E7F6FF]">
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
													<div className="flex flex-col justify-center">
														<p className="text-lg font-semibold">
															{detailedCardInfo[selectedCard - 1].file}
														</p>
													</div>
												</div>
											</div>
										</Tabs.Item>
									</Tabs>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default MateriSiswa;
