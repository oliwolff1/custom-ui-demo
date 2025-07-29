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
            baseBackgroundColor: "#000000",
            baseLinkColor: "#FFE81F",
            buttonBorderRadius: "0.25rem",
            primaryButtonBackgroundColor: "#0077BE",
            primaryButtonColor: "#FFFFFF",
            inputBorderRadius: "0.25rem"
          })}}
          `}
        </style>
        <style nonce={getKindeNonce()}>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
            
            :root {
                --kinde-base-color: #FFE81F;
                --kinde-base-font-family: 'Orbitron', -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, Segoe UI, Roboto, sans-serif;
                --star-wars-blue: #0077BE;
                --star-wars-yellow: #FFE81F;
                --star-wars-dark: #000000;
                --star-wars-gray: #333333;
            }

            body {
                background: linear-gradient(135deg, #000000 0%, #001122 50%, #000000 100%);
                background-attachment: fixed;
                color: var(--star-wars-yellow);
                font-family: var(--kinde-base-font-family);
                margin: 0;
                padding: 0;
                min-height: 100vh;
                position: relative;
                overflow-x: hidden;
            }

            /* Starfield background effect */
            body::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    radial-gradient(2px 2px at 20px 30px, #eee, transparent),
                    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                    radial-gradient(1px 1px at 90px 40px, #fff, transparent),
                    radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
                    radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
                background-repeat: repeat;
                background-size: 200px 100px;
                animation: twinkle 20s linear infinite;
                z-index: -1;
            }

            @keyframes twinkle {
                0% { transform: translateY(0px); }
                100% { transform: translateY(-100px); }
            }

            [data-kinde-control-select-text]{
                background-color: rgba(0, 119, 190, 0.1);
                border: 1px solid var(--star-wars-blue);
                color: var(--star-wars-yellow);
            }

            .c-container {
                padding: 2rem;
                display: grid;
                gap: 2rem;
                min-height: 100vh;
                position: relative;
                z-index: 1;
            }

            .c-widget {
                max-width: 450px;
                width: 100%;
                margin: 0 auto;
                background: rgba(0, 0, 0, 0.8);
                border: 2px solid var(--star-wars-blue);
                border-radius: 8px;
                padding: 2rem;
                box-shadow: 
                    0 0 20px rgba(0, 119, 190, 0.5),
                    inset 0 0 20px rgba(0, 119, 190, 0.1);
                backdrop-filter: blur(10px);
                position: relative;
            }

            .c-widget::before {
                content: '';
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                background: linear-gradient(45deg, var(--star-wars-blue), var(--star-wars-yellow), var(--star-wars-blue));
                border-radius: 10px;
                z-index: -1;
                animation: borderGlow 3s ease-in-out infinite alternate;
            }

            @keyframes borderGlow {
                0% { opacity: 0.7; }
                100% { opacity: 1; }
            }

            .c-widget h1 {
                color: var(--star-wars-yellow);
                font-size: 2rem;
                font-weight: 900;
                text-align: center;
                margin-bottom: 1rem;
                text-shadow: 0 0 10px rgba(255, 232, 31, 0.5);
                letter-spacing: 2px;
            }

            .c-widget p {
                color: #FFFFFF;
                text-align: center;
                margin-bottom: 2rem;
                font-size: 1rem;
                line-height: 1.6;
                opacity: 0.9;
            }

            .c-footer {
                border-top: 1px solid rgba(0, 119, 190, 0.3);
                padding-block: 1.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 8px;
                padding: 1.5rem;
                backdrop-filter: blur(5px);
            }

            .c-footer-links {
                display: flex;
                gap: 1.5rem;
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .c-footer-links li a {
                color: var(--star-wars-yellow);
                text-decoration: none;
                font-size: 0.9rem;
                transition: all 0.3s ease;
                text-shadow: 0 0 5px rgba(255, 232, 31, 0.3);
            }

            .c-footer-links li a:hover {
                color: #FFFFFF;
                text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
            }

            .c-no-account-link {
                color: #FFFFFF;
                margin: 0;
                font-size: 0.9rem;
            }

            .c-no-account-link a {
                color: var(--star-wars-yellow);
                text-decoration: none;
                font-weight: 700;
                transition: all 0.3s ease;
                text-shadow: 0 0 5px rgba(255, 232, 31, 0.3);
            }

            .c-no-account-link a:hover {
                color: #FFFFFF;
                text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
            }

            /* Responsive design */
            @media (max-width: 768px) {
                .c-container {
                    padding: 1rem;
                    gap: 1rem;
                }
                
                .c-widget {
                    padding: 1.5rem;
                    margin: 0 1rem;
                }
                
                .c-widget h1 {
                    font-size: 1.5rem;
                }
                
                .c-footer {
                    flex-direction: column;
                    gap: 1rem;
                    text-align: center;
                }
                
                .c-footer-links {
                    justify-content: center;
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