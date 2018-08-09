import StateRouter from 'abstract-state-router';
import makeSvelteStateRenderer from 'svelte-state-renderer';
import sausage from 'sausage-router';
import makeRouter from 'hash-brown-router';

const renderer = makeSvelteStateRenderer();

const stateRouter = StateRouter(renderer, document.querySelector('main'), {
  pathPrefix: '',
  router: makeRouter(sausage())
});

stateRouter.on('stateChangeEnd', () => {
  window.scroll(0,0);
});

export {
  stateRouter
};
