import Navigation from "../../../component/Navigation/Navigation";
import TabelSiswa from "./TabelSiswa";

const Siswa = () => {
  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className="mt-14">
          <h1 className="text-3xl font-bold capitalize">Halaman Akun siswa</h1>
        </div>
        <div className="mt-8">
          <TabelSiswa/>
        </div>
      </div>
    </div>
  );
};

export default Siswa;
