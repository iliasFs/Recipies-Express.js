import reactLogo from "./assets/react.svg";
import React, { useState, useEffect } from "react";

const BASE_URL = "http://localhost:3000";

function App() {
  const [recipes, setRecipes] = useState([]);

  //full recipe
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const getRecipes = async () => {
    await fetch(`${BASE_URL}/recipes`)
      .then((data) => data.json())
      .then((data) => setRecipes(data));
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // send information
    const body = {
      title,
      ingredients,
      instructions,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const method = "POST";

    const options = {
      method,
      headers,
      body: JSON.stringify(body),
    };

    fetch(`${BASE_URL}/recipes`, options);

    //clear inputs

    //get again list
    getRecipes();
    setIngredients("");
    setInstructions("");
    setTitle("");
    console.log(title, ingredients, instructions);
  };


  // id, title, ingredients, instructions
  const displayRecipes = recipes.map((recipe) => {
    return (
      <li key={recipe.id}>
        <div>{recipe.title}</div>
        <div>{recipe.ingredients}</div>
        <div>{recipe.instructions}</div>
      </li>
    )
  })

  return (
    <div>
      <h1>Hello there</h1>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          ingredients
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          ></input>
          instructions
          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          ></input>
          <button>add</button>
        </div>
      </form>
      <ul>{displayRecipes}</ul>
    </div>
  );
}
export default App;
