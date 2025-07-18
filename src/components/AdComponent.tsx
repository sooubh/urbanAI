import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { CSSProperties } from 'react';

// Define the properties (props) the component will accept
interface AdComponentProps {
  adSlot: string; // The unique ID for this specific ad unit
  style?: CSSProperties; // Optional inline styles for the ad container
  adFormat?: string; // Optional ad format, defaults to 'auto'
}

/**
 * A reusable React component for displaying Google AdSense ads,
 * optimized for Single Page Applications (SPAs).
 * It automatically fetches a new ad on every route change.
 */
function AdComponent({
  adSlot,
  style = { display: 'block', textAlign: 'center' }, // Default style is important
  adFormat = 'auto', // 'auto' is flexible for responsive sites
}: AdComponentProps) {
  const location = useLocation();

  useEffect(() => {
    // This effect runs on initial render and whenever the URL path changes.
    try {
      // Check if the AdSense script has loaded and is available on the window
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        // Push an ad request to AdSense's queue
        (window as any).adsbygoogle.push({});
      }
    } catch (e) {
      console.error('Error pushing new AdSense ad:', e);
    }
  }, [location.pathname]); // The dependency array is key: this effect re-runs on route change

  // The outer div with a `key` is crucial. It tells React to re-render this
  // component as a fresh instance on route change, preventing issues with
  // old ad states.
  return (
    <div key={location.pathname} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5679157789923101"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default AdComponent; 