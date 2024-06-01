import { useEffect } from "react";

const GraphingCalculator = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.desmos.com/api/v1.6/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
    script.async = true;
    script.onload = () => {
      const elt = document.createElement("div");
      elt.style.width = "600px";
      elt.style.height = "400px";
      const calculator = Desmos.GraphingCalculator(elt);
      calculator.setExpression({ id: "graph1", latex: "y=x^2" });

      const eldaft = document.getElementById("calculator-container");
      if (eldaft) {
        eldaft.appendChild(elt);
      }
    };
    document.body.appendChild(script);
  }, []);

  return <div id="calculator-container"></div>;
};

export default GraphingCalculator;
