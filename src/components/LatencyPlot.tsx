import * as Plot from "@observablehq/plot";

import PlotFigure from "@components/PlotFigure";

interface LatencyPlotProps {
  data?: Plot.Data;
  alt?: string;
}

export default function LatencyPlot({ data, alt }: LatencyPlotProps) {
  if (!data)
    return <></>;

  return (
    <>
      <PlotFigure
        options={{
          marginLeft: 350,
          marginRight: 40,
          marks: [
            Plot.barX(data, {
              y: "label",
              x: "latency",
              sort: { y: "x" },
            }),
            Plot.text(data, {
              x: "latency",
              y: "label",
              text: (data) => data["latency"] + "ms",
              textAnchor: "start",
              dx: 5,
              sort: { y: "x" }
            }),
            Plot.axisX({
              anchor: "bottom", fontSize: "1.3em", label: null, ticks: []
            }),
            Plot.axisY({ anchor: "left", fontSize: "1.3em", label: null }),
            Plot.gridX(),
          ],
        }}
      />

      {alt && <p className="text-center text-xs opacity-50 mt-2">{alt}</p>}
    </>
  );
}
