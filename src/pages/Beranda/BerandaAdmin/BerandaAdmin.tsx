import Navigation from "../../../component/Navigation/Navigation";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCount, useTodo } from "../../../services/queries";
import {
  useCreateTodo,
  useDeleteTodo,
  useEditTodo,
  useEditTodoCheck,
} from "../../../services/mutation";
import { editTodo, editTodoCheck } from "../../../services/api";
import Swal from "sweetalert2";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}
const BerandaAdmin = () => {
  // State untuk menyimpan ID tugas yang sedang diedit
  const [editingId, setEditingId] = useState(null);

  // State untuk menyimpan deskripsi tugas yang sedang diedit
  const [editDescription, setEditDescription] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const countQueries = useCount();
  const { data: countData } = countQueries;
  const todoQueries = useTodo();
  const { data: todoData } = todoQueries;

  // Fungsi mutasi untuk menambah tugas baru
  const createTodoMutation = useCreateTodo();

  // Fungsi mutasi untuk mengedit tugas
  const editTodoMutation = useEditTodo();

  // Fungsi mutasi untuk mengedit tugas
  const editTodoCheckMutation = useEditTodoCheck();

  // Fungsi mutasi untuk menghapus tugas
  const deleteTodoMutation = useDeleteTodo();

  // Menggunakan state untuk menyimpan nilai checkbox
  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  // Fungsi untuk menambah atau mengedit tugas
  const addOrEditTodo = async () => {
    try {
      if (editingId !== null) {
        await editTodoMutation.mutate(
          {
            id: editingId,
            data: {
              description: editDescription,
              status: checkedItems[editingId] ? 1 : 0,
            }, // Mengambil nilai status dari checkedItems
          },
          {
            onSuccess: () => {
              quertClient.invalidateQueries({ queryKey: ["todo"] });
              setEditDescription("");
              setEditingId(null);
            },
          }
        );
      } else {
        // Jika sedang dalam mode tambah, panggil fungsi createTodoMutation.mutateAsync
        await createTodoMutation.mutateAsync({
          description: editDescription,
          status: isChecked ? 1 : 0,
        });
      }
      // Reset nilai editDescription, editingId, dan isChecked setelah operasi selesai
      setEditDescription("");
      setEditingId(null);
      setIsChecked(false);
    } catch (error) {
      console.error("Error adding/editing todo:", error);
    }
  };

  const handleCheckboxChange = async (id: any) => {
    try {
      // Periksa status tugas sebelumnya
      const previousStatus = todos.find((todo) => todo.id === id)?.status;

      // Perbarui status tugas menjadi 1 jika sebelumnya belum dicentang, dan 0 jika sudah dicentang
      const newStatus = previousStatus === 1 ? 0 : 1;

      // Update status tugas di state
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, status: newStatus };
        }
        return todo;
      });
      setTodos(updatedTodos);

      // Kirim perubahan status ke server menggunakan fungsi editTodoCheck
      await editTodoCheckMutation.mutateAsync({
        id: id,
        data: {
          status: newStatus,
        },
      });
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };

  const removeTodo = async (id: any) => {
    try {
      // Memanggil fungsi mutasi untuk menghapus tugas berdasarkan ID
      await deleteTodoMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const activeStudentCount = countData ? countData.activeStudentCount : 0;
  const activeTeacherCount = countData ? countData.activeTeacherCount : 0;

  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className="mt-14">
          <h1 className="text-3xl font-bold font-mono capitalize">Beranda</h1>
          <h3 className="text-lg font-sans font-semibold mt-3 capitalize">
            selamat datang, Admin
          </h3>
        </div>
        <div className="mt-6">
          <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-2">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-2">
              <div>
                <div className="bg-[#dfe0f5] p-4 rounded-md">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="bg-white rounded-full">
                      <svg
                        className="w-24 h-24 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h1 className=" capitalize text-lg text-end">
                        jumlah guru
                      </h1>
                      <h2 className="text-[40px] font-semibold capitalize">
                        {activeTeacherCount} {}
                        <span className="text-[35px] text-gray-700  capitalize">
                          Guru
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Link to="/pengguna-guru" className="w-full">
                      <button className="text-base w-full p-1 bg-white rounded-md capitalize text-gray-700 hover:text-blue-500">
                        <span>lihat selengkapnya</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-[#f7eee1] p-4 rounded-md">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="bg-white rounded-full">
                      <svg
                        className="w-24 h-24 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h1 className=" capitalize text-lg text-end">
                        jumlah siswa
                      </h1>
                      <h2 className="text-[40px] font-semibold capitalize">
                        {activeStudentCount} {}
                        <span className="text-[35px] text-gray-700  capitalize">
                          siswa
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Link to="/pengguna-siswa" className="w-full">
                      <button className="text-base w-full p-1 bg-white rounded-md capitalize text-gray-700 hover:text-blue-500">
                        <span>lihat selengkapnya</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="lg:w-[620px] bg-white p-4 rounded-md overflow-y-auto">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-semibold capitalize">
                    To Do List
                  </h1>
                </div>

                <div className="flex gap-2 items-center mt-4">
                  <input
                    type="text"
                    name="description"
                    placeholder="Tambah tugas baru..."
                    className="flex-grow p-2 border border-gray-300 rounded-md"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    type="button"
                    onClick={addOrEditTodo}
                  >
                    {editingId !== null ? "Simpan" : "Tambah"}
                  </button>
                </div>

                <div className="mt-3">
                  <ul>
                    {todoData?.map((todo) => (
                      <li
                        key={todo.id}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={todo.status === 0}
                            onChange={() => handleCheckboxChange(todo.id)}
                          />
                          <span
                            className={todo.status === 0 ? "line-through" : ""}
                            onClick={() => {
                              setEditingId(todo.id);
                              setEditDescription(todo.description);
                            }}
                          >
                            {todo.description}
                          </span>
                        </div>
                        <button onClick={() => removeTodo(todo.id)}>
                          <svg
                            className="w-5 h-5 text-gray-800 dark:text-white"
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
                              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                            />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Info Rekap */}
          <div>
            <div className="mt-4">
              <div className="w-full lg:w-[608px] md:w-full bg-white h-60 relative overflow-y-auto p-3 rounded-md shadow-sm mt-4 lg:mt-0">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-bold capitalize">
                    Informasi Tugas Admin
                  </h1>
                </div>
                <div className="mt-4">
                  <ul className="list-disc ml-6">
                    <li>Merekap Absensi setiap kelas</li>
                    <li>Membuat Jadwal Pelajaran</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BerandaAdmin;
