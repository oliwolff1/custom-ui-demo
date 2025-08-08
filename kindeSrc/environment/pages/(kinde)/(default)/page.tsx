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
            baseBackgroundColor: "#EAF2FF",
            baseLinkColor: "#0EA5E9",
            buttonBorderRadius: "0.75rem",
            primaryButtonBackgroundColor: "#111827",
            primaryButtonColor: "#FFFFFF",
            inputBorderRadius: "0.75rem"
          })}}
          `}
        </style>
        <style nonce={getKindeNonce()}>
          {`
            :root {
                --kinde-base-color: #0C0020;
                --kinde-surface-color: #FFFFFF;
                --kinde-surface-border: #E6E7EB;
                --kinde-muted-color: #667085;
                --kinde-accent-color: #0EA5E9;
                --kinde-card-shadow: #0000001a;
                --kinde-base-font-family: -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, Segoe UI, Roboto, sans-serif;
            }

            [data-kinde-control-select-text]{
                background-color: #FAFAFB;
            }
            .c-container {
              min-height: 100vh;
              padding: 2rem;
              display: grid;
              place-items: center;
              background: radial-gradient(1200px 600px at 50% -100px, #EAF2FF 0%, #FFFFFF 60%) ,
                          linear-gradient(180deg, #EAF2FF 0%, #FFFFFF 100%);
            }
            .c-widget {
                max-width: 420px;
                width: 100%;
                margin: 0 auto;
                background: var(--kinde-surface-color);
                border: 1px solid var(--kinde-surface-border);
                border-radius: 1.25rem;
                box-shadow: 0 12px 30px var(--kinde-card-shadow);
                padding: 2rem;
                backdrop-filter: saturate(120%);
            }
            .c-widget h1 {
              margin: 0 0 0.5rem 0;
              font-size: 1.375rem;
              line-height: 1.3;
              color: var(--kinde-base-color);
              text-align: center;
            }
            .c-widget p.c-subtitle {
              margin: 0 0 1rem 0;
              color: var(--kinde-muted-color);
              text-align: center;
              font-size: 0.95rem;
            }

            /* Email-only experience: hide password, forgot password, dividers and social sign-in */
            [data-kinde-control*="password"],
            [data-kinde-action*="forgot"],
            [data-kinde-section*="social"],
            [data-kinde-divider*="or"] {
              display: none !important;
            }

            /* Make primary button full width for a clean single-action look */
            [data-kinde-control*="primary-button"] {
              width: 100%;
            }
            .c-footer {
              border-top: 1px solid rgba(12, 0, 32, 0.08);
              padding-block: 1.5rem;
              display: flex;
              justify-content: space-between;
            }
            .c-footer-links {
                display: flex;
                gap: 1.5rem;
            }
          `}
        </style>
      </head>
      <body>
        <div data-kinde-root="/admin" className="c-container">
          <main>
            <div className="c-widget">
              <h1>Sign in with email</h1>
              <p className="c-subtitle">Make a new doc to bring your words, data, and teams together. For free</p>
              <div>{getKindeWidget()}</div>
            </div>
          </main>
          <footer className="c-footer">
            <p className="c-no-account-link">
              No account? <a href={getKindeRegisterUrl()}>Sign up for free</a>
            </p>
            <ul className="c-footer-links">
              <li>
                <a href="">Privacy</a>
              </li>
              <li>
                <a href="">Terms</a>
              </li>
              <li>
                <a href="">Get help</a>
              </li>
            </ul>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default async function Page(event) {
  const page = await Layout({...event});
  return renderToString(page);
}