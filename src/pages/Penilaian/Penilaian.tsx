import Navigation from "../../component/Navigation/Navigation";
import TabelPenilaian from "./TabelPenilaian";
import { Tugas } from "../../types/tugas";

import { useState } from "react";

const Penilaian = () => {
  
  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className=" mt-14">
          <h1 className="text-3xl font-bold">Penilaian</h1>
        </div>
        {/* <div className="mt-4">
          <div className="bg-[#F5EBB6] p-3 rounded-2xl flex gap-2 items-center">
            <svg
              className="w-16 h-16 text-[#f0cc00] dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                clip-rule="evenodd"
              />
            </svg>
            <div className="flex flex-col gap-1">
              <h2 className=" text-black font-semibold text-sm w-full">
                Terdapat beberapa siswa yang belum dilakukan penilaian
              </h2>
              <h2 className=" text-black font-semibold text-sm w-full">
                Pembuatan Flowchart - 6 Siswa belum di nilai
              </h2>
              <h2 className=" text-black font-semibold text-sm w-full">
                Segera lakukan penilaian
              </h2>
            </div>
          </div>
        </div> */}
        <TabelPenilaian />
      </div>
    </div>
  );
};

export default Penilaian;
