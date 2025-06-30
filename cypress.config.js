import { defineConfig } from "cypress";
// import terminalReport from "cypress-terminal-report/src/installLogsPrinter";



// Default form URLs. Can override with `FORM_URL` environment variable
const FORM_STAGING_URL =
  "https://forms-staging.cdssandbox.xyz/en/id/cmcahuj400000k00btz7n4guz";
const FORM_PRODUCTION_URL =
  "https://forms-formulaires.alpha.canada.ca/en/id/cmcai1v0n0066yg01z5631t6a";

function getFormUrl() {
  // Allow overriding the form URL via environment variable for testing purposes
  if (process.env.FORM_URL) {
    return process.env.FORM_URL;
  }

  if (process.env.APP_ENV === "production") {
    return FORM_PRODUCTION_URL;
  }
  return FORM_STAGING_URL;
}

export default defineConfig({
  video: false,
  defaultCommandTimeout: 10000,
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    baseUrl: getFormUrl(),
    setupNodeEvents(on) {
      if (process.env.CYPRESS_DEBUG) {
        console.log("Enabling terminal report for Debugging");
        // terminalReport(on);
      }

      console.log(`Running in environment: ${process.env.APP_ENV}`);
      console.log(`Form URL: ${getFormUrl()}`);
    },
  },
  // component: {
  //   devServer: {
  //     framework: "next",
  //     bundler: "webpack",
  //   },
  // },
  retries: {
    runMode: 3,
    openMode: 0,
  },
});


// const htmlvalidateConfig = {
//   // extends: ["html-validate:standard"],  // As close to W3C Nu checker. Leave a11y checking to other libs
//   rules: {
//     // E.g. "no-implicit-button-type": "off", // Can be: "error", "warn", "off" - only "error" shows anything 
//   },
// };

// const htmlvalidateOptions = {
//   exclude: [],
//   include: [],
//   formatter(messages) {
//     console.log(messages);
//   },
// };

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here

//       // htmlvalidate.install(on, htmlvalidateConfig, htmlvalidateOptions);
//     },
//   },
// });


// Note: must add `"type": "module",` to package.json for above instructions to work if ESM way
//
// Example ESM Way.
//
// import { defineConfig } from "cypress";
// import htmlvalidate from "cypress-html-validate/plugin";
// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on) {
//       htmlvalidate.install(on);
//     },
//   },
// });
