import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, Database, DollarSign, AlertTriangle } from "lucide-react";

interface PredictionPanelProps {
  data: {
    cpu_next: number;
    mem_next: number;
    cost_next: number;
    sla_risk: number;
  } | null;
}

const PredictionPanel = ({ data }: PredictionPanelProps) => {
  if (!data) {
    return (
      <Card className="shadow-card">
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Run a prediction to see results</p>
        </CardContent>
      </Card>
    );
  }

  const metrics = [
    {
      title: "CPU Usage",
      value: `${data.cpu_next.toFixed(1)}%`,
      icon: Cpu,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Memory Usage",
      value: `${data.mem_next.toFixed(1)}%`,
      icon: Database,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Predicted Cost",
      value: `$${data.cost_next.toFixed(2)}`,
      icon: DollarSign,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "SLA Risk",
      value: `${(data.sla_risk * 100).toFixed(1)}%`,
      icon: AlertTriangle,
      color: data.sla_risk > 0.5 ? "text-destructive" : "text-muted-foreground",
      bgColor: data.sla_risk > 0.5 ? "bg-destructive/10" : "bg-muted",
    },
  ];

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">Predictions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="shadow-card hover:shadow-hover transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className={`text-2xl sm:text-3xl font-bold ${metric.color}`}>{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PredictionPanel;
