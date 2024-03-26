import Navigation from "../../../component/Navigation/Navigation";
import TabelRekapAbsensi from "./TabelRekapAbsensi";

const AbsensiAdmin = () => {
  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className=" mt-14">
          <h1 className="text-3xl font-bold capitalize">Hasil recap absensi</h1>
        </div>
        <div className="mt-8">
          <div className="flex items-center gap-4">
            {/* <label className="mb-2 text-lg font-semibold text-gray-900 uppercase">
              pilih kelas
            </label> */}
            <select
              id="countries"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 uppercase font-medium focus:ring-0"
            >
              <option selected>Pilih Kelas</option>
              <option value="US">Semua</option>
              <option value="CA">rpl</option>
              <option value="FR">tkj</option>
              <option value="DE">tkr</option>
            </select>
          </div>
          <div className="mt-6">
            <TabelRekapAbsensi />
          </div>
          {/* <Tabs aria-label="Tabs with underline" style="underline">
            <Tabs.Item
              active
              title="Rekayasa Perangkat Lunak"
              icon={FaComputer}
            >
              <TabelRekapAbsensi />
            </Tabs.Item>
            <Tabs.Item
              title="Teknik Komputer Dan Jaringan"
              icon={FaNetworkWired}
            >
              <TabelRekapAbsensi />
            </Tabs.Item>
            <Tabs.Item
              title="Teknik Kendaraan Ringan"
              icon={FaScrewdriverWrench}
            >
              <TabelRekapAbsensi />
            </Tabs.Item>
          </Tabs> */}
        </div>
      </div>
    </div>
  );
};

export default AbsensiAdmin;
