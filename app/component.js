import styles from './main.css';

export default (text = 'Hello wooooorld') => {
  const element = document.createElement('div');
  element.className = styles.redButton;
  element.innerHTML = text;

  return element;
};
