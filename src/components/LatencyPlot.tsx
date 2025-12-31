import * as Plot from "@observablehq/plot";

import PlotFigure from "@components/PlotFigure";

interface LatencyPlotProps {
  data?: Plot.Data;
  alt?: string;
}

export default function LatencyPlot({ data, alt }: LatencyPlotProps) {
  return (
    <>
      <PlotFigure
        options={{
          marginLeft: 300,
          x: {
            grid: true,
            tickFormat: (ms: number) => `${ms}ms~`,
            label: null,
          },
          y: {
            label: null,
          },
          marks: [
            Plot.barX(data, {
              y: "label",
              x: "latency",
              sort: { y: "x" },
            }),
          ],
        }}
      />

      {alt && <p className="text-center text-xs opacity-50 mt-2">{alt}</p>}
    </>
  );
}
