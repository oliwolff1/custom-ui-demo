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
            baseBackgroundColor: "#fff",
            baseLinkColor: "#230078",
            buttonBorderRadius: "0.5rem",
            primaryButtonBackgroundColor: "#230078",
            primaryButtonColor: "#fff",
            inputBorderRadius: "0.5rem"
          })}}
          `}
        </style>
        <style nonce={getKindeNonce()}>
          {`
            :root {
                --kinde-base-color: rgb(12, 0, 32);
                --kinde-base-font-family: -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, Segoe UI, Roboto, sans-serif;
            }

            [data-kinde-control-select-text]{
                background-color: rgb(250, 250, 251);
            }
            .c-container {
              padding: 1.5rem;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
            }
            .c-widget {
                max-width: 400px;
                width: 100%;
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