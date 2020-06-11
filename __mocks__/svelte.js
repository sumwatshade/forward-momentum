const svelte = jest.requireActual('svelte');

module.exports = {
  ...svelte,
  getContext: jest.fn(() => ({
    open: jest.fn(),
  })),
};
