import React, { useRef, useEffect } from "react";
import { Markmap } from "markmap-view";
import { Transformer } from "markmap-lib";

interface MarkmapProps {
  value: string;
  height?: string;
}

const MarkmapComponent: React.FC<MarkmapProps> = ({
  value,
  height = "400px",
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const mmRef = useRef<Markmap>();

  useEffect(() => {
    if (svgRef.current) {
      const transformer = new Transformer();
      const { root } = transformer.transform(value);

      if (!mmRef.current) {
        mmRef.current = Markmap.create(svgRef.current);
      }

      mmRef.current.setData(root);
      mmRef.current.fit();
    }
  }, [value]);

  return (
    <div style={{ width: "100%", height }}>
      <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default MarkmapComponent;
