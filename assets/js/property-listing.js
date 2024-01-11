document.addEventListener("DOMContentLoaded", function () {
  // Dashboard Left Menu ***************************
  const burgerMenu = document.querySelector(".ham_burger");
  const menuContent = document.querySelectorAll(".hide_this");
  const menuMain = document.querySelector(".d_left_menu");
  const body = document.querySelector("body");
  // console.log(burgerMenu);

  if (burgerMenu) {
    burgerMenu.addEventListener("click", function () {
      this.classList.toggle("active");
      menuMain.classList.toggle("menu_open");
      body.classList.toggle("no_overflow");

      menuContent.forEach((item) => {
        item.classList.toggle("hide_this");
      });
    });
  }

  // Toggle Selector *********************************
  const multiSelect = document.querySelectorAll(".multi_item");

  if (multiSelect) {
    var inputSelectors = document.querySelectorAll(".input_selector");

    inputSelectors.forEach(function (inputSelector) {
      inputSelector.addEventListener("click", function () {
        this.classList.add("selected");
      });

      var closeIcon = inputSelector.querySelector(".close_icon");

      closeIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        inputSelector.classList.remove("selected");
      });
    });
  }

  // Multi Selector Dropdown *********************************
  const dropdownPrefix = "cat_"; // Specify the common prefix for the dropdown IDs
  const dropdownConfigurations = [];

  // Dynamically detect the number of dropdowns and their IDs
  const dropdownElements = document.querySelectorAll('[id^="cat_"]');
  dropdownElements.forEach((dropdown, index) => {
    const config = {
      id: dropdown.id,
      selectedItemsId: `selectedItems${dropdown.id.slice(
        dropdownPrefix.length
      )}`,
      contentId: `dropdownContent${dropdown.id.slice(dropdownPrefix.length)}`,
    };
    dropdownConfigurations.push(config);
  });

  dropdownConfigurations.forEach((config) => {
    initializeDropdown(config);
  });

  function initializeDropdown(config) {
    const dropdown = document.getElementById(config.id);

    if (!dropdown) {
      return; // Skip if the dropdown HTML is not available
    }

    const selectBox = dropdown.querySelector(".select-box");
    const selectedItemsContainer = dropdown.querySelector(".selected-items");
    const dropdownContent = dropdown.querySelector(".dropdown-content");
    const dropdownLabel = dropdown.querySelector(".dropdown-label .label_text");

    dropdownContent.style.display = "none";
    selectBox.classList.remove("focused");

    selectBox.addEventListener("click", function () {
      dropdownContent.style.display =
        dropdownContent.style.display === "flex" ? "none" : "flex";
      selectBox.classList.add("focused");
    });

    document.addEventListener("click", function (event) {
      const isClickInside =
        selectBox.contains(event.target) ||
        dropdownContent.contains(event.target);
      if (!isClickInside) {
        dropdownContent.style.display = "none";
        selectBox.classList.remove("focused");
      }
    });

    dropdownContent.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        const selectedValue = event.target.getAttribute("data-value");
        if (!isSelected(selectedItemsContainer, selectedValue)) {
          addSelectedItem(selectedItemsContainer, selectedValue);
        }
      }
    });

    selectedItemsContainer.addEventListener("click", function (event) {
      if (event.target.classList.contains("close")) {
        const selectedValue = event.target.parentElement
          .querySelector(".text")
          .getAttribute("data-value");
        removeSelectedItem(selectedItemsContainer, selectedValue);
      }
    });

    function isSelected(container, value) {
      return Array.from(container.children).some(
        (item) => item.querySelector(".text").dataset.value === value
      );
    }

    function addSelectedItem(container, value) {
      const selectedItem = document.createElement("div");
      selectedItem.className = "selected-item";

      const text = document.createElement("p");
      text.textContent = value;
      text.className = "text";
      text.dataset.value = value;

      const closeSymbol = document.createElement("div");
      closeSymbol.className = "close";
      closeSymbol.textContent = "🗙";

      closeSymbol.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent dropdown from closing
        removeSelectedItem(container, value);
      });

      selectedItem.appendChild(text);
      selectedItem.appendChild(closeSymbol);

      container.appendChild(selectedItem);
      updateDropdown(container, dropdownContent, dropdownLabel);
    }

    function removeSelectedItem(container, value) {
      const selectedItem = Array.from(container.children).find(
        (item) => item.querySelector(".text").dataset.value === value
      );
      if (selectedItem) {
        container.removeChild(selectedItem);
        updateDropdown(container, dropdownContent, dropdownLabel);
      }
    }

    function updateDropdown(container, content, label) {
      const selectedValues = Array.from(container.children).map(
        (item) => item.querySelector(".text").dataset.value
      );
      const options = Array.from(content.children);

      const countText =
        selectedValues.length > 0
          ? `${selectedValues.length} Options Selected`
          : `Select`;
      label.textContent = countText;

      options.forEach((option) => {
        const value = option.getAttribute("data-value");
        if (selectedValues.includes(value)) {
          option.style.display = "none";
        } else {
          option.style.display = "block";
        }
      });

      if (selectedValues.length > 0) {
        selectedItemsContainer.classList.add("added");
      } else {
        selectedItemsContainer.classList.remove("added");
      }
    }
  }
});
if (document.getElementById("booking_chart")) {
  Highcharts.chart("booking_chart", {
    chart: {
      type: "column",
      height: 220,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: ["Full booking", "Partial booking"],
      crosshair: false,
      labels: {
        style: {
          color: "#6F7386",
          fontSize: "12px",
        },
      },
      lineColor: "#DFEEFF",
      lineWidth: 2,
    },
    credits: {
      enabled: false,
    },
    yAxis: {
      labels: {
        enabled: false,
      },
      title: {
        enabled: false,
      },
      gridLineDashStyle: "longdash",
    },
    legend: { enabled: false },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    tooltip: {
      style: {
        color: "#3a3b4f",
        fontSize: 16,
      },
    },
    series: [
      {
        name: "Booking",
        data: [236, 514],
        color: "#3E51FF",
        borderRadius: {
          radius: 10,
        },
      },
    ],
  });
}

if (document.getElementById("enquie_chart")) {
  Highcharts.chart("enquie_chart", {
    chart: {
      type: "spline",
      height: 220,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: ["Nov 3", "Nov 6", "Nov 9"],
      crosshair: false,
      labels: {
        style: {
          color: "#6F7386",
          fontSize: "12px",
        },
      },
      lineColor: "#DFEEFF",
      lineWidth: 2,
    },
    credits: {
      enabled: false,
    },

    legend: {
      itemStyle: {
        fontSize: "12px",
        color: "#6F7386",
      },
    },

    yAxis: {
      labels: {
        enabled: true,
        style: {
          color: "#6F7386",
          fontSize: "12px",
        },
      },
      title: {
        enabled: false,
      },
      gridLineDashStyle: "longdash",
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      style: {
        color: "#3a3b4f",
        fontSize: 16,
      },
    },
    series: [
      {
        name: "Visits by students",
        marker: {
          symbol: "square",
        },
        label: {
          enabled: false,
        },
        color: "#4969EC",
        marker: {
          fillColor: "#3E51FF",
          lineWidth: 0,
          lineColor: "red", // inherit from series
        },
        data: [10, 70, 30],
      },
      {
        name: "Enquiries",
        marker: {
          symbol: "diamond",
          fillColor: "#F44157",
          lineWidth: 0,
          lineColor: "red",
        },
        color: "#F44157",
        label: {
          enabled: false,
        },
        data: [2, 60, 40],
      },
    ],
  });
}

// File Length Counter ***********
document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("prop_video");
  const counterText = document.querySelector(".counter_text");

  if (fileInput) {
    fileInput.addEventListener("change", function () {
      var fileCount = fileInput.files.length;
      counterText.textContent =
        fileCount > 0 ? fileCount + " file(s) added" : "No file added";
    });
  }

  // Check to Show Content **************
  var radioButtons = document.querySelectorAll(".category_radio");
  var relatedCheckbox = document.querySelectorAll(".check_checbox");
  var relatedCheckboxBtn = document.querySelectorAll(".check_checbox_btn");

  if (document.querySelector(".category_radio")) {
    radioButtons.forEach(function (radioButton) {
      if (radioButton.value === "Yes" && radioButton.checked) {
        relatedCheckbox.forEach((box) => {
          box.classList.add("content_show");
          console.log("checked");
        });

        relatedCheckboxBtn.forEach((boxBtn) => {
          boxBtn.classList.remove("btn_show");
          boxBtn.classList.add("btn_hide");
        });
      }

      radioButton.addEventListener("change", function () {
        if (radioButton.value === "Yes" && radioButton.checked) {
          relatedCheckbox.forEach((box) => {
            box.classList.add("content_show");
          });

          relatedCheckboxBtn.forEach((boxBtn) => {
            boxBtn.classList.remove("btn_show");
            boxBtn.classList.add("btn_hide");
          });
        } else {
          relatedCheckbox.forEach((box) => {
            box.classList.remove("content_show");
            box.classList.add("content_hide");
          });

          relatedCheckboxBtn.forEach((boxBtn) => {
            boxBtn.classList.add("btn_show");
          });
        }
      });
    });
  }

  // Check to Show Content **************
  var radioButtons2 = document.querySelectorAll(".category_radio2");
  var relatedCheckbox2 = document.querySelectorAll(".check_checbox2");
  var relatedCheckboxBtn2 = document.querySelectorAll(".check_checbox_btn2");

  if (document.querySelector(".category_radio2")) {
    radioButtons2.forEach(function (radioButton) {
      if (radioButton.value === "Yes" && radioButton.checked) {
        relatedCheckbox2.forEach((box) => {
          box.classList.add("content_show");
        });

        relatedCheckboxBtn2.forEach((boxBtn) => {
          boxBtn.classList.remove("btn_show");
          boxBtn.classList.add("btn_hide");
        });
      }

      radioButton.addEventListener("change", function () {
        if (radioButton.value === "Yes" && radioButton.checked) {
          relatedCheckbox2.forEach((box) => {
            box.classList.add("content_show");
          });

          relatedCheckboxBtn2.forEach((boxBtn) => {
            boxBtn.classList.remove("btn_show");
            boxBtn.classList.add("btn_hide");
          });
        } else {
          relatedCheckbox2.forEach((box) => {
            box.classList.remove("content_show");
            box.classList.add("content_hide");
          });

          relatedCheckboxBtn2.forEach((boxBtn) => {
            boxBtn.classList.add("btn_show");
          });
        }
      });
    });
  }
});
