let lotion = require('lotion');
let shea = require('shea');

let app = lotion({
  initialState: {
    count: 0,
    messages: [],
  },
  devMode: process.env.PRODUCTION !== 'true',
});

app.use(function(state, tx, chainInfo) {
  // handle transactions here
  state.count++;
  state.messages.push(tx);
});

app.useBlock(function(state, chainInfo) {
  // do something once per block here
});

app.use(shea('public/'));

let port = process.env.PORT || 3000;
app.listen(port);
