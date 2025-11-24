import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface InputPanelProps {
  onPredict: (data: any) => void;
  loading: boolean;
}

const InputPanel = ({ onPredict, loading }: InputPanelProps) => {
  const [formData, setFormData] = useState({
    cpuRequest: "",
    memoryRequest: "",
    priority: "",
    schedulingClass: "",
    currentCpuUsage: "",
    currentMemoryUsage: "",
    forecastHorizon: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert values to correct types before sending to backend
    const payload = {
      cpuRequest: Number(formData.cpuRequest),
      memoryRequest: Number(formData.memoryRequest),
      priority: Number(formData.priority),
      schedulingClass: Number(formData.schedulingClass),
      currentCpuUsage: Number(formData.currentCpuUsage),
      currentMemoryUsage: Number(formData.currentMemoryUsage),
      forecastHorizon: formData.forecastHorizon, // Already correct string
    };

    onPredict(payload);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-card hover:shadow-hover transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">Resource Configuration</CardTitle>
        <CardDescription>Enter cloud resource parameters for prediction</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* CPU Request */}
            <div className="space-y-2">
              <Label htmlFor="cpuRequest">CPU Request (cores)</Label>
              <Input
                id="cpuRequest"
                type="number"
                step="0.1"
                placeholder="e.g., 2.5"
                value={formData.cpuRequest}
                onChange={(e) => handleChange("cpuRequest", e.target.value)}
                required
              />
            </div>

            {/* Memory Request */}
            <div className="space-y-2">
              <Label htmlFor="memoryRequest">Memory Request (GB)</Label>
              <Input
                id="memoryRequest"
                type="number"
                step="0.1"
                placeholder="e.g., 8"
                value={formData.memoryRequest}
                onChange={(e) => handleChange("memoryRequest", e.target.value)}
                required
              />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleChange("priority", value)}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {[0,1,2,3,4,5].map((p) => (
                    <SelectItem key={p} value={p.toString()}>
                      Priority {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Scheduling Class */}
            <div className="space-y-2">
              <Label htmlFor="schedulingClass">Scheduling Class</Label>
              <Select
                value={formData.schedulingClass}
                onValueChange={(value) => handleChange("schedulingClass", value)}
              >
                <SelectTrigger id="schedulingClass">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {[0,1,2,3].map((c) => (
                    <SelectItem key={c} value={c.toString()}>
                      Class {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Current CPU Usage */}
            <div className="space-y-2">
              <Label htmlFor="currentCpuUsage">Current CPU Usage (%)</Label>
              <Input
                id="currentCpuUsage"
                type="number"
                step="0.1"
                placeholder="e.g., 65.5"
                value={formData.currentCpuUsage}
                onChange={(e) => handleChange("currentCpuUsage", e.target.value)}
                required
              />
            </div>

            {/* Current Memory Usage */}
            <div className="space-y-2">
              <Label htmlFor="currentMemoryUsage">Current Memory Usage (%)</Label>
              <Input
                id="currentMemoryUsage"
                type="number"
                step="0.1"
                placeholder="e.g., 72.3"
                value={formData.currentMemoryUsage}
                onChange={(e) => handleChange("currentMemoryUsage", e.target.value)}
                required
              />
            </div>

          </div>

          {/* Forecast Horizon */}
          <div className="space-y-2">
            <Label htmlFor="forecastHorizon">Forecast Horizon</Label>
            <Select
              value={formData.forecastHorizon}
              onValueChange={(value) => handleChange("forecastHorizon", value)}
            >
              <SelectTrigger id="forecastHorizon">
                <SelectValue placeholder="Select time horizon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5min">Next 5 minutes</SelectItem>
                <SelectItem value="30min">Next 30 minutes</SelectItem>
                <SelectItem value="1hour">Next 1 hour</SelectItem>
                <SelectItem value="2hours">Next 2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-gradient-primary" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Predict"
            )}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
};

export default InputPanel;
