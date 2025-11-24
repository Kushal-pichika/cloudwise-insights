export interface PredictionRequest {
  cpuRequest: string;
  memoryRequest: string;
  priority: string;
  schedulingClass: string;
  currentCpuUsage: string;
  currentMemoryUsage: string;
  forecastHorizon: string;  // "5min" | "30min" | "1hour" | "2hours"
}

export interface PredictionResponse {
  cpu_next: number;
  mem_next: number;
  cost_next: number;
  sla_risk: number;

  // OPTIONAL FIELDS (Future SHAP integration)
  shap_summary_plot?: string;
  shap_local_plot?: string;
  feature_contributions?: Record<string, number>;

  // OPTIONAL: future model comparison
  blackbox_pred?: { cpu: number; mem: number };
  whitebox_pred?: { cpu: number; mem: number };
  shap_times?: { blackbox: number; whitebox: number };
}

export const predict = async (
  data: PredictionRequest
): Promise<PredictionResponse> => {
  try {
    const payload = {
      cpuRequest: Number(data.cpuRequest),
      memoryRequest: Number(data.memoryRequest),
      priority: Number(data.priority),
      schedulingClass: Number(data.schedulingClass),
      currentCpuUsage: Number(data.currentCpuUsage),
      currentMemoryUsage: Number(data.currentMemoryUsage),
      forecastHorizon: data.forecastHorizon,
    };

    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Backend error: " + response.statusText);
    }

    const backend = await response.json();

    // Convert backend response → UI structure
    return {
      cpu_next: backend.predicted_cpu,
      mem_next: backend.predicted_memory,
      cost_next: backend.predicted_cost,
      sla_risk: backend.sla_violation,

      // PLACEHOLDERS (Add later)
      feature_contributions: {},
      blackbox_pred: undefined,
      whitebox_pred: undefined,
      shap_times: undefined,
    };
  } catch (error) {
    console.error("Prediction API error:", error);
    throw error;
  }
};
