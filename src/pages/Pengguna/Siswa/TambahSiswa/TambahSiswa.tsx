import { Fragment, useState } from "react";
import Navigation from "../../../../component/Navigation/Navigation";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCreateUserSiswa } from "../../../../services/mutation";
import { UserSiswa } from "../../../../types/user";
import Swal from "sweetalert2";
import { SubmitHandler, useForm } from "react-hook-form";

const TambahSiswa = () => {
  const [form, setForm] = useState({
    nameStudent: "",
    birthDate: "",
    birthPlace: "",
    address: "",
    phoneNumber: "",
    parentName: "",
    gender: 0,
    uniqueNumberOfClassRoom: "",
  });

  const handleInputChange = (e: any) => {
    const { value, name } = e.target;
    // Memastikan bahwa nomor telepon dimulai dengan angka 0
    if (name === "phoneNumber" && value.length === 1 && value !== "0") {
      return; // Mencegah input jika angka pertama bukan 0
    }
    if (name === "phoneNumber" && value.length > 15) {
      return;
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const createSiswaMutation = useCreateUserSiswa();

  const { register, handleSubmit, reset } = useForm<UserSiswa>();

  const navigate = useNavigate();
  const handleCreateSiswaSubmit: SubmitHandler<UserSiswa> = (data) => {
    createSiswaMutation.mutate(data, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "Siswa Berhasil ditambahkan!",
          text: "Siswa Berhasil ditambahkan!",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            reset();
            navigate("/pengguna-siswa");
          }
        });
      },
    });
  };

  const handleBatal = () => {
    Swal.fire({
      icon: "warning",
      title: "Peringatan",
      text: "Apakah Anda yakin ingin membatalkan?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/pengguna-siswa");
      }
    });
  };
  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <button className="mt-14 flex gap-2 items-center" onClick={handleBatal}>
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

        <div className="mt-6">
          <section className="bg-white rounded-lg">
            <div className="py-6 px-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900 capitalize">
                Tambah data siswa
              </h2>
              <form onSubmit={handleSubmit(handleCreateSiswaSubmit)}>
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
                      // name="nameStudent"
                      value={form.nameStudent}
                      {...register("nameStudent")}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 capitalize"
                      placeholder="Masukkan nama lengkap"
                      required
                      onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity(
                          "Nama Lengkap tidak boleh kosong"
                        )
                      }
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity("")
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-blue-700 capitalize  "
                    >
                      Nama Orangtua / wali
                    </label>
                    <input
                      type="text"
                      // name="parentName"
                      value={form.parentName}
                      {...register("parentName")}
                      onChange={handleInputChange}
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 capitalize"
                      placeholder="Masukkan Nama Orangtua / Wali"
                      required
                      onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity(
                          "Nama OrangTua / Wali tidak boleh kosong"
                        )
                      }
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity("")
                      }
                    />
                  </div>

                  {/* no telepon & jurusan */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      jenis kelamin
                    </label>
                    <select
                      // name="gender"
                      id="gender"
                      value={form.gender}
                      {...register("gender")}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 capitalize"
                      required
                      onInvalid={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        e.currentTarget.setCustomValidity(
                          "Pilih jenis kelamin tidak boleh kosong"
                        )
                      }
                      onInput={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        e.currentTarget.setCustomValidity("")
                      }
                    >
                      <option value="">pilih jenis kelamin</option>
                      <option value="1">Laki-laki</option>
                      <option value="2">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      jurusan
                    </label>
                    <select
                      // name="uniqueNumberOfClassRoom"
                      value={form.uniqueNumberOfClassRoom}
                      {...register("uniqueNumberOfClassRoom")}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 capitalize"
                      required
                      onInvalid={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        e.currentTarget.setCustomValidity(
                          "Pilih jurusan tidak boleh kosong"
                        )
                      }
                      onInput={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        e.currentTarget.setCustomValidity("")
                      }
                    >
                      <option value="">pilih jurusan</option>
                      <option value="001">TKJ</option>
                      <option value="002">TKR</option>
                      <option value="003">RPL</option>
                    </select>
                  </div>

                  {/* tempat & tgl lahir */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      tempat lahir
                    </label>
                    <input
                      type="text"
                      // name="birthPlace"
                      value={form.birthPlace}
                      {...register("birthPlace")}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Masukkan tempat lahir"
                      required
                      onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity(
                          "Tempat lahir tidak boleh kosong"
                        )
                      }
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity("")
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      tanggal lahir
                    </label>
                    <input
                      type="date"
                      // name="birthDate"
                      value={form.birthDate}
                      {...register("birthDate")}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="kata sandi"
                      required
                    />
                  </div>

                  {/* alamat & no tlp */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      nomor telepon
                    </label>
                    <input
                      type="number"
                      // name="phoneNumber"
                      value={form.phoneNumber}
                      {...register("phoneNumber")}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="masukkan nomor telepon"
                      required
                      onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity(
                          "Nomor telepon tidak boleh kosong"
                        )
                      }
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity("")
                      }
                    />
                    <span className="text-sm text-red-500">
                      * no.tlp mulai dari 0
                    </span>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      alamat
                    </label>
                    <textarea
                      // name="address"
                      value={form.address}
                      {...register("address")}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Masukkan alamat lengkap"
                      required
                      onInvalid={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        e.target.setCustomValidity("Alamat tidak boleh kosong")
                      }
                      onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        e.target.setCustomValidity("")
                      }
                    />
                  </div>

                  <div className="flex gap-2 items-center">
                    <input
                      type="submit"
                      className="w-30 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-2.5 rounded"
                      disabled={createSiswaMutation.isPending}
                      value={
                        createSiswaMutation.isPending
                          ? "Menyimpan..."
                          : "Simpan"
                      }
                    />
                    <button
                      onClick={handleBatal}
                      className="flex w-20 items-center text-center justify-center  px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 capitalize"
                    >
                      batal
                    </button>
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

export default TambahSiswa;
