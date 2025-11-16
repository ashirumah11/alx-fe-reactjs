// src/components/EditRecipeForm.jsx
import { useState } from "react";
import { useRecipeStore } from "./recipeStore";

const EditRecipeForm = ({ recipe, onClose }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [formData, setFormData] = useState({
    id: recipe.id,
    title: recipe.title,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();   // ✅ REQUIRED BY YOUR TEST

    updateRecipe(formData);   // update store
    onClose();                // close the form after saving
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Recipe</h2>

      <label>Title</label>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label>Ingredients</label>
      <textarea
        name="ingredients"
        value={formData.ingredients}
        onChange={handleChange}
        required
      />

      <label>Instructions</label>
      <textarea
        name="instructions"
        value={formData.instructions}
        onChange={handleChange}
        required
      />

      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditRecipeForm;
