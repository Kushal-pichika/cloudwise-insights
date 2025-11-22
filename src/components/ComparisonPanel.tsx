import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Clock, Cpu, Database } from "lucide-react";

interface ComparisonPanelProps {
  data: {
    blackbox_pred: { cpu: number; mem: number };
    whitebox_pred: { cpu: number; mem: number };
    shap_times: { blackbox: number; whitebox: number };
  } | null;
}

const ComparisonPanel = ({ data }: ComparisonPanelProps) => {
  if (!data) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Model Comparison</h1>
          <p className="text-muted-foreground">
            Comparing black-box and white-box model predictions
          </p>
        </div>
        <Card className="shadow-card">
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Run a prediction to see comparison</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const cpuDiff = Math.abs(data.blackbox_pred.cpu - data.whitebox_pred.cpu);
  const memDiff = Math.abs(data.blackbox_pred.mem - data.whitebox_pred.mem);
  const timeDiff = data.shap_times.blackbox - data.shap_times.whitebox;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-foreground">Model Comparison</h1>
        <p className="text-muted-foreground">
          Trade-offs between performance and interpretability
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card hover:shadow-hover transition-shadow border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Black-Box Model</CardTitle>
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                Higher Accuracy
              </div>
            </div>
            <CardDescription>Complex ensemble model with deep learning</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">CPU Prediction</span>
              </div>
              <span className="text-xl font-bold text-primary">{data.blackbox_pred.cpu.toFixed(1)}%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Memory Prediction</span>
              </div>
              <span className="text-xl font-bold text-primary">{data.blackbox_pred.mem.toFixed(1)}%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Explanation Time</span>
              </div>
              <span className="text-xl font-bold text-primary">{data.shap_times.blackbox} ms</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-shadow border-secondary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>White-Box Model</CardTitle>
              <div className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                Faster Explanation
              </div>
            </div>
            <CardDescription>Interpretable linear model with rule sets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">CPU Prediction</span>
              </div>
              <span className="text-xl font-bold text-secondary">{data.whitebox_pred.cpu.toFixed(1)}%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">Memory Prediction</span>
              </div>
              <span className="text-xl font-bold text-secondary">{data.whitebox_pred.mem.toFixed(1)}%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">Explanation Time</span>
              </div>
              <span className="text-xl font-bold text-secondary">{data.shap_times.whitebox} ms</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card bg-gradient-card">
        <CardHeader>
          <CardTitle>Analysis Summary</CardTitle>
          <CardDescription>Key differences between model types</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-card rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">CPU Difference</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">{cpuDiff.toFixed(1)}%</p>
            </div>

            <div className="p-4 bg-card rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Memory Difference</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">{memDiff.toFixed(1)}%</p>
            </div>

            <div className="p-4 bg-card rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Time Saved</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold text-accent">{timeDiff} ms</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonPanel;
