// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import SearchBar from './components/SearchBar';
import FavouriteList from './FavouritesList'; 
import RecommendationsList from './RecommendationsList';

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <h1>Recipe Manager</h1>
        <Routes>
          <Route path="/" element={
            <>
               <SearchBar />
              <AddRecipeForm />
              <RecipeList />
              <hr />
              <FavouriteList/>
              <hr />
              <RecommendationsList/>
            </>
          } />

          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/recipes/:id/edit" element={<EditRecipeForm />} />

          {/* fallback route (optional) */}
          <Route path="*" element={<div>Page not found. <a href="/">Go home</a></div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
