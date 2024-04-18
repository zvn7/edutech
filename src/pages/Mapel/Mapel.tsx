import Navigation from "../../component/Navigation/Navigation";
import TabelMapel from "./TabelMapel";

const Mapel = () => {
  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className="mt-14 mb-4 flex justify-between">
          <h1 className="text-3xl font-bold capitalize">Mata Pelajaran</h1>
        </div>
        <div className="mt-8">
          <TabelMapel />
        </div>
      </div>
    </div>
  );
};

export default Mapel;
