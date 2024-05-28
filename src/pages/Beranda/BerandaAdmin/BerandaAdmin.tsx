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
import { useQueryClient } from "@tanstack/react-query";

interface TodoItem {
	id: string;
	text: string;
	completed: boolean;
	status: number;
}
const BerandaAdmin = () => {
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editDescription, setEditDescription] = useState("");
	const [todos, setTodos] = useState<TodoItem[]>([]);
	const countQueries = useCount();
	const { data: countData } = countQueries;
	const todoQueries = useTodo();
	const { data: todoData } = todoQueries;
	const createTodoMutation = useCreateTodo();
	const editTodoMutation = useEditTodo();
	const editTodoCheckMutation = useEditTodoCheck();
	const deleteTodoMutation = useDeleteTodo();
	const [isChecked, setIsChecked] = useState(false);
	const [checkedItems] = useState<{ [key: string]: boolean }>({});
	const queryClient = useQueryClient();

	function generateUniqueId(): string {
		return (
			Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15)
		);
	}

	// Fungsi untuk menambah atau mengedit tugas
	const addOrEditTodo = async () => {
		try {
			if (editingId !== null) {
				await editTodoMutation.mutate(
					{
						id: editingId,
						data: {
							id: editingId,
							createdAt: new Date().toISOString(),
							description: editDescription,
							status: checkedItems[editingId] ? 1 : 0,
						},
					},
					{
						onSuccess: () => {
							queryClient.invalidateQueries({ queryKey: ["todo"] });
							setEditDescription("");
							setEditingId(null);
						},
					}
				);
			} else {
				// Jika sedang dalam mode tambah, panggil fungsi createTodoMutation.mutateAsync
				await createTodoMutation.mutateAsync({
					id: generateUniqueId(), // You need to implement this function
					createdAt: new Date().toISOString(),
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
					id: id,
					createdAt: new Date().toISOString(),
					description: editDescription,
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
						<div>
							<div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-2">
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
							<div className="mt-4">
								<div className=" bg-white p-4 rounded-md overflow-y-auto">
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
															className={
																todo.status === 0 ? "line-through" : ""
															}
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
						<div className="w-full lg:w-[608px] md:w-full bg-white h-full relative p-6 rounded-md shadow-sm mt-4 lg:mt-0">
							<div className="">
								<h1 className="text-lg font-semibold capitalize">Info Rekap</h1>
							</div>
							<div className="mt-4 p-2">
								<ol className="relative border-s border-gray-200 dark:border-gray-700">
									<li className="mb-10 ms-6">
										<span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
											<img
												src="/gif/check.gif"
												className="w-4 h-4 text-blue-800 dark:text-blue-300"
												alt=""
											/>
										</span>
										<h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
											Rekap Absensi Siswa
											<span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
												Penting
											</span>
										</h3>
										<time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
											Dilakukan Maksimal Setiap 3 Hari
										</time>
										<p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
											Tugas meliputi rekap absensi dari daftar yang diberikan
											guru.
										</p>
										<a
											href="/rekap-absensi"
											className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
										>
											Lihat Absensi
										</a>
									</li>
									<li className="mb-10 ms-6">
										<span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
											<img
												src="/gif/check.gif"
												className="w-4 h-4 text-blue-800 dark:text-blue-300"
												alt=""
											/>
										</span>
										<h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
											Pembuatan Jadwal Pembelajaran
										</h3>
										<time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
											Dilakukan Setiap Ada Perubahan Jadwal dari Kesiswaan
										</time>
										<p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
											Tugas meliputi melakukan pengecekan jadwal dan pembuatan
											jadwal sesuai arahan dari kesiswaan.
										</p>
										<a
											href="/jadwal-admin"
											className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
										>
											Lihat Jadwal
										</a>
									</li>
									<li className="ms-6">
										<span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
											<img
												src="/gif/check.gif"
												className="w-4 h-4 text-blue-800 dark:text-blue-300"
												alt=""
											/>
										</span>
										<h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
											Menambah Mapel, Siswa Baru, & Guru Baru
										</h3>
										<time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
											Dilakukan Ketika Ada Tambahan atau Perubahan
										</time>
										<p className="text-base font-normal text-gray-500 dark:text-gray-400">
											Tugas meliputi menambah mapel baru atau merubah mapel yang
											sudah ada, menambah guru baru, dan siswa baru.
										</p>
									</li>
								</ol>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BerandaAdmin;
