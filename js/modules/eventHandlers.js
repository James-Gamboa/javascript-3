// @ts-nocheck
import { CustomizationObserver } from "./customizationObserver.js";
import { renderRecommendation } from "./renderRecommendation.js";
import { getFormValues } from "../utils/formUtils.js";

function isCustomizePage() {
  return !!document.getElementById("customizeForm");
}

function setupEventHandlers() {
  const form = document.getElementById("customizeForm");
  const previewContainer = document.getElementById("preview");
  const colorOptions = document.getElementById("colorOptions");

  const customizationObserver = new CustomizationObserver();

  function updatePreview() {
    const customizeData = getFormValues();
    if (customizeData.name) {
      renderRecommendation(customizeData, previewContainer);
      const customizeBtn = document.getElementById("customizeBtn");
      if (customizeBtn) {
        if (isCustomizePage()) {
          customizeBtn.style.display = "none";
        } else {
          customizeBtn.style.display = "block";
        }
      }
    }
  }

  customizationObserver.subscribe(updatePreview);

  form.addEventListener("change", () => {
    updatePreview();
    customizationObserver.notify();
  });

  const toggleColor = form.querySelector('input[name="potColor"]');
  toggleColor.addEventListener("change", () => {
    if (toggleColor.checked) {
      colorOptions.style.display = "block";
    } else {
      colorOptions.style.display = "none";
    }
    customizationObserver.notify();
  });

  const noColorOption = form.querySelector(
    'input[name="potColor"][value="no"]'
  );
  noColorOption.addEventListener("change", () => {
    if (noColorOption.checked) {
      colorOptions.style.display = "none";
    }
    customizationObserver.notify();
  });

  updatePreview();
}

export { setupEventHandlers };
