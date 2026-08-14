$(function () {
  $(".hero-slider").slick({
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 900,
    fade: true,
    cssEase: "ease-in-out",
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  });
  $(
    ".hero-slider .slick-prev, .hero-slider .slick-next, .hero-slider .slick-dots",
  ).wrapAll('<div class="slider-controls d-flex align-items-center"></div>');
  var $toggle = $("#navbarToggle");
  var $nav = $("#primaryNav");

  $toggle.on("click", function () {
    var isOpen = $nav.toggleClass("is-open").hasClass("is-open");
    $toggle.toggleClass("is-active", isOpen).attr("aria-expanded", isOpen);
  });

  $nav.find(".has-dropdown > a").on("click", function (e) {
    if (window.matchMedia("(max-width: 1023.98px)").matches) {
      e.preventDefault();
      $(this).parent().toggleClass("is-open");
    }
  });
  $nav
    .find("ul li:not(.has-dropdown) > a, .nav-dropdown a")
    .on("click", function () {
      $nav.removeClass("is-open");
      $toggle.removeClass("is-active").attr("aria-expanded", false);
    });
});

$(function () {
  var $reviewsSlider = $(".reviews-slider");
  if (!$reviewsSlider.length) return;

  $reviewsSlider.slick({
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 700,
    cssEase: "cubic-bezier(.25, .8, .25, 1)",
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  });

  $reviewsSlider
    .find(".slick-prev, .slick-next, .slick-dots")
    .wrapAll(
      '<div class="reviews-slider-controls d-flex align-items-center justify-content-center flex-wrap"></div>',
    );
  $reviewsSlider.find(".reviews-slider-controls").insertAfter($reviewsSlider);
});

$(function () {
  var $reveals = $(".js-reveal");
  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function animateCount($el) {
    var target = parseInt($el.attr("data-count"), 10);
    if (isNaN(target)) return;
    var duration = 1600;
    var start = null;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); /* ease-out cubic */
      $el.text(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    $reveals.addClass("is-visible");
    $(".stat-num[data-count]").each(function () {
      $(this).text($(this).attr("data-count"));
    });
    return;
  }

  var revealIO = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealIO.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  $reveals.each(function () {
    revealIO.observe(this);
  });
  var countIO = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        $(entry.target)
          .find(".stat-num[data-count]")
          .each(function () {
            animateCount($(this));
          });
        countIO.unobserve(entry.target);
      });
    },
    { threshold: 0.35 },
  );

  $(".about-stats, .about-badge").each(function () {
    countIO.observe(this);
  });
});

$(function () {
  var $track = $(".marquee-track");
  if (!$track.length) return;

  var industries = [
    "Telecom",
    "Retail & Hospitality",
    "Data Centers",
    "Real Estate",
    "Pharmaceuticals",
    "Media & Entertainment",
    "Transportation",
    "Smart Cities",
  ];

  function buildGroup(hidden) {
    var $group = $("<div>", { class: "marquee-group d-flex" });
    if (hidden) $group.attr("aria-hidden", "true");
    for (var copy = 0; copy < 2; copy++) {
      industries.forEach(function (name) {
        var $item = $("<span>", { class: "marquee-item", text: name });
        if (copy > 0) $item.attr("aria-hidden", "true");
        $group.append($item);
      });
    }
    return $group;
  }

  $track.append(buildGroup(false), buildGroup(true));
});

$(function () {
  var $track = $(".partners-track");
  if (!$track.length) return;

  var partners = [
    {
      name: "NexaCore Technologies",
      icon: '<path d="M12 3l7 4v10l-7 4-7-4V7l7-4z"></path>',
    },
    {
      name: "BlueWave Systems",
      icon: '<path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"></path>',
    },
    {
      name: "Orion Data Labs",
      icon: '<circle cx="6" cy="15" r="1.6"></circle><circle cx="12" cy="10" r="1.6"></circle><circle cx="18" cy="15" r="1.6"></circle><path d="M6 15L12 10L18 15"></path>',
    },
    {
      name: "Vertex IT Solutions",
      icon: '<path d="M12 4l8 16H4L12 4z"></path>',
    },
    {
      name: "Skyline Infotech",
      icon: '<path d="M3 20V10l4-3 4 3v2l3-2 4 3v7"></path><path d="M3 20h18"></path>',
    },
    {
      name: "Quantum Edge Networks",
      icon: '<circle cx="12" cy="12" r="2"></circle><ellipse cx="12" cy="12" rx="9" ry="4"></ellipse><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)"></ellipse>',
    },
    {
      name: "Trident Digital",
      icon: '<path d="M12 4v16M8 4v5a4 4 0 008 0V4M12 15l-3 5M12 15l3 5"></path>',
    },
    {
      name: "Horizon Systems",
      icon: '<circle cx="12" cy="10" r="4"></circle><path d="M3 18h18"></path>',
    },
  ];

  function buildGroup(hidden) {
    var $group = $("<div>", { class: "partners-group d-flex" });
    if (hidden) $group.attr("aria-hidden", "true");
    for (var copy = 0; copy < 2; copy++) {
      partners.forEach(function (partner) {
        var $item = $("<span>", {
          class: "partner-item d-inline-flex align-items-center",
        });
        if (copy > 0) $item.attr("aria-hidden", "true");
        $item.append(
          '<span class="partner-icon d-flex align-items-center justify-content-center flex-shrink-0">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
            partner.icon +
            "</svg>" +
            "</span>" +
            '<span class="partner-name">' +
            partner.name +
            "</span>",
        );
        $group.append($item);
      });
    }
    return $group;
  }

  $track.append(buildGroup(false), buildGroup(true));
});

document.querySelectorAll(".review-stars").forEach(function (el) {
  var star =
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">' +
    '<path d="M12 2l2.9 6.26 6.6.64-4.98 4.46 1.42 6.5L12 16.9l-5.94 2.96 1.42-6.5L2.5 8.9l6.6-.64z"/></svg>';
  for (var i = 0; i < 5; i++) {
    el.insertAdjacentHTML("beforeend", star);
  }
});

$(function () {
  var $items = $(".faq-item");
  if (!$items.length) return;
  function openItem($item) {
    var $answer = $item.find(".faq-answer");
    $item.addClass("is-open");
    $answer.css("max-height", $answer[0].scrollHeight + "px");
  }
  function closeItem($item) {
    $item.removeClass("is-open").find(".faq-answer").css("max-height", "");
  }
  $items.filter(".is-open").each(function () {
    openItem($(this));
  });

  $items.find(".faq-question").on("click", function () {
    var $item = $(this).closest(".faq-item");
    var wasOpen = $item.hasClass("is-open");
    $items.not($item).each(function () {
      closeItem($(this));
    });
    wasOpen ? closeItem($item) : openItem($item);
  });
  $(window).on("resize", function () {
    $items.filter(".is-open").each(function () {
      var $answer = $(this).find(".faq-answer");
      $answer.css("max-height", $answer[0].scrollHeight + "px");
    });
  });
});

$(function () {
  var $form = $("#contactForm");
  if (!$form.length) return;

  var $fields = $form.find(".contact-fields");
  var $success = $("#contactSuccess");

  $form.on("submit", function (e) {
    e.preventDefault();

    if (!this.checkValidity()) {
      this.reportValidity();
      return;
    }

    $fields.addClass("d-none");
    $success.removeClass("d-none").addClass("d-flex");

    setTimeout(function () {
      $success.removeClass("d-flex").addClass("d-none");
      $fields.removeClass("d-none");
      $form[0].reset();
    }, 4500);
  });
});

$(function () {
  var $year = $("#footerYear");
  if ($year.length) $year.text(new Date().getFullYear());

  var $backToTop = $("#backToTop");
  if (!$backToTop.length) return;

  $(window).on("scroll", function () {
    $backToTop.toggleClass("is-visible", $(window).scrollTop() > 600);
  });

  $backToTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });
});
