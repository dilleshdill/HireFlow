import dotenv from 'dotenv'
dotenv.config()

if(!process.env.CLOUD_NAME){
    console.log("error cloudnary key not loaded")
    process.exit(1)
}
console.log("env variables loaded")
