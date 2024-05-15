import { useState } from "react";
import Navigation from "../../../../component/Navigation/Navigation";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useCreateUserGuru } from "../../../../services/mutation";
import { UserGuru } from "../../../../types/user";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useGetClassrooms, useLessonsIds } from "../../../../services/queries";

const TambahGuru = () => {
  const classroomQueries = useGetClassrooms();
  const { data: dataClassrooms } = classroomQueries;
  const lessonQueries = useLessonsIds();
  const { data: dataLessons } = lessonQueries;

  console.log(dataClassrooms);
  console.log(dataLessons);

  const option = dataLessons?.map((lesson) => ({
    value: lesson.lessonName,
    label: lesson.lessonName,
  }));

  const [formData, setFormData] = useState({
    status: "",
    nameTeacher: "",
    birthDate: "",
    birthPlace: "",
    address: "",
    phoneNumber: "",
    nip: "",
    gender: 0,
    userName: "",
    password: "",
    lessonNames: [],
    classNames: [],
  });

  const [formattedNip, setFormattedNip] = useState("");
  const handleInputChange = (e: any) => {
    const { value, name } = e.target;

    // Memastikan bahwa nomor telepon dimulai dengan angka 0
    if (name === "phoneNumber" && value.length === 1 && value !== "0") {
      return; // Mencegah input jika angka pertama bukan 0
    }
    if (name === "phoneNumber" && value.length > 13) {
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputNip = (e: any) => {
    const { value, name } = e.target;
    const inputValue = value.replace(/\D/g, "");

    // Menerapkan format spasi setelah 8 dan 14 karakter
    let formattedValue = "";
    for (let i = 0; i < inputValue.length; i++) {
      if (i === 8 || i === 14 || i === 15) {
        formattedValue += " ";
      }
      formattedValue += inputValue[i];
    }

    // Memperbarui nilai input yang sudah diformat
    setFormattedNip(formattedValue);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handlePasswordValidation = (e: any) => {
    const password = e.target.value;

    // Regex untuk memvalidasi bahwa password harus mengandung minimal satu huruf besar,
    // mengandung kata 'Edu', dan mengandung karakter '#'
    const passwordRegex = /^(?=.*[A-Z])(?=.*Edu)(?=.*[#]).{8,}$/;

    if (!passwordRegex.test(password)) {
      e.target.setCustomValidity(
        'Password harus mengandung minimal satu huruf besar, mengandung kata "Edu", dan mengandung karakter "#"'
      );
    } else {
      e.target.setCustomValidity("");
    }
  };

  const createGuruMutation = useCreateUserGuru();
  const { register, setValue, handleSubmit, reset } = useForm<UserGuru>();
  const navigate = useNavigate();

  const handleCreateGuruSubmit: SubmitHandler<UserGuru> = (data) => {
    createGuruMutation.mutate(data, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Guru Berhasil ditambahkan!",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            reset();
            navigate("/pengguna-guru");
          }
        });
      },

      onError: (error: any) => {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.toString(),
          confirmButtonText: "Ok",
        });
      },
    });
  };

  const handleBtal = () => {
    Swal.fire({
      icon: "warning",
      title: "Peringatan",
      text: "Apakah Anda yakin ingin membatalkan?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Lanjutkan",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/pengguna-guru");
      }
    });
  };

  const setHandleJurusanChange = (selectedOptions: any) => {
    // Mengonversi nilai selectedOptions ke format yang diharapkan oleh backend
    const selectedMapel = selectedOptions.map((option: any) => option.value);
    setValue("lessonNames", selectedMapel); // Mengatur nilai lessonNames dengan setValue
  };

  const getLessonOptions = () => {
    if (!dataLessons) return [];

    // Membuat opsi pelajaran dari dataLessons
    const lessonOptions = dataLessons.map((lesson) => ({
      value: lesson.lessonName,
      label: lesson.lessonName, // Hanya menampilkan lessonName dalam label
    }));

    return lessonOptions;
  };

  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <Link to="/pengguna-guru">
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
                Tambah data guru
              </h2>
              <form onSubmit={handleSubmit(handleCreateGuruSubmit)}>
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
                      value={formData.nameTeacher}
                      {...register("nameTeacher")}
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
                  {/* nip */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-blue-700 uppercase"
                    >
                      nip
                    </label>
                    <input
                      type="text"
                      value={formattedNip}
                      {...register("nip")}
                      onChange={handleInputNip}
                      name="nip"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 capitalize"
                      placeholder="Masukkan NIP"
                      required
                      minLength={17} // Set minimum length to accommodate for spaces
                      maxLength={21} // Maximum length with spaces
                      onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity("Nip tidak boleh kosong")
                      }
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity("")
                      }
                    />
                  </div>

                  {/* mapel & jurusan */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      Mata Pelajaran
                    </label>
                    <Select
                      {...register("lessonNames")}
                      onChange={setHandleJurusanChange}
                      options={getLessonOptions()}
                      isMulti
                      className="text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full capitalize"
                    />
                  </div>
                  {/* tempat & tgl lahir */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      tempat lahir
                    </label>
                    <input
                      type="text"
                      value={formData.birthPlace}
                      {...register("birthPlace")}
                      onChange={handleInputChange}
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
                      value={formData.birthDate}
                      {...register("birthDate")}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="kata sandi"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      Jenis kelamin
                    </label>
                    <select
                      id="gender"
                      value={formData.gender}
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
                  {/* alamat & no tlp */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      alamat
                    </label>
                    <textarea
                      value={formData.address}
                      {...register("address")}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Masukkan alamat lengkap"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                      nomor telepon
                    </label>
                    <input
                      type="number"
                      value={formData.phoneNumber}
                      {...register("phoneNumber")}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="masukkan nomor telepon"
                      required
                    />
                    <span className="text-gray-500 capitalize text-xs">
                      * nomor telepon diawali angka 0 dan max 13 angka
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="submit"
                      className="w-30 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-2.5 rounded"
                      disabled={createGuruMutation.isPending}
                      value={
                        createGuruMutation.isPending ? "Menyimpan..." : "Simpan"
                      }
                    />

                    <button
                      onClick={handleBtal}
                      type="submit"
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

export default TambahGuru;
