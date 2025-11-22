// Mock API service for cloud prediction
// Replace this with actual API endpoint when backend is ready

export interface PredictionRequest {
  cpuRequest: string;
  memoryRequest: string;
  priority: string;
  schedulingClass: string;
  currentCpuUsage: string;
  currentMemoryUsage: string;
  forecastHorizon: string;
}

export interface PredictionResponse {
  cpu_next: number;
  mem_next: number;
  cost_next: number;
  sla_risk: number;
  shap_summary_plot?: string;
  shap_local_plot?: string;
  feature_contributions?: Record<string, number>;
  blackbox_pred: { cpu: number; mem: number };
  whitebox_pred: { cpu: number; mem: number };
  shap_times: { blackbox: number; whitebox: number };
}

const mockPredictionResponse = (): PredictionResponse => {
  // Generate realistic mock data with some randomness
  const cpuNext = 55 + Math.random() * 20;
  const memNext = 65 + Math.random() * 20;
  const cost = 10 + Math.random() * 15;
  const slaRisk = Math.random() * 0.4;

  return {
    cpu_next: cpuNext,
    mem_next: memNext,
    cost_next: cost,
    sla_risk: slaRisk,
    feature_contributions: {
      "CPU Request": 0.234,
      "Memory Request": 0.189,
      "Current CPU Usage": 0.156,
      "Priority": -0.087,
      "Scheduling Class": -0.045,
      "Current Memory Usage": 0.098,
    },
    blackbox_pred: { cpu: cpuNext, mem: memNext },
    whitebox_pred: { cpu: cpuNext - 3.4, mem: memNext - 4.1 },
    shap_times: { blackbox: 320, whitebox: 120 },
  };
};

export const predict = async (data: PredictionRequest): Promise<PredictionResponse> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // In production, replace with actual API call:
  // const response = await fetch('/api/predict', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // return response.json();

  return mockPredictionResponse();
};
