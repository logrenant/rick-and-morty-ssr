import { Filters } from "@/components/Filters";
import { CharacterList } from "@/components/CharacterList";
import { Suspense } from "react";
import { PaginationComponent } from "@/components/Pagination";

export default function Home() {
  return (
    <div className="dark">
      <Filters />
      <Suspense fallback={<div>Loading filters...</div>}>
        <CharacterList />
      </Suspense>
      <PaginationComponent />
    </div>
  );
}
