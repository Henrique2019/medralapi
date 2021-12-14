const mongoose = require('mongoose');
const Produçao = new mongoose.Schema({
     
    Cidade: { type: String, required: true},
    Quadricula: { type: String, required: true},
    Date: { type: Date, required: true},
    Produçao: { type: Number, required: true},
       
    createdAt: { type: Date, default: Date.now}},
{
    timestamps: true,
});

mongoose.model('produçao', Produçao);