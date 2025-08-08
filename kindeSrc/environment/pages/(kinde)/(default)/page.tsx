"use server";

import React from "react";
import { renderToString } from "react-dom/server.browser";
import {
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getKindeNonce,
  getKindeWidget,
  getKindeCSRF,
  getLogoUrl,
  getSVGFaviconUrl,
  setKindeDesignerCustomProperties,
  getKindeRegisterUrl
} from "@kinde/infrastructure";

const Layout = async ({request, context}) => {
  return (
    <html lang={request.locale.lang} dir={request.locale.isRtl ? "rtl" : "ltr"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <meta name="csrf-token" content={getKindeCSRF()} />
        <title>{context.widget.content.page_title}</title>

        <link rel="icon" href={getSVGFaviconUrl()} type="image/svg+xml" />
        {getKindeRequiredCSS()}
        {getKindeRequiredJS()}
        <style nonce={getKindeNonce()}>
          {`:root {
          ${setKindeDesignerCustomProperties({
            baseBackgroundColor: "#e6f3ff",
            baseLinkColor: "#4a5568",
            buttonBorderRadius: "0.75rem",
            primaryButtonBackgroundColor: "#2d3748",
            primaryButtonColor: "#ffffff",
            inputBorderRadius: "0.5rem"
          })}}
          `}
        </style>
        <style nonce={getKindeNonce()}>
          {`
            :root {
                --kinde-base-color: #2d3748;
                --kinde-base-font-family: -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, Segoe UI, Roboto, sans-serif;
            }

            body {
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #87ceeb 0%, #e6f3ff 50%, #f0f8ff 100%);
                min-height: 100vh;
                position: relative;
                overflow-x: hidden;
            }

            body::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: 
                    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
                    radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
                pointer-events: none;
            }

            body::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: 
                    linear-gradient(45deg, transparent 48%, rgba(255, 255, 255, 0.1) 50%, transparent 52%),
                    linear-gradient(-45deg, transparent 48%, rgba(255, 255, 255, 0.05) 50%, transparent 52%);
                background-size: 100px 100px, 80px 80px;
                pointer-events: none;
            }

            .c-container {
                padding: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                position: relative;
                z-index: 1;
            }

            .c-widget {
                width: 100%;
                max-width: 480px;
                background: rgba(255, 255, 255, 0.85);
                backdrop-filter: blur(20px);
                border-radius: 1.5rem;
                padding: 3rem 2.5rem;
                box-shadow: 
                    0 20px 40px rgba(0, 0, 0, 0.1),
                    0 8px 16px rgba(0, 0, 0, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.2);
                position: relative;
            }

            .c-widget::before {
                content: '';
                position: absolute;
                top: -1px;
                left: -1px;
                right: -1px;
                bottom: -1px;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
                border-radius: 1.5rem;
                z-index: -1;
            }

            .header-icon {
                width: 48px;
                height: 48px;
                background: #ffffff;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                font-size: 20px;
                color: #2d3748;
                font-weight: bold;
            }

            .page-title {
                font-size: 2rem;
                font-weight: 700;
                color: #2d3748;
                text-align: center;
                margin: 0 0 0.75rem 0;
                line-height: 1.2;
            }

            .page-description {
                font-size: 1rem;
                color: #718096;
                text-align: center;
                margin: 0 0 2.5rem 0;
                line-height: 1.5;
            }

            /* Hide password field and social logins */
            [data-kinde-control="password"],
            [data-kinde-control="social-login"],
            [data-kinde-control="divider"],
            [data-kinde-control="forgot-password"] {
                display: none !important;
            }

            /* Style email input */
            [data-kinde-control="email"] {
                margin-bottom: 1.5rem;
            }

            [data-kinde-control="email"] input {
                background: #f7fafc !important;
                border: 1px solid #e2e8f0 !important;
                border-radius: 0.5rem !important;
                padding: 0.875rem 1rem 0.875rem 3rem !important;
                font-size: 1rem !important;
                color: #4a5568 !important;
                transition: all 0.2s ease;
            }

            [data-kinde-control="email"] input:focus {
                outline: none !important;
                border-color: #4299e1 !important;
                box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1) !important;
            }

            [data-kinde-control="email"] input::placeholder {
                color: #a0aec0 !important;
            }

            /* Email icon positioning */
            [data-kinde-control="email"] .kinde-input-icon {
                left: 1rem !important;
                color: #4a5568 !important;
            }

            /* Style submit button */
            [data-kinde-control="submit"] button {
                width: 100% !important;
                background: #2d3748 !important;
                color: #ffffff !important;
                border: none !important;
                border-radius: 0.75rem !important;
                padding: 0.875rem 1.5rem !important;
                font-size: 1rem !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                margin-top: 0.5rem !important;
            }

            [data-kinde-control="submit"] button:hover {
                background: #1a202c !important;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(45, 55, 72, 0.2) !important;
            }

            [data-kinde-control="submit"] button:active {
                transform: translateY(0);
            }

            /* Hide any other elements we don't want */
            [data-kinde-control="logo"],
            [data-kinde-control="brand"],
            [data-kinde-control="kinde-logo"],
            .kinde-logo,
            .kinde-brand {
                display: none !important;
            }

            /* Responsive adjustments */
            @media (max-width: 640px) {
                .c-container {
                    padding: 1rem;
                }
                
                .c-widget {
                    padding: 2rem 1.5rem;
                    border-radius: 1rem;
                }
                
                .page-title {
                    font-size: 1.75rem;
                }
                
                .page-description {
                    font-size: 0.9rem;
                }
            }
          `}
        </style>
      </head>
      <body>
        <div data-kinde-root="/admin" className="c-container">
          <main>
            <div className="c-widget">
              <div className="header-icon">→</div>
              <h1 className="page-title">Sign in with email</h1>
              <p className="page-description">Make a new doc to bring your words, data, and teams together. For free</p>
              <div>{getKindeWidget()}</div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
};

export default async function Page(event) {
  const page = await Layout({...event});
  return renderToString(page);
}