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
  // const { data: dataClassrooms } = classroomQueries;
  const lessonQueries = useLessonsIds();
  const [iconVisible, setIconVisible] = useState(false);
  const { data: dataLessons } = lessonQueries;

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

  const setHandleIcon = () => {
    setIconVisible(!iconVisible);
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

    // Regular expression to check password criteria
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;

    if (!password) {
      e.target.setCustomValidity("Kata sandi tidak boleh kosong");
    } else if (!passwordRegex.test(password)) {
      e.target.setCustomValidity(
        "Kata sandi harus memenuhi kriteria berikut: minimal 8 karakter, maksimal 16 karakter, setidaknya satu huruf kecil, satu huruf besar, dan satu angka"
      );
    } else {
      e.target.setCustomValidity("");
    }
  };

  const createGuruMutation = useCreateUserGuru();
  const { register, setValue, handleSubmit, reset } = useForm<UserGuru>();
  const navigate = useNavigate();

  const handleCreateGuruSubmit: SubmitHandler<UserGuru> = (data) => {
    try {
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
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            const errors = error.response.data.errors;
            const errorMessage = Object.keys(errors)
              .map((key) => errors[key].join(", "))
              .join(", ");
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: errorMessage,
              confirmButtonText: "Ok",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: error.toString(),
              confirmButtonText: "Ok",
            });
          }
        },
      });
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessage = Object.values(error.response.data.errors)
          .flat()
          .join(", ");
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: errorMessage,
          confirmButtonText: "Ok",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.toString(),
          confirmButtonText: "Ok",
        });
      }
    }
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
        <button onClick={handleBtal} className="mt-14 flex gap-2 items-center">
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

                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-blue-700 capitalize"
                    >
                      username
                    </label>
                    <input
                      type="text"
                      value={formData.userName}
                      {...register("userName")}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Masukkan username"
                      required
                      onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity(
                          "username tidak boleh kosong"
                        )
                      }
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity("")
                      }
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
                        value={formData.password}
                        {...register("password")}
                        onChange={handleInputChange}
                        // onBlur={handlePasswordValidation}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="kata sandi"
                        required
                      />
                    </div>
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
                      placeholder="Masukkan tempat lahir"
                      required
                      onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.setCustomValidity(
                          "Tampat lahir tidak boleh kosong"
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
                      value={formData.birthDate}
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
                    <button
                      type="submit"
                      className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-2.5 rounded"
                      disabled={createGuruMutation.isPending}
                    >
                      {createGuruMutation.isPending ? (
                        <div className="text-center">
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        "Simpan"
                      )}
                    </button>

                    <button
                      onClick={handleBtal}
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
