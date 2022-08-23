const React = require('react');
const Default = require('./layouts/default');

const BakerShow = ({ baker }) => (
  <Default>
    <h3>{baker.name}</h3>
    <p>{baker.name} has been baking with us since {baker.startDate.getFullYear()}.</p>
    <p>About {baker.name}: {baker.bio}</p>
    <h3>Breads {baker.name} has baked</h3>
    <ul>
      { baker.breads.map(bread => (
          <li key={bread.id}>
            <a href={`/breads/${bread._id}`}>
              {bread.name}
            </a>
          </li>
        ))
      }
    </ul>
    <form action={`/bakers/${baker.id}?_method=DELETE`} method="POST">
      <input type="submit" value="DELETE" />
    </form>
  </Default>
);

module.exports = BakerShow;
