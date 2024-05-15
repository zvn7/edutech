import Navigation from "../../../component/Navigation/Navigation";
import { useUserLogin } from "../../../services/queries";

const ProfilGuru = () => {
  const profileQuery = useUserLogin();
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
				<div className="relative w-full h-[400px] bg-white border border-gray-200 rounded-lg shadow">
					{profileQuery[0].isLoading && (
						<div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 text-center">
							<div role="status">
								<svg
									aria-hidden="true"
									className="inline w-10 h-10 text-gray-200 animate-spin fill-blue-600"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="currentColor"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 66.2399328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentFill"
									/>
								</svg>
								<span className="sr-only">Loading...</span>
							</div>
						</div>
					)}
					{profileQuery[0].data && (
						<>
							<div className="flex flex-col items-center mt-4">
								<img
									className="w-24 h-24 mb-3 "
									src="/img/user.jpg"
									alt="Bonnie image"
								/>
								<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white capitalize">
									{profileQuery[0].data.nameTeacher}
								</h5>
								<span className="text-sm text-gray-500 dark:text-gray-400 uppercase">
									nip : {profileQuery[0].data.nip}
								</span>
							</div>
							<div className="p-4">
								<div>
									<table className="text-sm">
										<tbody>
											<tr>
												<td className="pl-6 pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
													Tempat, tanggal lahir
												</td>
												<td className="px-1 py-2 text-[16px]">:</td>
												<td className="px-2 py-2 capitalize text-[16px]">
													{profileQuery[0].data.birthPlace},{" "}
													{profileQuery[0].data.birthDate}
												</td>
											</tr>
											<tr>
												<td className="pl-6 pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
													alamat
												</td>
												<td className="px-1 py-2 text-[16px]">:</td>
												<td className="px-2 py-2 capitalize text-[16px]">
													{profileQuery[0].data.address}
												</td>
											</tr>
											<tr>
												<td className="pl-6 pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
													Nomor telepon
												</td>
												<td className="px-1 py-2 text-[16px]">:</td>
												<td className="px-2 py-2 capitalize text-[16px]">
													{profileQuery[0].data.phoneNumber}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProfilGuru;
