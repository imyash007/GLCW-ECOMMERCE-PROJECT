import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_NAME = "Gupta Laser Cutting Works";

export default function SEO({
  title,
  description,
  image,
  url,
  type = "website",
  structuredData,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Premium Laser Cut Products`;
  const canonical =
    url || (typeof window !== "undefined" ? window.location.href : "");

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:alt" content={title || SITE_NAME} />}

      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
      {image && <meta name="twitter:image:alt" content={title || SITE_NAME} />}

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
