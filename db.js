const {MongoClient} = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()

async function go() {
    let client = MongoClient(process.env.CONNECTIONSTRING)
    await client.connect()
    module.exports = client
    const app = require("./app")
    app.listen(process.env.PORT)

}

go ()