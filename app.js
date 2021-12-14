const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("./models/produçao");
const Produçao = mongoose.model('produçao');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
}) 

mongoose.connect('mongodb+srv://henriqueRonald:wte383@cluster0.h6xsp.azure.mongodb.net/prod?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
    console.log("conexao ao mongo realizada com sucesso");
}).catch((erro) => {
    console.log("error : ohh nao algo deu errado , verifique e tente novamente.");
});

app.get("/postes", (req,res) => {
    Produçao.find({}).then((produçao) => {
        return res.json(produçao);
    }).catch((erro) => {
        return res.json(400).json({
            error: true,
            message: "nenhuma produçao encontrada!!!"
        })
    })
});

app.get("/:id", (req, res) => {
    Produçao.findOne({_id:req.params.id}).then((produçao) =>{
        return res.json(produçao);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "nenhuma produçao encontrada!!!"
        })
    })
});

app.post("/medral", (req,res) => {
   const produçao = Produçao.create(req.body, (err) => {
       if(err) return res.status(400).json({
           error: true,
           message : "erro produçao nao foi cadastrada"
       })

       return res.status(200).json({
           error: false,
           message: " produçao cadastrada com sucesso"
       })
   })
});

app.put("/:id", (req, res) => {
    const produçao = Produçao.updateOne({_id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: " error: Produçao não foi editado!!!"
        });
        return res.json({
            error: false,
            message: "Produçao editado com sucesso!!!"
        });
    });
});

app.delete("/:id", (req, res) => {
    const produçao = Produçao.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error : Produçao nao foi deletado!!!"
        });

        return res.json({
            error: false,
            message: " Produçao deletado com sucesso!!!"
        });
    });
});
app.listen(8080, () => {
    console.log("servidor rodando na porta 8080: http://localhost:8080/produçao/");
});