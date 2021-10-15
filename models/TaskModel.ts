import mongoose, {Schema} from 'mongoose';

const TaskSchema = new Schema({
    name: {type: String, required: [true, '*Campo Obrigatório']},
    userId: {type: String, required: [true, '*Campo Obrigatório']},
    finishPrevisionDate: {type: String, required: [true, '*Campo Obrigatório']},
    finishDate: {type: String},
});

export const TaskModel = mongoose.models.task || mongoose.model('tasks', TaskSchema);