const express = require('express');
const dotEnv = require('dotenv');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');

const Book = require("./model/bookmodel.js");

app.use(express.json())

const PORT = process.env.PORT || 8070;
const URL = process.env.URL

app.get("/", (req, res) => {
    console.log(req);
    return res.status(200).send("Well done")
})


//get all book
app.get("/books", async(req, res) => {
    try {
        const books = await Book.find({}).sort({ createdAt: -1 })
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });

    }
})

//get spesific book
app.get("/books/:id", async(req, res) => {
    const { id } = req.params;

    const books = await Book.find({ _id: id })
    return res.status(200).json(books)
})


//add book
app.post("/books", async(req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "Fill All the data in Form" });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        console.log(error)
        return res.status(500).send("Following errors in Saving the data", { message: error.message })
    }
})

//update the book
app.put("/books/:id", async(req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send("Complete all the empty spaces")
        }

        const { id } = req.params;

        const book = await Book.findByIdAndUpdate(id, req.body);

        if (!book) {
            return res.send("No such book found!").status(400)
        } else {
            return res.send("Update Completed Successfully!").status(400)
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

app.delete("/books/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const delBook = await Book.findByIdAndDelete(id);

        if (!delBook) {
            return res.status(400).send("No Book Found with this ID");
        } else {
            return res.status(200).send("Book Deleted Successfully")
        }


    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})


mongoose.connect(URL)
    .then(() => {
        console.log("Connected to the mongodb")

        app.listen(PORT, () => {
            console.log("Server is running on port->" + PORT)
        })
    })

.catch((err) => {
    console.log(`Error ${err}`);
})