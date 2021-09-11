import Canvas from "./app/Canvas";
import Scroll from "./app/smoothScroll";
import { lerp } from "./utils";

const smoothScroll = new Scroll();
const canvas = new Canvas();

window.addEventListener("resize", () => {
  smoothScroll.init();
  canvas.onResize();
});

const scroll = {
  current: 0,
  target: 0,
  ease: 0.075,
};

const render = () => {
  // update scroll
  scroll.target = window.scrollY;

  scroll.current = lerp(scroll.current, scroll.target, scroll.ease);

  // update snmooth scroll
  smoothScroll.update(scroll);

  // update canvas
  canvas.update(scroll);

  // Call render again on the next frame
  window.requestAnimationFrame(render);
};

render();
