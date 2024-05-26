/* Hamburger
-------------------------------- */
const header = document.querySelector(".js-header");
const hamb = document.querySelector(".js-hamb");
const nav = document.querySelector(".js-nav");

// ブレイクポイントでのリセット処理
const media = window.matchMedia("(max-width: 992px)");
const callback = (media) => {
  if (!media.matches) {
    header.classList.remove("is-open");
    hamb.classList.remove("is-open");
    nav.classList.remove("is-open");

    hamb.setAttribute("aria-expanded", "false");
    hamb.setAttribute("aria-label", "メニューを開く");
    nav.setAttribute("aria-hidden", "false");
  } else {
    nav.setAttribute("aria-hidden", "true");
  }
};
media.addEventListener("change", callback);

// メニュー開閉処理
const toggleMenu = () => {
  header.classList.toggle("is-open");
  hamb.classList.toggle("is-open");
  nav.classList.toggle("is-open");

  // aria-expanded属性を切り替える
  const isExpanded = hamb.getAttribute("aria-expanded") === "true";
  hamb.setAttribute("aria-expanded", isExpanded ? "false" : "true");

  // aria-label属性を切り替える
  const isMenu = hamb.getAttribute("aria-label") === "メニューを開く";
  hamb.setAttribute("aria-label", isMenu ? "メニューを閉じる" : "メニューを開く",);

  // aria-hidden属性を切り替える
  const isHidden = nav.getAttribute("aria-hidden") === "true";
  nav.setAttribute("aria-hidden", isHidden ? "false" : "true");

  // bodyのoverflowを切り替える
  document.body.style.overflow = document.body.style.overflow === "hidden" ? "" : "hidden";
};
hamb.addEventListener("click", toggleMenu);

// エスケープキーでメニューが閉じるようにする
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    toggleMenu();
  }
});

// リサイズ時のちらつき防止
class Resize {
  constructor(target) {
    this.timeoutId;
    this.target = document.querySelector(target);

    window.addEventListener("resize", this.toggleClass.bind(this));
  }

  toggleClass() {
    this.target.classList.add("is-resize");
    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      this.target.classList.remove("is-resize");
    }, 300);
  }
}
new Resize("html");
