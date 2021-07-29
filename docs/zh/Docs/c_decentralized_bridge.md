## 全去中心化跨链桥-JS-SDK参考

### 核心流程

- 1. 用户USDT(BSC)从BSC网络转入NERVE
- 2. 在NERVE上，通过USDT池子，用户把USDT(BSC)兑换成USDT(ETH)
- 3. 在NERVE上，用户把USDT(ETH)转出到ETH网络

### 流程1-JS-SDK参考

[https://github.com/nerve-admin/nerve-js-sdk/blob/master/src/test/htgRecharge.js#L38](https://github.com/nerve-admin/nerve-js-sdk/blob/master/src/test/htgRecharge.js#L38)

### 流程2-JS-SDK参考

[https://github.com/nerve-admin/nerve-js-sdk/blob/master/src/test/swap/stableSwapTrade.js#L22](https://github.com/nerve-admin/nerve-js-sdk/blob/master/src/test/swap/stableSwapTrade.js#L22)

### 流程3-JS-SDK参考

[https://github.com/nerve-admin/nerve-js-sdk/blob/master/src/test/htgWithdrawal.js#L51](https://github.com/nerve-admin/nerve-js-sdk/blob/master/src/test/htgWithdrawal.js#L51)

- 流程3里有一步提现手续费，需要动态计算，参考以下链接
    - [https://github.com/nerve-admin/nerve-js-sdk/blob/master/src/test/htgWithdrawalFee.js#L71](https://github.com/nerve-admin/nerve-js-sdk/blob/master/src/test/htgWithdrawalFee.js#L71)

- 若提现交易发出后，交易迟迟不被转出网络ETH确认，则需要在NERVE网络追加提现手续费，参考以下链接
    - [https://github.com/nerve-admin/nerve-js-sdk/blob/master/src/test/htgWithdrawalAddFee.js#L19](https://github.com/nerve-admin/nerve-js-sdk/blob/master/src/test/htgWithdrawalAddFee.js#L19)

<br>
<br>
<br>
<b style="color:red">注意:</b>
<br>
整个流程，默认用户在NERVE网络的账户上有足够的NVT来支付手续费（USDT兑换和跨链转出）

<br>
若用户没有NVT，我们目前采取的方案是用户跨链转入BSC上的BNB资产，再在NERVE网络上发一笔闪兑交易，把BNB换成NVT
