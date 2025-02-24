"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useCharacterStore } from "@/store/useCharacterStore";

export const Filters = () => {
  const { filters, setFilters } = useCharacterStore();

  const handleChange = (type: "status" | "gender") => (value: string) => {
    const newFilters = { ...filters };
    if (value === "all") {
      delete newFilters[type];
    } else {
      newFilters[type] = value;
    }
    setFilters(newFilters);
  };

  return (
    <div className="flex gap-4 p-4 lg:px-8">
      <Select
        value={filters.status || "all"}
        onValueChange={handleChange("status")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="alive">Alive</SelectItem>
          <SelectItem value="dead">Dead</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={filters.gender || "all"}
        onValueChange={handleChange("gender")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genders</SelectItem>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
