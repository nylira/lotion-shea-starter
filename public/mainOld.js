// front end javascript goes here
let root = document.body;

// FUNCTIONS
function getState() {
  return fetch('/state').then(res => res.json());
}
function sendTx(tx) {
  return fetch('/txs', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify(tx),
  }).then(res => res.json());
}
async function btnSendTx() {
  console.log('sending tx...');
  let result = await sendTx({foo: 'bar'});
  console.log('result of submitting a transaction:');
  console.log(result);
}
async function btnGetState() {
  let newState = await getState();
  console.log('current blockchain state:', state);
  state._sheaClientHash = newState._sheaClientHash;
  state.count = newState.count;
}

// VARIABLES
let state = {
  _sheaClientHash: 'Loading...',
  count: 0,
};

// VIEWS
let CompMain = {
  view: () =>
    m('main', [
      m('h1', {class: 'title'}, 'Rocket App'),
      m('button', {onclick: () => btnSendTx()}, 'Send Tx'),
      m('button', {onclick: () => btnGetState()}, 'Get State'),
      m('p', `Shea Client Hash: ${state._sheaClientHash}`),
      m('p', `Tx Count: ${state.count}`),
    ]),
};

// MAIN
function main() {
  m.mount(root, CompMain);
}

main();
