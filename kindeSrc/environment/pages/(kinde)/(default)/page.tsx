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
            baseBackgroundColor: "#e8f4fd",
            baseLinkColor: "#2c3e50",
            buttonBorderRadius: "0.75rem",
            primaryButtonBackgroundColor: "#2c3e50",
            primaryButtonColor: "#ffffff",
            inputBorderRadius: "0.75rem"
          })}}
          `}
        </style>
        <style nonce={getKindeNonce()}>
          {`
            :root {
                --kinde-base-color: #2c3e50;
                --kinde-base-font-family: -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, Segoe UI, Roboto, sans-serif;
            }

            body {
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #87ceeb 0%, #98d8e8 50%, #b0e0e6 100%);
                min-height: 100vh;
                position: relative;
                overflow-x: hidden;
            }

            /* Cloud background effect */
            body::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%),
                    radial-gradient(circle at 40% 70%, rgba(255,255,255,0.25) 0%, transparent 50%),
                    radial-gradient(circle at 90% 80%, rgba(255,255,255,0.15) 0%, transparent 50%);
                pointer-events: none;
                z-index: 1;
            }

            /* Grid lines effect */
            body::after {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
                background-size: 50px 50px;
                pointer-events: none;
                z-index: 2;
            }

            .c-container {
                padding: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                position: relative;
                z-index: 3;
            }

            .c-widget {
                max-width: 450px;
                width: 100%;
                background: rgba(255, 255, 255, 0.9);
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
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
                border-radius: 1.5rem;
                pointer-events: none;
            }

            .c-widget h1 {
                font-size: 1.75rem;
                font-weight: 700;
                color: #2c3e50;
                margin: 0 0 0.5rem 0;
                text-align: center;
                position: relative;
                z-index: 1;
            }

            .c-widget p {
                font-size: 0.95rem;
                color: #6c757d;
                margin: 0 0 2rem 0;
                text-align: center;
                line-height: 1.5;
                position: relative;
                z-index: 1;
            }

            /* Hide password field and social logins */
            [data-kinde-control="password"],
            [data-kinde-control="social-login"],
            [data-kinde-control="divider"],
            [data-kinde-control="forgot-password"] {
                display: none !important;
            }

            /* Style the email input */
            [data-kinde-control="email"] {
                margin-bottom: 1.5rem;
            }

            [data-kinde-control="email"] input {
                background-color: #f8f9fa !important;
                border: 1px solid #e9ecef !important;
                border-radius: 0.75rem !important;
                padding: 1rem 1rem 1rem 3rem !important;
                font-size: 1rem !important;
                color: #495057 !important;
                transition: all 0.2s ease;
            }

            [data-kinde-control="email"] input:focus {
                border-color: #2c3e50 !important;
                box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1) !important;
                outline: none !important;
            }

            /* Style the submit button */
            [data-kinde-control="submit"] button {
                background-color: #2c3e50 !important;
                color: #ffffff !important;
                border: none !important;
                border-radius: 0.75rem !important;
                padding: 1rem 2rem !important;
                font-size: 1rem !important;
                font-weight: 600 !important;
                width: 100% !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                margin-top: 1rem !important;
            }

            [data-kinde-control="submit"] button:hover {
                background-color: #34495e !important;
                transform: translateY(-1px) !important;
                box-shadow: 0 4px 12px rgba(44, 62, 80, 0.2) !important;
            }

            [data-kinde-control="submit"] button:active {
                transform: translateY(0) !important;
            }

            /* Hide any logo or branding */
            [data-kinde-control="logo"],
            [data-kinde-control="branding"] {
                display: none !important;
            }

            /* Responsive design */
            @media (max-width: 768px) {
                .c-container {
                    padding: 1rem;
                }
                
                .c-widget {
                    padding: 2rem 1.5rem;
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