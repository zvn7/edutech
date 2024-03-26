import Navigation from "../../../component/Navigation/Navigation";

const ProfilSiswa = () => {
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

        <div className="w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center mt-4">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white capitalize">
              Bonnie Green
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">
              nis : 3002028
            </span>
          </div>
          <div className="p-4">
            <div>
              <table className="text-sm">
                <tbody>
                  <tr>
                    <td className="pl-6 pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      jurusan
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      rekayasa perangkat lunak
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-6 pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      Tempat, tanggal lahir
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      surabaya, 12 juni 2002
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-6 pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      alamat
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      jln. jendral sudirman
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-6 pr-10 py-2 font-medium text-[16px] text-gray-900 capitalize">
                      Nomor telepon
                    </td>
                    <td className="px-1 py-2 text-[16px]">:</td>
                    <td className="px-2 py-2 capitalize text-[16px]">
                      +62 813 1234 5678
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilSiswa;
