import Navigation from "../../../component/Navigation/Navigation";
import TabelJadwalAdmin from "./TabelJadwalAdmin";

const JadwalAdmin = () => {
  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className="mt-14">
          <h1 className="text-3xl font-bold  capitalize">jadwal pelajaran</h1>
        </div>
        <div className="mt-8">
          <TabelJadwalAdmin />
        </div>
      </div>
    </div>
  );
};

export default JadwalAdmin;
