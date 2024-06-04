import { useState } from "react";
import { useClassrooms, useGetMapelId } from "../../services/queries";
import { Button, Modal, ModalBody } from "flowbite-react";
import { useCreateMapel, useDeleteMapel } from "../../services/mutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { IMapel, Mapel } from "../../types/mapel";
import Swal from "sweetalert2";
import axios from "axios";

const TabelMapel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState({
    lessonName: "",
    className: "",
  });
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const createMapelMutation = useCreateMapel();
  const [selectedJurusan, setSelectedJurusan] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedClass, setSelectedClass] = useState("semua");
  const [searchTerm, setSearchTerm] = useState("");

  const { register, handleSubmit, reset, clearErrors } = useForm<IMapel>();

  const kelasQuery = useClassrooms();
  const { data: dataKelas } = kelasQuery;

  const mapelQuery = useGetMapelId();
  const { data, isLoading: isMapelLoading, refetch: refetchMapel } = mapelQuery;

  const handlePageSizeChange = (e: any) => {
    setPageSize(Number(e.target.value));
  };

  const handleClassChange = (e: any) => {
    setSelectedClass(e.target.value);
  };

  const filteredData =
    selectedClass === "semua"
      ? data
      : data?.filter(({ className }) => className === selectedClass) || [];

  const totalPages = Math.ceil((data ? data.length : 0) / pageSize);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(Math.max(0, Math.min(pageNumber, totalPages - 1)));
  };

  const searchFilter = (mapel: any) => {
    // Memeriksa apakah nameTeacher tidak null sebelum menggunakan toLowerCase()
    const teacherMatch = mapel.nameTeacher
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Pencarian berdasarkan nama mata pelajaran
    const subjectMatch = mapel.lessonName
      .toUpperCase()
      .includes(searchTerm.toUpperCase());

    // Mengembalikan true jika ada kecocokan baik untuk nama guru maupun nama mata pelajaran
    return teacherMatch || subjectMatch;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
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
        setIsModalOpen(false);
        setOpenEditModal(false);
        setSubject({
          lessonName: "",
          className: "",
        });
        reset();

        clearErrors("className");
        setSelectedJurusan([]);
      }
    });
  };

  const handleInputChange = (e: any) => {
    const { value, name } = e.target;
    setSubject({
      ...subject,
      [name]: value,
    });
  };

  const handleCreateMapelSubmit: SubmitHandler<IMapel> = (data) => {
    try {
      createMapelMutation.mutate(data, {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Mata Pelajaran Berhasil ditambahkan!",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              setSelectedJurusan([]);
              setIsModalOpen(false);
              reset();
            }
          });
        },

        onError: (error: any) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
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

  const deleteMapel = useDeleteMapel();

  const handleDelete = async (id: any) => {
    const confirmation = await Swal.fire({
      title: "Peringatan",
      text: "Apakah anda yakin ingin menghapus jadwal ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, lanjutkan",
      cancelButtonText: "Batal",
    });

    if (confirmation.isConfirmed) {
      try {
        await deleteMapel.mutateAsync(id);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Mata Pelajaran Berhasil dihapus!",
          confirmButtonText: "Ok",
        });
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
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
    }
  };

  const [openEditModal, setOpenEditModal] = useState(false);
  const [formUpdate, setFormUpdate] = useState({
    id: "",
    lessonName: "",
    className: "",
  });

  const handleEdit = async (data: Mapel) => {
    setFormUpdate({
      id: data.id,
      lessonName: data.lessonName || "",
      className: data.className || "",
    });
    setOpenEditModal(true);
  };

  const handleEditChange = (e: any) => {
    const { value, name } = e.target;
    setFormUpdate({
      ...formUpdate,
      [name]: value,
    });
  };
  const [loading, setLoading] = useState(false);
  const submitEdit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/Lessons/${formUpdate.id}`,
        formUpdate,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setOpenEditModal(false);
      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Mata Pelajaran Berhasil diperbarui!",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            refetchMapel();
            setOpenEditModal(false);
            setFormUpdate({
              id: "",
              lessonName: "",
              className: "",
            });
          }
        });
      }
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="shadow-md sm:rounded-lg bg-white">
        <div className="p-4 capitalize">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-500">Data Mapel</h1>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={openModal}
                className="flex items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2 capitalize"
              >
                <svg
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
                <span className="ps-1 capitalize">tambah</span>
              </button>
            </div>
          </div>
        </div>
        <hr className="ml-3 mr-3 border-gray-200" />
        <div className="p-2 ml-2 mr-2 pt-4 mb-3 flex gap-2 justify-between flex-wrap">
          <div className="flex gap-2 items-center ">
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="border border-gray-300 bg-gray-50 p-2 rounded-lg capitalize"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize} className="text-normal">
                  {pageSize} data
                </option>
              ))}
            </select>

            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="border border-gray-300 bg-gray-50 p-2 rounded-lg capitalize"
            >
              <option selected>semua</option>

              {dataKelas?.map((item) => (
                <option value={item.className}>{item.className}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <img src="/gif/search.gif" alt="search" className="w-6 h-6" />
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-0 focus:border-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Temukan mapel & guru disini..."
              />
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-left text-gray-900 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Mata Pelajaran
                </th>
                <th scope="col" className="px-6 py-3">
                  kelas
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama guru pengajar
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isMapelLoading ? (
                Array.from({ length: pageSize }).map((_, index) => (
                  <tr key={index} className="bg-white border-b animate-pulse">
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
                    </td>
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
                    </td>
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize">
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                    </td>
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap uppercase">
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
                    </td>
                    <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap uppercase">
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
                    </td>
                  </tr>
                ))
              ) : !isMapelLoading && filteredData && filteredData.length > 0 ? (
                filteredData.filter(searchFilter).length > 0 ? (
                  filteredData
                    .filter(searchFilter)
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map((mapel, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td
                          scope="row"
                          className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap"
                        >
                          {index + 1}
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize"
                        >
                          {mapel.lessonName}
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize"
                        >
                          {mapel.className}
                        </td>
                        <td
                          scope="row"
                          className={`px-6 py-4 font-normal whitespace-nowrap capitalize ${
                            mapel.nameTeacher === "Belum Ada Guru"
                              ? "text-gray-500"
                              : "text-gray-900"
                          }`}
                        >
                          {mapel.nameTeacher}
                        </td>

                        <td>
                          <Button.Group>
                            <Button
                              color="warning"
                              onClick={() => handleEdit(mapel)}
                            >
                              Edit
                            </Button>
                            <Button
                              color="failure"
                              onClick={() => handleDelete(mapel.id)}
                            >
                              Hapus
                            </Button>
                          </Button.Group>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center p-10">
                      Tidak ada hasil pencarian yang sesuai.
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center capitalize">
                    Data belum tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* pagination */}
        <div className="flex items-center justify-between flex-wrap gap-2 p-4">
          <span className="flex items-center gap-1">
            <div className="capitalize">halaman</div>
            <strong className="capitalize">
              {currentPage + 1} dari {totalPages}
            </strong>
          </span>
          <div className="flex gap-2 items-center">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              className="mr-2 px-4 py-2 h-10 bg-gray-200 text-gray-800 rounded"
            >
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`mr-2 px-4 py-2 h-10 ${
                  currentPage === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } rounded`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className="ml-1 px-4 py-2 h-10 bg-gray-200 text-gray-800 rounded"
            >
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* modal create mapel */}
      <Modal show={isModalOpen} size="md" onClose={closeModal} popup>
        <Modal.Header className="p-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Tambah Mata Pelajaran
          </h3>
        </Modal.Header>
        <ModalBody>
          <form
            className="space-y-6"
            onSubmit={handleSubmit(handleCreateMapelSubmit)}
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                Mata Pelajaran
              </label>
              <input
                id="matapelajaran"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Nama Mata Pelajaran"
                {...register("lessonName")}
                onChange={handleInputChange}
                required
                onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
                  e.target.setCustomValidity("Mapel tidak boleh kosong")
                }
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  e.target.setCustomValidity("")
                }
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-blue-700 capitalize"
              >
                kelas
              </label>
              <select
                id="category"
                {...register("className")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 capitalize"
                required
                onInvalid={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  e.currentTarget.setCustomValidity(
                    "Pilih kelas tidak boleh kosong!"
                  )
                }
                onInput={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  e.currentTarget.setCustomValidity("")
                }
              >
                <option selected>pilih kelas</option>
                {dataKelas?.map((item) => (
                  <option value={item.className}>{item.className}</option>
                ))}
              </select>
            </div>

            <div className="w-full mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                disabled={createMapelMutation.isPending}
              >
                {createMapelMutation.isPending ? (
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
                className="bg-white border hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded w-full mt-2"
                onClick={closeModal}
              >
                Batal
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>

      {/* modal edit mapel */}
      <Modal show={openEditModal} size="md" onClose={closeModal} popup>
        <Modal.Header className="p-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Edit Mata Pelajaran
          </h3>
        </Modal.Header>
        <ModalBody>
          <div
            className="space-y-6"
            // onSubmit={handleSubmit(handleCreateMapelSubmit)}
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                Mata Pelajaran
              </label>
              <input
                id="matapelajaran"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Nama Mata Pelajaran"
                name="lessonName"
                value={formUpdate.lessonName}
                onChange={handleEditChange}
                required
                onInvalid={(e: React.ChangeEvent<HTMLInputElement>) =>
                  e.target.setCustomValidity("Mapel tidak boleh kosong")
                }
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  e.target.setCustomValidity("")
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                kelas
              </label>
              <select
                name="className"
                value={formUpdate.className}
                onChange={handleEditChange}
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
                {dataKelas?.map((item) => (
                  <option key={item.id} value={item.className}>
                    {item.className}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full mt-6">
              <button
                type="submit"
                className="flex w-full items-center text-center justify-center  px-5 py-2.5  text-sm font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
                disabled={loading}
                onClick={submitEdit}
              >
                {loading ? (
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
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full mt-2"
                onClick={closeModal}
              >
                Batal
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TabelMapel;
