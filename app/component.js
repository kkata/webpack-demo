module.exports = function() {
  var styles = require('./main.css');
  var element = document.createElement('h1');
  element.innerHTML = 'Hello world';
  element.className = styles.redButton;
  return element;
};