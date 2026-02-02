import { Search } from "lucide-react";
import { type ComponentProps } from "react";

interface SearchBarProps extends ComponentProps<"input"> {
}

export function SearchBar({ className, ...props }: SearchBarProps) {
  return (
    <div 
 
      className={`bg-white h-14 px-4 rounded-lg border border-gray-200 shadow-sm flex items-center gap-3 ${className}`}
    >
      <Search size={22} className="text-metallic-silver" /> 
      <input
        type="text"
        className="flex-1 outline-none text-corporate-slate placeholder:text-gray-400 text-base bg-transparent h-full"
        {...props} 
      />
    </div>
  );
}