import Navigation from "../../component/Navigation/Navigation";
import TabelPenilaian from "./TabelPenilaian";

const Penilaian = () => {
  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className=" mt-14">
          <h1 className="text-3xl font-bold">Penilaian</h1>
        </div>
        <TabelPenilaian />
      </div>
    </div>
  );
};

export default Penilaian;
