"use server";

import React from "react";
import { renderToString } from "react-dom/server.browser";
import {
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getKindeNonce,
  getKindeWidget,
  getKindeCSRF,
} from "@kinde/infrastructure";
import {
  getSVGFaviconUrl,
  setKindeDesignerCustomProperties,
} from "@kinde/infrastructure";

const Layout = async ({ request, context }) => {
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
          {`
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Orbitron', 'Futura', 'Century Gothic', 'Arial', sans-serif;
              background: radial-gradient(ellipse at center, #0c1445 0%, #000000 70%);
              min-height: 100vh;
              overflow-x: hidden;
              position: relative;
            }
            
            /* Animated stars background */
            .stars {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
              z-index: 1;
            }
            
            .stars::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-image: 
                radial-gradient(2px 2px at 20px 30px, #eee, transparent),
                radial-gradient(2px 2px at 40px 70px, rgba(255, 232, 31, 0.8), transparent),
                radial-gradient(1px 1px at 90px 40px, #fff, transparent),
                radial-gradient(1px 1px at 130px 80px, rgba(0, 212, 255, 0.6), transparent),
                radial-gradient(2px 2px at 160px 30px, #fff, transparent);
              background-repeat: repeat;
              background-size: 200px 100px;
              animation: sparkle 20s linear infinite;
            }
            
            @keyframes sparkle {
              from { transform: translateX(0); }
              to { transform: translateX(-200px); }
            }
            
            .container {
              position: relative;
              z-index: 10;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }
            
            .login-panel {
              background: linear-gradient(135deg, rgba(12, 20, 69, 0.9) 0%, rgba(0, 0, 0, 0.8) 100%);
              border: 2px solid #FFE81F;
              border-radius: 12px;
              padding: 40px;
              max-width: 420px;
              width: 100%;
              box-shadow: 
                0 0 30px rgba(255, 232, 31, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              position: relative;
              overflow: hidden;
            }
            
            .login-panel::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 232, 31, 0.1), transparent);
              animation: scan 3s infinite;
            }
            
            @keyframes scan {
              0% { left: -100%; }
              100% { left: 100%; }
            }
            
            .header {
              text-align: center;
              margin-bottom: 30px;
              position: relative;
              z-index: 2;
            }
            
            .title {
              font-size: 28px;
              font-weight: 700;
              color: #FFE81F;
              text-shadow: 0 0 10px rgba(255, 232, 31, 0.5);
              margin-bottom: 8px;
              letter-spacing: 2px;
              text-transform: uppercase;
            }
            
            .subtitle {
              font-size: 14px;
              color: #00D4FF;
              text-shadow: 0 0 5px rgba(0, 212, 255, 0.5);
              letter-spacing: 1px;
              opacity: 0.9;
            }
            
            .widget-container {
              position: relative;
              z-index: 2;
            }
            
            .footer {
              text-align: center;
              margin-top: 30px;
              position: relative;
              z-index: 2;
            }
            
            .footer-text {
              font-size: 12px;
              color: rgba(255, 255, 255, 0.6);
              letter-spacing: 0.5px;
            }
            
            .empire-logo {
              width: 60px;
              height: 60px;
              margin: 0 auto 20px;
              background: radial-gradient(circle, #FFE81F 30%, transparent 70%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24px;
              color: #000;
              font-weight: bold;
              box-shadow: 0 0 20px rgba(255, 232, 31, 0.4);
            }
            
            /* Mobile responsiveness */
            @media (max-width: 480px) {
              .login-panel {
                padding: 30px 20px;
                margin: 10px;
                border-radius: 8px;
              }
              
              .title {
                font-size: 24px;
              }
              
              .empire-logo {
                width: 50px;
                height: 50px;
                font-size: 20px;
              }
            }
            
            /* Kinde widget styling overrides */
            .widget-container :global(.kinde-ui) {
              background: transparent !important;
              border: none !important;
            }
            
            .widget-container :global(input) {
              background: rgba(0, 0, 0, 0.3) !important;
              border: 1px solid rgba(255, 232, 31, 0.3) !important;
              color: #fff !important;
              border-radius: 6px !important;
              padding: 12px !important;
              font-family: inherit !important;
            }
            
            .widget-container :global(input:focus) {
              border-color: #FFE81F !important;
              box-shadow: 0 0 10px rgba(255, 232, 31, 0.3) !important;
              outline: none !important;
            }
            
            .widget-container :global(button) {
              background: linear-gradient(135deg, #FFE81F 0%, #FFA500 100%) !important;
              border: none !important;
              color: #000 !important;
              font-weight: bold !important;
              text-transform: uppercase !important;
              letter-spacing: 1px !important;
              border-radius: 6px !important;
              padding: 12px 24px !important;
              cursor: pointer !important;
              transition: all 0.3s ease !important;
              font-family: inherit !important;
            }
            
            .widget-container :global(button:hover) {
              background: linear-gradient(135deg, #FFA500 0%, #FFE81F 100%) !important;
              box-shadow: 0 0 15px rgba(255, 232, 31, 0.5) !important;
              transform: translateY(-2px) !important;
            }
            
            .widget-container :global(label) {
              color: #00D4FF !important;
              font-weight: 500 !important;
              font-family: inherit !important;
            }
            
            .widget-container :global(a) {
              color: #00D4FF !important;
              text-decoration: none !important;
            }
            
            .widget-container :global(a:hover) {
              color: #FFE81F !important;
              text-shadow: 0 0 5px rgba(255, 232, 31, 0.5) !important;
            }
          `}
        </style>
        
      </head>
      <body>
        <div className="stars"></div>

        <div className="container">
          <div className="login-panel">
            <div className="header">
              <div className="empire-logo">⭐</div>
              <h1 className="title">Imperial Portal</h1>
              <p className="subtitle">Secure Access Required</p>
            </div>

            <div className="widget-container">{getKindeWidget()}</div>
            
            <div className="footer">
              <p className="footer-text">May the Force be with you</p>
            </div>
          </div>
        </div>

        <script nonce={getKindeNonce()}>
          {`
            // Add subtle hover effects and animations
            document.addEventListener('DOMContentLoaded', function() {
              const panel = document.querySelector('.login-panel');
              if (panel) {
                panel.addEventListener('mouseenter', function() {
                  this.style.boxShadow = '0 0 40px rgba(255, 232, 31, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                });
                panel.addEventListener('mouseleave', function() {
                  this.style.boxShadow = '0 0 30px rgba(255, 232, 31, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                });
              }
            });
          `}
        </script>
      </body>
    </html>
  );
};

export default async function Page(event) {
  const page = await Layout({ ...event });
  return renderToString(page);
}