import { Outlet } from "react-router-dom";


export default function ErrorLayout() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[rgba(255,253,243)] px-6">
        <div className="max-w-md w-full text-center">
          <Outlet />
        </div>
      </div>
    </>
  );
}
