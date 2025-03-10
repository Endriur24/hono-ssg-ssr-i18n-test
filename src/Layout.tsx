import { FC, PropsWithChildren } from "hono/jsx";
import type { Context } from "hono";
import { Translation, parsePathLanguage, getLanguagesList, getTranslation } from "./i18n";

type LayoutProps = {
  c: Context;
};

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, c }) => {
  const { remainingPath, langCode } = parsePathLanguage(c.req.path);
  const translation = getTranslation(langCode);
  const availableLanguages = getLanguagesList();

  return (
    <html>
      <head>
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body>
        <header>
          <nav>
          <div className="pages">
              <a 
                href={`/${langCode}`} 
                class={!remainingPath ? "active" : ""}
              >
                {translation.navigation.home}
              </a>
              <a 
                href={`/${langCode}/about`} 
                class={remainingPath === "about" ? "active" : ""}
              >
                {translation.navigation.about}
              </a>
              <a 
                href={`/${langCode}/dynamic`} 
                class={remainingPath === "dynamic" ? "active" : ""}
              >
                {translation.navigation.dynamic}
              </a>
            </div>
            <div className="languages">
              {availableLanguages.map((lang) => (
                <a 
                  href={`/${lang.code}${remainingPath ? "/" + remainingPath : "/"}`}
                  class={lang.code === langCode ? "active" : ""}
                >
                  {lang.language}
                </a>
              ))}
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
