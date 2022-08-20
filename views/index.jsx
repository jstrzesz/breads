const React = require('react');
const Default = require('./layouts/default');

const Index = ({ bakers, breads, title }) => {
  return (
    <Default title={title}>
      <h2>Index Page</h2>
      <h3>Bakers</h3>
      <ul>
        { bakers.map(baker => (
            <li key={baker.id}>
              <a href={`/bakers/${baker.id}`}>{baker.name}</a>
            </li>
          ))
        }
      </ul>
      <h3>Breads</h3>
      <ul>
        {breads.map((bread) => (
          <li key={bread._id}>
            <a href={`/breads/${bread._id}`}>
              {bread.name}
            </a>
          </li>
          ))
        }
      </ul>
      <div className='newButton'>
        <a href='/breads/new'>
          <button>Add a new bread</button>
        </a>
      </div>
    </Default>
  );
};

module.exports = Index;
