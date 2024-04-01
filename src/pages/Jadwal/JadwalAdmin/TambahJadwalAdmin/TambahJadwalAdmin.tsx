import Navigation from "../../../../component/Navigation/Navigation";
import { Link } from "react-router-dom";

const TambahJadwalAdmin = () => {
  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <Link to="/jadwal">
          <button className="mt-14 flex gap-2 items-center">
            <div className="bg-white p-2 rounded-full shadow-sm hover:bg-slate-300 hover:cursor-pointer">
              <svg
                className="w-7 h-7 text-blue-800 hover:text-white"
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
                  d="M5 12h14M5 12l4-4m-4 4 4 4"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold capitalize">kembali</h1>
          </button>
        </Link>

        <div className="mt-6">
          <section className="bg-white rounded-lg">
            <div className="py-6 px-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900 capitalize">
                Tambah Jadwal Pelajaran
              </h2>
              <form action="#">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-blue-700 capitalize"
                    >
                      Mata pelajaran
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                      placeholder="Masukkan Mata Pelajaran"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-blue-700 capitalize"
                    >
                      hari
                    </label>
                    <select
                      id="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 capitalize"
                    >
                      <option selected>Pilih hari</option>
                      <option value="senin">senin</option>
                      <option value="selasa">selasa</option>
                      <option value="rabu">rabu</option>
                      <option value="kamis">kamis</option>
                      <option value="jum'at">jum'at</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-blue-700 capitalize"
                    >
                      jam mulai
                    </label>
                    <input
                      type="time"
                      name="brand"
                      id="brand"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Jam Mulai"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-blue-700 capitalize"
                    >
                      Jam Selesai
                    </label>
                    <input
                      type="time"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Jam Selesai"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-blue-700"
                    >
                      Guru
                    </label>
                    <select
                      id="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 capitalize"
                    >
                      <option selected>pilih guru</option>
                      <option value="TV">saroh</option>
                      <option value="PC">muna</option>
                      <option value="GA">sarifudin</option>
                      <option value="PH">samsul</option>
                    </select>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      type="submit"
                      className="flex w-20 items-center text-center justify-center  px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 text-white capitalize"
                    >
                      simpan
                    </button>
                    <Link to="/jadwal">
                      <button
                        type="submit"
                        className="flex w-20 items-center text-center justify-center  px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 capitalize"
                      >
                        batal
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TambahJadwalAdmin;
