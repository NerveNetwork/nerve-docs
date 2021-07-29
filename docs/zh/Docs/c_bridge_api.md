# Nerve-Bridge 跨链公共API

为第三方应用提供资产跨链的公共API服务。主要提供组装交易、广播交易的功能，需要第三方或用户离线签名。

异构链：指ETH/BSC/OKT/HECO等，非NULS链、NERVE链体系的区块链。

## 跨链流程

该流程实际上是从异构链A将资产充值到NERVE链，再从NERVE链提现到异构链B的过程。

### 合约资产跨链流程

支持ETH/BSC/OKT/HECO链作为发起链，以BSC网络上的USDT转入到ETH网络上为例【USDT(BSC)→USDT(ERC20)】

1. 将USDT资产充值到NERVE网络（合约资产）
    1. 检查是否授权`/tx-api/isAuthorized`
    2. 如果没有授权，则授权（详见授权）。`/tx-api/authorization`
    3. 组装充值交易`/tx-api/rechargeContractAsset`
    4. 第三方离线进行签名（详见异构链交易签名），得到签名后的txhex
    5. 广播交易到BSC网络`/tx-api/send`
    6. 如果交易因手续费过低不能确认，请调用加速接口
        1. 充值资产是该网络的合约资产`/tx-api/speedUpRechargeContractAsset`
2. 如果NERVE网络的地址没有NVT token则需要兑换手续，如果有足够的手续费则省略本步骤。
    1. 闪兑接口仅支持部分资产，兑换手续费需要使用各网络的主资产（如没有，需要额外充值）。
    2. 组装兑换手续费交易`/bridge-api/tx/exchange`
    3. （非必要步骤）预计能兑换的数量`/bridge-api/tx/quantity`
    4. 签名兑换手续费交易 （详见NERVE交易签名）
3. 将USDT从NERVE网络提现到ETH网络
    1. 组装提现USDT交易`/tx-api/withdrawal`
    2. 第三方对NERVE交易进行离线签名
4. 将2(如果有)、3的交易按顺序广播到NERVE网络中 /tx-api/broadcast
#### 主资产跨链流程

支持ETH/BSC/OKT/HECO链作为发起链，以将BSC网络上BNB转入到ETH网络上为例【BNB(BSC)→BNB(ERC20)】

1. 将BNB资产充值到NERVE网络（BSC网络的主资产）
    1. 组装充值交易`/tx-api/rechargeMainAsset`
    2. 第三方离线进行签名，得到签名后的txHex
    3. 广播交易到BSC网络`/tx-api/send`
    4. 如果交易因手续费过低不能确认，请调用加速接口
        1. 充值资产是该网络的主资产`/tx-api/speedUpRechargeMainAsset`
2. 如果NERVE网络的地址没有NVT token则需要兑换手续，如果有足够的手续费则省略本步骤。
    1. 闪兑接口仅支持部分资产，兑换手续费需要使用充值进来的BNB。
    2. 组装兑换手续费交易`/bridge-api/tx/exchange`
    3. （非必要步骤）预计能兑换的数量`/bridge-api/tx/quantity`
    4. 签名兑换手续费交易
3. 将BNB从NERVE网络提现到ETH网络。值得注意的是，如果有兑换手续费交易，那么组装提现交易时，BNB资产coinFrom的nonce值需要用到兑换手续费交易hash的后8位（组装连续交易）。
    1. 组装提现USDT交易`/tx-api/withdrawal`
    2. 第三方对NERVE交易进行离线签名
    
4. 将2(如果有)、3的交易txHex按顺序广播到NERVE网络中 `/tx-api/broadcast`

    
### 异构链合约资产授权

充值合约资产时，先判断是否有足够已授权，没有授权则需要组装授权交易`/tx-api/authorization`，组装完成后仍需用户离线签名，再调用广播接口`/tx-api/send`，广播到对应网络中。确认之后则可以进行合约资产的充值。



### 异构链离线签名

```java
import org.web3j.crypto.Credentials;
import org.web3j.crypto.RawTransaction;
import org.web3j.crypto.TransactionDecoder;
import org.web3j.crypto.TransactionEncoder;

// 以java为例
String txHex; // 通过组装交易接口得到txHex
String prikey; // fromAddress的私钥
int chainId; // 网络chainId
RawTransaction rawTransaction = TransactionDecoder.decode(txHex);
Credentials credentials = Credentials.create(prikey);
byte[] signedMessage = TransactionEncoder.signMessage(rawTransaction, chainId credentials);
String signedHex = Numeric.toHexString(signedMessage);
```



### NERVE交易离线签名

交易签名可以使用NERVE提供的最新的 NerveSDK工具进行离线签名，用户也可以自己对交易hash进行签名，如果涉及到闪兑交易，需要以追加签名的方式进行。

```java
import network.nerve.kit.util.NerveSDKTool;
// 以java为例
String txHex; // 通过组装交易接口得到txHex
String prikey; // fromAddress的私钥
String fromAddress; // 发送交易的地址fromAddress
String signedHex = NerveSDKTool.sign(txHex, fromAddress, prikey);
```



## 接口

### 充值主资产到NERVE网络

url：`/tx-api/rechargeMainAsset`

method：post

params：

|参数名|类型|必填|描述|
|:----|:----|:----|:----|
|fromMainNetwork|String|Y|异构链网络名称ETH/BSC/HECO/OKT|
|fromAddress|String|Y|from地址|
|value|BigInteger|Y|充值数量（最小单位）|
|toAddress|String|Y|NERVE网络接收地址|
|multySignContractAddress|String|Y|异构链网络中的多签合约地址|

请求示例

```json
{
    "fromMainNetwork": "ETH",
    "fromAddress": "0xf6A921E2731fDfc2d465Ba9383Fb18bC35F25212",
    "value": 12500000000000000, //由于ETH有18位小数，这里实际上充值了0.0125个ETH
    "toAddress":"TNVTdTSPNNZi9AtgofKc7zjc67V3CDUik151F",
    "multySignContractAddress":"0x7D759A3330ceC9B766Aa4c889715535eeD3c0484"
}
```

返回交易hex

```json
{
  "data" : "0xf8e6068405f5e10....", //交易hex
  "code" : 0
}
```



### 充值合约资产到NERVE网络

url：`/tx-api/rechargeContractAsset`

method：post

params：

|参数名|类型|必填|描述|
|:----|:----|:----|:----|
|fromMainNetwork|String|Y|异构链网络名称ETH/BSC/HECO/OKT|
|fromAddress|String|Y|from地址|
|value|BigInteger|Y|充值数量（最小单位）|
|toAddress|String|Y|NERVE网络接收地址|
|multySignContractAddress|String|Y|异构链网络中的多签合约地址|
|erc20ContractAddress|String|Y|Token合约地址|

请求示例

```json
{
    "fromMainNetwork": "BSC",
    "fromAddress": "0xf6A921E2731fDfc2d465Ba9383Fb18bC35F25212",
    "value": 5000000,
    "toAddress":"TNVTdTSPNNZi9AtgofKc7zjc67V3CDUik151F",
    "multySignContractAddress":"0xf7915d4de86b856F3e51b894134816680bf09EEE",
    "erc20ContractAddress": "0xb6d685346106b697e6b2bba09bc343cafc930ca3"
}
```

返回交易hex

```json
{
  "data" : "0xf8e6068405f5e10....", //交易hex
  "code" : 0
}
```



### 加速主资产充值

url：`/tx-api/speedUpRechargeMainAsset`

method：post

params：

|参数名|类型|必填|描述|
|:----|:----|:----|:----|
|fromMainNetwork|String|Y|异构链网络名称ETH/BSC/HECO/OKT|
|fromAddress|String|Y|from地址|
|value|BigInteger|Y|充值数量（最小单位）|
|toAddress|String|Y|NERVE网络接收地址|
|multySignContractAddress|String|Y|异构链网络中的多签合约地址|
|gasPrice|BigInteger|Y|加速时的gasPrice|
|nonce|BigInteger|Y|充值交易的nonce|

请求示例

```json
{
    "fromMainNetwork": "ETH",
    "fromAddress": "0xf6A921E2731fDfc2d465Ba9383Fb18bC35F25212",
    "value": 1250000000000000,
    "toAddress":"TNVTdTSPNNZi9AtgofKc7zjc67V3CDUik151F",
    "multySignContractAddress":"0x7D759A3330ceC9B766Aa4c889715535eeD3c0484",
    "gasPrice": 2000000000,
    "nonce": 15
}
```

返回交易hex

```json
{
  "data" : "0xf8e6068405f5e10....", //交易hex
  "code" : 0
}
```



### 加速合约产充值

url：`/tx-api/speedUpRechargeContractAsset`

method：post

params：

| 参数名                   | 类型       | 必填 | 描述                       |
| :----------------------- | :--------- | :--- | :------------------------- |
| fromMainNetwork          | String     | Y    | 网络名称ETH/BSC/HECO/OKT   |
| fromAddress              | String     | Y    | from地址                   |
| value                    | BigInteger | Y    | 充值数量（最小单位）       |
| toAddress                | String     | Y    | NERVE网络接收地址          |
| multySignContractAddress | String     | Y    | 异构链网络中的多签合约地址 |
| erc20ContractAddress     | String     | Y    | Token合约地址              |
| gasPrice                 | BigInteger | Y    | 加速时的gasPrice           |
| nonce                    | BigInteger | Y    | 充值交易的nonce            |

请求示例

```json
{
    "fromMainNetwork": "BSC",
    "fromAddress": "0xf6A921E2731fDfc2d465Ba9383Fb18bC35F25212",
    "value": 5000000,
    "toAddress":"TNVTdTSPNNZi9AtgofKc7zjc67V3CDUik151F",
    "multySignContractAddress":"0xf7915d4de86b856F3e51b894134816680bf09EEE",
    "erc20ContractAddress": "0xb6d685346106b697e6b2bba09bc343cafc930ca3",
    "gasPrice": 20000000,
    "nonce": 15
}
```

返回交易hex

```json
{
  "data" : "0xf8e6068405f5e10....", //交易hex
  "code" : 0
}
```



### 检查是否授权

url：`/tx-api/isAuthorized`

method：post

params：

| 参数名                   | 类型   | 必填 | 描述                       |
| :----------------------- | :----- | :--- | :------------------------- |
| fromMainNetwork          | String | Y    | 网络名称ETH/BSC/HECO/OKT   |
| fromAddress              | String | Y    | from地址                   |
| multySignContractAddress | String | Y    | 异构链网络中的多签合约地址 |
| contractAddress          | String | Y    | Token合约地址              |

请求示例

```json
{
    "fromMainNetwork": "BSC",
    "fromAddress": "0xf6A921E2731fDfc2d465Ba9383Fb18bC35F25212",
    "multySignContractAddress":"0xf7915d4de86b856F3e51b894134816680bf09EEE",
    "contractAddress": "0xb6d685346106b697e6b2bba09bc343cafc930ca3"
}
```

return：

```json
{
  "data" : true, // true：已授权/false：未授权
  "code" : 0
}
```



### 授权

url：`/tx-api/authorization`

method：post

params：

| 参数名                   | 类型   | 必填 | 描述                       |
| :----------------------- | :----- | :--- | :------------------------- |
| fromMainNetwork          | String | Y    | 网络名称ETH/BSC/HECO/OKT   |
| fromAddress              | String | Y    | from地址                   |
| multySignContractAddress | String | Y    | 异构链网络中的多签合约地址 |
| contractAddress          | String | Y    | Token合约地址              |

请求示例

```json
{
    "fromMainNetwork": "BSC",
    "fromAddress": "0xA9F5653A2b703Ecc040bE2BA4414aF261dB153C3",
    "multySignContractAddress":"0xf7915d4de86b856F3e51b894134816680bf09EEE",
    "contractAddress": "0xb6d685346106b697e6b2bba09bc343cafc930ca3"
}
```

返回交易hex

```json
{
    "msg": "success",
    "code": 0,
    "data": "0xf866808502540be40082b4fa94b6d..................................."
}
```



### 异构链广播交易

url：`/tx-api/send`

method：post

params：

| 参数名          | 类型   | 必填 | 描述                                       |
| :-------------- | :----- | :--- | :----------------------------------------- |
| fromMainNetwork | String | Y    | 要广播交易的异构链网络名称ETH/BSC/HECO/OKT |
| txHex           | String | Y    | 完整交易hex字符串                          |

返回交易信息

return：

```json
 {
  "msg" : "success",
  "code" : 0,
  "data" : {
    "id" : 5,
    "jsonrpc" : "2.0",
    "result" : "0x97a34152a39a69f18d9cc84b97814bc07d4dabab4aee293eb4d712e59322f1f1",
    "error" : null,
    "rawResponse" : null,
    "transactionHash" : "0x97a34152a39a69f18d9cc84b97814bc07d4dabab4aee293eb4d712e59322f1f1"
  }
}
```



### 提现 (NERVE 转出到 异构链)

url：`/tx-api/send`

method：post

params：

| 参数名               | 类型       | 必填 | 描述                                      |
| :------------------- | :--------- | :--- | :---------------------------------------- |
| fromMainNetwork      | String     | Y    | 网络名称ETH/BSC/HECO/OKT                  |
| assetChainId         | Integer    | Y    | 提现资产链ID                              |
| assetId              | Integer    | Y    | 提现资产ID                                |
| heterogeneousAddress | String     | Y    | 提现to异构链地址                          |
| amount               | BigInteger | Y    | 提现数量                                  |
| fromAddress          | String     | Y    | 提现发起地址（NERVE）                     |
| remark               | String     | N    | 备注                                      |
| distributionFee      | BigInteger | Y    | 提现手续费（NVT）                         |
| time                 | Long       | N    | 交易时间                                  |
| withdrawalAssetNonce | String     | N    | 提现资产nonce值，该资产进行连续交易时必填 |
| nvtFeeAssetNonce     | String     | N    | 提现手续费资产nonce值                     |

请求示例

```
{
    "fromMainNetwork": "ETH",
    "fromAddress": "TNVTdTSPNNZi9AtgofKc7zjc67V3CDUik151F",
    "amount": 10000000000000000,
    "heterogeneousAddress":"0xf6A921E2731fDfc2d465Ba9383Fb18bC35F25212",
    "assetChainId": 5,
    "assetId": 2,
    "distributionFee": 1000000
}
```

返回交易hash和hex

```json
{
  "msg" : "success",
  "code" : 0,
  "data" : {
    "txHex" : "2b009ee0b5600568656c6c6f2d2a30786..................",
    "hash" : "79297058277e38c90a202e953278d3b4beb0621a759f69162b64d865af4feec8"
  }
}
```



### 提现追加手续费 (NERVE 转出到 异构链)

url：`/tx-api/withdrawalfee`

method：post

params：

| 参数名      | 类型       | 必填 | 描述                                                    |
| :---------- | :--------- | :--- | :------------------------------------------------------ |
| fromAddress | String     | Y    | 提现发起地址                                            |
| txHash      | String     | Y    | 待追加手续费的提现交易hash                              |
| amount      | BigInteger | Y    | 追加数量                                                |
| time        | Long       | N    | 交易时间                                                |
| remark      | String     | N    | 交易备注                                                |
| nonce       | String     | N/Y  | 连续交易时(必填)需要前一笔交易hash来计算本笔交易的nonce |

请求示例

```
{
    "fromAddress": "TNVTdTSPNNZi9AtgofKc7zjc67V3CDUik151F",
    "txHash":"663efb7617986caba78a4247bca06a205c473912ce9739599a6e590fc6b04f9f",
    "amount": 100000000
}
```

返回交易hash和hex

```json
{
  "msg" : "success",
  "code" : 0,
  "data" : {
    "txHex" : "2b009ee0b5600568656c6c6f2d2a30786..................",
    "hash" : "79297058277e38c90a202e953278d3b4beb0621a759f69162b64d865af4feec8"
  }
}
```



### NERVE链广播交易

url：`/tx-api/broadcast`

method：post

params：

| 参数名 | 类型   | 必填 | 描述              |
| :----- | :----- | :--- | :---------------- |
| txHex  | String | Y    | 完整交易hex字符串 |

返回交易信息

```json
 {
  "msg" : "success",
  "code" : 0,
  "data" : {
    "txHex" : "2b00fa0eb6600568656c6c6f2.......",
    "hash" : "8e6e08434b6ec11958237961235781b98c82cb02700cdfd159fbce8cdea4e93c"
  }
}
```



### 闪兑（兑换手续费等）

url：`/bridge-api/tx/exchange`

method：post

params：

```json
{
    "address":"TNVTdTSPEn3kK94RqiMffiKkXTQ2anRwhN1XX", // 兑换支付地址
    "fromAmount":500000000, // 兑换数量
    "fromToken":{ // 兑换支付资产
        "symbol":"NULS", 
        "chainId":2,
        "assetId":1
    },
     "toToken":{ // 兑换接收资产
        "symbol":"NVT",
        "chainId":5,
        "assetId":1
    }
}
```

return

```json
{
    "msg": "成功",
    "code": 1000,
    "data": {
        "success": true,
        "code": "2000000",
        "msg": "操作成功",
        "data": "02008707b6600000fd160102170500010691ffa84a8a83..." // 交易hex
    }
}
```



### 预估闪兑兑换额度

url：`/bridge-api/tx/quantity`

method：post

params：

```json
{
    "address":"TNVTdTSPEn3kK94RqiMffiKkXTQ2anRwhN1XX", // 兑换支付地址
    "fromAmount":500000000, // 兑换数量
    "fromToken":{ // 兑换支付资产
        "symbol":"NULS", 
        "chainId":2,
        "assetId":1
    },
     "toToken":{ // 兑换接收资产
        "symbol":"NVT",
        "chainId":5,
        "assetId":1
    }
}
```

return

```json
{
    "msg": "成功",
    "code": 1000,
    "data": {
        "success": true,
        "code": "2000000",
        "msg": "操作成功",
        "data": {
            "quantity": "57378071",
            "NVT-NULS": "0.10926971",
            "quantityPlain": "0.57378071"
        }
    }
}
```

