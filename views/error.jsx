const React = require('React');
const Default = require('./layouts/Default');


const Error = () => {
  return (
    <Default>
      <h2>404: Page Doesn't Exist</h2>
    </Default>
  );
};

module.exports = Error;
