import type { ChartDatum, InputChange, ApiListResult } from "@/types/common";

// compile-time checks (no runtime)
const d: ChartDatum = { name: "Jan", value: 1 };
const list: ApiListResult<ChartDatum> = { items: [d], total: 1 };

function acceptsInputChange(e: InputChange) {
  return e.target.name && e.target.value; // type checks
}
