import express from "express";
import cors from "cors";

const app = express();
const port = 3000;
let counterId = 3;

const recipes = [
  {
    title: "Spaghetti",
    id: 0,
    instructions: "You should know by now how to cook a fucking spaghetti",
    ingredients: " flour, egg,oil,water,salt",
  },
  {
    title: "Fried eggs",
    id: 1,
    instructions: "You should know by now how to cook a fucking fried egg",
    ingredients: "  egg,oil,salt",
  },
  {
    title: "French fries",
    id: 2,
    instructions: "You should know by now how to cook french fries",
    ingredients: " potatoes,water, salt,oil",
  },
];

//recipie GET
app.use(express.json());
app.use(cors());

app.get("/recipes", (req, res) => {
  res.status(200);
  res.send(recipes);
});

//recipie POST
app.post("/recipes", (req, res) => {
  console.log(req.body)
  const recipe = req.body;
  recipe.id = counterId;
  counterId++;
  recipes.push(recipe);
  res.status(201);
  res.send(recipe);
});

//Get single recipe
app.get("/:id", (req, res) => {
  //res.send(req.params.id)
  let found = recipes.some((recipe) => recipe.id === parseInt(req.params.id));

  if (found) {
    res.send(recipes.filter((recipe) => recipe.id === parseInt(req.params.id)));
  } else {
    res.status(400);
    res.send("Recipe not found");
  }
});

app.listen(port, () =>
  console.log(`Example listening on http://localhost:${port}`)
);
