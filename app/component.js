export default (text = 'Hello wooooorld') => {
  const element = document.createElement('div');
  element.innerHTML = text;

  return element;
};
