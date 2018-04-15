var app = new Vue({
  el: '#app',
  data: () => ({
    blockchainState: {
      _sheaClientHash: 'Loading...',
      count: 0,
      messages: [],
    },
    txData: {
      id: (Math.random() * 1000000).toString(16),
      userId: 'personId',
      body: 'hello world woohooo',
    },
  }),
  methods: {
    getState() {
      return fetch('/state').then(res => res.json());
    },
    sendTx(tx) {
      return fetch('/txs', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify(tx),
      }).then(res => res.json());
    },
    async sendTransaction() {
      console.log('sending tx...');
      let result = await this.sendTx(this.txData);
      console.log('result of submitting a transaction:', result);
      this.blockchainState = await this.getState();
      this.resetInput();
    },
    resetInput() {
      this.txData.body = '';
    },
  },
});
