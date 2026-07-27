import { SVGProps } from "react";

/**
 * Citadelle's mark combines a protective outer C with the battlements and
 * arched entrance of a citadel. It remains legible at small interface sizes.
 */
export function CitadelleLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M37.8 12.9A18 18 0 1 0 38 34.8"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <path
        d="M17 20v-6h5v3h4v-3h5v6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M17 20h14v14H17V20Z"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M21 34v-5.5a3 3 0 0 1 6 0V34"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path d="M21 23.5h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
