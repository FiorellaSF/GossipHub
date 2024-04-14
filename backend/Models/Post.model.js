import mongoose from 'mongoose';
import publicationSchema from '../Schemas/Publication.schema.js';

const Publication = mongoose.model('Publication', publicationSchema);

export default Publication;
