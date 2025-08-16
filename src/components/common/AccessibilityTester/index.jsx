import React, { useState, useEffect } from "react";
import { announceToScreenReader } from "@/utils/accessibility";

const AccessibilityTester = ({ isVisible = false }) => {
  const [activeTests, setActiveTests] = useState([]);
  const [testResults, setTestResults] = useState({});

  // Accessibility tests to run
  const accessibilityTests = [
    {
      id: "headings",
      name: "Heading Structure",
      description: "Check if headings follow proper hierarchy (h1, h2, h3...)",
      test: () => {
        const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        const headingLevels = Array.from(headings).map((h) =>
          parseInt(h.tagName.charAt(1))
        );

        // Check for proper hierarchy
        let isValid = true;
        let previousLevel = 0;

        for (let level of headingLevels) {
          if (level - previousLevel > 1) {
            isValid = false;
            break;
          }
          previousLevel = level;
        }

        return {
          passed: isValid,
          details: `Found ${
            headings.length
          } headings with levels: ${headingLevels.join(", ")}`,
          score: headings.length > 0 ? (isValid ? 100 : 70) : 0,
        };
      },
    },
    {
      id: "images",
      name: "Image Alt Text",
      description: "Check if all images have proper alt text",
      test: () => {
        const images = document.querySelectorAll("img");
        const imagesWithAlt = Array.from(images).filter(
          (img) => img.alt && img.alt.trim() !== ""
        );
        const imagesWithoutAlt = Array.from(images).filter(
          (img) => !img.alt || img.alt.trim() === ""
        );

        return {
          passed: imagesWithoutAlt.length === 0,
          details: `${imagesWithAlt.length} images with alt text, ${imagesWithoutAlt.length} without alt text`,
          score:
            images.length > 0
              ? Math.round((imagesWithAlt.length / images.length) * 100)
              : 100,
        };
      },
    },
    {
      id: "links",
      name: "Link Accessibility",
      description: "Check if links have proper text and aria-labels",
      test: () => {
        const links = document.querySelectorAll("a");
        const accessibleLinks = Array.from(links).filter((link) => {
          const hasText = link.textContent.trim() !== "";
          const hasAriaLabel = link.hasAttribute("aria-label");
          const hasTitle = link.hasAttribute("title");
          return hasText || hasAriaLabel || hasTitle;
        });

        return {
          passed: accessibleLinks.length === links.length,
          details: `${accessibleLinks.length} accessible links out of ${links.length} total`,
          score:
            links.length > 0
              ? Math.round((accessibleLinks.length / links.length) * 100)
              : 100,
        };
      },
    },
    {
      id: "buttons",
      name: "Button Accessibility",
      description: "Check if buttons have proper labels and keyboard support",
      test: () => {
        const buttons = document.querySelectorAll("button");
        const accessibleButtons = Array.from(buttons).filter((button) => {
          const hasText = button.textContent.trim() !== "";
          const hasAriaLabel = button.hasAttribute("aria-label");
          const hasAriaLabelledBy = button.hasAttribute("aria-labelledby");
          return hasText || hasAriaLabel || hasAriaLabelledBy;
        });

        return {
          passed: accessibleButtons.length === buttons.length,
          details: `${accessibleButtons.length} accessible buttons out of ${buttons.length} total`,
          score:
            buttons.length > 0
              ? Math.round((accessibleButtons.length / buttons.length) * 100)
              : 100,
        };
      },
    },
    {
      id: "forms",
      name: "Form Accessibility",
      description: "Check if form elements have proper labels and associations",
      test: () => {
        const formElements = document.querySelectorAll(
          "input, select, textarea"
        );
        const accessibleElements = Array.from(formElements).filter(
          (element) => {
            const hasLabel =
              element.hasAttribute("aria-label") ||
              element.hasAttribute("aria-labelledby") ||
              (element.id &&
                document.querySelector(`label[for="${element.id}"]`));
            return hasLabel;
          }
        );

        return {
          passed: accessibleElements.length === formElements.length,
          details: `${accessibleElements.length} accessible form elements out of ${formElements.length} total`,
          score:
            formElements.length > 0
              ? Math.round(
                  (accessibleElements.length / formElements.length) * 100
                )
              : 100,
        };
      },
    },
    {
      id: "landmarks",
      name: "Landmark Roles",
      description:
        "Check if page has proper landmark roles (header, main, nav, etc.)",
      test: () => {
        const landmarks = document.querySelectorAll(
          "[role], header, main, nav, aside, footer"
        );
        const landmarkRoles = Array.from(landmarks).map(
          (el) => el.role || el.tagName.toLowerCase()
        );

        const hasHeader =
          landmarkRoles.includes("banner") || landmarkRoles.includes("header");
        const hasMain = landmarkRoles.includes("main");
        const hasNav =
          landmarkRoles.includes("navigation") || landmarkRoles.includes("nav");

        return {
          passed: hasHeader && hasMain && hasNav,
          details: `Landmarks found: ${landmarkRoles.join(", ")}`,
          score: [hasHeader, hasMain, hasNav].filter(Boolean).length * 33,
        };
      },
    },
    {
      id: "contrast",
      name: "Color Contrast",
      description: "Check if text has sufficient color contrast (basic check)",
      test: () => {
        // This is a basic check - for accurate results, use tools like axe-core
        const textElements = document.querySelectorAll(
          "p, span, div, h1, h2, h3, h4, h5, h6"
        );
        const hasDarkText = Array.from(textElements).some((el) => {
          const style = window.getComputedStyle(el);
          const color = style.color;
          return (
            color.includes("rgb(0, 0, 0)") ||
            color.includes("#000") ||
            color.includes("black")
          );
        });

        return {
          passed: hasDarkText,
          details: hasDarkText
            ? "Dark text found for good contrast"
            : "Consider using darker text colors",
          score: hasDarkText ? 80 : 40,
        };
      },
    },
    {
      id: "property-cards",
      name: "Property Card Accessibility",
      description: "Check if property cards have proper accessibility features",
      test: () => {
        const propertyCards = document.querySelectorAll(
          "[data-testid='property-card'], .property-card, [class*='PropertyCard']"
        );
        let accessibleCards = 0;

        propertyCards.forEach((card) => {
          const hasImage = card.querySelector("img");
          const hasPrice = card.querySelector(
            "[class*='price'], [class*='Price']"
          );
          const hasLocation = card.querySelector(
            "[class*='location'], [class*='Location']"
          );
          const hasDetails = card.querySelector(
            "[class*='details'], [class*='Details']"
          );

          if (hasImage && hasPrice && hasLocation && hasDetails) {
            accessibleCards++;
          }
        });

        return {
          passed: accessibleCards === propertyCards.length,
          details: `${accessibleCards} accessible property cards out of ${propertyCards.length} total`,
          score:
            propertyCards.length > 0
              ? Math.round((accessibleCards / propertyCards.length) * 100)
              : 100,
        };
      },
    },
  ];

  const runAllTests = () => {
    const results = {};
    let totalScore = 0;

    accessibilityTests.forEach((test) => {
      try {
        const result = test.test();
        results[test.id] = result;
        totalScore += result.score;
      } catch (error) {
        results[test.id] = {
          passed: false,
          details: `Test failed: ${error.message}`,
          score: 0,
        };
      }
    });

    const averageScore = Math.round(totalScore / accessibilityTests.length);
    setTestResults(results);

    // Announce results to screen reader
    announceToScreenReader(
      `Accessibility tests completed. Overall score: ${averageScore}%`
    );

    return averageScore;
  };

  const runSingleTest = (testId) => {
    const test = accessibilityTests.find((t) => t.id === testId);
    if (test) {
      try {
        const result = test.test();
        setTestResults((prev) => ({ ...prev, [testId]: result }));
        announceToScreenReader(
          `${test.name} test completed. Score: ${result.score}%`
        );
      } catch (error) {
        setTestResults((prev) => ({
          ...prev,
          [testId]: {
            passed: false,
            details: `Test failed: ${error.message}`,
            score: 0,
          },
        }));
      }
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreEmoji = (score) => {
    if (score >= 90) return "✅";
    if (score >= 70) return "⚠️";
    return "❌";
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-md z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Accessibility Tester
        </h3>
        <button
          onClick={() => setActiveTests([])}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close accessibility tester"
        >
          ×
        </button>
      </div>

      <div className="space-y-3">
        <button
          onClick={runAllTests}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 button-accessible"
        >
          Run All Tests
        </button>

        {accessibilityTests.map((test) => (
          <div key={test.id} className="border border-gray-200 rounded p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-800">{test.name}</h4>
              {testResults[test.id] && (
                <span
                  className={`text-sm font-bold ${getScoreColor(
                    testResults[test.id].score
                  )}`}
                >
                  {getScoreEmoji(testResults[test.id].score)}{" "}
                  {testResults[test.id].score}%
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{test.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => runSingleTest(test.id)}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 button-accessible"
              >
                Test
              </button>
              {testResults[test.id] && (
                <div className="text-xs text-gray-500 flex-1">
                  {testResults[test.id].details}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {Object.keys(testResults).length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Overall Score:
            <span className="font-bold ml-1">
              {Math.round(
                Object.values(testResults).reduce(
                  (sum, result) => sum + result.score,
                  0
                ) / Object.keys(testResults).length
              )}
              %
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityTester;
