
import React from 'react';
import { Helmet } from 'react-helmet-async';

export function SecurityHelmet() {
  return (
    <Helmet>
      {/* Basic security headers */}
      <meta http-equiv="X-Content-Type-Options" content="nosniff" />
      <meta http-equiv="X-Frame-Options" content="DENY" />
      <meta http-equiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Content Security Policy */}
      <meta
        http-equiv="Content-Security-Policy"
        content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; media-src 'self'; object-src 'none';"
      />
      
      {/* Referrer Policy */}
      <meta name="referrer" content="no-referrer" />
      
      {/* Feature Policy */}
      <meta
        http-equiv="Permissions-Policy"
        content="camera=(), microphone=(), geolocation=(), interest-cohort=()"
      />
    </Helmet>
  );
}
