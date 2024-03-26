import { useState } from "react";
import Navigation from "../../component/Navigation/Navigation";
import { Modal, ModalBody, TextInput, Label } from "flowbite-react";

const Mapel = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [subject, setSubject] = useState("");

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSubject("");
	};

	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				<div className="mt-14 mb-4 flex justify-between">
					<h1 className="text-3xl font-bold font-mono">Mata Pelajaran</h1>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
						onClick={openModal}
					>
						<span>Tambah</span>
						<svg
							className="w-6 h-6 ml-2 text-white dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								fillRule="evenodd"
								d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
				<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
					{Array.from({ length: 15 }).map((_, index) => (
						<div
							key={index}
							className="bg-blue-100 rounded-md shadow-lg flex flex-col items-center text-center w-full h-28"
						>
							<svg
								className="w-16 h-16 text-gray-800 dark:text-white mt-4"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									fillRule="evenodd"
									d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z"
									clipRule="evenodd"
								/>
							</svg>
							<h2 className="text-lg font-bold mt-2 mb-4">Matematika</h2>
						</div>
					))}
				</div>
			</div>
			<Modal show={isModalOpen} size="md" onClose={closeModal} popup>
				<Modal.Header />
				<ModalBody>
					<div className="space-y-6">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Tambah Mata Pelajaran
						</h3>
						<div>
							<Label htmlFor="matapelajaran" className="mb-2 block">
								Mata Pelajaran
							</Label>
							<TextInput
								id="matapelajaran"
								type="text"
								placeholder="Nama Mata Pelajaran"
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
							/>
						</div>
						<div className="w-full mt-6">
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
								Tambah
							</button>
							<button
								className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full mt-2"
								onClick={closeModal}
							>
								Batal
							</button>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
};

export default Mapel;
