"use server";

import React from "react";
import { renderToString } from "react-dom/server.browser";
import {
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getKindeNonce,
  getKindeWidget,
  getKindeCSRF,
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
            baseBackgroundColor: "#e8f4fd",
            baseLinkColor: "#4a5568",
            buttonBorderRadius: "0.5rem",
            primaryButtonBackgroundColor: "#2d3748",
            primaryButtonColor: "#ffffff",
            inputBorderRadius: "0.375rem"
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
                background: linear-gradient(135deg, #87ceeb 0%, #e0f6ff 50%, #f0f8ff 100%);
                min-height: 100vh;
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
                background: 
                    radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%),
                    radial-gradient(circle at 40% 40%, rgba(255,255,255,0.1) 0%, transparent 50%);
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
                background: 
                    linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%),
                    linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%);
                pointer-events: none;
                z-index: 1;
            }

            .c-container {
                padding: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                position: relative;
                z-index: 2;
            }

            .c-widget {
                width: 100%;
                max-width: 480px;
                background: rgba(255, 255, 255, 0.25);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border-radius: 1rem;
                border: 1px solid rgba(255, 255, 255, 0.3);
                box-shadow: 
                    0 8px 32px rgba(0, 0, 0, 0.1),
                    0 4px 16px rgba(0, 0, 0, 0.05);
                padding: 3rem 2rem;
                text-align: center;
                position: relative;
            }

            .c-widget::before {
                content: '';
                position: absolute;
                top: 1.5rem;
                left: 50%;
                transform: translateX(-50%);
                width: 3rem;
                height: 3rem;
                background: #2d3748;
                border-radius: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.25rem;
                font-weight: bold;
            }

            .c-widget::after {
                content: '→';
                position: absolute;
                top: 2.25rem;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                font-size: 1.25rem;
                font-weight: bold;
                z-index: 1;
            }

            .c-widget h1 {
                margin: 4rem 0 1rem 0;
                font-size: 1.875rem;
                font-weight: 700;
                color: #2d3748;
                line-height: 1.2;
            }

            .c-widget p {
                margin: 0 0 2rem 0;
                font-size: 1rem;
                color: #718096;
                line-height: 1.5;
                max-width: 400px;
                margin-left: auto;
                margin-right: auto;
            }

            /* Hide password field and social connections */
            [data-kinde-control="password"],
            [data-kinde-control="social"],
            [data-kinde-control="divider"],
            [data-kinde-control="logo"] {
                display: none !important;
            }

            /* Style the email input field */
            [data-kinde-control="email"] {
                margin-bottom: 1.5rem;
            }

            [data-kinde-control="email"] input {
                background-color: #f7fafc !important;
                border: 1px solid #e2e8f0 !important;
                border-radius: 0.375rem !important;
                color: #4a5568 !important;
                padding: 0.75rem 1rem !important;
                font-size: 1rem !important;
                width: 100% !important;
                box-sizing: border-box !important;
            }

            [data-kinde-control="email"] input::placeholder {
                color: #a0aec0 !important;
            }

            /* Style the submit button */
            [data-kinde-control="submit"] button {
                background-color: #2d3748 !important;
                color: #ffffff !important;
                border: none !important;
                border-radius: 0.5rem !important;
                padding: 0.75rem 2rem !important;
                font-size: 1rem !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                width: 100% !important;
                transition: background-color 0.2s ease !important;
            }

            [data-kinde-control="submit"] button:hover {
                background-color: #1a202c !important;
            }

            /* Hide any remaining logos or branding */
            [data-kinde-control="logo"],
            [data-kinde-control="branding"],
            [data-kinde-control="footer"] {
                display: none !important;
            }

            /* Responsive design */
            @media (max-width: 640px) {
                .c-container {
                    padding: 1rem;
                }
                
                .c-widget {
                    padding: 2rem 1.5rem;
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
              <h1>Sign in with email</h1>
              <p>Make a new doc to bring your words, data, and teams together. For free</p>
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