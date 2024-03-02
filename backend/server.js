const express = require('express');
const dotEnv = require('dotenv');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const Book = require("./model/bookmodel.js");
const { getAllBookData, getSpesificBook, addNewBook, updateBook, deleteBook } = require('./routes/bookRoutes')


app.use(express.json())

//middleware to handle cors policy
//1.all origins default with cors
app.use(cors())
    //2.allow only cuttom origin
    /* app.use(cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowHeaders: ['Content-Type']
    })) */

const PORT = process.env.PORT || 8070;
const URL = process.env.URL

app.get("/", async(req, res) => {
    console.log(req);
    return res.status(200).send("Well done")
})


//get all book
app.get("/books", getAllBookData)

//get spesific book
app.get("/books/:id", getSpesificBook)


//add book
app.post("/books", addNewBook)

//update the book
app.put("/books/:id", updateBook)

app.delete("/books/:id", deleteBook)


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