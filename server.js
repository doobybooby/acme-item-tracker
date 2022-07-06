const { conn, User, Thing } = require('./db');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use('/dist', express.static('dist'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.post('/api/users', async(req, res, next)=> {
  try {
    res.status(201).send(await User.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/things', async(req, res, next)=> {
  try {
    res.status(201).send(await Thing.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/things', async(req, res, next)=> {
  try {
    res.send(await Thing.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users', async(req, res, next)=> {
  try {
    res.send(await User.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/things/:id', async(req, res, next)=> {
  try{
    res.sendStatus(204).send(await Thing.detroy( {where: { id: req.params.id }} ))
  }
  catch(er){
    next(er)
  }
})
app.delete('/api/users/:id', async(req, res, next)=> {
  try{
    res.sendStatus(204).send(await User.detroy( {where: { id: req.params.id }} ))
  }
  catch(er){
    next(er)
  }
})


const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));

const init = async()=> {
  try {
    await conn.sync({ force: true });

    const [foo, bar, bazz, quq, fizz] = await Promise.all([
      Thing.create({ name:'foo'}),
      Thing.create({ name:'bar'}),
      Thing.create({ name:'bazz'}),
      Thing.create({ name:'quq'}),
      Thing.create({ name: 'fizz'}),
    ]);

    const [moe, larry, lucy, ethyl] = await Promise.all([
      User.create({ name:'moe' , thingId: foo.id}),
      User.create({ name:'larry', thingId: bar.id}),
      User.create({ name:'lucy', thingId: quq.id }),
      User.create({ name:'ethyl' }),
    ]);


    foo.userId = moe.id
    bar.userId= larry.id
    foo.save()
    bar.save()

  }
  catch(ex){
    console.log(ex);
  }
};

init();
