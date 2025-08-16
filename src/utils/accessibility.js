// Accessibility utility functions for Real Estate

/**
 * Handle keyboard navigation for interactive elements
 * @param {KeyboardEvent} event - Keyboard event
 * @param {Function} callback - Function to call on Enter/Space
 * @param {string} key - Key to listen for (default: 'Enter')
 */
export const handleKeyboardNavigation = (event, callback, key = "Enter") => {
  if (event.key === key || event.key === " ") {
    event.preventDefault();
    callback();
  }
};

/**
 * Generate unique IDs for ARIA relationships
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Unique ID
 */
export const generateId = (prefix) => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format number for screen readers
 * @param {number} num - Number to format
 * @returns {string} Formatted number for screen readers
 */
export const formatNumberForScreenReader = (num) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)} million`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)} thousand`;
  }
  return num.toString();
};

/**
 * Generate descriptive text for property stats
 * @param {string} propertyType - Property type
 * @param {number} count - Property count
 * @param {string} type - Type of count (bedrooms, bathrooms, sqft)
 * @returns {string} Descriptive text for screen readers
 */
export const generatePropertyDescription = (propertyType, count, type) => {
  const formattedCount = formatNumberForScreenReader(count);
  return `${formattedCount} ${type} ${propertyType}`;
};

/**
 * Skip to main content link component props
 */
export const skipToMainContentProps = {
  href: "#main-content",
  className:
    "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:border-2 focus:border-black focus:rounded",
  children: "Skip to main content",
};

/**
 * Focus trap for modals and dropdowns
 * @param {HTMLElement} container - Container element to trap focus in
 * @param {HTMLElement} firstFocusable - First focusable element
 * @param {HTMLElement} lastFocusable - Last focusable element
 */
export const createFocusTrap = (container, firstFocusable, lastFocusable) => {
  const handleTabKey = (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  };

  container.addEventListener("keydown", handleTabKey);

  return () => {
    container.removeEventListener("keydown", handleTabKey);
  };
};

/**
 * Announce changes to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - Priority level (polite, assertive)
 */
export const announceToScreenReader = (message, priority = "polite") => {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Validate ARIA attributes
 * @param {Object} ariaProps - ARIA properties to validate
 * @returns {Object} Validated ARIA properties
 */
export const validateAriaProps = (ariaProps) => {
  const validProps = {};

  Object.entries(ariaProps).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      validProps[key] = value;
    }
  });

  return validProps;
};

/**
 * Generate accessible button text
 * @param {string} action - Action being performed
 * @param {string} target - Target of the action
 * @returns {string} Accessible button text
 */
export const generateAccessibleButtonText = (action, target) => {
  return `${action} ${target}`;
};

/**
 * Handle focus restoration
 * @param {HTMLElement} element - Element to restore focus to
 */
export const restoreFocus = (element) => {
  if (element && typeof element.focus === "function") {
    element.focus();
  }
};

/**
 * Check if element is visible to screen readers
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if visible to screen readers
 */
export const isVisibleToScreenReader = (element) => {
  if (!element) return false;

  const style = window.getComputedStyle(element);
  const isHidden =
    style.display === "none" ||
    style.visibility === "hidden" ||
    style.opacity === "0";

  return !isHidden;
};

/**
 * Generate loading state description
 * @param {string} context - What is loading
 * @returns {string} Loading description
 */
export const generateLoadingDescription = (context) => {
  return `${context} is loading, please wait`;
};

/**
 * Generate error state description
 * @param {string} context - What had an error
 * @param {string} error - Error message
 * @returns {string} Error description
 */
export const generateErrorDescription = (context, error) => {
  return `Error loading ${context}: ${error}`;
};

/**
 * Generate property price description for screen readers
 * @param {number} price - Property price
 * @param {string} currency - Currency symbol (default: '$')
 * @returns {string} Formatted price description
 */
export const generatePriceDescription = (price, currency = "$") => {
  if (price >= 1000000) {
    return `${currency}${(price / 1000000).toFixed(1)} million`;
  } else if (price >= 1000) {
    return `${currency}${(price / 1000).toFixed(0)} thousand`;
  }
  return `${currency}${price.toLocaleString()}`;
};

/**
 * Generate property location description
 * @param {string} city - City name
 * @param {string} state - State name
 * @param {string} zipCode - ZIP code
 * @returns {string} Formatted location description
 */
export const generateLocationDescription = (city, state, zipCode) => {
  return `${city}, ${state} ${zipCode}`;
};

/**
 * Generate property size description
 * @param {number} sqft - Square footage
 * @returns {string} Formatted size description
 */
export const generateSizeDescription = (sqft) => {
  if (sqft >= 10000) {
    return `${(sqft / 1000).toFixed(1)} thousand square feet`;
  }
  return `${sqft.toLocaleString()} square feet`;
};
