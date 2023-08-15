const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb://0.0.0.0:27017/to-do-list')
}

main().catch((error) => {console.log(error)})

module.exports = mongoose
