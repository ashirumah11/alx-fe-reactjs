// src/components/DeleteRecipeButton.jsx
import { useRecipeStore } from './recipeStore';

const DeleteRecipeButton = ({ recipeId, onDeleted }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);

  const handleDelete = () => {
    const ok = window.confirm('Delete this recipe? This cannot be undone.');
    if (!ok) return;
    deleteRecipe(recipeId);
    if (typeof onDeleted === 'function') onDeleted();
  };

  return <button onClick={handleDelete} style={{ marginLeft: 8 }}>Delete</button>;
};

export default DeleteRecipeButton;
