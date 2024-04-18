import React, { useState } from "react";
import { Modal } from "flowbite-react";
// import { useUploadFileSiswa } from "../../../services/mutation";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UploadFile: React.FC = () => {
  // const [file, setFile] = useState<File | null>(null);

  // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setFile(e.target.files[0]);
  //   }
  // };

  // const uploadFileSiswa = useUploadFileSiswa();

  // const { register, handleSubmit, reset } = useForm();

  // const navigate = useNavigate();

  // const handleUploadFileSubmit = async (data: any) => {
  //   if (!file) {
  //     console.error("Please select a file.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("excelFile", file);

  //   try {
  //     await uploadFileSiswa.mutate(formData, {
  //       onSuccess: () => {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Siswa Berhasil ditambahkan!",
  //           text: "Siswa Berhasil ditambahkan!",
  //           confirmButtonText: "Ok",
  //         });
  //         reset();
  //         navigate("/pengguna-siswa");
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // };

  return (
    <>
      <Modal.Header>Upload Excel</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form 
          // onSubmit={handleSubmit(handleUploadFileSubmit)}
          >
            <input
              type="file"
              // onChange={handleInput}
              accept=".xlsx, .xls"
            />
            <div className="flex justify-end">
              <input
                type="submit"
                className="w-30 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-2.5 rounded"
                // disabled={uploadFileSiswa.isLoading}
                // value={
                //   uploadFileSiswa.isLoading ? "Menyimpan..." : "Simpan"
                // }
              />
            </div>
          </form>
        </div>
      </Modal.Body>
    </>
  );
};

export default UploadFile;
