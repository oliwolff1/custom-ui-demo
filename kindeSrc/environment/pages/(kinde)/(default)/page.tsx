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
            baseLinkColor: "#1e293b",
            buttonBorderRadius: "0.75rem",
            primaryButtonBackgroundColor: "#1e293b",
            primaryButtonColor: "#ffffff",
            inputBorderRadius: "0.75rem"
          })}}
          `}
        </style>
        <style nonce={getKindeNonce()}>
          {`
            :root {
                --kinde-base-color: #1e293b;
                --kinde-base-font-family: -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, Segoe UI, Roboto, sans-serif;
                --kinde-base-background-color: #f8fafc;
                --kinde-input-background-color: #ffffff;
                --kinde-input-border-color: #e2e8f0;
                --kinde-input-text-color: #1e293b;
                --kinde-input-placeholder-color: #64748b;
                --kinde-button-background-color: #1e293b;
                --kinde-button-text-color: #ffffff;
                --kinde-button-hover-background-color: #334155;
                --kinde-button-hover-text-color: #ffffff;
                --kinde-link-color: #1e293b;
                --kinde-heading-color: #1e293b;
                --kinde-description-color: #64748b;
            }

            body {
                background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #f8fafc 100%);
                margin: 0;
                font-family: var(--kinde-base-font-family);
            }

            .c-container {
              padding: 2rem;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='clouds' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='20' cy='30' r='8' fill='rgba(255,255,255,0.3)'/%3E%3Ccircle cx='80' cy='60' r='12' fill='rgba(255,255,255,0.2)'/%3E%3Ccircle cx='40' cy='80' r='6' fill='rgba(255,255,255,0.4)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23clouds)'/%3E%3C/svg%3E");
            }

            .c-widget {
                max-width: 400px;
                width: 100%;
                margin: 0 auto;
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
                border-radius: 1rem;
                padding: 2.5rem;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .c-widget h1 {
                color: var(--kinde-heading-color);
                font-size: 1.875rem;
                font-weight: 700;
                text-align: center;
                margin-bottom: 0.5rem;
                margin-top: 0;
            }

            .c-widget p {
                color: var(--kinde-description-color);
                text-align: center;
                margin-bottom: 2rem;
                font-size: 0.875rem;
                line-height: 1.5;
            }

            /* Hide password field */
            [data-kinde-control="password"] {
                display: none !important;
            }

            /* Style email field */
            [data-kinde-control="email"] {
                margin-bottom: 1.5rem;
            }

            /* Style input fields */
            [data-kinde-control] input {
                background-color: var(--kinde-input-background-color) !important;
                border: 1px solid var(--kinde-input-border-color) !important;
                border-radius: 0.75rem !important;
                color: var(--kinde-input-text-color) !important;
                padding: 0.75rem 1rem !important;
                font-size: 0.875rem !important;
                transition: all 0.2s ease !important;
            }

            [data-kinde-control] input::placeholder {
                color: var(--kinde-input-placeholder-color) !important;
            }

            [data-kinde-control] input:focus {
                outline: none !important;
                border-color: #3b82f6 !important;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
            }

            /* Style buttons */
            [data-kinde-control="submit"] button,
            [data-kinde-control="submit"] input[type="submit"] {
                background-color: var(--kinde-button-background-color) !important;
                color: var(--kinde-button-text-color) !important;
                border: none !important;
                border-radius: 0.75rem !important;
                padding: 0.75rem 1.5rem !important;
                font-size: 0.875rem !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                width: 100% !important;
                margin-top: 1rem !important;
            }

            [data-kinde-control="submit"] button:hover,
            [data-kinde-control="submit"] input[type="submit"]:hover {
                background-color: var(--kinde-button-hover-background-color) !important;
                color: var(--kinde-button-hover-text-color) !important;
            }

            /* Style links */
            [data-kinde-control] a {
                color: var(--kinde-link-color) !important;
                text-decoration: none !important;
                font-size: 0.875rem !important;
            }

            [data-kinde-control] a:hover {
                text-decoration: underline !important;
            }

            /* Hide any logo elements */
            [data-kinde-control="logo"],
            .kinde-logo,
            img[alt*="logo"],
            img[alt*="Logo"] {
                display: none !important;
            }
          `}
        </style>
      </head>
      <body>
        <div data-kinde-root="/admin" class="c-container">
          <main>
            <div class="c-widget">
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