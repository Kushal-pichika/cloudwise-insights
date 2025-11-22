import { useState, useEffect } from "react";
import ShapExplanation from "@/components/ShapExplanation";
import { predict, PredictionResponse } from "@/services/api";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const Explainability = () => {
  const [explanationData, setExplanationData] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const loadSampleExplanation = async () => {
    setLoading(true);
    try {
      // Generate sample prediction to get explanation data
      const sampleData = {
        cpuRequest: "2.5",
        memoryRequest: "8.0",
        priority: "3",
        schedulingClass: "1",
        currentCpuUsage: "65.0",
        currentMemoryUsage: "72.0",
        forecastHorizon: "30min",
      };
      const result = await predict(sampleData);
      setExplanationData(result);
    } catch (error) {
      console.error("Failed to load explanation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSampleExplanation();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-foreground">Explainability Analysis</h1>
            <p className="text-muted-foreground">
              Understanding model predictions through SHAP values
            </p>
          </div>
          <Button onClick={loadSampleExplanation} disabled={loading} variant="outline">
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh Sample
          </Button>
        </div>

        <ShapExplanation
          summaryPlot={explanationData?.shap_summary_plot}
          localPlot={explanationData?.shap_local_plot}
          featureContributions={explanationData?.feature_contributions}
        />
      </div>
    </div>
  );
};

export default Explainability;
