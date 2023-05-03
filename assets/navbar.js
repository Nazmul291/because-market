var $ = jQuery;
$(document).ready(function () {
  const domEl = {};

  domEl.homeHeader = $(".home-header");
  domEl.navbar = $(".navbar-nav");
  domEl.navLinks = $(".nav-item");
  domEl.hiddenNav = $(".hidden-nav");
  domEl.hiddenNavContainer = $(".hidden-nav-container");
  domEl.navToggler = $(".navbar-toggler");
  domEl.navbarRightContent = $(".right-navbar-content");
  domEl.navClose = $(".sidebar-close-icon");
  domEl.sidebar = $("#sidebar");
  domEl.overlay = $("#overlay");

  $(".button.funnel-link, button.funnel-link").on("click", function (e) {
    window.location = get_funnel_url() || "#";
  });

  $(" button.account-link").on("click", function (e) {
    window.location = "/pages/my-account";
  });

  $(".button.funnel-link-cbd").on("click", function (e) {
    window.location = "https://www.becausemarket.com/api/v1/split/cbd";
  });

  domEl.navbar.on("mouseover click", ".nav-item.dropdown", function (e) {
    const { headerType } = $(this).data();
    removeActiveLinks();
    $(this).toggleClass("active");
    renderHiddenNav(hiddenNavList[headerType]);
  });

  domEl.homeHeader.on("mouseleave", function (e) {
    hideHiddenNav({ removeLinks: true });
  });

  domEl.navbarRightContent.on("mouseover", ".nav-item", function (e) {
    removeActiveLinks();
    $(this).toggleClass("active");
    hideHiddenNav({ removeLinks: false });
  });

  domEl.navToggler.on("click", function (e) {
    e.stopPropagation();
    if (window.innerWidth <= 992) {
      domEl.sidebar.removeClass("slide-out-top");
      domEl.sidebar.addClass("active slide-in-top");
    }
  });

  $(".site").on("click", ".sidebar-close", function (e) {
    if (domEl.sidebar.hasClass("active")) {
      domEl.sidebar.addClass("slide-out-top");

      setTimeout(function () {
        domEl.sidebar.removeClass("slide-in-top active");
      }, 500);
    }
  });

  function renderHiddenNav(navList) {
    domEl.hiddenNav.css({
      display: "block",
    });
    domEl.hiddenNavContainer.empty();
    domEl.overlay.css("display", "block");
    var queryString = window.location.search;

    navList.forEach(function (e) {
      let displayText = e.text;
      if (displayText.indexOf("Bladder Protection") !== -1) {
        displayText = displayText
          .replace("for men", "for him")
          .replace("for women", "for her");
      }
      domEl.hiddenNavContainer.append(
        "\n               <a href="
          .concat(
            e.href + queryString.replace("?", "&"),
            '>\n                <div class="header-image-container">\n                    <div class="header-image" style="background-image:url('
          )
          .concat(e.img, ')"></div>\n                    <h6>')
          .concat(
            displayText,
            "</h6>\n                </div>\n               </a>\n            "
          )
      );
      // domEl.hiddenNavContainer.append(
      //     "\n        <a href=".concat(e.href, ">\n        <div class=\"header-image-container\">\n          <img src=").concat(e.img, " alt=\"\">\n          <h6>").concat(e.text, "</h6>\n        </div>\n        </a>\n        ")
      // );
    });
  }

  function hideHiddenNav(param) {
    if (param.removeLinks) {
      removeActiveLinks();
    }
    domEl.hiddenNav.css({
      display: "none",
    });
    domEl.overlay.css("display", "none");
    domEl.hiddenNavContainer.empty();
  }

  function removeActiveLinks() {
    domEl.navLinks.removeClass("active show");
  }
});
