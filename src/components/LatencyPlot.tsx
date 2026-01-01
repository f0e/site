import * as Plot from "@observablehq/plot";

import PlotFigure from "@components/PlotFigure";

interface LatencyPlotProps {
  data?: Plot.Data;
  alt?: string;
  height: number;
}

export default function LatencyPlot({ data, alt, height }: LatencyPlotProps) {
  if (!data) return <></>;

  const fontConfig = {
    monospace: true,
    fontFamily: "Menlo, monospace",
    fontSize: "1.15em",
  };

  return (
    <>
      <PlotFigure
        options={{
          marginLeft: 280,
          marginRight: 50,
          height,
          // marginBottom: 52,
          marks: [
            Plot.barX(data, {
              y: "label",
              x: "latency",
              sort: { y: "x" },
            }),
            Plot.text(data, {
              ...fontConfig,
              x: "latency",
              y: "label",
              text: (data) => data["latency"] + "ms~",
              textAnchor: "start",
              dx: 5,
              sort: { y: "x" },
            }),
            Plot.axisX({
              ...fontConfig,
              anchor: "bottom",
              tickFormat: (ms: number) => ms + "ms~",
              // label: "latency (lower is better)",
              // labelOffset: 43,
              label: null,
              ticks: [],
            }),
            Plot.axisY({
              ...fontConfig,
              anchor: "left",
              label: null,
              // lineWidth: 24,
              lineHeight: 1.22,
            }),
            Plot.gridX(),
          ],
        }}
      />

      {alt && <p className="text-center text-xs opacity-50 mt-2">{alt}</p>}
    </>
  );
}
