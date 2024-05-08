import Navigation from "../../../component/Navigation/Navigation";
import { Button, FileInput, TextInput, Textarea } from "flowbite-react"; // Import Modal component
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  useCourseById,
  useGetMapelByGuru,
  useLessonsIds,
  useTeacherinfo,
} from "../../../services/queries";
import Select from "react-select";
import { useCreateMateri } from "../../../services/mutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { IMateriGuru, UploadMateri } from "../../../types/materi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MateriGuru = ({ id }: { id: string }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState("file");
  const [selectedCardDescription, setSelectedCardDescription] = useState("");
  const [isMobileModalOpenAdd, setisMobileModalOpenAdd] = useState(false);
  const [isMobileModalOpenEdit, setisMobileModalOpenEdit] = useState(false);
  const [isTabletModalOpenAdd, setisTabletModalOpenAdd] = useState(false);
  const [isTabletModalOpenEdit, setisTabletModalOpenEdit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedMapel, setSelectedMapel] = useState([]);
  const teacherinfo = useTeacherinfo();
  const { data: formData } = teacherinfo;

  const [formUpdate, setFormUpdate] = useState({
    courseName: "",
    description: "",
    fileData: "",
    linkCourse: "",
    lessonName: "",
    fileName: "",
  });
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth <= 768);
      setIsTablet(windowWidth > 768 && windowWidth <= 1024);
    };

    handleResize(); // Panggil fungsi handleResize saat komponen dimuat agar state 'isMobile' dan 'isTablet' dapat diatur dengan benar

    window.addEventListener("resize", handleResize); // Tambahkan event listener untuk memantau perubahan ukuran layar

    return () => {
      window.removeEventListener("resize", handleResize); // Bersihkan event listener saat komponen di-unmount
    };
  }, []);

  const handleShowAddForm = () => {
    if (showEditForm) {
      Swal.fire({
        title: "Anda yakin ingin meninggalkan halaman?",
        text: "Perubahan yang Anda buat mungkin tidak disimpan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, lanjutkan",
        cancelButtonText: "Tidak, batalkan",
      }).then((result) => {
        if (result.isConfirmed) {
          setShowEditForm(false);
          setShowAddForm(true);
        }
      });
    } else {
      setShowAddForm(!showAddForm);
    }
  };

  const handleShowEditForm = (id: string) => {
    // Jika sedang menampilkan form tambah
    if (showAddForm) {
      // Tampilkan SweetAlert untuk konfirmasi
      Swal.fire({
        title: "Anda yakin ingin meninggalkan halaman?",
        text: "Perubahan yang Anda buat mungkin tidak disimpan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, lanjutkan",
        cancelButtonText: "Tidak, batalkan",
      }).then((result) => {
        if (result.isConfirmed) {
          // Tutup form tambah jika dikonfirmasi
          setShowAddForm(false);
          // Tampilkan form edit
          setShowEditForm(true);
          setSelectedCourse(id);
          console.log("selected id", id);
        }
      });
    } else {
      // Jika sedang menampilkan form edit
      if (showEditForm) {
        // Tampilkan SweetAlert untuk konfirmasi
        Swal.fire({
          title: "Anda yakin ingin meninggalkan halaman?",
          text: "Perubahan yang Anda buat mungkin tidak disimpan.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, lanjutkan",
          cancelButtonText: "Tidak, batalkan",
        }).then((result) => {
          if (result.isConfirmed) {
            // Tampilkan form edit
            setShowEditForm(true);
            setSelectedCourse(id);
            console.log("selected id", id);
          }
        });
      } else {
        // Tampilkan form edit jika tidak sedang menampilkan form tambah
        getDataAndShowEditForm(id);
      }
    }
  };

  const getDataAndShowEditForm = async (id: string) => {
    try {
      const response = await axios.get(
        `http://192.168.66.239:13311/api/Courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setFormUpdate({
        ...formUpdate,
        courseName: response.data.courseName || "",
        lessonName: response.data.lessonName || "",
        description: response.data.description || "",
        linkCourse: response.data.linkCourse || "",
      });
      setSelectedLesson(response.data.lessonName);
      setShowEditForm(true);
      setSelectedCourse(id);
      console.log("selected id", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseForms = () => {
    if (showAddForm || showEditForm) {
      Swal.fire({
        title: "Anda yakin ingin meninggalkan halaman?",
        text: "Perubahan yang Anda buat mungkin tidak disimpan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, lanjutkan",
        cancelButtonText: "Tidak, batalkan",
      }).then((result) => {
        if (result.isConfirmed) {
          setShowAddForm(false);
          setShowEditForm(false);
        }
      });
    } else {
      setShowAddForm(false);
      setShowEditForm(false);
    }
  };

  const handleShowModalAddFormMobile = () => {
    setisMobileModalOpenAdd(true);
    setisMobileModalOpenEdit(false);
  };

  const handleShowModalEditFormMobile = (id: string) => {
    setSelectedCourse(id);
    setisMobileModalOpenEdit(true);
    setisMobileModalOpenAdd(false);
  };

  const handleCloseModalFormMobile = () => {
    if (isMobileModalOpenAdd || isMobileModalOpenEdit) {
      Swal.fire({
        title: "Anda yakin ingin meninggalkan halaman?",
        text: "Perubahan yang Anda buat mungkin tidak disimpan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, lanjutkan",
        cancelButtonText: "Tidak, batalkan",
      }).then((result) => {
        if (result.isConfirmed) {
          setisMobileModalOpenAdd(false);
          setisMobileModalOpenEdit(false);
        }
      });
    } else {
      setisMobileModalOpenAdd(false);
      setisMobileModalOpenEdit(false);
    }
  };

  const handleCloseModalFormTablet = () => {
    if (isTabletModalOpenAdd || isTabletModalOpenEdit) {
      Swal.fire({
        title: "Anda yakin ingin meninggalkan halaman?",
        text: "Perubahan yang Anda buat mungkin tidak disimpan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, lanjutkan",
        cancelButtonText: "Tidak, batalkan",
      }).then((result) => {
        if (result.isConfirmed) {
          setisTabletModalOpenAdd(false);
          setisTabletModalOpenEdit(false);
        }
      });
    } else {
      setisTabletModalOpenAdd(false);
      setisTabletModalOpenEdit(false);
    }
  };

  const handleShowModalAddFormTablet = () => {
    setisTabletModalOpenAdd(true);
    setisTabletModalOpenEdit(false);
  };

  const handleShowModalEditFormTablet = (id: string) => {
    setSelectedCourse(id);
    console.log("selectedCourse", selectedCourse);

    setisTabletModalOpenEdit(true);
    setisTabletModalOpenAdd(false);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const [form, setForm] = useState({
    CourseName: "",
    Description: "",
    FileData: "",
    LinkCourse: "",
    LessonName: "",
    TeacherId: "",
  });

  const [selectedLesson, setSelectedLesson] = useState("semua");

  const handleInputChange = (e: any) => {
    const { value, name } = e.target;
    setFormUpdate({
      ...formUpdate,
      [name]: value,
    });
    console.log("data form", form);
  };

  const createMateri = useCreateMateri();
  const { register, handleSubmit, setValue, reset } = useForm<UploadMateri>();

  const navigate = useNavigate();

  const handleCreateMateriSubmit: SubmitHandler<UploadMateri> = (data) => {
    createMateri.mutate(data, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Materi Berhasil ditambahkan!",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            setShowAddForm(false);
            reset();
            setForm({
              CourseName: "",
              Description: "",
              FileData: "",
              LinkCourse: "",
              LessonName: "",
              TeacherId: "",
            });

            setSelectedMapel([]);
            navigate("/materi-guru");
          }
        });
      },
    });
  };

  const queryMapel = useGetMapelByGuru();
  const { data: dataMapel } = queryMapel;

  const filteredData: IMateriGuru[] =
    selectedLesson === "semua"
      ? formData || []
      : (formData || []).filter(
          (materi) => materi.lessonName === selectedLesson
        );

  const mapelOption = dataMapel?.map((mapel) => ({
    value: mapel.lessonName,
    label: mapel.lessonName,
  }));

  const handleMapelChange = (e: any) => {
    setSelectedMapel(
      e.map((option: any) => ({
        value: option.value as string,
        label: option.label as string,
      }))
    );

    setValue(
      "LessonName",
      e.map((option: any) => option.label)
    );
  };

  const handleLessonChange = (e: any) => {
    setSelectedLesson(e.target.value);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const searchFilter = (lesson: any) => {
    return (
      lesson.courseName &&
      lesson.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const [loading, setLoading] = useState(false);

  // const { data: dataCourse } = useCourseById(selectedCourse ?? "");

  const { data: dataCourse } = useCourseById(selectedCourse ?? "");

  const handleSubmitEdit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `http://192.168.66.239:13311/api/Courses/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Materi Berhasil diperbarui!",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          setShowEditForm(false);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputEditChange = (e: any) => {
    const { value, name } = e.target;
    setFormUpdate({
      ...formUpdate,
      [name]: value,
    });
  };

  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {/* left side */}
          <div>
            <div className="mt-16 flex justify-between items-center">
              <h1 className="text-3xl font-bold capitalize">Materi</h1>
              <select
                value={selectedLesson}
                onChange={handleLessonChange}
                className="border border-gray-300 bg-white p-1 rounded-lg capitalize"
              >
                <option selected>semua</option>
                {dataMapel?.map((item) => (
                  <option value={item.lessonName}>{item.lessonName}</option>
                ))}
              </select>
            </div>
            <div
              className="overflow-y-auto overflow-clip max-h-[calc(100vh-195px)]"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="mt-8 flex flex-col gap-3 ">
                {filteredData.filter(searchFilter).length > 0 ? (
                  filteredData.filter(searchFilter).map((card) => (
                    <div key={card.id} className="cursor-pointer">
                      <div className="flex justify-between items-center  rounded-lg shadow-sm p-3 gap-2 bg-white">
                        <div className="flex gap-3">
                          <div className="bg-blue-100 rounded-lg h-14 flex items-center">
                            <svg
                              className="w-12 h-12 text-blue-600 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2c.6 0 1-.4 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm capitalize text-gray-500">
                              {card.lessonName}
                            </p>
                            <p className="text-base font-medium capitalize">
                              {card.courseName}
                            </p>
                            <p className="text-sm capitalize text-gray-500">
                              {card.longClassName}
                            </p>
                          </div>
                        </div>
                        <Button
                          color="warning"
                          onClick={
                            isMobile
                              ? () => handleShowModalEditFormMobile(card.id)
                              : isTablet
                              ? () => handleShowModalEditFormTablet(card.id)
                              : () => handleShowEditForm(card.id)
                          }
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400">
                    Tidak ada hasil pencarian yang sesuai.
                  </p>
                )}

                {filteredData.length === 0 && searchTerm.length === 0 && (
                  <p className="text-center text-gray-400">
                    Tidak ada data yang sesuai dengan pilihan pelajaran yang
                    dipilih.
                  </p>
                )}

                {/* {filteredData.length === 0 && searchTerm.length > 0 && (
								<p className="text-center text-gray-400">
									Tidak ada hasil pencarian yang sesuai.
								</p>
							)} */}
              </div>
            </div>
          </div>
          {/* right side */}
          {showAddForm && (
            <div className="fixed right-4 top-6 w-2/5 h-screen overflow-y-auto pb-16">
              <div className="border rounded-lg shadow-sm p-3 mt-14 bg-white">
                <div className="flex justify-between">
                  <p className="text-gray-500 text-xl font-bold">
                    Upload Materi
                  </p>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={handleCloseForms}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit(handleCreateMateriSubmit)}>
                  <hr className="my-3" />
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-blue-700 capitalize"
                    >
                      nama materi
                    </label>
                    <input
                      type="text"
                      // value={form.CourseName}

                      {...register(`CourseName`, { required: true })}
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
                  <p className="mt-2">Mata Pelajaran</p>
                  <select
                    {...register("LessonName")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Pilih Mata Pelajaran</option>
                    {dataMapel &&
                      dataMapel.map((mapel) => (
                        <option key={mapel.id} value={mapel.id}>
                          {mapel.lessonName}
                        </option>
                      ))}
                  </select>

                  <p className="mt-2">Deskripsi</p>
                  <textarea
                    className="mt-2bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 capitalize"
                    id="Description"
                    {...register(`Description`, { required: true })}
                    onChange={handleInputChange}
                    placeholder="Masukkan deskripsi tugas disini..."
                    required
                    rows={4}
                  />

                  {/* Modul */}
                  <p className="mt-2">Modul</p>
                  <div className=" flex gap-5">
                    <div
                      className="flex items-center gap-2 mt-5"
                      onClick={() => handleOptionChange("file")}
                    >
                      <input
                        type="radio"
                        id="file"
                        name="submissionOption"
                        value="file"
                        checked={selectedOption === "file"}
                      />
                      <label htmlFor="file">File</label>
                    </div>
                    <div
                      className="flex items-center gap-2 mt-5"
                      onClick={() => handleOptionChange("link")}
                    >
                      <input
                        type="radio"
                        id="link"
                        name="submissionOption"
                        value="link"
                        checked={selectedOption === "link"}
                      />
                      <label htmlFor="link">Link</label>
                    </div>
                  </div>

                  {/* File atau link input */}
                  {selectedOption === "file" && (
                    <div id="fileUpload" className="mt-4">
                      <FileInput id="file" />
                    </div>
                  )}
                  {selectedOption === "link" && (
                    <div id="linkInput" className="mt-4">
                      <TextInput
                        id="link"
                        type="text"
                        {...register("LinkCourse")}
                        onChange={handleInputChange}
                        placeholder="Masukkan url atau link yang valid disini"
                      />
                    </div>
                  )}

                  {/* Tombol submit */}
                  <input
                    type="submit"
                    disabled={createMateri.isPending}
                    value={createMateri.isPending ? "Menyimpan..." : "Simpan"}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
                  />
                </form>
              </div>
            </div>
          )}
          {showEditForm && (
            <div>
              <div className="border rounded-lg shadow-sm p-3 mt-14 bg-white">
                <div className="flex justify-between">
                  <p className="text-gray-500 text-xl font-bold">Edit Materi</p>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={handleCloseForms}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <hr className="my-3" />
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-blue-700 capitalize"
                  >
                    nama materi
                  </label>
                  <input
                    type="text"
                    name="courseName"
                    value={formUpdate.courseName}
                    onChange={handleInputEditChange}
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
                <p className="mt-2">Mata Pelajaran</p>
                <Select
                  isMulti
                  name="lessonName"
                  value={selectedMapel}
                  onChange={handleMapelChange}
                  options={mapelOption}
                  className="react-select-container mt-2"
                  classNamePrefix="react-select"
                />

                <p className="mt-2">Deskripsi</p>
                <textarea
                  className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Masukkan deskripsi tugas disini..."
                  required
                  rows={4}
                  name="description"
                  value={formUpdate.description}
                  onChange={handleInputEditChange}
                />

                <p className="mt-2">Modul</p>
                <div className=" flex gap-5">
                  <div
                    className="flex items-center gap-2 mt-5"
                    onClick={() => handleOptionChange("file")}
                  >
                    <input
                      type="radio"
                      id="file"
                      name="submissionOption"
                      value="file"
                      checked={selectedOption === "file"}
                    />
                    <label htmlFor="file">File</label>
                  </div>
                  <div
                    className="flex items-center gap-2 mt-5"
                    onClick={() => handleOptionChange("link")}
                  >
                    <input
                      type="radio"
                      id="link"
                      name="submissionOption"
                      value="link"
                      checked={selectedOption === "link"}
                    />
                    <label htmlFor="link">Link</label>
                  </div>
                </div>
                {selectedOption === "file" && (
                  <div id="fileUpload" className="mt-4">
                    <FileInput id="file" />
                  </div>
                )}
                {selectedOption === "link" && (
                  <div id="linkInput" className="mt-4">
                    <TextInput
                      id="link"
                      type="text"
                      placeholder="Masukkan url atau link yang valid disini"
                      required
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="flex w-20 items-center text-center justify-center  px-5 py-2.5  text-sm font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
                  disabled={loading}
                  onClick={handleSubmitEdit}
                >
                  {loading ? (
                    <svg
                      className="animate-spin w-5 h-5 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.585l-2.829 2.829zm0 8.446a8.045 8.045 0 01-2.38-2.38l2.38-2.83v5.21zM12 20.528a7.995 7.995 0 01-4-.943v-3.585L9.172 16.7c.258.258.563.465.896.605zm4-1.947l2.829-2.83 2.83 2.83-2.83 2.83v-5.22a8.045 8.045 0 01-2.38 2.38zm2.39-8.38L19.528 12h-5.21l2.83-2.829 2.83 2.829zM12 5.473V1.548A8.045 8.045 0 0115.473 4.39L12 7.863zm-2.829-.707L7.17 4.39A8.045 8.045 0 0110.39 1.548l-1.219 1.218zm1.219 13.123l-1.22 1.219a8.045 8.045 0 012.38 2.38l1.22-1.22zM16.832 16.7l1.219 1.22a8.045 8.045 0 012.38-2.38l-1.218-1.219z"
                      ></path>
                    </svg>
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </div>
          )}
          {isMobileModalOpenAdd && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
              <div className="bg-white p-4 rounded-lg w-full sm:max-w-md">
                <div className="flex justify-between">
                  <p className="text-gray-500 text-xl font-bold">
                    Upload Materi
                  </p>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={handleCloseModalFormMobile}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <hr className="my-3" />
                <div>
                  <p className="mt-2">Deskripsi</p>
                  <Textarea
                    className="mt-2"
                    id="comment"
                    placeholder="Masukkan deskripsi tugas disini..."
                    required
                    rows={4}
                    value={selectedCardDescription}
                    onChange={(e) => setSelectedCardDescription(e.target.value)}
                  />

                  <p className="mt-2">Modul</p>
                  <div className=" flex gap-5">
                    <div
                      className="flex items-center gap-2 mt-5"
                      onClick={() => handleOptionChange("file")}
                    >
                      <input
                        type="radio"
                        id="file"
                        name="submissionOption"
                        value="file"
                        checked={selectedOption === "file"}
                      />
                      <label htmlFor="file">File</label>
                    </div>
                    <div
                      className="flex items-center gap-2 mt-5"
                      onClick={() => handleOptionChange("link")}
                    >
                      <input
                        type="radio"
                        id="link"
                        name="submissionOption"
                        value="link"
                        checked={selectedOption === "link"}
                      />
                      <label htmlFor="link">Link</label>
                    </div>
                  </div>
                  {selectedOption === "file" && (
                    <div id="fileUpload" className="mt-4">
                      <FileInput id="file" />
                    </div>
                  )}
                  {selectedOption === "link" && (
                    <div id="linkInput" className="mt-4">
                      <TextInput
                        id="link"
                        type="text"
                        placeholder="Masukkan url atau link yang valid disini"
                        required
                      />
                    </div>
                  )}
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          )}
          {isMobileModalOpenEdit && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
              <div className="bg-white p-4 rounded-lg w-full sm:max-w-md">
                <div className="flex justify-between">
                  <p className="text-gray-500 text-xl font-bold">Edit Materi</p>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={handleCloseModalFormMobile}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <hr className="my-3" />
                <div>
                  <p className="mt-2">Deskripsi</p>
                  <Textarea
                    className="mt-2"
                    id="comment"
                    placeholder="Masukkan deskripsi tugas disini..."
                    required
                    rows={4}
                    value={selectedCardDescription}
                    onChange={(e) => setSelectedCardDescription(e.target.value)}
                  />

                  <p className="mt-2">Modul</p>
                  <div className=" flex gap-5">
                    <div
                      className="flex items-center gap-2 mt-5"
                      onClick={() => handleOptionChange("file")}
                    >
                      <input
                        type="radio"
                        id="file"
                        name="submissionOption"
                        value="file"
                        checked={selectedOption === "file"}
                      />
                      <label htmlFor="file">File</label>
                    </div>
                    <div
                      className="flex items-center gap-2 mt-5"
                      onClick={() => handleOptionChange("link")}
                    >
                      <input
                        type="radio"
                        id="link"
                        name="submissionOption"
                        value="link"
                        checked={selectedOption === "link"}
                      />
                      <label htmlFor="link">Link</label>
                    </div>
                  </div>
                  {selectedOption === "file" && (
                    <div id="fileUpload" className="mt-4">
                      <FileInput id="file" />
                    </div>
                  )}
                  {selectedOption === "link" && (
                    <div id="linkInput" className="mt-4">
                      <TextInput
                        id="link"
                        type="text"
                        placeholder="Masukkan url atau link yang valid disini"
                        required
                      />
                    </div>
                  )}
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          )}
          {isTabletModalOpenAdd && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
              <div className="bg-white p-4 rounded-lg w-full sm:max-w-md">
                <div className="flex justify-between">
                  <p className="text-gray-500 text-xl font-bold">
                    Upload Materi
                  </p>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={handleCloseModalFormTablet}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <hr className="my-3" />
                <div>
                  <p className="mt-2">Deskripsi</p>
                  <Textarea
                    className="mt-2"
                    id="comment"
                    placeholder="Masukkan deskripsi tugas disini..."
                    required
                    rows={4}
                    value={selectedCardDescription}
                    onChange={(e) => setSelectedCardDescription(e.target.value)}
                  />

                  <p className="mt-2">Modul</p>
                  <div className=" flex gap-5">
                    <div
                      className="flex items-center gap-2 mt-5"
                      onClick={() => handleOptionChange("file")}
                    >
                      <input
                        type="radio"
                        id="file"
                        name="submissionOption"
                        value="file"
                        checked={selectedOption === "file"}
                      />
                      <label htmlFor="file">File</label>
                    </div>
                    <div
                      className="flex items-center gap-2 mt-5"
                      onClick={() => handleOptionChange("link")}
                    >
                      <input
                        type="radio"
                        id="link"
                        name="submissionOption"
                        value="link"
                        checked={selectedOption === "link"}
                      />
                      <label htmlFor="link">Link</label>
                    </div>
                  </div>
                  {selectedOption === "file" && (
                    <div id="fileUpload" className="mt-4">
                      <FileInput id="file" />
                    </div>
                  )}
                  {selectedOption === "link" && (
                    <div id="linkInput" className="mt-4">
                      <TextInput
                        id="link"
                        type="text"
                        placeholder="Masukkan url atau link yang valid disini"
                        required
                      />
                    </div>
                  )}
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          )}
          {isTabletModalOpenEdit && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
              <div className="bg-white p-4 rounded-lg w-full sm:max-w-md">
                <div className="flex justify-between">
                  <p className="text-gray-500 text-xl font-bold">Edit Materi</p>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={handleCloseModalFormTablet}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <hr className="my-3" />
                <div>
                  <p className="mt-2">Deskripsi</p>
                  <Textarea
                    className="mt-2"
                    id="comment"
                    placeholder="Masukkan deskripsi tugas disini..."
                    required
                    rows={4}
                    value={selectedCardDescription}
                    onChange={(e) => setSelectedCardDescription(e.target.value)}
                  />

                  <p className="mt-2">Modul</p>
                  <div className=" flex gap-5">
                    <div
                      className="flex items-center gap-2 mt-5"
                      onClick={() => handleOptionChange("file")}
                    >
                      <input
                        type="radio"
                        id="file"
                        name="submissionOption"
                        value="file"
                        checked={selectedOption === "file"}
                      />
                      <label htmlFor="file">File</label>
                    </div>
                    <div
                      className="flex items-center gap-2 mt-5"
                      onClick={() => handleOptionChange("link")}
                    >
                      <input
                        type="radio"
                        id="link"
                        name="submissionOption"
                        value="link"
                        checked={selectedOption === "link"}
                      />
                      <label htmlFor="link">Link</label>
                    </div>
                  </div>
                  {selectedOption === "file" && (
                    <div id="fileUpload" className="mt-4">
                      <FileInput id="file" />
                    </div>
                  )}
                  {selectedOption === "link" && (
                    <div id="linkInput" className="mt-4">
                      <TextInput
                        id="link"
                        type="text"
                        placeholder="Masukkan url atau link yang valid disini"
                        required
                      />
                    </div>
                  )}
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MateriGuru;
