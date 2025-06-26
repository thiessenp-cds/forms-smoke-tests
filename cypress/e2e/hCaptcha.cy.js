import "cypress-each";
import { ignoreExceptions } from "../utils";
// import { Options } from "cypress-axe";

const formTimer = true;

describe("Single Page Form", () => {
  ignoreExceptions();

  beforeEach(() => {
    cy.visit(`/`);
  });

  it("Page loads", () => {
    cy.get("h1").should("contain", "Automated hCaptcha Test Form (do not delete)");
  });

  it("hCaptcha detects this request as a bot", () => {
    // cy.typeInField("#1", "test");
    cy.get("button[type='submit']").click();

    // Wait for the form timer to show then click it
    if (formTimer) {
      cy.get("p").should("contain", "The button is ready.");
      cy.get("button[type='submit']").click();
    }

    // Fails sending the "user" to the fail page
    cy.get("h2").should("contain", "Your form could not be submitted");
  });
});


// const AXE_A11Y_OPTIONS = {
//   runOnly: {
//     type: "tag",
//     values: ["wcag21aa", "wcag2aa", "best-practice", "section508"],
//   },
// };

// describe("Pages", () => {
//   it.each([
//     { title: "buttons", path: "/src/buttons.html" },
//     { title: "conditional-reveal", path: "/src/conditional-reveal.html" },
//     { title: "dialog", path: "/src/dialog.html" },
//     { title: "grid", path: "/src/grid.html" },
//     { title: "live regions", path: "/src/liveRegions.html" },
//     { title: "radios-checkboxes", path: "/src/radios-checkboxes.html" },
//     { title: "tables", path: "/src/tables.html" },
//     { title: "tabs", path: "/src/tabs.html" },
//     { title: "speech-to-text", path: "/src/speech-to-text/index.html" },
//   ])(
//     (page) => `${page.title} Test`,
//     ({ path }) => {
//       cy.visit(path);
//       cy.get("h1").should("be.visible");

//       // Validate HTML
//       cy.htmlvalidate();

//       // Validate A11Y (WCAG..)
//       cy.injectAxe();
//       cy.checkA11y(undefined, AXE_A11Y_OPTIONS);
//     }
//   );
// });
