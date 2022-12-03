const express = require('express');
const app = express();

const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res)=>{
  res.render('index',{idade: "idade ainda não informada"})
})

app.post('/calcular', (req, res)=>{
  let dataNasc = req.body.data
  console.log(`Data fornecida: ${dataNasc}`)
  
  let traçoNasc = dataNasc.split('-')
  let anoNasc = traçoNasc[0]
  let mesNasc = traçoNasc[1]
  let diaNasc = traçoNasc[2]
  console.log(`Dia Nascimento: ${diaNasc}/${mesNasc}/${anoNasc}`)
  //Data atual
  let dataAtual = new Date()
  //console.log(dataAtual)
  let anoAtual = dataAtual.getFullYear()
  let mesAtual = dataAtual.getMonth() + 1 //que ele retorna valores indexados em zero (ou seja, de 0 a 11)
  let diaAtual = dataAtual.getDate() 
  console.log(`Dia Atual: ${diaAtual}/${mesAtual}/${anoAtual}`)

  let idade = anoAtual - anoNasc

  // se mes atual for menor que o nascimento, não fez aniversario ainda
  if(mesAtual < mesNasc){
      idade --
  }else{
      if(mesAtual == mesNasc){
          if(new Date().getDate() < diaNasc ){
              //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
              idade --
          }
      }
  }
  console.log(`Data fornecida: ${dataNasc}`)
  console.log(idade)
  res.render('index', {idade: idade})    
  
})

app.listen(port, ()=>{
  console.log(`servidor rodando na url: http://localhost:${port}`)
})

