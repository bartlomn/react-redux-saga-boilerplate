export default ( text = `App revision: ${ __APP_REVISION__ }` ) => {
  const element = document.createElement( 'div' );
  element.className = 'pure-button';
  element.innerHTML = text;

  return element;
};
