import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ShapExplanationProps {
  summaryPlot?: string;
  localPlot?: string;
  featureContributions?: Record<string, number>;
}

const ShapExplanation = ({ summaryPlot, localPlot, featureContributions }: ShapExplanationProps) => {
  const getTopFeatures = (contributions: Record<string, number>, isPositive: boolean) => {
    const sorted = Object.entries(contributions).sort((a, b) => (isPositive ? b[1] - a[1] : a[1] - b[1]));
    return sorted.slice(0, 3);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-foreground">Explainability (SHAP)</h1>
        <p className="text-muted-foreground">
          Understanding how features influence predictions using SHAP values
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card hover:shadow-hover transition-shadow">
          <CardHeader>
            <CardTitle>Global Feature Importance</CardTitle>
            <CardDescription>Overall impact of features across all predictions</CardDescription>
          </CardHeader>
          <CardContent>
            {summaryPlot ? (
              <img src={summaryPlot} alt="SHAP Summary Plot" className="w-full rounded-lg border border-border" />
            ) : (
              <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                <p className="text-muted-foreground">No global plot available</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-shadow">
          <CardHeader>
            <CardTitle>Local Explanation</CardTitle>
            <CardDescription>Feature contributions for current prediction</CardDescription>
          </CardHeader>
          <CardContent>
            {localPlot ? (
              <img src={localPlot} alt="SHAP Local Plot" className="w-full rounded-lg border border-border" />
            ) : (
              <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                <p className="text-muted-foreground">No local plot available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {featureContributions && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Feature Contributions</CardTitle>
            <CardDescription>Top positive and negative contributors to the prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-primary mb-3">Top Positive Contributors</h3>
                <div className="space-y-2">
                  {getTopFeatures(featureContributions, true).map(([feature, value]) => (
                    <div key={feature} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                      <span className="text-sm font-medium text-foreground">{feature}</span>
                      <span className="text-sm font-bold text-primary">+{value.toFixed(3)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-destructive mb-3">Top Negative Contributors</h3>
                <div className="space-y-2">
                  {getTopFeatures(featureContributions, false).map(([feature, value]) => (
                    <div key={feature} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg">
                      <span className="text-sm font-medium text-foreground">{feature}</span>
                      <span className="text-sm font-bold text-destructive">{value.toFixed(3)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ShapExplanation;
