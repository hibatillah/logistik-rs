import DataView from "./components/data-view"

export default function Page() {
  return (
    <div className="space-y-5">
      <div>
        <h1>Penghapusan Alat</h1>
        <p className="lead">Pendataan alat yang tidak digunakan kembali.</p>
      </div>
      <DataView />
    </div>
  )
}
