import { Hono } from "hono";
import { ssgParams, disableSSG } from "hono/ssg";
import Layout from "./Layout";
import { getTranslation, getLanguagesList, parsePathLanguage } from "./i18n";

const app = new Hono();

app.use("*", (c, next) => {
  c.render = (content) => {
    return c.html(<Layout c={c}>{content}</Layout>);
  };
  return next();
});

app.get("/", (c) => {
  return c.redirect("/en/");
});

// basic current time route
app.get("/current-time", disableSSG(), (c) => {
  return c.render(new Date().toISOString());
});

// Home page route
app.get("/:code/", ssgParams(getLanguagesList), (c) => {
  const { langCode } = parsePathLanguage(c.req.path);
  const translation = getTranslation(langCode);

  return c.render(
    <>
      <h1>{translation.pages.home.title}</h1>
      <p>{translation.pages.home.greeting}</p>
    </>
  );
});

// About page route
app.get("/:code/about", ssgParams(getLanguagesList), (c) => {
  const { langCode } = parsePathLanguage(c.req.path);
  const translation = getTranslation(langCode);

  return c.render(
    <>
      <h1>{translation.pages.about.title}</h1>
    </>
  );
});

// In order to achieve dynamic content, we need to disable SSG for this route and override _routes.json file -> public/_routes.json
app.get(":code/dynamic", disableSSG(), (c) => {
  const langCode = c.req.param("code");
  const validLangCode = (langCode as "en" | "de" | "pl" | "fr") || "en";
  const translation = getTranslation(validLangCode);
  return c.render(
    <div>
      <h1>{translation.pages.dynamic.title}</h1>
      <p>
        {translation.pages.dynamic.currentTime +
          ": " +
          new Date().toISOString()}
      </p>
    </div>
  );
});

// Fallback route for handling 404s
app.get("*", (c) => {
  const { langCode } = parsePathLanguage(c.req.path);
  const translation = getTranslation(langCode);
  
  c.status(404);
  return c.render(
    <>
      <h1>{translation.notFound.title}</h1>
    </>
  );
});

export default app;
