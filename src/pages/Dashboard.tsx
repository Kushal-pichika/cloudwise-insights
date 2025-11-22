import { useState } from "react";
import InputPanel from "@/components/InputPanel";
import PredictionPanel from "@/components/PredictionPanel";
import { predict, PredictionResponse } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [predictionData, setPredictionData] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePredict = async (formData: any) => {
    setLoading(true);
    try {
      const result = await predict(formData);
      setPredictionData(result);
      toast({
        title: "Prediction Complete",
        description: "Cloud resource predictions generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate predictions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">
            Cloud Efficiency Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Predictive analytics for cost, workload, and performance optimization
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1">
            <InputPanel onPredict={handlePredict} loading={loading} />
          </div>

          <div className="lg:col-span-2">
            <PredictionPanel data={predictionData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
