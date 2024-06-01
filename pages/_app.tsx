// next imports
import Head from "next/head";
import type { AppProps } from "next/app";
// components
import NProgress from "@components/NProgress";
import ToastAlert from "@components/utilities/ToastAlert";
// axios
import "@configuration/axios-configuration";
// recoil
import { RecoilRoot } from "recoil";
// react-dnd
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// styles
import "@styles/globals.css";
import "@styles/EditorTheme.css";
import "@styles/Equation.css";
import "katex/dist/katex.css";
import "@styles/ColorPicker.css";
import { GlobalContextProvider } from "@contexts/GlobalContextProvider";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "fhoajot346");`,
          }}
        ></script>
      </Head>
      <RecoilRoot>
        <GlobalContextProvider>
          <DndProvider backend={HTML5Backend}>
            <ToastAlert />
            <div
              onContextMenu={(e: any) => {
                if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT != "development") {
                  e.preventDefault();
                  return false;
                }
              }}
              onCopy={(e: any) => {
                if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT != "development") {
                  e.preventDefault();
                  return false;
                }
              }}
              onCut={(e: any) => {
                if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT != "development") {
                  e.preventDefault();
                  return false;
                }
              }}
            >
              <Component {...pageProps} />
            </div>
            <NProgress />
          </DndProvider>
        </GlobalContextProvider>
      </RecoilRoot>
    </>
  );
};

export default App;
