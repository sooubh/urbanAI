import { useEffect, useRef, CSSProperties } from "react";

interface AdComponentProps {
  adSlot: string;
  style?: CSSProperties;
}

function AdComponent({ adSlot, style }: AdComponentProps) {
  const adRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      if ((window as any).adsbygoogle && adRef.current) {
        (window as any).adsbygoogle.push({});
      }
    } catch (e) {
      // Optionally handle error
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style || { display: "block" }}
      data-ad-client="ca-pub-5679157789923101"
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      ref={adRef as any}
    ></ins>
  );
}

export default AdComponent; 