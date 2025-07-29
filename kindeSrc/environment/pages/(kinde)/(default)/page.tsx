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
            baseLinkColor: "#230078",
            buttonBorderRadius: "0.5rem",
            primaryButtonBackgroundColor: "#333333",
            primaryButtonColor: "#fff",
            inputBorderRadius: "0.5rem"
          })}
          
          /* Kinde widget spacing using CSS custom properties */
          --kinde-control-spacing: 2rem;
          --kinde-control-label-spacing: 1.5rem;
          --kinde-control-input-spacing: 1.5rem;
          --kinde-button-spacing: 2rem;
          --kinde-widget-spacing-content: 2rem;
          `}
        </style>
        <style nonce={getKindeNonce()}>
          {`
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              font-family: -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, Segoe UI, Roboto, sans-serif;
              background: linear-gradient(180deg, #4A90E2 0%, #87CEEB 30%, #E0F6FF 100%);
              min-height: 100vh;
              position: relative;
              overflow-x: hidden;
            }

            /* Cloud decorations */
            body::before,
            body::after {
              content: '';
              position: fixed;
              background: rgba(255, 255, 255, 0.8);
              border-radius: 50px;
              z-index: 1;
            }

            body::before {
              width: 200px;
              height: 60px;
              top: 10%;
              left: 10%;
              animation: float 6s ease-in-out infinite;
            }

            body::after {
              width: 150px;
              height: 45px;
              top: 20%;
              right: 15%;
              animation: float 8s ease-in-out infinite reverse;
            }

            /* Additional clouds */
            .cloud-1 {
              position: fixed;
              width: 180px;
              height: 50px;
              background: rgba(255, 255, 255, 0.7);
              border-radius: 50px;
              top: 60%;
              left: 5%;
              z-index: 1;
              animation: float 7s ease-in-out infinite 1s;
            }

            .cloud-2 {
              position: fixed;
              width: 120px;
              height: 35px;
              background: rgba(255, 255, 255, 0.6);
              border-radius: 50px;
              top: 75%;
              right: 8%;
              z-index: 1;
              animation: float 9s ease-in-out infinite 2s;
            }

            .cloud-3 {
              position: fixed;
              width: 160px;
              height: 45px;
              background: rgba(255, 255, 255, 0.5);
              border-radius: 50px;
              top: 45%;
              left: 60%;
              z-index: 1;
              animation: float 5s ease-in-out infinite 0.5s;
            }

            .cloud-4 {
              position: fixed;
              width: 100px;
              height: 30px;
              background: rgba(255, 255, 255, 0.4);
              border-radius: 50px;
              top: 85%;
              left: 40%;
              z-index: 1;
              animation: float 10s ease-in-out infinite 3s;
            }

            .cloud-5 {
              position: fixed;
              width: 140px;
              height: 40px;
              background: rgba(255, 255, 255, 0.6);
              border-radius: 50px;
              top: 30%;
              left: 30%;
              z-index: 1;
              animation: float 8s ease-in-out infinite 1.5s;
            }

            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }

            /* Abstract lines */
            .abstract-lines {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 1;
              pointer-events: none;
            }

            .abstract-lines::before {
              content: '';
              position: absolute;
              top: 20%;
              right: 10%;
              width: 2px;
              height: 100px;
              background: rgba(255, 255, 255, 0.6);
              transform: rotate(45deg);
            }

            .abstract-lines::after {
              content: '';
              position: absolute;
              bottom: 30%;
              left: 5%;
              width: 1px;
              height: 150px;
              background: rgba(255, 255, 255, 0.4);
              transform: rotate(-30deg);
            }

            .c-container {
              position: relative;
              z-index: 2;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 2rem;
            }

            .c-login-card {
              background: rgba(255, 255, 255, 0.9);
              backdrop-filter: blur(20px);
              border-radius: 20px;
              padding: 3rem;
              max-width: 450px;
              width: 100%;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.3);
            }

            .c-icon {
              width: 40px;
              height: 40px;
              background: #fff;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 1.5rem;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            .c-icon::before {
              content: '→';
              font-size: 18px;
              font-weight: bold;
              color: #333;
            }

            .c-heading {
              font-size: 1.75rem;
              font-weight: 700;
              color: #000;
              text-align: center;
              margin-bottom: 0.5rem;
            }

            .c-description {
              font-size: 0.95rem;
              color: #666;
              text-align: center;
              margin-bottom: 2rem;
              line-height: 1.5;
            }

            .c-widget {
              margin-bottom: 2rem;
            }

            /* Style Kinde widget elements */
            [data-kinde-control] {
              margin-bottom: 1rem;
            }

            [data-kinde-control] input {
              width: 100%;
              padding: 12px 16px;
              border: 1px solid #e1e5e9;
              border-radius: 8px;
              font-size: 16px;
              background: #fff;
              transition: border-color 0.2s ease;
            }

            [data-kinde-control] input:focus {
              outline: none;
              border-color: #230078;
              box-shadow: 0 0 0 3px rgba(35, 0, 120, 0.1);
            }

            [data-kinde-control] button {
              width: 100%;
              padding: 12px 16px;
              background: #333333;
              color: #fff;
              border: none;
              border-radius: 8px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              transition: background-color 0.2s ease;
            }

            [data-kinde-control] button:hover {
              background: #444444;
            }



            .c-footer {
              margin-top: 2rem;
              text-align: center;
              font-size: 0.9rem;
              color: #666;
            }

            .c-footer a {
              color: #230078;
              text-decoration: none;
              font-weight: 500;
            }

            .c-footer a:hover {
              text-decoration: underline;
            }

            /* Hide elements we don't want */
            [data-kinde-control] label,
            [data-kinde-control] a,
            [data-kinde-control] img,
            [data-kinde-control] .kinde-logo,
            [data-kinde-control] .kinde-powered-by {
              display: none;
            }

            /* Add spacing between Kinde widget elements using Kinde's CSS custom properties */
            [data-kinde-control] {
              margin-bottom: var(--kinde-control-spacing, 2rem);
            }

            [data-kinde-control] input {
              margin-bottom: var(--kinde-control-input-spacing, 1.5rem);
            }

            [data-kinde-control] button {
              margin-top: var(--kinde-button-spacing, 1rem);
              margin-bottom: var(--kinde-button-spacing, 1rem);
            }

            /* Force spacing on Kinde widget elements */
            .kinde-widget [data-kinde-control] {
              margin-bottom: 2rem !important;
            }

            .kinde-widget [data-kinde-control] input {
              margin-bottom: 1.5rem !important;
            }

            .kinde-widget [data-kinde-control] button {
              margin-top: 1rem !important;
              margin-bottom: 1rem !important;
            }

            /* Additional spacing for form elements */
            [data-kinde-control] > * {
              margin-bottom: 1rem;
            }

            [data-kinde-control] > *:last-child {
              margin-bottom: 0;
            }

            /* Responsive design */
            @media (max-width: 480px) {
              .c-login-card {
                padding: 2rem;
                margin: 1rem;
              }
              
              .c-heading {
                font-size: 1.5rem;
              }
              

            }
          `}
        </style>
      </head>
      <body>
        <div className="abstract-lines"></div>
        <div className="cloud-1"></div>
        <div className="cloud-2"></div>
        <div className="cloud-3"></div>
        <div className="cloud-4"></div>
        <div className="cloud-5"></div>
        <div data-kinde-root="/admin" className="c-container">
          <div className="c-login-card">
            <div className="c-icon"></div>
            <h1 className="c-heading">Sign in with email</h1>
            <p className="c-description">Make a new doc to bring your words, data, and teams together. For free.</p>
            
            <div className="c-widget">
              {getKindeWidget()}
            </div>


          </div>
        </div>
      </body>
    </html>
  );
};

export default async function Page(event) {
  const page = await Layout({...event});
  return renderToString(page);
}