import mongoose from "mongoose";
import config from "../config/Constants";

class MongoConnection {
    public async connect(): Promise<void>{

        try{
            await mongoose.connect(config.MONGO_CONNECTION)
            console.log('Database conectada')
        } catch (err:any){
            console.error(err.message)
            process.exit(1)
        }
    }
}

export default new MongoConnection();