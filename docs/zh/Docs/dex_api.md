# NerveDEX-API

**NerveDEX为合作伙伴提供了公共的DEX-API模块，模块内封装了NULS-SDK的对接常用接口，目前支持`Restful`格式访问。**

  

## 说明

​	为了更好的理解NerveDEX的相关业务，和接口返回值的含义，提前在这里做一些说明。

### 字段描述

**链的资产：**

​	NerveDEX支持每条链除了默认的资产外，可根据业务需要，动态添加资产。每条链的每种资产通过链ID和资产ID的复合主键来区分。例如NULS主网的NULS，chainId=1,assetId=1

**交易的type值：**

​	NULS2.0默认有多种交易，每种交易的功能不同，调用接口查询交易详情时，可通过type字段来区分不同交易类型，以下是交易类型的枚举值：

```
int COIN_BASE = 1;						// coinBase出块奖励
int TRANSFER = 2;						// 转账
int ACCOUNT_ALIAS = 3;					// 设置账户别名
int REGISTER_AGENT = 4;					// 新建共识节点
int DEPOSIT = 5;						// 委托参与共识
int CANCEL_DEPOSIT = 6;					// 取消委托共识
int YELLOW_PUNISH = 7;					// 黄牌
int RED_PUNISH = 8;						// 红牌
int STOP_AGENT = 9;						// 注销共识节点
int CROSS_CHAIN = 10;					// 跨链转账
int ADD_ASSET_TO_CHAIN = 13;			// 为链新增一种资产
int REMOVE_ASSET_FROM_CHAIN = 14;		// 删除链上资产
int COIN_TRADING = 228;					// 创建交易对
int TRADING_ORDER = 229;				// 创建委托挂单
int TRADING_ORDER_CANCEL = 230;			// 撤销委托挂单
int TRADING_DEAL = 231;					// 挂单成交
int EDIT_COIN_TRADING = 232;			// 修改交易对信息
int ORDER_CANCEL_CONFIRM = 233;			// 撤单交易确认
```

**交易的from和to：**

用转账交易为例：tx.type = 2

​	from为转账交易的转出方，每一个from视为一个转账人的某一种资产转出多少数量，其中nonce值每次转账后都会改变，可通过调用查询账户余额接口获取当前最新nonce值。

​	to为转账交易的接收方，每一个to视为接收人接收到某一种资产多少数量，其中lockTime为锁定时间。当锁定时间大于0时，表示现实时间超过这个值之后，这笔资产才能正常使用；当lockTime =-1时，表示永久锁定中，需要特殊的交易才能解除锁定，例如参与委托共识和取消委托共识。当lockTime=-2时，表示挂单委托，需要发起特殊的交易（撤销委托挂单 type = 230）才能取消锁定；或者是等待挂单委托成交后（挂单成交 type = 231），自动解除锁定。

​	交易的手续费 = from里本链主资产之和 - to里本链主资产之和


## 访问方式

- **`RESTFUL`访问方式**

     添加请求头 Content-Type: application/json;charset=UTF-8
     

接口列表
----
### 1.0 获取指定前N条交易对信息
#### url: /coin/top/list
_**详细描述: 根据过滤条件，查询指定条数的交易对列表信息**_

当assetChainId和assetId不为0时，表示按照对应的资产作为计价货币来过滤交易对。例如按照NULS(assetChainId=1, assetId=1)过滤，返回结果就是 BTC/NULS, ETH/NULS……；为0时，则返回常用交易对。

当address不为空时，则优先根据地址收藏的交易对来过滤。

size为查询条数，默认为0时，返回前6条。size最大值为100，返回100条。

#### 参数列表
| 参数名       | 参数类型 | 参数描述 | 是否必填 |
| ------------ | -------- | -------- | -------- |
| assetChainid | int      | 资产链ID | 否       |
| assetId      | int      | 资产ID   | 否       |
| address      | String   | 账户地址 | 否       |
| size         | int      | 条数     | 否       |

#### 返回值
| 字段名            |  字段类型  | 字段描述                           |
| ----------------- | :--------: | ---------------------------------- |
| hash              |   string   | 交易对hash                         |
| tradingName       |   string   | 交易对名称                         |
| quoteDecimal      |    int     | 计价币种小数位数                   |
| scaleQuoteDecimal |    int     | 交易对支持计价币种交易的最小小数位 |
| baseDecimal       |    int     | 交易币种小数位数                   |
| scaleBaseDecimal  |    int     | 交易对支持交易币种交易的最小小数位 |
| newPrice          | bigInteger | 当前最新成交价                     |
| highPrice24       | bigInteger | 24小时最高成交价                   |
| lowPrice24        | bigInteger | 24小时最低成交价                   |
| beginPrice24      | bigInteger | 24小时起始成交价                   |
| dealAmount24      | bigInteger | 24小时成交量                       |
#### Example request data: 

```json
http://beta.nervedex.com/coin/top/list
{
	"assetChainId": 4,
	"assetId": 2,
	"size": 10,
	"address": ""
}
```

#### Example response data: 

```json
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
```

### 1.1 查询交易对详情
#### url: /trading/get/{key}
_**详细描述：根据交易对hash或交易对名称，查询交易对详情**_

#### 参数列表
| 参数名 | 参数类型 | 参数描述                                 | 是否必填 |
| ------ | :------: | ---------------------------------------- | :------: |
| key    |  String  | 交易对hash，或交易对名称(例如：BTC/USDT) |    是    |

#### 返回值

| 字段名            |  字段类型  | 字段描述                           |
| ----------------- | :--------: | ---------------------------------- |
| hash              |   string   | 交易对hash                         |
| tradingName       |   string   | 交易对名称                         |
| baseAssetChainId  |    int     | 交易资产链ID                       |
| baseAssetId       |    int     | 交易资产ID                         |
| baseDecimal       |    int     | 交易资产小数位数                   |
| scaleBaseDecimal  |    int     | 交易对支持交易资产交易的最小小数位 |
| quoteAssetChainId |    int     | 计价资产链ID                       |
| quoteAssetId      |    int     | 计价资产ID                         |
| quoteDecimal      |    int     | 计价资产小数位数                   |
| scaleQuoteDecimal |   string   | 交易对支持计价资产交易的最小小数位 |
| minBaseAmount     | bigInteger | 交易对支持交易资产的最小交易单位   |
| minQuoteAmount    | bigInteger | 交易对支持计价资产的最小交易单位   |
| beforePrice       | bigInteger | 上一笔成交价                       |
| newPrice          | bigInteger | 当前最新成交价                     |
| highPrice24       | bigInteger | 24小时最高成交价                   |
| lowPrice24        | bigInteger | 24小时最低成交价                   |
| beginPrice24      | bigInteger | 24小时起始成交价                   |
| dealAmount24      | bigInteger | 24小时成交量                       |
| createTime        |    long    | 交易对创建时间（时间戳）           |

#### Example request data: 

```json
http://beta.nervedex.com/coin/trading/get/0020eeea253bfc8757b94b7a41db73cc76f492862fc061903e4334c186c6daa5
```

#### Example response data: 

```json
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
```

### 1.2 查询NerveDEX链配置信息

#### url:/chain/info

_**详细描述： 查询NerveDEX链配置信息**_

#### 参数列表

无

#### 返回值

| 字段名        | 字段类型 | 字段描述                                                     |
| ------------- | -------- | ------------------------------------------------------------ |
| chainId       | int      | NVT资产链ID                                                  |
| assetId       | int      | NVT资产ID                                                    |
| addressPrefix | string   | NVT链地址前缀                                                |
| feeAddress    | string   | NerveDEX交易所运营节点收取手续费地址                         |
| feeScale      | int      | NerveDEX交易所运营节点收取手续费比例，feeScale=3，表示收取交易额的3/10000作为手续费 |
| walletApiUrl  | string   | 底层钱包RPC接口访问地址                                      |

#### Example request data: 

```json
http://beta.nervedex.com/chain/info
```

#### Example response data: 

```json
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
```

### 1.3 查询链上已有资产信息

#### url:/asset/list

_**详细描述：查询当前Nerve链上已经存在的资产相关信息，包括本链已注册资产，例如NVT；平行链跨链资产，例如NULS；**_

#### 参数列表

无

#### 返回值

| 字段名       | 字段类型 | 字段描述           |
| ------------ | -------- | ------------------ |
| assetChainId | int      | 资产链ID           |
| assetId      | int      | 资产ID             |
| decimal      | int      | 资产支持的小数位   |
| symbol       | string   | 资产符号           |
| status       | int      | 0，已作废；1，正常 |

#### Example request data: 

```json
http://beta.nervedex.com/asset/list
```

#### Example response data: 

```json
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
```

### 1.4 查询地址已有资产信息

#### url:/account/assets

_**详细描述：查询当前Nerve链上，某个地址已经存在的资产相关信息**_

#### 参数列表

| 参数名  | 参数类型 | 参数描述 | 是否必填 |
| ------- | :------: | -------- | :------: |
| address |  String  | 账户地址 |    是    |

#### 返回值

| 字段名       | 字段类型   | 字段描述                   |
| ------------ | ---------- | -------------------------- |
| assetChainId | int        | 资产链ID                   |
| assetId      | int        | 资产ID                     |
| decimal      | int        | 资产支持的小数位           |
| symbol       | string     | 资产符号                   |
| available    | bigInteger | 可用余额                   |
| freeze       | bigInteger | 挂单冻结                   |
| total        | bigInteger | 总额 = 可用余额 + 挂单冻结 |
| btcValue     | string     | 总余额btc估值              |

#### Example request data: 

```json
http://beta.nervedex.com/account/assets
{
    "address":"TNVTdTSPVcqUCdfVYWwrbuRtZ1oM6GpSgsgF5"
}
```

#### Example response data: 

```json
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
```

### 2.0查询交易对盘口委托挂单列表

#### url:/order/list

_**详细描述：查询某一个交易对，当前盘口上存在的买单和卖单信息**_

#### 参数列表

| 参数名  | 参数类型 | 参数描述                                                     | 是否必填 |
| ------- | :------: | ------------------------------------------------------------ | :------: |
| key     |  String  | 交易对hash或者交易对名称                                     |    是    |
| type    |   int    | =0查询买单和买单盘口，=1只查询买单盘口，=2只查询卖单盘口     |    是    |
| size    |   int    | 查询条数，type=0时，买单卖单最多可查询20条离盘口金额最近挂单；type&gt;0时，最多可查询40条 |    是    |
| decimal |   int    | 挂单价格保留小数位数，相同价格的挂单会进行合并               |    是    |

#### 返回值

| 字段名        | 字段类型        | 字段描述 |
| ------------- | --------------- | -------- |
| buyOrderList  | list&lt;object&gt; | 买盘挂单 |
| quoteAmount   | double          | 总额     |
| decimal       | double          | 数量     |
| price         | double          | 买单价格 |
| sellOrderList | list&lt;object&gt; | 卖盘挂单 |
| quoteAmount   | double          | 总额     |
| baseAmount    | double          | 数量     |
| total         | double          | 卖单价格 |

#### Example request data: 

```json
http://beta.nervedex.com/order/list
{
	"key":"NVT/NULS",
	"type":0,
	"decimal":6,
	"size":10
}
```

#### Example response data: 

```json
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
```



### 2.1查询账户当前委托挂单

#### url:/order/list/address

_**详细描述：查询账户当前所有未完全成交的委托单列表**_

#### 参数列表

| 参数名     | 参数类型 | 参数描述                     | 是否必填 |
| ---------- | :------: | ---------------------------- | :------: |
| address    |  String  | 账户地址                     |    是    |
| pageNumber |   int    | 页码                         |    是    |
| pageSize   |   int    | 分页条数，最多一次可查询20条 |    是    |

#### 返回值

| 字段名          | 字段类型     | 字段描述                                                     |
| --------------- | ------------ | ------------------------------------------------------------ |
| pageNum         | int          | 当前页码                                                     |
| pages           | int          | 总页数                                                       |
| pageSize        | int          | 分页条数                                                     |
| size            | int          | 当前页总条数                                                 |
| total           | int          | 总条数                                                       |
| list            | list&lt;Object&gt; | 数据列表                                                     |
| baseAmount      | string       | 订单hash                                                     |
| price           | int          | 1买单，2卖单                                                 |
| tradingHash     | string       | 交易对hash                                                   |
| address         | string       | 账户地址                                                     |
| price           | bigInteger   | 挂单价格                                                     |
| avgPrice        | bigInteger   | 平均成交价                                                   |
| baseAmount      | bigInteger   | 挂单总量                                                     |
| baseDealAmount  | bigInteger   | 已成交量                                                     |
| quoteDealAmount | bigInteger   | 已成交额                                                     |
| status          | int          | 1：挂单中 2：部分成交 3：完全成交 4：已取消委托 5：部分成交后取消委托 |
| createTime      | long         | 挂单时间                                                     |
| baseDecimal     | int          | 交易币种小数位                                               |
| quoteDecimal    | int          | 计价币种小数位                                               |
| tradingName     | String       | 交易对名称                                                   |

#### Example request data: 

```json
http://beta.nervedex.com/order/list/address
{
	"address": "TNVTdTSPQvEngihwxqwCNPq3keQL1PwrcLbtj",
	"pageNumber":1,
	"pageSize":20
}
```

#### Example response data: 

```
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
```



### 2.2查询账户历史委托挂单

#### url:/order/list/history

_**详细描述：查询账户历史委托单列表，包括已成交或已撤销**_

#### 参数列表

| 参数名      | 参数类型 | 参数描述                              | 是否必填 |
| ----------- | :------: | ------------------------------------- | :------: |
| address     |  String  | 账户地址                              |    是    |
| pageNumber  |   int    | 页码                                  |    是    |
| pageSize    |   int    | 分页条数，最多一次可查询20条          |    是    |
| type        |   int    | 0：查询所有，1：查询买单，2：查询卖单 |    否    |
| beginTime   |   long   | 起始查询时间                          |    否    |
| endTime     |   long   | 截止查询时间                          |    否    |
| baseSymbol  |  String  | 交易币种符号                          |    否    |
| quoteSymbol |  String  | 计价币种符号                          |    否    |

#### 返回值

| 字段名          | 字段类型     | 字段描述                                                     |
| --------------- | ------------ | ------------------------------------------------------------ |
| pageNum         | int          | 当前页码                                                     |
| pages           | int          | 总页数                                                       |
| pageSize        | int          | 分页条数                                                     |
| size            | int          | 当前页总条数                                                 |
| total           | int          | 总条数                                                       |
| list            | list&lt;Object&gt; | 数据列表                                                     |
| hash            | string       | 订单hash                                                     |
| type            | int          | 1买单，2卖单                                                 |
| tradingHash     | string       | 交易对hash                                                   |
| address         | string       | 账户地址                                                     |
| price           | bigInteger   | 挂单价格                                                     |
| avgPrice        | bigInteger   | 平均成交价                                                   |
| baseAmount      | bigInteger   | 挂单总量                                                     |
| baseDealAmount  | bigInteger   | 已成交量                                                     |
| quoteDealAmount | bigInteger   | 已成交额                                                     |
| status          | int          | 1：挂单中 2：部分成交 3：完全成交 4：已取消委托 5：部分成交后取消委托 |
| createTime      | long         | 挂单时间                                                     |
| baseDecimal     | int          | 交易币种小数位                                               |
| quoteDecimal    | int          | 计价币种小数位                                               |
| tradingName     | String       | 交易对名称                                                   |

#### Example request data: 

```json
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
```

#### Example response data: 

```
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
```



### 2.3查询账户历史委托挂单

#### url:/order/list/history

_**详细描述：查询账户历史委托单列表，包括已成交或已撤销**_

#### 参数列表

| 参数名      | 参数类型 | 参数描述                              | 是否必填 |
| ----------- | :------: | ------------------------------------- | :------: |
| address     |  String  | 账户地址                              |    是    |
| pageNumber  |   int    | 页码                                  |    是    |
| pageSize    |   int    | 分页条数，最多一次可查询20条          |    是    |
| type        |   int    | 0：查询所有，1：查询买单，2：查询卖单 |    否    |
| beginTime   |   long   | 起始查询时间                          |    否    |
| endTime     |   long   | 截止查询时间                          |    否    |
| baseSymbol  |  String  | 交易币种符号                          |    否    |
| quoteSymbol |  String  | 计价币种符号                          |    否    |

#### 返回值

| 字段名          | 字段类型     | 字段描述                                                     |
| --------------- | ------------ | ------------------------------------------------------------ |
| pageNum         | int          | 当前页码                                                     |
| pages           | int          | 总页数                                                       |
| pageSize        | int          | 分页条数                                                     |
| size            | int          | 当前页总条数                                                 |
| total           | int          | 总条数                                                       |
| list            | list&lt;Object&gt; | 数据列表                                                     |
| hash            | string       | 订单hash                                                     |
| type            | int          | 1买单，2卖单                                                 |
| tradingHash     | string       | 交易对hash                                                   |
| address         | string       | 账户地址                                                     |
| price           | bigInteger   | 挂单价格                                                     |
| avgPrice        | bigInteger   | 平均成交价                                                   |
| baseAmount      | bigInteger   | 挂单总量                                                     |
| baseDealAmount  | bigInteger   | 已成交量                                                     |
| quoteDealAmount | bigInteger   | 已成交额                                                     |
| status          | int          | 1：挂单中 2：部分成交 3：完全成交 4：已取消委托 5：部分成交后取消委托 |
| createTime      | long         | 挂单时间                                                     |
| baseDecimal     | int          | 交易币种小数位                                               |
| quoteDecimal    | int          | 计价币种小数位                                               |
| tradingName     | String       | 交易对名称                                                   |

#### Example request data: 

```json
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
```

#### Example response data: 

```
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
```



### 2.3查询账户历史委托挂单

#### url:/order/list/history

_**详细描述：查询账户历史委托单列表，包括已成交或已撤销**_

#### 参数列表

| 参数名      | 参数类型 | 参数描述                              | 是否必填 |
| ----------- | :------: | ------------------------------------- | :------: |
| address     |  String  | 账户地址                              |    是    |
| pageNumber  |   int    | 页码                                  |    是    |
| pageSize    |   int    | 分页条数，最多一次可查询20条          |    是    |
| type        |   int    | 0：查询所有，1：查询买单，2：查询卖单 |    否    |
| beginTime   |   long   | 起始查询时间                          |    否    |
| endTime     |   long   | 截止查询时间                          |    否    |
| baseSymbol  |  String  | 交易币种符号                          |    否    |
| quoteSymbol |  String  | 计价币种符号                          |    否    |

#### 返回值

| 字段名          | 字段类型     | 字段描述                                                     |
| --------------- | ------------ | ------------------------------------------------------------ |
| pageNum         | int          | 当前页码                                                     |
| pages           | int          | 总页数                                                       |
| pageSize        | int          | 分页条数                                                     |
| size            | int          | 当前页总条数                                                 |
| total           | int          | 总条数                                                       |
| list            | list&lt;Object&gt; | 数据列表                                                     |
| string          | 订单hash     |                                                              |
| int             | 1买单，2卖单 |                                                              |
| tradingHash     | string       | 交易对hash                                                   |
| address         | string       | 账户地址                                                     |
| price           | bigInteger   | 挂单价格                                                     |
| avgPrice        | bigInteger   | 平均成交价                                                   |
| baseAmount      | bigInteger   | 挂单总量                                                     |
| baseDealAmount  | bigInteger   | 已成交量                                                     |
| quoteDealAmount | bigInteger   | 已成交额                                                     |
| status          | int          | 1：挂单中 2：部分成交 3：完全成交 4：已取消委托 5：部分成交后取消委托 |
| createTime      | long         | 挂单时间                                                     |
| baseDecimal     | int          | 交易币种小数位                                               |
| quoteDecimal    | int          | 计价币种小数位                                               |
| tradingName     | String       | 交易对名称                                                   |

#### Example request data: 

```json
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
```

#### Example response data: 

```
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
```



### 3.0查询交易对最近成交记录

#### url:/deal/list/trading

_**详细描述：查询交易对最近的成交记录列表，按照成交时间倒序排列**_

#### 参数列表

| 参数名 | 参数类型 | 参数描述                                  | 是否必填 |
| ------ | :------: | ----------------------------------------- | :------: |
| key    |  String  | 交易对hash，或交易对名称                  |    是    |
| size   |   int    | 成交记录条数，最多能查询最近100条成交记录 |    是    |

#### 返回值

| 字段名            | 字段类型   | 字段描述                           |
| ----------------- | ---------- | ---------------------------------- |
| baseAmount        | bigInteger | 成交量                             |
| price             | bigInteger | 成交价                             |
| quoteDecimal      | int        | 计价币种小数位                     |
| scaleQuoteDecimal | int        | 交易对支持计价币种交易的最小小数位 |
| baseDecimal       | int        | 交易币种小数位                     |
| scaleBaseDecimal  | int        | 交易对支持交易币种交易的最小小数位 |
| createTime        | long       | 成交时间                           |
| taker             | int        | 1买单主动成交，2卖单主动成交       |

#### Example request data: 

```json
http://beta.nervedex.com/deal/list/trading
{
	"key":"NVT/NULS",
	"size":10
}
```

#### Example response data: 

```
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
```



### 3.1查询账户历史成交记录

#### url:/deal/list/address

_**详细描述：查询用户历史成交记录列表，按照成交时间倒序排列**_

#### 参数列表

| 参数名      | 参数类型 | 参数描述                                   | 是否必填 |
| ----------- | :------: | ------------------------------------------ | :------: |
| address     |  String  | 账户地址                                   |    是    |
| pageNumber  |   int    | 页码                                       |    是    |
| pageSize    |   int    | 分页条数，最多一次可查询20条               |    是    |
| type        |   int    | 0：查询所有，1：查询买单，2：查询卖单      |    否    |
| beginTime   |   long   | 起始查询时间，为空时，默认起始时间为一周前 |    否    |
| endTime     |   long   | 截止查询时间                               |    否    |
| baseSymbol  |  String  | 交易币种符号                               |    否    |
| quoteSymbol |  String  | 计价币种符号                               |    否    |

#### 返回值

| 字段名            | 字段类型     | 字段描述                           |
| ----------------- | ------------ | ---------------------------------- |
| pageNum           | int          | 当前页码                           |
| pages             | int          | 总页数                             |
| pageSize          | int          | 分页条数                           |
| size              | int          | 当前页总条数                       |
| total             | int          | 总条数                             |
| list              | list&lt;Object&gt; | 数据列表                           |
| dealHash          | string       | 成交记录hash                       |
| type              | int          | 1买单，2卖单                       |
| tradingHash       | string       | 交易对hash                         |
| price             | bigInteger   | 成交价格                           |
| baseAmount        | bigInteger   | 成交总量                           |
| quotelAmount      | bigInteger   | 成交额                             |
| createTime        | long         | 成交时间                           |
| baseDecimal       | int          | 交易币种小数位                     |
| scaleBaseDecimal  | int          | 交易对支持交易币种交易的最小小数位 |
| quoteDecimal      | int          | 计价币种小数位                     |
| scaleQuoteDecimal | int          | 交易对支持计价币种交易的最小小数位 |
| tradingName       | String       | 交易对名称                         |
| fee               | String       | 手续费                             |

#### Example request data: 

```json
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
```

#### Example response data: 

```
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
```

