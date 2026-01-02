import PlotFigure from "@components/PlotFigure";
import * as Plot from "@observablehq/plot";

interface LatencyPlotProperties {
  data?: Plot.Data;
  alt?: string;
  height: number;
}

export default function LatencyPlot({
  data,
  alt,
  height,
}: LatencyPlotProperties) {
  if (!data) return <></>;

  const fontConfig = {
    monospace: true,
    fontFamily: "Saira Semi Condensed, system-ui, sans-serif",
    fontSize: "1.6em",
    lineHeight: 1.3,
  };

  return (
    <>
      <PlotFigure
        options={{
          marginLeft: 280,
          marginRight: 60,
          height,
          // marginBottom: 52,
          marks: [
            Plot.barX(data, {
              y: "label",
              x: "latency",
              sort: { y: "x" },
              insetTop: 5,
              insetBottom: 5,
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
            }),
            Plot.gridX(),
          ],
        }}
      />

      {alt && <p className="mt-2 text-center text-xs opacity-50">{alt}</p>}
    </>
  );
}
