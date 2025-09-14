import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-64 min-w-[250px] bg-[#edede9] shadow-md flex flex-col p-[10]">
      <nav>

            <div
              onClick={() => navigate("/dashboard")}
              className="flex items-center rounded-lg bg-[#d5bdaf] cursor-pointer mb-[10] p-[5]"
            >
              <span className="text-[25px] font-normal">Dashboard</span> {/* huge text */}
            </div>

            <div
              onClick={() => navigate("/products")}
              className="flex items-center rounded-lg bg-[#d5bdaf] cursor-pointer mb-[10] p-[5]"
            >
              <span className="text-[25px] font-normal">Products</span> {/* huge text */}
            </div>

      </nav>
    </div>
  );
}
