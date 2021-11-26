import { Schema, Document, model} from 'mongoose';

const postSchema = new Schema({
    
    created: {
        type:Date
    }, 
    mensaje: {
        type:String
    },
    imgs:[{
        type:String
    }],
    coordenadas:{
        type:String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe de existir una referencia a un usuario']
    }
});

postSchema.pre('save', function( next ) {
    this.created = new Date();
    next();
});

interface IPost extends Document {
    created: Date; 
    mensaje:string;
    img:string;
    coordenadas:string;
    usuario:string;
}

export const Post = model<IPost>('Post', postSchema);