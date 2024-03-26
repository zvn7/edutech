import Navigation from "../../../component/Navigation/Navigation";
import TabelGuru from "./TabelGuru";

const Guru = () => {
  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className="mt-14">
          <h1 className="text-3xl font-bold capitalize font-mono">
            Daftar Guru
          </h1>
        </div>
        <div className="mt-4">
          <TabelGuru />
        </div>
      </div>
    </div>
  );
};

export default Guru;
