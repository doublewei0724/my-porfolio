function showBigImage(imageSrc, type) {
  const modal = document.getElementById(type === "pc" ? "modalPC" : "modalH5");
  const modalImage = document.getElementById(
    type === "pc" ? "modalImagePC" : "modalImageH5"
  );

  modalImage.src = imageSrc;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  disableScroll();
}

function hideBigImage(type) {
  const modal = document.getElementById(type === "pc" ? "modalPC" : "modalH5");
  modal.style.display = "none";
  document.body.style.overflow = "";
  enableScroll();
}

function disableScroll() {
  document.body.addEventListener("touchmove", preventDefault, {
    passive: false,
  });
}

function enableScroll() {
  document.body.removeEventListener("touchmove", preventDefault);
}

function preventDefault(e) {
  e.preventDefault();
}

let pc_swiper, pc_national_swiper, h5_swiper, h5_national_swiper;

function getSwiperOptions(baseCount, nextEl, prevEl) {
  const isMobile = window.innerWidth < 700;

  return {
    slidesPerView: isMobile ? 1 : baseCount,
    slidesPerGroup: isMobile ? 1 : baseCount,
    spaceBetween: isMobile ? 10 : 20,
    navigation: {
      nextEl: nextEl,
      prevEl: prevEl,
    },
    loop: false,
    allowTouchMove: isMobile,
    observer: true,
    observeParents: true,
  };
}

function initResponsiveSwiper(
  selector,
  swiperInstanceVar,
  prevClass,
  nextClass
) {
  const container = document.querySelector(selector);
  if (!container) return;

  if (window.innerWidth < 700) {
    if (!container.classList.contains("swiper-initialized")) {
      container.classList.add("swiper-container");

      const originalSlides = Array.from(container.children);
      const wrapper = document.createElement("div");
      wrapper.classList.add("swiper-wrapper");

      originalSlides.forEach((child) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.appendChild(child);
        wrapper.appendChild(slide);
      });

      container.innerHTML = "";
      container.appendChild(wrapper);

      const prevBtn = document.createElement("div");
      prevBtn.className = `swiper-button-prev ${prevClass}`;
      const nextBtn = document.createElement("div");
      nextBtn.className = `swiper-button-next ${nextClass}`;
      container.appendChild(prevBtn);
      container.appendChild(nextBtn);

      const swiper = new Swiper(selector, {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: `.${nextClass}`,
          prevEl: `.${prevClass}`,
        },
        loop: false,
        allowTouchMove: true,
      });

      container.classList.add("swiper-initialized");
      swiperInstanceVar.instance = swiper;
    }
  } else {
    if (swiperInstanceVar.instance) {
      swiperInstanceVar.instance.destroy(true, true);
      swiperInstanceVar.instance = null;
    }

    if (container.classList.contains("swiper-initialized")) {
      const wrapper = container.querySelector(".swiper-wrapper");
      const slideEls = Array.from(wrapper.querySelectorAll(".swiper-slide"));

      slideEls.forEach((slide) => {
        const child = slide.firstElementChild;
        if (child) container.appendChild(child);
      });

      wrapper.remove();

      const prev = container.querySelector(`.swiper-button-prev.${prevClass}`);
      const next = container.querySelector(`.swiper-button-next.${nextClass}`);
      if (prev) prev.remove();
      if (next) next.remove();

      container.classList.remove("swiper-container", "swiper-initialized");
    }
  }
}

const h5_forum_swiper_holder = { instance: null };
const h5_bet_swiper_holder = { instance: null };

function initSwipers() {
  if (pc_swiper) pc_swiper.destroy(true, true);
  if (pc_national_swiper) pc_national_swiper.destroy(true, true);
  if (h5_swiper) h5_swiper.destroy(true, true);
  if (h5_national_swiper) h5_national_swiper.destroy(true, true);

  pc_swiper = new Swiper(
    ".pc_swiper",
    getSwiperOptions(3, ".pc_next", ".pc_prev")
  );
  pc_national_swiper = new Swiper(
    ".pc_national_swiper",
    getSwiperOptions(3, ".pc_national_next", ".pc_national_prev")
  );
  h5_swiper = new Swiper(
    ".h5_swiper",
    getSwiperOptions(5, ".h5_next", ".h5_prev")
  );
  h5_national_swiper = new Swiper(
    ".h5_national_swiper",
    getSwiperOptions(5, ".h5_national_next", ".h5_national_prev")
  );

  initResponsiveSwiper(
    ".h5_forum_content",
    h5_forum_swiper_holder,
    "h5_forum_prev",
    "h5_forum_next"
  );
  initResponsiveSwiper(
    ".h5_bet_content",
    h5_bet_swiper_holder,
    "h5_bet_prev",
    "h5_bet_next"
  );
}

function preventPageScrollOnTouch(containerSelector) {
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach((container) => {
    container.addEventListener("touchstart", function (e) {
      this._startY = e.touches[0].clientY;
      this._startScrollTop = this.scrollTop;
    });

    container.addEventListener(
      "touchmove",
      function (e) {
        const deltaY = e.touches[0].clientY - this._startY;
        const up = deltaY > 0;
        const down = !up;

        const atTop = this.scrollTop === 0;
        const atBottom =
          this.scrollHeight - this.scrollTop === this.clientHeight;

        if ((atTop && up) || (atBottom && down)) {
          e.preventDefault(); // 👈 阻止整頁滑動
        }
      },
      { passive: false }
    );
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initSwipers();
  preventPageScrollOnTouch(".template_card");
});

window.addEventListener("resize", initSwipers);
