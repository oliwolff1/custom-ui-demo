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
                    radial-gradient(2px 2px at 160px 30px, #ddd, transparent),
                    radial-gradient(1px 1px at 200px 50px, #fff, transparent),
                    radial-gradient(2px 2px at 250px 20px, rgba(255,255,255,0.9), transparent),
                    radial-gradient(1px 1px at 300px 80px, #ddd, transparent),
                    radial-gradient(2px 2px at 350px 40px, rgba(255,255,255,0.7), transparent),
                    radial-gradient(1px 1px at 400px 60px, #fff, transparent),
                    radial-gradient(2px 2px at 450px 10px, rgba(255,255,255,0.8), transparent),
                    radial-gradient(1px 1px at 500px 70px, #ddd, transparent),
                    radial-gradient(2px 2px at 550px 30px, rgba(255,255,255,0.6), transparent),
                    radial-gradient(1px 1px at 600px 90px, #fff, transparent),
                    radial-gradient(2px 2px at 650px 15px, rgba(255,255,255,0.9), transparent),
                    radial-gradient(1px 1px at 700px 55px, #ddd, transparent),
                    radial-gradient(2px 2px at 750px 25px, rgba(255,255,255,0.7), transparent),
                    radial-gradient(1px 1px at 800px 75px, #fff, transparent),
                    radial-gradient(2px 2px at 850px 35px, rgba(255,255,255,0.8), transparent),
                    radial-gradient(1px 1px at 900px 65px, #ddd, transparent);
                background-repeat: repeat;
                background-size: 950px 100px;
                animation: twinkle 25s linear infinite;
                z-index: -1;
            }

            /* Additional star layers for depth */
            body::after {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    radial-gradient(1px 1px at 50px 50px, rgba(255,255,255,0.4), transparent),
                    radial-gradient(1px 1px at 150px 150px, rgba(255,255,255,0.3), transparent),
                    radial-gradient(1px 1px at 250px 250px, rgba(255,255,255,0.5), transparent),
                    radial-gradient(1px 1px at 350px 350px, rgba(255,255,255,0.2), transparent),
                    radial-gradient(1px 1px at 450px 450px, rgba(255,255,255,0.4), transparent),
                    radial-gradient(1px 1px at 550px 550px, rgba(255,255,255,0.3), transparent),
                    radial-gradient(1px 1px at 650px 650px, rgba(255,255,255,0.5), transparent),
                    radial-gradient(1px 1px at 750px 750px, rgba(255,255,255,0.2), transparent),
                    radial-gradient(1px 1px at 850px 850px, rgba(255,255,255,0.4), transparent),
                    radial-gradient(1px 1px at 950px 950px, rgba(255,255,255,0.3), transparent);
                background-repeat: repeat;
                background-size: 1000px 1000px;
                animation: twinkleSlow 40s linear infinite;
                z-index: -1;
            }

            @keyframes twinkle {
                0% { transform: translateY(0px); opacity: 0.8; }
                50% { opacity: 1; }
                100% { transform: translateY(-100px); opacity: 0.8; }
            }

            @keyframes twinkleSlow {
                0% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
                50% { opacity: 0.9; }
                100% { transform: translateY(-200px) rotate(360deg); opacity: 0.6; }
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