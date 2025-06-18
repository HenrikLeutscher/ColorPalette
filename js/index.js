document.addEventListener("DOMContentLoaded", function () {
  const colorSections = document.querySelectorAll(".IndividualColors");

  colorSections.forEach((section) => {
    const hex = getRandomHexColor();
    section.style.background = hex;
  });

  function getRandomHexColor() {
    const colorCharacters = "0123456789ABCDEF";
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += colorCharacters[Math.floor(Math.random() * 16)];
    }
    return hexColor;
  }

  function getContrastYIQ(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);

    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    return yiq >= 128 ? "#000000" : "#FFFFFF";
  }

  function generatePalette() {
    colorSections.forEach((section) => {
      const hex = getRandomHexColor();
      section.style.backgroundColor = hex;

      const h4 = section.querySelector("h4");
      const p = section.querySelector("p");

      h4.textContent = hex;

      const hexName = ntc.name(hex)[1];
      p.textContent = hexName;

      // Set font color for contrast
      const contrastColor = getContrastYIQ(hex);
      h4.style.color = contrastColor;
      p.style.color = contrastColor;
    });
  }

  const generateButton = document.querySelector("#generatePalette");
  generateButton.addEventListener("click", generatePalette);

  // Copy To Clipboard Functionality

  const copyButton = document.getElementById("copyPalette");
  copyButton.addEventListener("click", function () {
    const colorSections = document.querySelectorAll(".IndividualColors");
    const hexValues = [];

    colorSections.forEach((section) => {
      const hex = section.querySelector("h4").textContent;
      hexValues.push(hex);
    });

    const hexString = hexValues.join(" ");
    navigator.clipboard
      .writeText(hexString)
      .then(() => {
        const copyAlert = document.getElementById("copyAlert");
        copyAlert.style.display = "block";
        copyAlert.textContent = `Successfully copied to clipboard: ${hexString}`;
        setTimeout(() => {
          copyAlert.style.display = "none";
        }, 3000);
      })
      .catch((err) => {
        copyAlert.style.display = "block";
        copyAlert.textContent = `Failed to copy to clipboard: ${err}`;
        setTimeout(() => {
          copyAlert.style.display = "none";
        }, 3000);
      });
  });

  const instructionsClick = document.getElementById("instructionsClick");
  instructionsClick.addEventListener("click", function () {
    const instructions = document.getElementById("instructions");
    if (instructions.style.display === "none" || instructions.style.display === "") {
      instructions.style.display = "block";
    } else {
      instructions.style.display = "none";
    }
  });
});
