import Navigation from "../../../component/Navigation/Navigation";
import { useState } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

interface TodoItem {
	id: string;
	text: string;
	completed: boolean;
}
const BerandaAdmin = () => {
	const [todos, setTodos] = useState<TodoItem[]>([]);
	const [newTodo, setNewTodo] = useState("");

	const addTodo = () => {
		if (newTodo !== "") {
			const newId = crypto.randomUUID();
			const newTodoItem: TodoItem = {
				id: newId,
				text: newTodo,
				completed: false,
			};
			setTodos([...todos, newTodoItem]);
			setNewTodo("");
		}
	};

	const removeTodo = (id: string) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
	};

	const toggleComplete = (id: string) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		setTodos(updatedTodos);
	};
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
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{/* guru */}
						<div className="bg-[#dfe0f5] p-4 rounded-md">
							<h1 className="mb-3 capitalize font-bold text-lg tracking-wide">
								jumlah guru
							</h1>
							<div className="flex items-center justify-between gap-2 mb-3">
								<div className="bg-white rounded-full">
									<svg
										className="w-14 h-14 text-gray-800"
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
									<h2 className="text-[40px] font-semibold capitalize">
										99
										{/* 99 guru */}
										<span className="text-[25px] text-gray-500 capitalize">
											Guru
										</span>
									</h2>
								</div>
							</div>
							<div className="flex items-center">
								<Link to="/HalamanPenggunaGuru" className="w-full">
									<button className="text-base w-full p-1 bg-white rounded-md capitalize text-gray-700 hover:text-blue-500">
										<span>lihat selengkapnya</span>
									</button>
								</Link>
							</div>
						</div>

						{/* siswa */}
						<div className="bg-[#f7eee1] p-4 rounded-md">
							<h1 className="mb-3 capitalize font-bold text-lg tracking-wide">
								jumlah guru
							</h1>
							<div className="flex items-center justify-between gap-2 mb-3">
								<div className="bg-white rounded-full">
									<svg
										className="w-14 h-14 text-gray-800"
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
									<h2 className="text-[40px] font-semibold capitalize">
										99
										{/* 99 guru */}
										<span className="text-[25px] text-gray-500 capitalize">
											Siswa
										</span>
									</h2>
								</div>
							</div>
							<div className="flex items-center">
								<Link to="/HalamanPenggunaSiswa" className="w-full">
									<button className="text-base w-full p-1 bg-white rounded-md capitalize text-gray-700 hover:text-blue-500">
										<span>lihat selengkapnya</span>
									</button>
								</Link>
							</div>
						</div>

						{/* mapel */}
						<div className="bg-[#e1ecf7] p-4 rounded-md">
							<h1 className="mb-3 capitalize font-bold text-lg tracking-wide">
								jumlah guru
							</h1>
							<div className="flex items-center justify-between gap-2 mb-3">
								<div className="bg-white rounded-full p-2">
									<svg
										className="w-10 h-10 text-gray-800 dark:text-white"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											fill-rule="evenodd"
											d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
								<div>
									<h2 className="text-[40px] font-semibold capitalize">
										99
										{/* 99 guru */}
										<span className="text-[25px] text-gray-500 capitalize">
											Mapel
										</span>
									</h2>
								</div>
							</div>
							<div className="flex items-center">
								<Link to="/HalamanMateri" className="w-full">
									<button className="text-base w-full p-1 bg-white rounded-md capitalize text-gray-700 hover:text-blue-500">
										<span>lihat selengkapnya</span>
									</button>
								</Link>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
						<div className="bg-white h-60 relative overflow-y-auto p-3 rounded-md shadow-sm">
							<div className="flex justify-between items-center">
								<h1 className="text-lg font-bold capitalize">
									Informasi Rekap Absensi
								</h1>
							</div>
							<div className="flex items-center justify-between gap-4 mt-4">
								<p className="text-base ">Teknik Komputer dan Jaringan</p>
								<span className="px-2 py-1 bg-yellow-500 text-white text-sm rounded-lg">
									Belum Rekap
								</span>
							</div>
						</div>

						<div className="bg-white h-60 relative overflow-y-auto p-3 rounded-md shadow-sm">
							<div className="flex justify-between items-center">
								<h1 className="text-lg font-semibold capitalize">To Do List</h1>
							</div>

							<div className="flex items-center gap-4 mt-4 bg-gray-200 rounded-md">
								<input
									type="text"
									value={newTodo}
									onChange={(e) => setNewTodo(e.target.value)}
									className="bg-transparent border-0  border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 focus:ring-0 focus:border-0"
									placeholder="Add new todo..."
								/>
								<button onClick={addTodo} className="mr-2">
									<svg
										className="w-6 h-6 text-gray-500 "
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
											d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
										/>
									</svg>
								</button>
							</div>
							<div className="mt-3">
								<ul>
									{todos.map((todo) => (
										<li
											key={todo.id}
											className="flex items-center justify-between gap-2"
										>
											<div className="flex items-center gap-2">
												<input
													type="checkbox"
													checked={todo.completed}
													onChange={() => toggleComplete(todo.id)}
												/>
												<span
													style={{
														textDecoration: todo.completed
															? "line-thr ough"
															: "none",
													}}
													className="capitalize text-gray-900"
												>
													{todo.text}
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
			</div>
		</div>
	);
};

export default BerandaAdmin;
