import ComingSoon from "@/components/ComingSoon";
import { Flow } from "@/components/pathways-graph/Graph";
import { Providers } from "@/components/pathways-graph/Providers";



export default function Page() {
  return (
    <div className="h-full">
      <Providers>
        <Flow />
      </Providers>
    </div>
  );
}
