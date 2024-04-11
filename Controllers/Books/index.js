const Book = require('../../models/book')

const allData = async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            message: "Succesfully Get a Data",
            data: books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
}

const detailData = async (req, res) => {
    try {
        // res.send(req.params.id)
        const bd = req.params.id
        const book = await Book.findById(bd)
        return res.status(200).json({
            message: "Succesfully Get a Data",
            data: book
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
}

const createData = async(req,res)=>{
    try{
        if(!req.body.title||!req.body.author||!req.body.publishYear){
            res.status(400).send({
                message: 'Send all required fields'
            })
        }else{
            const book = {
                title: req.body.title,
                author: req.body.author,
                publishYear: req.body.publishYear,
            }      
            const newBook = await Book.create(book)
            return res.status(200).send(newBook)
        }
    }catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
}

const updateData = async (req,res)=>{
    try {
        if(!req.body.title||!req.body.author||!req.body.publishYear){
            res.status(400).send({
                message: 'Send all required fields'
            })
        }else{
         const id = req.params.id   
         const result = await Book.findOneAndUpdate({_id : id}, req.body)
         if(!result) {
            res.status(404).json({
                message: 'Book not found'
            })
         }
         return res.status(200).send({message: 'Book updated successfully'})
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
}

const deleteData = async (req, res)=> {
    try {
        const id = req.params.id
        const result = await Book.findOneAndDelete({_id : id})
        if(!result) {
            res.status(404).json({
                message: 'Book not found'
            })
         }
         return res.status(200).send({message: 'Book deleted successfully'})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
}

module.exports = {allData, detailData, createData, updateData, deleteData}