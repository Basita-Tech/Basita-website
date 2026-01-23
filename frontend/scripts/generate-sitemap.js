import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

const BASE_URL = "https://www.satfera.com";

const routes = [
  "/",
  "/login",
  "/about",
  "/signup",
  "/forgot-password",
  "/terms",
  "/privacy",
  "/about",
  "/contact",
  "/faq",
];

(async () => {
  const sitemap = new SitemapStream({ hostname: BASE_URL });
  const writeStream = createWriteStream("./dist/sitemap.xml");

  sitemap.pipe(writeStream);

  routes.forEach((route) => {
    sitemap.write({
      url: route,
      changefreq: "weekly",
      priority: route === "/" ? 1.0 : 0.7,
    });
  });

  sitemap.end();

  await streamToPromise(sitemap);
  console.log("sitemap.xml generated");
})();
