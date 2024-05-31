import Navigation from "../../../component/Navigation/Navigation";
import { useUserLogin } from "../../../services/queries";

const ProfilSiswa = () => {
	const profileQuery = useUserLogin();

	const getClassName = (className: string) => {
		switch (className) {
			case "TKJ":
				return "Teknik Komputer Jaringan";
			case "RPL":
				return "Rekayasa Perangkat Lunak";
			case "TKR":
				return "Teknik Kendaraan Ringan";
			default:
				return className;
		}
	};

	const getGender = (gender: number) => {
		switch (gender) {
			case 1:
				return "Laki- Laki";
			case 2:
				return "Perempuan";
			default:
				return gender;
		}
	};

	const formatBirthDate = (birthDate: string): string => {
		const parts = birthDate.split("-");
		const year = parts[0];
		const month = parseInt(parts[1], 10);
		const date = parseInt(parts[2], 10);

		const months = [
			"Januari",
			"Februari",
			"Maret",
			"April",
			"Mei",
			"Juni",
			"Juli",
			"Agustus",
			"September",
			"Oktober",
			"November",
			"Desember",
		];

		return `${date} ${months[month - 1]} ${year}`;
	};

	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				<div className=" mt-14">
					<div
						className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
						role="alert"
					>
						<svg
							className="flex-shrink-0 inline w-5 h-5 me-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
						</svg>
						<div className="text-md">
							<span className="font-medium text-md">Informasi !</span> Jika ada
							kesalahan dalam penulisan data diri silahkan hubungi admin.
						</div>
					</div>
				</div>
				<div className="relative w-full h-auto border bg-white border-gray-200 rounded-lg shadow">
					{profileQuery[0].isLoading ? (
						<div className="bg-white border-b animate-pulse">
							<div className="flex flex-col items-center mt-4">
								<img
									className="w-24 h-24 mb-3 "
									src="/img/user.jpg"
									alt="Bonnie image"
								/>
								<h5 className="mb-1 text-xl font-medium text-gray-900 capitalize">
									<div className="h-2.5 bg-gray-600 rounded-full dark:bg-gray-700 mb-4" />
								</h5>
								<span className="text-sm text-gray-500 dark:text-gray-400 uppercase">
									<div className="h-2.5 bg-gray-600 rounded-full dark:bg-gray-700 mb-4" />
								</span>
							</div>
							<div className="p-4">
								<div>
									<table className="text-sm">
										<tbody>
											<tr>
												<td className="pl-6 pr-32  py-2 font-medium text-[16px] text-gray-900 capitalize">
													jurusan
												</td>
												<td className="px-1 py-2 text-[16px]">:</td>
												<td className="px-2 py-2 capitalize text-[16px]">
													<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
												</td>
											</tr>
											<tr>
												<td className="pl-6 py-2 font-medium text-[16px] text-gray-900 capitalize">
													Tempat, tanggal lahir
												</td>
												<td className="px-1 py-2 text-[16px]">:</td>
												<td className="px-2 py-2 capitalize text-[16px]">
													<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
												</td>
											</tr>
											<tr>
												<td className="pl-6 py-2 font-medium text-[16px] text-gray-900 capitalize">
													Jenis Kelamin
												</td>
												<td className="px-1 py-2 text-[16px]">:</td>
												<td className="px-2 py-2 capitalize text-[16px]">
													<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
												</td>
											</tr>
											<tr>
												<td className="pl-6 py-2 font-medium text-[16px] text-gray-900 capitalize">
													Nomor telepon
												</td>
												<td className="px-1 py-2 text-[16px]">:</td>
												<td className="px-2 py-2 capitalize text-[16px]">
													<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
												</td>
											</tr>
											<tr>
												<td
													rowSpan={10}
													className="pl-6  py-2 font-medium text-[16px] text-gray-900 capitalize"
												>
													alamat
												</td>
												<td rowSpan={10} className="px-1 py-2 text-[16px]">
													:
												</td>
												<td
													rowSpan={10}
													className="px-2 py-2 capitalize text-[16px]"
												>
													<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					) : (
						profileQuery[0].data && (
							<>
								<div className="flex flex-col items-center mt-4">
									<img
										className="w-24 h-24 mb-3 "
										src="/img/user.jpg"
										alt="Bonnie image"
									/>
									<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white capitalize">
										{profileQuery[0].isLoading ? (
											<div className="h-2.5 animate-pulse bg-gray-600 rounded-full dark:bg-gray-700 mb-4" />
										) : (
											profileQuery[0].data.nameStudent
										)}
									</h5>
									<span className="text-sm text-gray-500 dark:text-gray-400 uppercase">
										nis : {profileQuery[0].data.nis}
									</span>
								</div>
								<div className="p-4">
									<div className="w-full overflow-x-auto">
										<table className="text-sm border">
											<tbody>
												<tr>
													<td className="pl-6 pr-32 py-2 font-medium text-[16px] text-gray-900 capitalize">
														jurusan
													</td>
													<td className="px-1 py-2 text-[16px]">:</td>
													<td className="px-2 py-2 capitalize text-[16px]">
														{getClassName(profileQuery[0].data.className)}
													</td>
												</tr>
												<tr>
													<td className="pl-6 py-2 font-medium text-[16px] text-gray-900 capitalize">
														Tempat, tanggal lahir
													</td>
													<td className="px-1 py-2 text-[16px]">:</td>
													<td className="px-2 py-2 capitalize text-[16px]">
														{profileQuery[0].data.birthPlace},{" "}
														{formatBirthDate(
															profileQuery[0].data.birthDate ||
																"No birth date available"
														)}
													</td>
												</tr>
												<tr>
													<td className="pl-6  py-2 font-medium text-[16px] text-gray-900 capitalize">
														Jenis Kelamin
													</td>
													<td className="px-1 py-2 text-[16px]">:</td>
													<td className="px-2 py-2 capitalize text-[16px]">
														{getGender(profileQuery[0].data.gender)}
													</td>
												</tr>
												<tr>
													<td className="pl-6  py-2 font-medium text-[16px] text-gray-900 capitalize">
														Nomor telepon
													</td>
													<td className="px-1 py-2 text-[16px]">:</td>
													<td className="px-2 py-2 capitalize text-[16px]">
														{profileQuery[0].data.phoneNumber}
													</td>
												</tr>
												<tr>
													<td className="pl-6  py-2 font-medium text-[16px] text-gray-900 capitalize">
														alamat
													</td>
													<td className="px-1 py-2 text-[16px]">:</td>
													<td className="px-2 py-2 capitalize text-[16px]">
														{profileQuery[0].data.address}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default ProfilSiswa;
