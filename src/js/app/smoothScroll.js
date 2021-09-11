const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

export default class Scroll {
  constructor() {
    this.scrollable = document.querySelector(".scrollable");
    this.scroll = {
      current: 0,
      target: 0,
      ease: 0.075,
    };

    this.init();
  }

  init() {
    document.body.style.height = `${
      this.scrollable.getBoundingClientRect().height
    }px`;
  }

  update() {
    this.scroll.target = window.scrollY;
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );

    // prettier-ignore
    this.scrollable.style.transform = `translate3d(0, ${-this.scroll.current}px, 0)`;
  }
}
