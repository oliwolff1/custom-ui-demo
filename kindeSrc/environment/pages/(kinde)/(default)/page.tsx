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
            baseBackgroundColor: "#87CEEB",
            baseLinkColor: "#2a2a2a",
            buttonBorderRadius: "0.5rem",
            primaryButtonBackgroundColor: "#2a2a2a",
            primaryButtonColor: "#ffffff",
            inputBorderRadius: "0.5rem"
          })}}
          `}
        </style>
        <style nonce={getKindeNonce()}>
          {`
            :root {
                --kinde-base-color: #2a2a2a;
                --kinde-base-font-family: -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, Segoe UI, Roboto, sans-serif;
                --kinde-card-background: rgba(255, 255, 255, 0.9);
                --kinde-card-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                --kinde-backdrop-blur: blur(20px);
                --kinde-grid-color: rgba(255, 255, 255, 0.1);
            }

            body {
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #87CEEB 0%, #98D8E8 50%, #B0E0E6 100%);
                background-attachment: fixed;
                position: relative;
                overflow-x: hidden;
            }

            body::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
                    radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.25) 0%, transparent 50%);
                pointer-events: none;
                z-index: 1;
            }

            body::after {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    linear-gradient(90deg, var(--kinde-grid-color) 1px, transparent 1px),
                    linear-gradient(0deg, var(--kinde-grid-color) 1px, transparent 1px);
                background-size: 50px 50px;
                background-position: center center;
                pointer-events: none;
                z-index: 2;
            }

            [data-kinde-control-select-text]{
                background-color: #f8f9fa;
            }

            .c-container {
                padding: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                position: relative;
                z-index: 10;
            }

            .c-widget {
                max-width: 450px;
                width: 100%;
                background: var(--kinde-card-background);
                backdrop-filter: var(--kinde-backdrop-blur);
                -webkit-backdrop-filter: var(--kinde-backdrop-blur);
                border-radius: 1rem;
                box-shadow: var(--kinde-card-shadow);
                padding: 2.5rem;
                position: relative;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .c-widget h1 {
                font-size: 1.75rem;
                font-weight: 700;
                color: var(--kinde-base-color);
                margin: 0 0 0.75rem 0;
                text-align: center;
            }

            .c-widget p {
                font-size: 0.95rem;
                color: var(--kinde-secondary-text-color);
                margin: 0 0 2rem 0;
                line-height: 1.5;
                text-align: left;
            }

            /* Hide password field and social logins */
            [data-kinde-control="password"],
            [data-kinde-control="social-login"],
            [data-kinde-control="divider"],
            [data-kinde-control="forgot-password"] {
                display: none !important;
            }

            /* Style the email input */
            [data-kinde-control="email"] input {
                background-color: #f8f9fa !important;
                border: 1px solid #e9ecef !important;
                border-radius: 0.5rem !important;
                padding: 0.75rem 1rem !important;
                font-size: 1rem !important;
                color: #2a2a2a !important;
                transition: all 0.2s ease !important;
            }

            [data-kinde-control="email"] input:focus {
                outline: none !important;
                border-color: #2a2a2a !important;
                box-shadow: 0 0 0 3px rgba(42, 42, 42, 0.1) !important;
            }

            [data-kinde-control="email"] input::placeholder {
                color: #6c757d !important;
            }

            /* Style the submit button */
            [data-kinde-control="submit"] button {
                background-color: #2a2a2a !important;
                color: #ffffff !important;
                border: none !important;
                border-radius: 0.5rem !important;
                padding: 0.875rem 1.5rem !important;
                font-size: 1rem !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                width: 100% !important;
                margin-top: 1.5rem !important;
            }

            [data-kinde-control="submit"] button:hover {
                background-color: #1a1a1a !important;
                transform: translateY(-1px) !important;
                box-shadow: 0 4px 12px rgba(42, 42, 42, 0.2) !important;
            }

            [data-kinde-control="submit"] button:active {
                transform: translateY(0) !important;
            }

            /* Responsive design */
            @media (max-width: 480px) {
                .c-container {
                    padding: 1rem;
                }
                
                .c-widget {
                    padding: 2rem;
                    max-width: 100%;
                }
                
                .c-widget h1 {
                    font-size: 1.5rem;
                }
            }
          `}
        </style>
      </head>
      <body>
        <div data-kinde-root="/admin" className="c-container">
          <main>
            <div className="c-widget">
              <h1>{context.widget.content.heading}</h1>
              <p>{context.widget.content.description}</p>
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