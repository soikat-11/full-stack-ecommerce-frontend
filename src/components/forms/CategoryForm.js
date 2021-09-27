import React from "react";

const CategoryForm = ({ name, setName, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Name</label>
      <input
        required
        autoFocus
        type="text"
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <button className="btn btn-outline-primary">Save</button>
    </div>
  </form>
);

export default CategoryForm;
