export default class Scroll {
  constructor() {
    this.scrollable = document.querySelector(".scrollable");

    this.init();
  }

  init() {
    document.body.style.height = `${
      this.scrollable.getBoundingClientRect().height
    }px`;
  }

  update(scroll) {
    this.scrollable.style.transform = `translate3d(0, ${-scroll.current}px, 0)`;
  }
}
