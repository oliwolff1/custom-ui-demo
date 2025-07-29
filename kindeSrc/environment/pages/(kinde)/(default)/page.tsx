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
            baseBackgroundColor: "#f8fafc",
            baseLinkColor: "#374151",
            buttonBorderRadius: "0.5rem",
            primaryButtonBackgroundColor: "#374151",
            primaryButtonColor: "#ffffff",
            inputBorderRadius: "0.5rem"
          })}}
          `}
        </style>
        <style nonce={getKindeNonce()}>
          {`
            :root {
                --kinde-base-color: #374151;
                --kinde-base-font-family: -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, Segoe UI, Roboto, sans-serif;
            }

            body {
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #87ceeb 0%, #b0e0e6 50%, #87ceeb 100%);
                position: relative;
                min-height: 100vh;
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
                    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
                    radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.25) 0%, transparent 50%);
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
                    linear-gradient(90deg, transparent 49%, rgba(255, 255, 255, 0.1) 50%, transparent 51%),
                    linear-gradient(0deg, transparent 49%, rgba(255, 255, 255, 0.1) 50%, transparent 51%);
                background-size: 50px 50px;
                pointer-events: none;
            }

            [data-kinde-control-select-text]{
                background-color: #f9fafb;
            }

            .c-container {
                padding: 1.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                position: relative;
                z-index: 1;
            }

            .c-widget {
                max-width: 400px;
                width: 100%;
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
                border-radius: 1rem;
                padding: 2.5rem;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .c-widget h1 {
                font-size: 1.875rem;
                font-weight: 700;
                color: #374151;
                margin: 0 0 0.5rem 0;
                text-align: center;
            }

            .c-widget p {
                color: #6b7280;
                font-size: 0.875rem;
                line-height: 1.5;
                margin: 0 0 2rem 0;
                text-align: left;
            }

            /* Hide logo and icon */
            [data-kinde-logo],
            [data-kinde-icon],
            [data-kinde-logo-container] {
                display: none !important;
            }

            /* Hide social login buttons */
            [data-kinde-social-login],
            [data-kinde-social-login-container],
            [data-kinde-social-login-button] {
                display: none !important;
            }

            /* Style form elements */
            [data-kinde-input] {
                background-color: #f9fafb !important;
                border: 1px solid #e5e7eb !important;
                border-radius: 0.5rem !important;
                color: #374151 !important;
                padding: 0.75rem 1rem !important;
                font-size: 0.875rem !important;
            }

            [data-kinde-input]::placeholder {
                color: #9ca3af !important;
            }

            [data-kinde-button] {
                background-color: #374151 !important;
                color: #ffffff !important;
                border-radius: 0.5rem !important;
                padding: 0.75rem 1.5rem !important;
                font-weight: 600 !important;
                border: none !important;
                width: 100% !important;
                margin-top: 1rem !important;
            }

            [data-kinde-button]:hover {
                background-color: #4b5563 !important;
            }

            /* Style links */
            [data-kinde-link] {
                color: #374151 !important;
                text-decoration: none !important;
                font-size: 0.875rem !important;
            }

            [data-kinde-link]:hover {
                text-decoration: underline !important;
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