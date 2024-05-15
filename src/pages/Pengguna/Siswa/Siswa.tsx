import Navigation from "../../../component/Navigation/Navigation";
import TabelSiswa from "./TabelSiswa";

const Siswa = () => {
  return (
    <div>
      <Navigation />
      <div>
        <div className="bg-[#86d9ff] h-40 relative z-10"></div>
      </div>
      <div className="p-4 sm:ml-64">
        <div className="w-full">
          <div className="h-20 bg-white p-4 rounded-sm shadow-md relative -top-11 z-20">
            <div className="flex gap-3 items-center">
              <img src="/gif/user.gif" alt="calendar" className="w-12 h-12" />
              <h1 className="text-2xl font-bold text-gray-800 capitalize">
                Daftar Siswa
              </h1>
            </div>
          </div>
        </div>
        <div>
          <TabelSiswa />
        </div>
      </div>
    </div>
  );
};

export default Siswa;
