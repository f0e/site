import type { PlotOptions } from "@observablehq/plot";
import * as Plot from "@observablehq/plot";
import type { ReactNode } from "react";
import { Document } from "@utils/plotDocument.js";

// For client-side rendering, see https://codesandbox.io/s/plot-react-csr-p4cr7t?file=/src/PlotFigure.jsx
// Based on https://github.com/observablehq/plot/blob/main/docs/components/PlotRender.js

interface PlotFigureProperties {
  options?: PlotOptions;
}

export default function PlotFigure({ options }: PlotFigureProperties) {
  const figure = Plot.plot({
    ...options,
    document: new Document() as unknown as globalThis.Document,
  });

  // the fake document's elements render themselves to react elements
  return (figure as unknown as { toHyperScript(): ReactNode }).toHyperScript();
}
