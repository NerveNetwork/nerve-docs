# NerveDEX-API 

**NerveDEX provides a common DEX-API module for partners that encapsulates the common interface to the NULS-SDK docking and currently supports Restful format access.** 

 

## Account for 

In order to better understand the business of NERVEDEX, and the meaning of the interface return value, make some explanation here in advance. 

### Field description 

**CHAIN ASSETS:** 

NERVEDEX enables each chain to add assets dynamically, based on business needs, in addition to the default assets. Each asset in each chain is distinguished by a composite primary key of the chain ID and the asset ID. For example, NULS for the main network of NULS, chainid = 1, assetid = 1 

**TYPE VALUE OF THE TRANSACTION:** 

NULS2.0 has several types of transactions by default, each of which has a different function. When the interface is invoked to query the transaction details, the type field can be used to distinguish the different types of transactions. The following are the enumerated values for the types of transactions: 

Int Coin = 1;/coinBase offers block rewards 

Int Transfer = 2; Transfer 

Int Account = 3;/set the ACCOUNT alias 

Int Register = 4; New Consensus Node 

Int Deposit = 5;//Delegate Participation Consensus 

Int Cancel = 6;//Cancel Delegate Consensus 

Int Yellow = 7; Yellow Card 

Int Red = 8; Red card 

Int Stop = 9;//unregister the consensus node 

Int Cross = 10;/Cross chain transfer 

Int Add = 13;//ADDS an asset to the chain 

Int Remove = 14;//Remove assets from the chain 

Int Coin = 228; create a transaction pair 

Int Trading = 229;//Create Order 

Int Trading = 230;//Cancel Order 

INT TRADING = 231; 

Int Edit = 232;//Modifies transaction pair information 

Int Order = 233;//Confirmation of withdrawal transaction 

**From and to:** 

Take a money transfer transaction: tx.type = 2 

From is the transferor of the transfer transaction, each from is regarded as a transferor of a certain asset transfer number, where the nonce value will change after each transfer, can be invoked to query the account balance interface to obtain the current nonce value. 

Each to is considered to be the amount of an asset received by the recipient, where lockTime is the lock-in time. When the lock-up time is greater than 0, the real time is greater than this value before the asset can be used; when the lock-up time is equal to-1, the lock-up is permanent and special transactions are required to unlock the lock-up, for example, participate in the entrustment agreement and cancel the entrustment agreement. When locktime =-2, it means that the order is placed, and a special transaction (revocation order type = 230) needs to be initiated to cancel the lock, or the order is automatically released after the order is placed (suspension order type = 231) . 

Transaction fees = from the sum of the main assets of this chain-to the sum of the main assets of this chain 


## ACCESS MODE 


* **`RESTFUL access`** 

Add request header Content-Type: Application/json; charset = utf-8 

 

## Interface List 

### 1.0 gets the first N transaction pairs specified 

#### url: /coin/top/list 

Detailed description: according to the filter conditions, query the specified number of transactions on the list information 

When assetChainId and ASSETID ARE NOT 0, the transaction pair is filtered by the corresponding asset as the currency of valuation. For example, if you filter by NULS (Assetchainid = 1, assetid = 1) , the return result is BTC/NULS, ETH/NULS... ; If it is 0, the usual transaction pair is returned. 

When address is not null, the transaction pairs collected by address are filtered first. 

Size is the number of queries and returns the first six when the default is 0. Size Max is 100, return 100 bars. 

#### Parameter list 

|**参数名** |**参数类型** |**参数描述** |**是否必填** |
|:----|:----|:----|:----|:----|:----|:----|:----|
| assetChainid  | int       | 资产链ID  | 否        |
| assetId       | int       | 资产ID    | 否        |
| address       | String    | 账户地址  | 否        |
| size          | int       | 条数      | 否        |

#### Return Value 

|**字段名** |**字段类型** |**字段描述** |
|:----|:----|:----:|:----|:----|:----|
| hash               |   string    | 交易对hash                          |
| tradingName        |   string    | 交易对名称                          |
| quoteDecimal       |    int      | 计价币种小数位数                    |
| scaleQuoteDecimal  |    int      | 交易对支持计价币种交易的最小小数位  |
| baseDecimal        |    int      | 交易币种小数位数                    |
| scaleBaseDecimal   |    int      | 交易对支持交易币种交易的最小小数位  |
| newPrice           | bigInteger  | 当前最新成交价                      |
| highPrice24        | bigInteger  | 24小时最高成交价                    |
| lowPrice24         | bigInteger  | 24小时最低成交价                    |
| beginPrice24       | bigInteger  | 24小时起始成交价                    |
| dealAmount24       | bigInteger  | 24小时成交量                        |

#### Example request data: 

http://beta.nervedex.com/coin/top/list 

{ 

	"assetChainId": 4, 

	"assetId": 2, 

	"size": 10, 

	"address": "" 

} 

#### Example response data: 

{ 

    "code": 200, 

    "success": true, 

    "data": { 

        "success": true, 

        "result": [ 

            { 

                "hash": "2bc76de03b64e3525db1fd360f3143cfa7a9c2", 

                "tradingName": "TNVT/USDT", 

                "quoteDecimal": 6, 

                "scaleQuoteDecimal": 6, 

                "baseDecimal": 8, 

                "scaleBaseDecimal": 8, 

                "newPrice": 173610231, 

                "highPrice24": 187143477, 

                "lowPrice24": 99950000, 

                "beginPrice24": 99950000, 

                "dealAmount24": 67704218679 

            } 

        ] 

    }, 

    "msg": "success" 

} 

### 1.1 enquiry of transaction pair details 

#### url: /trading/get/{key} 

Detailed description: according to the transaction pair hash or transaction pair name, query the transaction pair details 

#### Parameter list 

|**参数名** |**参数类型** |**参数描述** |**是否必填** |
|:----|:----|:----:|:----|:----|:----|:----:|:----|
| key     |  String   | 交易对hash，或交易对名称(例如：BTC/USDT)  |    是     |

#### Return Value 

|**字段名** |**字段类型** |**字段描述** |
|:----|:----|:----:|:----|:----|:----|
| hash               |   string    | 交易对hash                          |
| tradingName        |   string    | 交易对名称                          |
| baseAssetChainId   |    int      | 交易资产链ID                        |
| baseAssetId        |    int      | 交易资产ID                          |
| baseDecimal        |    int      | 交易资产小数位数                    |
| scaleBaseDecimal   |    int      | 交易对支持交易资产交易的最小小数位  |
| quoteAssetChainId  |    int      | 计价资产链ID                        |
| quoteAssetId       |    int      | 计价资产ID                          |
| quoteDecimal       |    int      | 计价资产小数位数                    |
| scaleQuoteDecimal  |   string    | 交易对支持计价资产交易的最小小数位  |
| minBaseAmount      | bigInteger  | 交易对支持交易资产的最小交易单位    |
| minQuoteAmount     | bigInteger  | 交易对支持计价资产的最小交易单位    |
| beforePrice        | bigInteger  | 上一笔成交价                        |
| newPrice           | bigInteger  | 当前最新成交价                      |
| highPrice24        | bigInteger  | 24小时最高成交价                    |
| lowPrice24         | bigInteger  | 24小时最低成交价                    |
| beginPrice24       | bigInteger  | 24小时起始成交价                    |
| dealAmount24       | bigInteger  | 24小时成交量                        |
| createTime         |    long     | 交易对创建时间（时间戳）            |


#### Example request data: 

http://beta.nervedex.com/coin/trading/get/0020eeea253bfc8757b94b7a41db73cc76f492862fc061903e4334c186c6daa5 

#### Example response data: 

{ 

    "code": 200, 

    "success": true, 

    "data": { 

        "success": true, 

        "result": { 

            "id": "0020eeea253bfc8", 

            "hash": "0020eeea253bfc8757b94b7a41db73cc76f492862fc061903e4334c186c6daa5", 

            "baseAssetChainId": 2, 

            "baseAssetId": 1, 

            "baseDecimal": 8, 

            "scaleBaseDecimal": 8, 

            "quoteAssetChainId": 5, 

            "quoteAssetId": 3, 

            "quoteDecimal": 6, 

            "scaleQuoteDecimal": 6, 

            "minBaseAmount": 1000, 

            "minQuoteAmount": 1000, 

            "tradingName": "NULS/USDX", 

            "createTime": 1592289578000, 

            "beforePrice": 371169, 

            "newPrice": 371169, 

            "beginPrice24": 363118, 

            "lowPrice24": 100000, 

            "highPrice24": 416214, 

            "dealAmount24": 1158400216658, 

            "replaceTradingName": "NULSUSDX", 

            "usdPrice": "NULSUSDX" 

        } 

    }, 

    "msg": "success" 

} 

### 1.2 Query for NerveDEX link configuration information 

#### url:/chain/info 

DESCRIPTION: Query for NerveDEX chain configuration information 

#### Parameter list 

None 

#### Return Value 

|**字段名** |**字段类型** |**字段描述** |
|:----|:----|:----|:----|:----|:----|
| chainId        | int       | NVT资产链ID                                                   |
| assetId        | int       | NVT资产ID                                                     |
| addressPrefix  | string    | NVT链地址前缀                                                 |
| feeAddress     | string    | NerveDEX交易所运营节点收取手续费地址                          |
| feeScale       | int       | NerveDEX交易所运营节点收取手续费比例，feeScale=3，表示收取交易额的3/10000作为手续费  |
| walletApiUrl   | string    | 底层钱包RPC接口访问地址                                       |


#### Example request data: 

http://beta.nervedex.com/chain/info 

#### Example response data: 

{ 

    "code": 200, 

    "success": true, 

    "data": { 

        "chainId": 5, 

        "assetId": 1, 

        "addressPrefix": "TNVT", 

        "feeAddress": "TNVTdTSPVMJBn8J7xsqhF6f5mrY86LJKK4VYf", 

        "feeScale": 5, 

        "walletApiUrl": "http://192.168.1.60:17004/" 

    }, 

    "msg": "success" 

} 

### 1.3 Query for information about existing assets in the chain 

#### url:/asset/list 

Query for information about existing assets in the current Nerve chain, including registered assets in the chain, such as NVT; cross-chain assets in parallel chains, such as NULS; 

#### Parameter list 

None 

#### Return Value 

|**字段名** |**字段类型** |**字段描述** |
|:----|:----|:----|:----|:----|:----|
| assetChainId  | int       | 资产链ID            |
| assetId       | int       | 资产ID              |
| decimal       | int       | 资产支持的小数位    |
| symbol        | string    | 资产符号            |
| status        | int       | 0，已作废；1，正常  |


#### Example request data: 

http://beta.nervedex.com/asset/list 

#### Example response data: 

{ 

    "code": 200, 

    "success": true, 

    "data": [ 

        { 

            "assetChainId": 2, 

            "assetId": 1, 

            "decimal": 8, 

            "symbol": "NULS", 

            "status": 1 

        }, 

        { 

            "assetChainId": 5, 

            "assetId": 1, 

            "decimal": 8, 

            "symbol": "NVT", 

            "status": 1 

        }, 

        { 

            "assetChainId": 5, 

            "assetId": 2, 

            "decimal": 18, 

            "symbol": "ETH", 

            "status": 1 

        } 

    ], 

    "msg": "success" 

} 

### 1.4 search address for existing asset information 

#### url:/account/assets 

DESCRIPTION: queries the current Nerve chain for information about an asset that already exists at an address 

#### Parameter list 

|**参数名** |**参数类型** |**参数描述** |**是否必填** |
|:----|:----|:----:|:----|:----|:----|:----:|:----|
| address  |  String   | 账户地址  |    是     |


#### Return Value 

|**字段名** |**字段类型** |**字段描述** |
|:----|:----|:----|:----|:----|:----|
| assetChainId  | int         | 资产链ID                    |
| assetId       | int         | 资产ID                      |
| decimal       | int         | 资产支持的小数位            |
| symbol        | string      | 资产符号                    |
| available     | bigInteger  | 可用余额                    |
| freeze        | bigInteger  | 挂单冻结                    |
| total         | bigInteger  | 总额 = 可用余额 + 挂单冻结  |
| btcValue      | string      | 总余额btc估值               |


#### Example request data: 

http://beta.nervedex.com/account/assets 

{ 

    "address":"TNVTdTSPVcqUCdfVYWwrbuRtZ1oM6GpSgsgF5" 

} 

#### Example response data: 

{ 

    "code": 200, 

    "success": true, 

    "data": { 

        "success": true, 

        "result": [ 

            { 

                "assetChainId": 2, 

                "assetId": 1, 

                "symbol": "NULS", 

                "decimal": 8, 

                "available": 20000300000000, 

                "freeze": 0, 

                "total": 20000300000000, 

                "btcValue": "8.10012150" 

            } 

        ] 

    }, 

    "msg": "success" 

} 

### 2.0 query transaction counter order list 

#### url:/order/list 

Detailed description: Query a transaction pair, the existence of the current bid and sell order information 

#### Parameter list 

|**参数名** |**参数类型** |**参数描述** |**是否必填** |
|:----|:----|:----:|:----|:----|:----|:----:|:----|
| key      |  String   | 交易对hash或者交易对名称                                      |    是     |
| type     |   int     | =0查询买单和买单盘口，=1只查询买单盘口，=2只查询卖单盘口      |    是     |
| size     |   int     | 查询条数，type=0时，买单卖单最多可查询20条离盘口金额最近挂单；type>0时，最多可查询40条  |    是     |
| decimal  |   int     | 挂单价格保留小数位数，相同价格的挂单会进行合并                |    是     |


#### Return Value 

|**字段名** |**字段类型** |**字段描述** |
|:----|:----|:----|:----|:----|:----|
| buyOrderList   | list&lt;object>  | 买盘挂单  |
| quoteAmount    | double           | 总额      |
| decimal        | double           | 数量      |
| price          | double           | 买单价格  |
| sellOrderList  | list&lt;object>  | 卖盘挂单  |
| quoteAmount    | double           | 总额      |
| baseAmount     | double           | 数量      |
| total          | double           | 卖单价格  |


#### Example request data: 

http://beta.nervedex.com/order/list 

{ 

	"key":"NVT/NULS", 

	"type":0, 

	"decimal":6, 

	"size":10 

} 

#### Example response data: 

{ 

    "code": 200, 

    "success": true, 

    "data": { 

        "success": true, 

        "result": { 

            "buyOrderList": [ 

                { 

                    "quoteAmount": 0.900000, 

                    "baseAmount": 0.90000000, 

                    "price": 1.000000 

                } 

            ], 

            "sellOrderList": [ 

                { 

                    "quoteAmount": 18.200000, 

                    "baseAmount": 9.10000000, 

                    "price": 2.000000 

                } 

            ] 

        } 

    }, 

    "msg": "success" 

} 

### 2.1 check account current order 

#### url:/order/list/address 

Detailed description: Query the account of all currently not fully completed list of orders 

#### Parameter list 

|**参数名** |**参数类型** |**参数描述** |**是否必填** |
|:----|:----|:----:|:----|:----|:----|:----:|:----|
| address     |  String   | 账户地址                      |    是     |
| pageNumber  |   int     | 页码                          |    是     |
| pageSize    |   int     | 分页条数，最多一次可查询20条  |    是     |


#### Return Value 

|**字段名** |**字段类型** |**字段描述** |
|:----|:----|:----|:----|:----|:----|
| pageNum          | int           | 当前页码                                                      |
| pages            | int           | 总页数                                                        |
| pageSize         | int           | 分页条数                                                      |
| size             | int           | 当前页总条数                                                  |
| total            | int           | 总条数                                                        |
| list             | list<Object>  | 数据列表                                                      |
| baseAmount       | string        | 订单hash                                                      |
| price            | int           | 1买单，2卖单                                                  |
| tradingHash      | string        | 交易对hash                                                    |
| address          | string        | 账户地址                                                      |
| price            | bigInteger    | 挂单价格                                                      |
| avgPrice         | bigInteger    | 平均成交价                                                    |
| baseAmount       | bigInteger    | 挂单总量                                                      |
| baseDealAmount   | bigInteger    | 已成交量                                                      |
| quoteDealAmount  | bigInteger    | 已成交额                                                      |
| status           | int           | 1：挂单中<br />2：部分成交<br />3：完全成交<br />4：已取消委托<br />5：部分成交后取消委托  |
| createTime       | long          | 挂单时间                                                      |
| baseDecimal      | int           | 交易币种小数位                                                |
| quoteDecimal     | int           | 计价币种小数位                                                |
| tradingName      | String        | 交易对名称                                                    |


#### Example request data: 

http://beta.nervedex.com/order/list/address 

{ 

	"address": "TNVTdTSPQvEngihwxqwCNPq3keQL1PwrcLbtj", 

	"pageNumber":1, 

	"pageSize":20 

} 

#### Example response data: 

{ 

"code": 200, 

"success": true, 

"data": { 

"success": true, 

"result": { 

"pageNum": 1, 

"pageSize": 20, 

"size": 3, 

"pages": 1, 

"total": 1, 

"list": [ 

{ 

"hash": "3de79438828bfe77965752aab02cfd24ccc810e4f2ec6d4e35cb89580c66f29f", 

"type": 2, 

"tradingHash": "efab6ecfc0cfe20", 

"address": "TNVTdTSPQvEngihwxqwCNPq3keQL1PwrcLbtj", 

"price": 20000000000000, 

"avgPrice": 0, 

"baseAmount": 200000000000000000, 

"baseDealAmount": 0, 

"quoteDealAmount": 0, 

"status": 1, 

"createTime": 1592299896000, 

"baseDecimal": 18, 

"quoteDecimal": 6, 

"tradingName": "ETH/USDX" 

} 

] 

} 

}, 

"msg": "success" 

} 

### 2.2 inquiry account history order 

#### url:/order/list/history 

Detailed description: Query a single list of account history commissions, either closed or closed 

#### Parameter list 

|**参数名** |**参数类型** |**参数描述** |**是否必填** |
|:----|:----|:----:|:----|:----|:----|:----:|:----|
| address      |  String   | 账户地址                               |    是     |
| pageNumber   |   int     | 页码                                   |    是     |
| pageSize     |   int     | 分页条数，最多一次可查询20条           |    是     |
| type         |   int     | 0：查询所有，1：查询买单，2：查询卖单  |    否     |
| beginTime    |   long    | 起始查询时间                           |    否     |
| endTime      |   long    | 截止查询时间                           |    否     |
| baseSymbol   |  String   | 交易币种符号                           |    否     |
| quoteSymbol  |  String   | 计价币种符号                           |    否     |


#### Return Value 

|**字段名** |**字段类型** |**字段描述** |
|:----|:----|:----|:----|:----|:----|
| pageNum          | int           | 当前页码                                                      |
| pages            | int           | 总页数                                                        |
| pageSize         | int           | 分页条数                                                      |
| size             | int           | 当前页总条数                                                  |
| total            | int           | 总条数                                                        |
| list             | list<Object>  | 数据列表                                                      |
| hash             | string        | 订单hash                                                      |
| type             | int           | 1买单，2卖单                                                  |
| tradingHash      | string        | 交易对hash                                                    |
| address          | string        | 账户地址                                                      |
| price            | bigInteger    | 挂单价格                                                      |
| avgPrice         | bigInteger    | 平均成交价                                                    |
| baseAmount       | bigInteger    | 挂单总量                                                      |
| baseDealAmount   | bigInteger    | 已成交量                                                      |
| quoteDealAmount  | bigInteger    | 已成交额                                                      |
| status           | int           | 1：挂单中<br />2：部分成交<br />3：完全成交<br />4：已取消委托<br />5：部分成交后取消委托  |
| createTime       | long          | 挂单时间                                                      |
| baseDecimal      | int           | 交易币种小数位                                                |
| quoteDecimal     | int           | 计价币种小数位                                                |
| tradingName      | String        | 交易对名称                                                    |


#### Example request data: 

http://beta.nervedex.com/order/list/history 

{ 

	"address": "TNVTdTSPVf5iJ4f42B48B95kY5rWzSUAcbv19", 

	"pageNumber": 1, 

	"pageSize": 15, 

	"beginTime": 1592300242000, 

	"endTime": 0, 

	"type": "", 

	"baseSymbol": "", 

	"quoteSymbol": "" 

} 

#### Example response data: 

{ 

"code": 200, 

"success": true, 

"data": { 

"success": true, 

"result": { 

"pageNum": 1, 

"pageSize": 20, 

"size": 3, 

"pages": 1, 

"total": 1, 

"list": [ 

{ 

"hash": "8d87446bd356361f7a0661ec7fca972f1a07c09d1aabb019bf47f9a49c011381", 

"type": 2, 

"tradingHash": "0020eeea253bfc8", 

"address": "TNVTdTSPVf5iJ4f42B48B95kY5rWzSUAcbv19", 

"price": 300000, 

"avgPrice": 361039, 

"baseAmount": 1000000000, 

"baseDealAmount": 1000000000, 

"quoteDealAmount": 3610376, 

"status": 3, 

"createTime": 1592311859000, 

"baseDecimal": 8, 

"quoteDecimal": 6, 

"tradingName": "NULS/USDX" 

} 

] 

} 

}, 

"msg": "success" 

} 

### 2.3 inquiry account history order 

#### url:/order/list/history 

Detailed description: Query a single list of account history commissions, either closed or closed 

#### Parameter list 

|**参数名** |**参数类型** |**参数描述** |**是否必填** |
|:----|:----|:----:|:----|:----|:----|:----:|:----|
| address      |  String   | 账户地址                               |    是     |
| pageNumber   |   int     | 页码                                   |    是     |
| pageSize     |   int     | 分页条数，最多一次可查询20条           |    是     |
| type         |   int     | 0：查询所有，1：查询买单，2：查询卖单  |    否     |
| beginTime    |   long    | 起始查询时间                           |    否     |
| endTime      |   long    | 截止查询时间                           |    否     |
| baseSymbol   |  String   | 交易币种符号                           |    否     |
| quoteSymbol  |  String   | 计价币种符号                           |    否     |


#### Return Value 

|**字段名** |**字段类型** |**字段描述** |
|:----|:----|:----|:----|:----|:----|
| pageNum          | int           | 当前页码                                                      |
| pages            | int           | 总页数                                                        |
| pageSize         | int           | 分页条数                                                      |
| size             | int           | 当前页总条数                                                  |
| total            | int           | 总条数                                                        |
| list             | list<Object>  | 数据列表                                                      |
| hash             | string        | 订单hash                                                      |
| type             | int           | 1买单，2卖单                                                  |
| tradingHash      | string        | 交易对hash                                                    |
| address          | string        | 账户地址                                                      |
| price            | bigInteger    | 挂单价格                                                      |
| avgPrice         | bigInteger    | 平均成交价                                                    |
| baseAmount       | bigInteger    | 挂单总量                                                      |
| baseDealAmount   | bigInteger    | 已成交量                                                      |
| quoteDealAmount  | bigInteger    | 已成交额                                                      |
| status           | int           | 1：挂单中<br />2：部分成交<br />3：完全成交<br />4：已取消委托<br />5：部分成交后取消委托  |
| createTime       | long          | 挂单时间                                                      |
| baseDecimal      | int           | 交易币种小数位                                                |
| quoteDecimal     | int           | 计价币种小数位                                                |
| tradingName      | String        | 交易对名称                                                    |


#### Example request data: 

http://beta.nervedex.com/order/list/history 

{ 

	"address": "TNVTdTSPVf5iJ4f42B48B95kY5rWzSUAcbv19", 

	"pageNumber": 1, 

	"pageSize": 15, 

	"beginTime": 1592300242000, 

	"endTime": 0, 

	"type": "", 

	"baseSymbol": "", 

	"quoteSymbol": "" 

} 

#### Example response data: 

{ 

"code": 200, 

"success": true, 

"data": { 

"success": true, 

"result": { 

"pageNum": 1, 

"pageSize": 20, 

"size": 3, 

"pages": 1, 

"total": 1, 

"list": [ 

{ 

"hash": "8d87446bd356361f7a0661ec7fca972f1a07c09d1aabb019bf47f9a49c011381", 

"type": 2, 

"tradingHash": "0020eeea253bfc8", 

"address": "TNVTdTSPVf5iJ4f42B48B95kY5rWzSUAcbv19", 

"price": 300000, 

"avgPrice": 361039, 

"baseAmount": 1000000000, 

"baseDealAmount": 1000000000, 

"quoteDealAmount": 3610376, 

"status": 3, 

"createTime": 1592311859000, 

"baseDecimal": 8, 

"quoteDecimal": 6, 

"tradingName": "NULS/USDX" 

} 

] 

} 

}, 

"msg": "success" 

} 

### 2.3 inquiry account history order 

#### url:/order/list/history 

Detailed description: Query a single list of account history commissions, either closed or closed 

#### Parameter list 

|**参数名** |**参数类型** |**参数描述** |**是否必填** |
|:----|:----|:----:|:----|:----|:----|:----:|:----|
| address      |  String   | 账户地址                               |    是     |
| pageNumber   |   int     | 页码                                   |    是     |
| pageSize     |   int     | 分页条数，最多一次可查询20条           |    是     |
| type         |   int     | 0：查询所有，1：查询买单，2：查询卖单  |    否     |
| beginTime    |   long    | 起始查询时间                           |    否     |
| endTime      |   long    | 截止查询时间                           |    否     |
| baseSymbol   |  String   | 交易币种符号                           |    否     |
| quoteSymbol  |  String   | 计价币种符号                           |    否     |


#### Return Value 

|**字段名** |**字段类型** |**字段描述** |
|:----|:----|:----|:----|:----|:----|
| pageNum          | int           | 当前页码                                                      |
| pages            | int           | 总页数                                                        |
| pageSize         | int           | 分页条数                                                      |
| size             | int           | 当前页总条数                                                  |
| total            | int           | 总条数                                                        |
| list             | list<Object>  | 数据列表                                                      |
| string           | 订单hash      |                                                               |
| int              | 1买单，2卖单  |                                                               |
| tradingHash      | string        | 交易对hash                                                    |
| address          | string        | 账户地址                                                      |
| price            | bigInteger    | 挂单价格                                                      |
| avgPrice         | bigInteger    | 平均成交价                                                    |
| baseAmount       | bigInteger    | 挂单总量                                                      |
| baseDealAmount   | bigInteger    | 已成交量                                                      |
| quoteDealAmount  | bigInteger    | 已成交额                                                      |
| status           | int           | 1：挂单中<br />2：部分成交<br />3：完全成交<br />4：已取消委托<br />5：部分成交后取消委托  |
| createTime       | long          | 挂单时间                                                      |
| baseDecimal      | int           | 交易币种小数位                                                |
| quoteDecimal     | int           | 计价币种小数位                                                |
| tradingName      | String        | 交易对名称                                                    |


#### Example request data: 

http://beta.nervedex.com/order/list/history 

{ 

	"address": "TNVTdTSPVf5iJ4f42B48B95kY5rWzSUAcbv19", 

	"pageNumber": 1, 

	"pageSize": 15, 

	"beginTime": 1592300242000, 

	"endTime": 0, 

	"type": "", 

	"baseSymbol": "", 

	"quoteSymbol": "" 

} 

#### Example response data: 

{ 

"code": 200, 

"success": true, 

"data": { 

"success": true, 

"result": { 

"pageNum": 1, 

"pageSize": 20, 

"size": 3, 

"pages": 1, 

"total": 1, 

"list": [ 

{ 

"hash": "8d87446bd356361f7a0661ec7fca972f1a07c09d1aabb019bf47f9a49c011381", 

"type": 2, 

"tradingHash": "0020eeea253bfc8", 

"address": "TNVTdTSPVf5iJ4f42B48B95kY5rWzSUAcbv19", 

"price": 300000, 

"avgPrice": 361039, 

"baseAmount": 1000000000, 

"baseDealAmount": 1000000000, 

"quoteDealAmount": 3610376, 

"status": 3, 

"createTime": 1592311859000, 

"baseDecimal": 8, 

"quoteDecimal": 6, 

"tradingName": "NULS/USDX" 

} 

] 

} 

}, 

"msg": "success" 

} 

### 3.0 query transaction pairs for recent transaction records 

#### url:/deal/list/trading 

Detailed description: Query the transaction records of the most recent list, according to the transaction in reverse order of time 

#### Parameter list 

|**参数名** |**参数类型** |**参数描述** |**是否必填** |
|:----|:----|:----:|:----|:----|:----|:----:|:----|
| key     |  String   | 交易对hash，或交易对名称                   |    是     |
| size    |   int     | 成交记录条数，最多能查询最近100条成交记录  |    是     |


#### Return Value 

|**字段名** |**字段类型** |**字段描述** |
|:----|:----|:----|:----|:----|:----|
| baseAmount         | bigInteger  | 成交量                              |
| price              | bigInteger  | 成交价                              |
| quoteDecimal       | int         | 计价币种小数位                      |
| scaleQuoteDecimal  | int         | 交易对支持计价币种交易的最小小数位  |
| baseDecimal        | int         | 交易币种小数位                      |
| scaleBaseDecimal   | int         | 交易对支持交易币种交易的最小小数位  |
| createTime         | long        | 成交时间                            |
| taker              | int         | 1买单主动成交，2卖单主动成交        |


#### Example request data: 

http://beta.nervedex.com/deal/list/trading 

{ 

	"key":"NVT/NULS", 

	"size":10 

} 

#### Example response data: 

{ 

"code": 200, 

"success": true, 

"data": { 

"success": true, 

"result": [ 

{ 

"baseAmount": 500000000, 

"price": 30000000, 

"quoteDecimal": 8, 

"scaleQuoteDecimal": 8, 

"baseDecimal": 8, 

"scaleBaseDecimal": 8, 

"createTime": 1592299308000, 

"taker": 1 

}, 

{ 

"baseAmount": 90000000, 

"price": 200000000, 

"quoteDecimal": 8, 

"scaleQuoteDecimal": 8, 

"baseDecimal": 8, 

"scaleBaseDecimal": 8, 

"createTime": 1592311948000, 

"taker": 2 

} 

] 

}, 

"msg": "success" 

} 

### 3.1 checking account history and transaction records 

#### url:/deal/list/address 

Detailed description: Query the user history transaction record list, according to the transaction time in reverse order order 

#### Parameter list 

|**参数名** |**参数类型** |**参数描述** |**是否必填** |
|:----|:----|:----:|:----|:----|:----|:----:|:----|
| address      |  String   | 账户地址                                    |    是     |
| pageNumber   |   int     | 页码                                        |    是     |
| pageSize     |   int     | 分页条数，最多一次可查询20条                |    是     |
| type         |   int     | 0：查询所有，1：查询买单，2：查询卖单       |    否     |
| beginTime    |   long    | 起始查询时间，为空时，默认起始时间为一周前  |    否     |
| endTime      |   long    | 截止查询时间                                |    否     |
| baseSymbol   |  String   | 交易币种符号                                |    否     |
| quoteSymbol  |  String   | 计价币种符号                                |    否     |


#### Return Value 

|**字段名** |**字段类型** |**字段描述** |
|:----|:----|:----|:----|:----|:----|
| pageNum            | int           | 当前页码                            |
| pages              | int           | 总页数                              |
| pageSize           | int           | 分页条数                            |
| size               | int           | 当前页总条数                        |
| total              | int           | 总条数                              |
| list               | list<Object>  | 数据列表                            |
| dealHash           | string        | 成交记录hash                        |
| type               | int           | 1买单，2卖单                        |
| tradingHash        | string        | 交易对hash                          |
| price              | bigInteger    | 成交价格                            |
| baseAmount         | bigInteger    | 成交总量                            |
| quotelAmount       | bigInteger    | 成交额                              |
| createTime         | long          | 成交时间                            |
| baseDecimal        | int           | 交易币种小数位                      |
| scaleBaseDecimal   | int           | 交易对支持交易币种交易的最小小数位  |
| quoteDecimal       | int           | 计价币种小数位                      |
| scaleQuoteDecimal  | int           | 交易对支持计价币种交易的最小小数位  |
| tradingName        | String        | 交易对名称                          |
| fee                | String        | 手续费                              |


#### Example request data: 

http://beta.nervedex.com/deal/list/address 

{ 

	"address": "TNVTdTSPVf5iJ4f42B48B95kY5rWzSUAcbv19", 

	"pageNumber": 1, 

	"pageSize": 15, 

	"beginTime": 1591783933000, 

	"endTime": 0, 

	"type": "", 

	"baseSymbol": "", 

	"quoteSymbol": "" 

} 

#### Example response data: 

{ 

"code": 200, 

"success": true, 

"data": { 

"success": true, 

"result": { 

"pageNum": 1, 

"pageSize": 1, 

"size": 20, 

"startRow": 1, 

"endRow": 1, 

"pages": 1, 

"total": 10, 

"list": [ 

{ 

"dealHash": "82a516c1d48371c6477c4ae93ab47412807fe670abd88b7d9ed2a7cfb042218b", 

"tradingHash": "1ef715cec292074", 

"baseAmount": 90000000, 

"quoteAmount": 180000000, 

"price": 200000000, 

"fee": "0.00072000NVT", 

"createTime": 1592311948000, 

"baseDecimal": 8, 

"scaleBaseDecimal": 8, 

"quoteDecimal": 8, 

"scaleQuoteDecimal": 8, 

"tradingName": "NVT/NULS", 

"type": 1 

} 

] 

} 

}, 

"msg": "success" 

} 


