import { useState } from "react";
import Navigation from "../../../../component/Navigation/Navigation";
import { Link } from "react-router-dom";

const EditSiswa = () => {
  const [iconVisible, setIconVisible] = useState(false);
  const setHandleIcon = () => {
    setIconVisible(!iconVisible);
  };
  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <Link to="/pengguna-siswa">
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
            <h1 className="text-2xl font-bold capitalize">edit siswa</h1>
          </button>
        </Link>

        <div className="mt-6">
          <section className="bg-white rounded-lg">
            <div className="py-6 px-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900 capitalize">
                edit data siswa
              </h2>
              <form>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  {/* nama lengkap & nis */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-blue-700 capitalize"
                    >
                      nama lengkap
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 capitalize"
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-blue-700 uppercase"
                    >
                      nis
                    </label>
                    <input
                      type="number"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 capitalize"
                      placeholder="Masukkan NIS"
                      required
                    />
                  </div>

                  {/* username dan password */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      nama pengguna
                    </label>
                    <input
                      type="text"
                      name="brand"
                      id="brand"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Masukkan nama pengguna"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      kata sandi
                    </label>
                    <div className="relative ">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center ps-3.5">
                        <button
                          type="button"
                          onClick={setHandleIcon}
                          className="text-gray-400 focus:outline-none hover:text-gray-600"
                        >
                          {iconVisible ? (
                            <svg
                              className="w-6 h-6 text-gray-600 "
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-6 h-6 text-gray-600 "
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                              />
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <input
                        type={iconVisible ? "text" : "password"}
                        name="price"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="kata sandi"
                        required
                      />
                    </div>
                  </div>

                  {/* no telepon & jurusan */}

                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      jurusan
                    </label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 capitalize">
                      <option selected>pilih kelas</option>
                      <option value="tkr">TKR</option>
                      <option value="tkj">TKJ</option>
                      <option value="rpl">RPL</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      nomor telepon
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="masukkan nomor telepon"
                      required
                    />
                  </div>

                  {/* tempat & tgl lahir */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      tempat lahir
                    </label>
                    <input
                      type="text"
                      name="brand"
                      id="brand"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Masukkan nama pengguna"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      tanggal lahir
                    </label>
                    <input
                      type="date"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="kata sandi"
                      required
                    />
                  </div>

                  {/* alamat & no tlp */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      alamat
                    </label>
                    <textarea
                      name="brand"
                      id="brand"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Masukkan alamat lengkap"
                      required
                    />
                  </div>

                  <div className="flex gap-2 items-center">
                    <button
                      type="submit"
                      className="flex w-20 items-center text-center justify-center  px-5 py-2.5  text-sm font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
                    >
                      simpan
                    </button>
                    <Link to="/pengguna-siswa">
                      <button
                        type="submit"
                        className="flex w-20 items-center text-center justify-center  px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 capitalize"
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

export default EditSiswa;
