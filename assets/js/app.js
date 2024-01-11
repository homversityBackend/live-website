// Home Page Page JS*******************************
if (
  document.querySelector(
    ".search_page, .signup_page, .add_listing, .login_page"
  )
) {
  // Dynamic Height Calculation **********
  const tabContent = document.querySelector(".login_content .left_side");

  const screenSizeQuery = window.matchMedia("(min-width: 575px)");

  function handleScreenSizeChange(e) {
    if (e.matches) {
      var sourceDivHeight = window.getComputedStyle(tabContent).height;
      // rightSearch.style.setProperty("--searchHeight", `${sourceDivHeight}px`);

      document.documentElement.style.setProperty(
        "--searchHeight",
        `${sourceDivHeight}`
      );
    } else if (!e.matches) {
      // Code to be executed when the screen size is smaller than 576px
      document.documentElement.style.setProperty("--searchHeight", `auto`);
    }
  }

  // Initial check
  handleScreenSizeChange(screenSizeQuery);

  // Attach an event listener for changes in screen size
  screenSizeQuery.addListener(handleScreenSizeChange);
}
if (document.querySelector(".home_page")) {
  // Owl Carousel ******************************
  $(".owl-carousel").owlCarousel({
    // items: 3,
    margin: 20,
    loop: false,
    nav: true,
    dots: false,
    navText: ["←", "→"],
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      620: {
        items: 2,
        nav: false,
      },
      1023: {
        items: 3,
        nav: false,
      },
    },
  });

  $(".owl-carousel2").owlCarousel({
    // items: 3,
    margin: 20,
    loop: false,
    nav: true,
    dots: false,
    navText: ["←", "→"],
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      620: {
        items: 2,
        nav: false,
      },
      1023: {
        items: 3,
        nav: false,
      },
    },
  });
}

// Listing Page JS*******************************
if (document.querySelector(".listing_page")) {
  /* ******************* Sticky Content  ******************* */
  document.addEventListener("DOMContentLoaded", function () {
    const headingContent = document.querySelector(".heading_content");
    const offset = document.querySelector(".compare_bar") ? 330 : 350;

    window.addEventListener("scroll", function () {
      if (window.scrollY >= offset) {
        headingContent.classList.add("heading_sticky");
        headingContent.style.top = document.querySelector(".compare_bar")
          ? "50px"
          : "0px";
      } else {
        headingContent.classList.remove("heading_sticky");
      }
    });
  });

  // Owl Carousel ******************************
  $(function () {
    var owl = $(".owl-carousel");
    owl.owlCarousel({
      items: 1,
      margin: 0,
      loop: true,
      nav: false,
    });
  });
}
// When Filter applied thow as chip **********
$(document).ready(function () {
  // Check if it's the "Listing Page" or "Room Selection" page
  var isListingPage = $(".listing_page").length > 0;
  var isRoomSelectionPage = $(".room_selection").length > 0;

  if (isListingPage || isRoomSelectionPage) {
    // Initialize the 'hidden_cont' class for the applied_filters_cont
    $(".applied_filters_cont").addClass("hidden_cont");

    // Get references to HTML elements
    const slider = document.getElementById("filter_slider");
    const sliderValue1 = document.getElementById("slider_value1");
    const sliderValue2 = document.getElementById("slider_value2");

    // Initialize the NoUISlider only if it's the "Listing Page"
    // Initialize the NoUISlider only if it's the "Listing Page"
    if (isListingPage) {
      noUiSlider.create(slider, {
        start: [3000, 160000],
        connect: true,
        step: 100,
        range: {
          min: 3000,
          max: 160000,
        },
      });

      // Event listener for the "Apply" button in the Price Range filter
      $(".filter_price .btn_primary").on("click", function () {
        addOrUpdatePriceRangeFilter();
      });

      // Event listener for the "Reset" button in the Price Range filter
      $(".filter_price .btn_line").on("click", function () {
        // Reset the range slider values
        slider.noUiSlider.reset();

        // Remove the applied Price Range filter
        $(".applied_price").remove();

        // Check if it's the last item, then add 'hidden_cont' class
        if ($(".applied_filters_cont").children().length === 0) {
          $(".applied_filters_cont").addClass("hidden_cont");
        }
      });

      // Event listener for the 'slide' event on the slider
      slider.noUiSlider.on("slide", function (values, handle) {
        // Update the displayed values as integers
        sliderValue1.innerText = Math.floor(values[0]);
        sliderValue2.innerText = Math.floor(values[1]);
      });
    }

    // Event listener for checkboxes within the "parent_dropdown" div
    $(".parent_dropdown .form-check-input").on("change", function () {
      updateCheckboxFilters($(this).closest(".dropdown_filter"));
    });

    // Event listener for closing applied items within the "parent_dropdown" div
    $(".applied_filters_cont").on("click", ".close", function (e) {
      e.stopPropagation(); // Prevent event propagation to the checkbox
      var item = $(this).parent();
      var checkboxId = item.data("checkbox-id");
      // console.log("#" + checkboxId);

      // Uncheck the corresponding checkbox
      $("#" + checkboxId)
        .prop("checked", false)
        .trigger("change");
    });

    $(".applied_filters_cont").on(
      "click",
      ".applied_price .close",
      function (e) {
        slider.noUiSlider.reset();

        // Remove the applied Price Range filter
        $(".applied_price").remove();

        // Check if it's the last item, then add 'hidden_cont' class
        if ($(".applied_filters_cont").children().length === 0) {
          $(".applied_filters_cont").addClass("hidden_cont");
        }
      }
    );

    // Function to update checkbox filters
    function updateCheckboxFilters(activeFilter) {
      // Clear existing applied filters for checkbox filters
      $(".applied_items").not(".applied_price").remove();

      // Check if any checkbox filters have selected items
      var hasSelectedItems = false;
      if ($(".applied_filters_cont").children().length === 0) {
        hasSelectedItems = true;
      } else {
        hasSelectedItems = true;
      }

      // Create a container to hold all applied filters for checkbox filters
      var allCheckboxFilters = $();

      // Iterate over each dropdown_filter within the "parent_dropdown" div
      $(".parent_dropdown .dropdown_filter").each(function () {
        var filterName = $(this).find(".dropdown-toggle").text().trim();
        var appliedFilterDiv = $(
          '<div className="applied_' +
            filterName.toLowerCase() +
            ' applied_items"></div>'
        );

        // Add label for the filter category
        var label = $('<p className="label">' + filterName + "</p>");
        appliedFilterDiv.append(label);

        // Create a container for items within the current filter category
        var itemsContainer = $('<div className="items"></div>');

        // Iterate over checked checkboxes within the current dropdown_filter
        $(this)
          .find(".form-check-input:checked")
          .each(function () {
            var checkboxLabel = $(this)
              .siblings(".form-check-label")
              .text()
              .trim();
            var checkboxId = $(this).attr("id");
            var appliedItem = $(
              '<p className="item" data-checkbox-id="' +
                checkboxId +
                '">' +
                checkboxLabel +
                ' <span className="close"><svg width="10" height="10" viewBox="0 0 10 10" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M5.00047 4.05767L8.30027 0.757812L9.24306 1.70062L5.94327 5.00047L9.24306 8.30027L8.30027 9.24306L5.00047 5.94327L1.70062 9.24306L0.757812 8.30027L4.05767 5.00047L0.757812 1.70062L1.70062 0.757812L5.00047 4.05767Z" /> </svg> </span></p>'
            );
            itemsContainer.append(appliedItem);
            hasSelectedItems = true;
          });

        // Append the items container to the applied filter
        appliedFilterDiv.append(itemsContainer);

        // Append the applied filter to the container for checkbox filters
        if (
          itemsContainer.children().length > 0 &&
          !$(this).hasClass("filter_price")
        ) {
          allCheckboxFilters = allCheckboxFilters.add(appliedFilterDiv);
        }
      });

      // Append all applied filters for checkbox filters to the container and sort them based on their original order
      $(".applied_filters_cont").append(
        allCheckboxFilters.toArray().sort(function (a, b) {
          return $(a).index() - $(b).index();
        })
      );

      // Toggle the 'hidden_cont' class based on whether there are any selected items for checkbox filters
      $(".applied_filters_cont").toggleClass("hidden_cont", !hasSelectedItems);
    }

    // Function to add or update the Price Range filter
    function addOrUpdatePriceRangeFilter() {
      // Check if a Price Range filter already exists
      var existingFilter = $(".applied_price");
      if (existingFilter.length > 0) {
        // Update the existing Price Range filter
        updatePriceRangeFilter(existingFilter);
      } else {
        // Create and add a new Price Range filter
        addPriceRangeFilter();
      }
    }

    // Function to update the Price Range filter
    function updatePriceRangeFilter(existingFilter) {
      // Update the values in the existing Price Range filter
      var appliedItem = existingFilter.find(".item");
      appliedItem
        .find(".value")
        .text("₹" + sliderValue1.innerText + " - ₹" + sliderValue2.innerText);
    }

    // Function to add the Price Range filter
    function addPriceRangeFilter() {
      // Create applied filter for Price Range
      var appliedFilterDiv = $(
        '<div className="applied_price applied_items"></div>'
      );

      // Add label for the Price Range filter
      var label = $('<p className="label">Price Range</p>');
      appliedFilterDiv.append(label);

      // Create a container for items within the Price Range filter
      var itemsContainer = $('<div className="items"></div>');

      // Add applied item for the Price Range
      var appliedItem = $(
        '<p className="item"><span className="value">₹' +
          sliderValue1.innerText +
          " - ₹" +
          sliderValue2.innerText +
          '</span><span className="close"><svg width="10" height="10" viewBox="0 0 10 10" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M5.00047 4.05767L8.30027 0.757812L9.24306 1.70062L5.94327 5.00047L9.24306 8.30027L8.30027 9.24306L5.00047 5.94327L1.70062 9.24306L0.757812 8.30027L4.05767 5.00047L0.757812 1.70062L1.70062 0.757812L5.00047 4.05767Z" /> </svg></span></p>'
      );
      itemsContainer.append(appliedItem);

      // Append the items container to the applied filter
      appliedFilterDiv.append(itemsContainer);

      // Append the applied filter to the container for Price Range filter
      $(".applied_filters_cont").prepend(appliedFilterDiv);

      // Remove 'hidden_cont' class since there is at least one selected item
      $(".applied_filters_cont").removeClass("hidden_cont");
    }
  }
});

// Listing Details Page JS*******************************
if (document.querySelector(".property_details_page")) {
  $(function () {
    // Owl Carousel*****************************
    var owl = $(".owl-carousel");
    owl.owlCarousel({
      margin: 12,
      loop: true,
      nav: true,
      dots: false,
      // autoWidth: true,

      responsive: {
        0: {
          items: 1,
          nav: true,
        },
        575: {
          items: 2,
          nav: false,
        },
      },
    });
  });

  // Price Select ****************************
  const allTableData = document.querySelectorAll(".price_td");

  allTableData.forEach((data) => {
    data.addEventListener("click", function (event) {
      allTableData.forEach((data) => {
        data.classList.remove("selected");
      });

      data.classList.toggle("selected");
    });
  });

  // Heart Button Filled ****************************
  const allHeartBtn = document.querySelectorAll(".btn_h");

  allHeartBtn.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      btn.classList.toggle("filled");
    });
  });

  // Dynamic Height Calculation **********
  const tabMenu = document.querySelector(
    ".amenities.scroll_content .nav-pills"
  );
  const tabContent = document.querySelector(
    ".amenities.scroll_content .tab-content"
  );

  const screenSizeQuery = window.matchMedia("(min-width: 576px)");

  function handleScreenSizeChange(e) {
    if (e.matches) {
      var sourceDivHeight = window.getComputedStyle(tabContent).height;
      tabMenu.style.height = sourceDivHeight;
    } else if (!e.matches) {
      // Code to be executed when the screen size is smaller than 576px
      tabMenu.style.height = "auto";
    }
  }

  // Initial check
  handleScreenSizeChange(screenSizeQuery);

  // Attach an event listener for changes in screen size
  screenSizeQuery.addListener(handleScreenSizeChange);

  // thumbnail carousel ****************************
  document.addEventListener("DOMContentLoaded", function () {
    var main = new Splide("#main-carousel", {
      type: "fade",
      rewind: true,
      pagination: false,
      arrows: true,
    });

    var thumbnails = new Splide("#thumbnail-carousel", {
      fixedWidth: 200,
      fixedHeight: 141,
      gap: 14,
      rewind: true,
      pagination: false,
      isNavigation: true,
      arrows: false,
      breakpoints: {
        1900: {
          fixedWidth: 180,
          fixedHeight: 100,
        },
        991: {
          fixedWidth: 160,
          fixedHeight: 100,
        },
        767: {
          fixedWidth: 120,
          fixedHeight: 80,
        },
      },
    });

    main.sync(thumbnails);
    main.mount();
    thumbnails.mount();

    var counterCurrent = document.querySelector(".current");
    var counterTotal = document.querySelector(".total");

    // Update counter when the slide changes
    main.on("moved", function () {
      counterCurrent.textContent = main.index + 1;
    });

    // Update total number of slides
    main.on("refresh", function () {
      counterTotal.textContent = main.length;
    });
  });
}

/* ******************* Responsive Navbar  ******************* */
if (document.querySelector(".nav_content")) {
  const burgerMenu = document.querySelector(".burger_menu");
  const navBar = document.querySelector(".nav_content_group");
  const body = document.querySelector("body");
  const navParent = document.querySelector("nav.navbar");

  burgerMenu.addEventListener("click", () => {
    navBar.classList.toggle("nav_menu_active");
    burgerMenu.classList.toggle("menu_open");
    body.classList.toggle("overflow_hide");
    navParent.classList.toggle("overflow_show");
  });
}
// Booking Flow Pages ******************************
if (document.querySelector(".booking_flow")) {
  const bookingItems = document.querySelectorAll(".info_room_list .available");

  bookingItems.forEach(function (button) {
    button.addEventListener("click", function () {
      // Remove the 'selected' class from all available buttons
      bookingItems.forEach(function (btn) {
        btn.classList.remove("selected");
      });

      // Add the 'selected' class to the clicked button
      button.classList.add("selected");
    });
  });

  // Get all the table rows in the tbody
  const tableRows = document.querySelectorAll("tbody tr");

  // Add a click event listener to each table row
  tableRows.forEach((row) => {
    row.addEventListener("click", function () {
      // Deselect all radio inputs
      const radioInputs = document.querySelectorAll("input[type='radio']");
      radioInputs.forEach((input) => (input.checked = false));

      // Select the radio input in the clicked row
      const radioInput = row.querySelector("input[type='radio']");
      radioInput.checked = true;

      // Remove the 'selected' class from all rows
      tableRows.forEach((row) => row.classList.remove("selected"));

      // Add the 'selected' class to the clicked row
      row.classList.add("selected");
    });
  });

  // Apply Coupon*********************************
  const couponBtn = document.querySelectorAll(".apply_coupn_btn");
  const couponWrapper = document.querySelector(".coupon_wrapper");
  couponBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      couponWrapper.classList.toggle("show");
    });
  });
}
