export default ( text = 'Hello wooooorld' ) => {
  const element = document.createElement( 'div' );
  element.className = 'pure-button';
  element.innerHTML = text;

  return element;
};
