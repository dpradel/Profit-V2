import { useEffect, useRef, useState } from "react";

/* Scales its children uniformly to fit the available box, centered, so
   content built at a fixed pixel size is always shown in full — never
   cropped or reflowed, whatever the container's dimensions are. */
export function ScaleToFit({ children }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const update = () => {
      const availW = outer.clientWidth;
      const availH = outer.clientHeight;
      const naturalW = inner.scrollWidth;
      const naturalH = inner.scrollHeight;
      if (!availW || !availH || !naturalW || !naturalH) return;
      setScale(Math.min(availW / naturalW, availH / naturalH, 1));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outerRef} className="scale-fit">
      <div ref={innerRef} className="scale-fit-inner" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
