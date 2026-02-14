import { Search } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Cari...",
  className = "",
}) {
  return (
    <div className={`relative w-full md:w-auto ${className}`}>
      <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
        <Search className="text-text-dark-secondary" size={18} />
      </div>

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full p-3.5 pe-10 font-dm font-medium text-sm md:text-base! leading-[1.4] items-center text-text-dark-secondary border border-other-border rounded-[10px] bg-white focus:ring-main-primary focus:border-main-primary"
        placeholder={placeholder}
      />
    </div>
  );
}
