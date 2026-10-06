import type { DieValue } from "./faces";
import { totalOf } from "./faces";

export type RollPhase = "READY" | "ROLLING" | "SETTLING" | "COMPLETE" | "UNRESOLVED";

export interface RollRecord {
  id: string;
  timestamp: string;
  count: number;
  values: DieValue[];
  total: number;
}

export function makeRollRecord(values: DieValue[], timestamp = new Date()): RollRecord {
  if (values.length < 1 || values.length > 4 || values.some((value) => value < 1 || value > 6)) {
    throw new Error("A roll requires one to four valid D6 results.");
  }
  return { id: crypto.randomUUID(), timestamp: timestamp.toISOString(), count: values.length, values: [...values], total: totalOf(values) };
}

export function formatRoll(record: Pick<RollRecord, "values" | "total">): string {
  return `${record.values.join(" + ")} = ${record.total}`;
}

export function canStartRoll(phase: RollPhase): boolean {
  return phase === "READY" || phase === "COMPLETE" || phase === "UNRESOLVED";
}
