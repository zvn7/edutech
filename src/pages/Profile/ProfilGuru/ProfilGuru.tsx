import Navigation from "../../../component/Navigation/Navigation";
import { useUserLogin } from "../../../services/queries";

const ProfilGuru = () => {
  const profileQuery = useUserLogin();
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
          <div className="bg-white h-full rounded-xl p-6 shadow-sm">
            <div className="w-full h-[150px] md:h-[170px] lg:h-[200px] rounded-2xl bg-custom-gradient relative z-10"></div>

            {profileQuery[0].isLoading ? (
              <>
                <div className="relative z-20 flex gap-6 animate-pulse">
                  <div className="relative -top-12 lg:-top-14 z-30 left-5 md:left-8 lg:left-10">
                    <div className="bg-white w-24 h-24 lg:w-28 lg:h-28 border rounded-md"></div>
                  </div>
                  <div className="ml-2 md:ml-6 lg:ml-8 mt-3">
                    <div className="w-40 h-2.5 bg-gray-200 rounded-full mb-4" />
                    <div className="w-32 h-2.5 bg-gray-200 rounded-full mb-4" />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="text-sm">
                    <tbody>
                      <tr>
                        <td
                          scope="row"
                          className="whitespace-nowrap px-3 py-4 font-medium text-[16px] text-gray-900 capitalize"
                        >
                          Nomor telepon
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 capitalize text-[16px]">
                          <div className="w-44 h-2.5 bg-gray-200 rounded-full mb-4" />
                        </td>
                      </tr>

                      <tr>
                        <td className="px-3 py-4 font-medium text-[16px] text-gray-900 capitalize">
                          Tempat, tanggal lahir
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 capitalize text-[16px]">
                          <div className="w-56 h-2.5 bg-gray-200 rounded-full mb-4" />
                        </td>
                      </tr>

                      <tr>
                        <td className="whitespace-nowrap px-3 py-4 font-medium text-[16px] text-gray-900 capitalize">
                          alamat
                        </td>
                        <td className="px-3 py-4 capitalize text-[16px]">
                          <div className="w-96 h-2.5 bg-gray-200 rounded-full mb-4" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              profileQuery[0].data && (
                <>
                  <div className="flex gap-6">
                    <div className="relative -top-12 lg:-top-14 z-20 left-5 md:left-8 lg:left-10">
                      <img
                        className="w-24 h-24 lg:w-28 lg:h-28 border rounded-md"
                        src="/img/user.jpg"
                        alt="user image"
                      />
                    </div>

                    <div className="ml-2 md:ml-6 lg:ml-8">
                      <h5 className="text-xl lg:text-2xl font-semibold capitalize">
                        {profileQuery[0].data.nameTeacher}
                      </h5>
                      <h5 className="text-sm md:text-base lg:text-lg text-gray-500 dark:text-gray-400 capitalize">
                        {profileQuery[0].data.nip}{" "}
                      </h5>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="text-sm">
                      <tbody>
                        <tr>
                          <td
                            scope="row"
                            className="whitespace-nowrap px-3 py-4 font-medium text-[16px] text-gray-900 capitalize"
                          >
                            Nomor telepon
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 capitalize text-[16px]">
                            {profileQuery[0].data.phoneNumber}
                          </td>
                        </tr>

                        <tr>
                          <td className="px-3 py-4 font-medium text-[16px] text-gray-900 capitalize">
                            Tempat, tanggal lahir
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 capitalize text-[16px]">
                            {profileQuery[0].data.birthPlace},{" "}
                            {formatBirthDate(
                              profileQuery[0].data.birthDate ||
                                "No birth date available"
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td className="whitespace-nowrap px-3 py-4 font-medium text-[16px] text-gray-900 capitalize">
                            alamat
                          </td>
                          <td className="px-3 py-4 capitalize text-[16px]">
                            {profileQuery[0].data.address}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilGuru;
