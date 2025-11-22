import { useState, useEffect } from "react";
import ComparisonPanel from "@/components/ComparisonPanel";
import { predict, PredictionResponse } from "@/services/api";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const Comparison = () => {
  const [comparisonData, setComparisonData] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const loadSampleComparison = async () => {
    setLoading(true);
    try {
      // Generate sample prediction to get comparison data
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
      setComparisonData(result);
    } catch (error) {
      console.error("Failed to load comparison:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSampleComparison();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">Model Comparison</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Black-box vs White-box model performance
            </p>
          </div>
          <Button onClick={loadSampleComparison} disabled={loading} variant="outline" className="w-full sm:w-auto">
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh Sample
          </Button>
        </div>

        <ComparisonPanel data={comparisonData} />
      </div>
    </div>
  );
};

export default Comparison;
