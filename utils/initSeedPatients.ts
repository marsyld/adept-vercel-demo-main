import { seedPatients } from "./seedPatients";

export function initSeedPatients() {
  if (typeof window === "undefined") return;

  const exists = localStorage.getItem("ADEPT_PATIENTS");

  if (!exists) {
    localStorage.setItem("ADEPT_PATIENTS", JSON.stringify(seedPatients));
  }
}
