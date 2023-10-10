import express from "express";
import Sequelize from "sequelize";
import models from "./models"; // Adjust path to where your models are

const app = express();
const Op = Sequelize.Op; // Sequelize Operators

app.get("/random-word", async (req, res) => {
  try {
    // Get a random word
    const word = await models.Words.findOne({
      order: Sequelize.literal("random()"),
      include: [
        {
          model: models.Categories,
          attributes: ["category_name"],
        },
        {
          model: models.BaseWords,
          attributes: ["base_word", "literal_meaning"],
        },
      ],
    });

    if (!word) {
      return res.status(404).json({ error: "No words found in the database." });
    }

    // Formulate the response
    const response = {
      word: word.word,
      category: word.Category.category_name, // assuming your relation name is 'Category'
      definition: word.definition,
      literal_definition: word.literal_definition,
      example_sentence: word.example_sentence,
      base_words: word.BaseWords.map((bw) => ({
        base_word: bw.base_word,
        literal_meaning: bw.literal_meaning,
      })),
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching random word:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
