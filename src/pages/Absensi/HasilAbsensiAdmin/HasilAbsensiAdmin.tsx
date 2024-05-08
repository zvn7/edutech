import Navigation from "../../../component/Navigation/Navigation";
import TabelAbsensi from "./TabelAbsensi";

const HasilAbsensiAdmin = () => {
  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <TabelAbsensi />
      </div>
    </div>
  );
};

export default HasilAbsensiAdmin;
