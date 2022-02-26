const path = require('path')
const express = require('express')

const app = express()

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.json()) 
app.use(express.static(publicDirectoryPath))

app.get('/hi', (req, res) => {
    res.send('hi')
})

app.listen(port, () => {
    console.log('Server is up on port', port)
})