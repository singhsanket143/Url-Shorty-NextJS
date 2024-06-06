import mongoose, { Document, Model, Schema} from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String, 
        required: true,
        unique: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

export interface IUrl extends Document {
    originalUrl: string,
    shortUrl: string
}

const Url: Model<IUrl> = mongoose.models.Url || mongoose.model<IUrl>('Url', urlSchema);

export default Url;