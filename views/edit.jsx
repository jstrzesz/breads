const React = require('react');
const Default = require('./layouts/default');

const Edit = ({ bread }) => {
  return (
    <Default>
      <h2>Edit a bread</h2>
      <form action={`/breads/${bread._id}?_method=PUT`} method='POST'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          required
          defaultValue={bread.name}
        />
        <label htmlFor='image'>Image</label>
        <input
          type='text'
          name='image'
          id='image'
          defaultValue={bread.image}
        />
        <label htmlFor='hasGluten'>Has Gluten?</label>
        <input
          type='checkbox'
          name='hasGluten'
          id='hasGluten'
          defaultChecked={bread.hasGluten}
        />
        <label htmlFor='baker'>Baker</label>
        <select name="baker" id="baker">
          <option value="Rachel">Rachel</option>
          <option value="Monica">Monica</option>
          <option value="Phoebe">Phoebe</option>
          <option value="Joey">Joey</option>
          <option value="Chandler">Chandler</option>
          <option value="Ross">Ross</option>
        </select>
        <br />
        <input type='submit' />
      </form>
      <div className='backButton'>
        <a href='/breads'>
          <button>Go back to the index</button>
        </a>
      </div>
    </Default>
  );
};

module.exports = Edit;
