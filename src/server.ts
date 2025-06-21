import {Server} from 'http'
import mongoose from 'mongoose';
import app from './app';

let server:Server;

const PORT =5000

async function  main (){
    try {
        await mongoose.connect('mongodb+srv://libraryManager:XvxgUwLitS8Fzn5P@cluster0.vmt4q.mongodb.net/library-management-system?retryWrites=true&w=majority&appName=Cluster0')

       server= app.listen(PORT ,()=>{
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()