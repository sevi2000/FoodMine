import express, { json, response } from "express"
import cors  from "cors"
import { sample_foods, sample_tags } from "./data";

const app = express();
app.use(cors({
  origin: 'http://localhost:4200', // or your deployed frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if you send cookies/auth headers
}));

app.get("/api/foods", (req, res) => {
    res.send(sample_foods);
});

app.get("/api/foods/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    res.send(
        sample_foods.filter(
            (food) => food.name.toLowerCase().
            includes(searchTerm.toLowerCase())));
});

app.get("/api/foods/tags", (req, res) => {
    res.send(sample_tags);
});

app.get("/api/foods/tag/:tagName", (req, res) => {
    const tagName: string = req.params.tagName;
    res.send(
        sample_foods.filter(
            (food) => food.tags?.includes(tagName)
        )
    );
});

app.get("/api/foods/:foodId", (req, res) => {
    const foodId: string = req.params.foodId;
    res.send(
        sample_foods.find(
            (food) => food.id === foodId)
        )
    }
    );


const port: number = 5000; 
app.listen(port, () => {
    console.log("Website served on localhost:" + port);
})