import { Link, useNavigate } from "react-router-dom";


export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-5xl font-bold text-main-primary mb-4">404</h1>
      <p className="text-text-dark-secondary mb-6">
        Halaman yang kamu cari nggak ada.
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-main-primary hover:text-white bg-white hover:bg-main-primary border border-main-primary text-other-body-medium-h1 rounded-[10px] px-4 py-2 text-center transition-colors duration-300 cursor-pointer"
        >
          Kembali
        </button>

        <Link
          to="/"
          className="text-white hover:text-main-primary bg-main-primary hover:bg-white border border-main-primary text-other-body-medium-h1 rounded-[10px] px-4 py-2 text-center transition-colors duration-300"
        >
          Home
        </Link>
      </div>
    </>
  );
}
