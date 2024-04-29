import { useEffect, useState } from "react";
import { useClassrooms, useGetMapelId } from "../../services/queries";
import { Button, Modal, ModalBody } from "flowbite-react";
import { useCreateMapel, useDeleteMapel } from "../../services/mutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { IMapel, Mapel } from "../../types/mapel";
import Swal from "sweetalert2";
import Select, { GroupBase, OptionsOrGroups } from "react-select";
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

  const { register, handleSubmit, reset, setValue, clearErrors } =
    useForm<IMapel>();

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
      confirmButtonText: "Ya",
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
        // Reset selectedJurusan
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
    createMapelMutation.mutate(data, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "Tambah Data Berhasil",
          text: "Mapel Berhasil ditambahkan!",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            setSelectedJurusan([]);
            setIsModalOpen(false);
            reset();
          }
        });
      },
    });
  };

  const deleteMapel = useDeleteMapel();

  const handleDelete = async (id: any) => {
    const confirmation = await Swal.fire({
      title: "Anda yakin ingin menghapus mapel ini?",
      text: "Aksi ini tidak dapat dibatalkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (confirmation.isConfirmed) {
      try {
        await deleteMapel.mutateAsync(id);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Mapel Berhasil dihapus!",
          confirmButtonText: "Ok",
        });
      } catch (error) {
        console.error("Gagal menghapus mapel:", error);
        // Tangani kesalahan, misalnya dengan menampilkan pesan kepada pengguna
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
        `http://192.168.139.239:13311/api/Lessons/${formUpdate.id}`,
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
          text: "Mapel Berhasil diperbarui!",
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="shadow-md sm:rounded-lg bg-white">
        <div className="p-2 ml-2 mr-2 pt-4 mb-3 flex gap-2 justify-between">
          <div className="flex gap-2 items-center flex-wrap">
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="border border-gray-300 bg-gray-50 p-1 rounded-lg capitalize"
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
              className="border border-gray-300 bg-gray-50 p-1 rounded-lg capitalize"
            >
              <option selected>semua</option>

              {dataKelas?.map((item) => (
                <option value={item.className}>{item.className}</option>
              ))}
            </select>

            <div className="flex gap-2 items-center">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-1.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-56 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 capitalize"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari mapel & guru disini..."
                />
              </div>
            </div>
          </div>
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
                  jurusan
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama guru pengajar
                </th>
                <th scope="col" className="px-6 py-3">
                  status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isMapelLoading ? (
                <div className="text-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-10 h-10 text-gray-200 animate-spin fill-blue-600"
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
              ) : !isMapelLoading &&
                filteredData &&
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
                      <td
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap capitalize"
                      >
                        <span
                          className={`font-normal me-2 px-2.5 py-0.5 rounded ${
                            mapel.lessonStatus === "Aktif"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {mapel.lessonStatus}
                        </span>
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
              <span className="text-gray-500 capitalize text-xs">
                * penulisan mapel: mapel - nama kelas
              </span>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-blue-700 capitalize"
              >
                jurusan
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
              <input
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                disabled={createMapelMutation.isPending}
                value={
                  createMapelMutation.isPending ? "Menyimpan..." : "Simpan"
                }
              />

              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full mt-2"
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
              <span className="text-gray-500 capitalize text-xs">
                * penulisan mapel: mapel - nama kelas
              </span>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-blue-700 capitalize">
                Jurusan
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
