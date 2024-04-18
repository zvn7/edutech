import Navigation from "../../../component/Navigation/Navigation";
import TabelAbsensi from "./TabelAbsensi";

const HasilAbsensiAdmin = () => {
  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className="mt-16 flex">
          <div className="w-full h-full bg-white rounded-lg shadow-sm">
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 py-4">
              <div className="flex items-center justify-center md:gap-4 gap-2 border-e-2">
                <div className="bg-blue-200 rounded-full md:p-2 p-1">
                  <svg
                    className="md:w-9 md:h-9 lg:w-10 lg:h-10 h-6 w-6 text-blue-600 dark:text-white"
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
                      d="m5 12 4.7 4.5 9.3-9"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="md:text-xl text-xs font-bold capitalize">
                    99{" "}
                    <span className="md:text-xl text-xs text-gray-600">
                      siswa
                    </span>
                  </h2>
                  <p className="md:text-sm text-[8px] border-2 first:border-blue-200 text-center rounded-md capitalize font-bold text-blue-700">
                    hadir
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center md:gap-6 gap-2 border-e-2">
                <div className="bg-red-200 rounded-full md:p-2 p-1">
                  <svg
                    className="md:w-9 md:h-9 lg:w-10 lg:h-10 h-6 w-6 text-red-600"
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
                      d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="md:text-xl text-xs font-bold">
                    99{" "}
                    <span className="md:text-xl text-xs text-gray-600 capitalize">
                      siswa
                    </span>
                  </h2>
                  <p className="md:text-sm text-[8px] border-2  border-red-200 text-center rounded-md capitalize font-bold text-red-700">
                    alfa
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center md:gap-4 gap-2">
                <div className="bg-orange-200 rounded-full md:p-2 p-1">
                  <svg
                    className="md:w-9 md:h-9 lg:w-10 lg:h-10 h-6 w-6 text-orange-400 "
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
                      d="M10 11h2v5m-2 0h4m-2.6-8.5h0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="md:text-xl text-xs font-bold">
                    99{" "}
                    <span className="md:text-xl text-xs text-gray-600 capitalize">
                      siswa
                    </span>
                  </h2>
                  <p className="md:text-sm text-[8px] border-2 border-orange-200 text-center rounded-md capitalize font-bold text-orange-500">
                    izin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="mt-6">
            <TabelAbsensi />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HasilAbsensiAdmin;
