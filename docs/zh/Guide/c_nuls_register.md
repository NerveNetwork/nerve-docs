# 如何注册跨链资产

资产作为链的价值体现，想要链之间能够实现价值互通，最能直接体现的就是链之间的资产进行交易，然而在进行资产跨链交易之前，我们需要将资产进行跨链注册。

## 注册平行链跨链资产

平行链在注册跨链的过程中，默认将资产注册为跨链资产：

- 命令： **registercrosschain &lt;address&gt;、&lt;chainId&gt;、&lt;chainName&gt;、&lt;addressPrefix&gt;、&lt;magicNumber&gt;、&lt;maxSignatureCount&gt;、&lt;signatureBFTRatio&gt;、&lt;verifierList&gt;、&lt;asserId&gt;、&lt;symbol&gt;、&lt;assetName&gt;、&lt;initNumber&gt;、 [decimalPlaces]、[minAvailableNodeNum]**

| 参数                      | 说明                                             |
| ------------------------- | ------------------------------------------------ |
| &lt;address&gt;           | 主网地址，NULS数量不少于1000，用来注册跨链       |
| &lt;chainId&gt;           | 链ID，唯一标识[10-65535]                         |
| &lt;chainName&gt;         | 链名称                                           |
| &lt;addressPrefix&gt;     | 地址前缀（1-5位字符，大写）                      |
| &lt;magicNumber&gt;       | 魔法参数（8位数字）                              |
| &lt;maxSignatureCount&gt; | 最大签名数量（建议：100）                        |
| &lt;signatureBFTRatio&gt; | 签名拜占庭比例（0-100，建议：66）                |
| &lt;verifierList&gt;      | 链验证人列表（种子出块地址，多个地址用逗号分隔） |
| &lt;asserId&gt;           | 资产ID（建议：1）                                |
| &lt;symbol&gt;            | 资产符号（eg:NULS）                              |
| &lt;assetName&gt;         | 资产名称                                         |
| &lt;initNumber&gt;        | 资产发行总量                                     |
| [decimalPlaces]           | 资产小数位数，默认8                              |
| [minAvailableNodeNum]     | 最小连接数，默认5                                |

返回值：

```
{
  "mainNetVerifierSeeds" : "tNULSeBaMsWM1DWppv2H5AUjoxRALv8Rx1JL1V,tNULSeBaMgn16tSzn3Tr6EobmZ9UAfAwD9gPXt,tNULSeBaMjdg2vMBNG3RXeduADiiHbypgBtrfM",
  "txHash" : "c9c2e6518afb0359817ccc74eff1a7d0e4f7ceab3fc5f86095a2b748622992bb",
  "mainNetCrossConnectSeeds" : "192.168.1.139:18002,192.168.1.137:18002,192.168.1.140:18002"
}
```

示例

```
nuls>>> registercrosschain tNULSeBaMqpRQkHCs5ur3ck4LXEZB4qmmkPNo3 4 nerve TNVT 20200422 100 66 TNVTdN9i5aCwKBhaGeUZExLLLB8WtUSWxekcp,TNVTdN9iFcMpYz5eVz41gdETPGNqqbFA8FfSf,TNVTdN9i7xo3PmLj376B17Qntng3DyVio4Bqd 1 TVNT nerve 100000000 8 3
Please enter the password.
Enter your password:********
{
  "mainNetVerifierSeeds" : "tNULSeBaMsWM1DWppv2H5AUjoxRALv8Rx1JL1V,tNULSeBaMgn16tSzn3Tr6EobmZ9UAfAwD9gPXt,tNULSeBaMjdg2vMBNG3RXeduADiiHbypgBtrfM",
  "txHash" : "c9c2e6518afb0359817ccc74eff1a7d0e4f7ceab3fc5f86095a2b748622992bb",
  "mainNetCrossConnectSeeds" : "192.168.1.139:18002,192.168.1.137:18002,192.168.1.140:18002"
}
```



## 在主链添加需要跨链的平行链资产

平行链是资产多资产的，已注册跨链的平行链可以在主网上面添加该链的其他资产参与跨链

-  **命令： addcrossasset &lt;address&gt;&lt;assetChainId&gt; &lt;assetId&gt; &lt;assetName&gt;&lt;symbol&gt; &lt;initNumber&gt; [decimalPlaces]** 

| 参数                   | 说明                                           |
| ---------------------- | ---------------------------------------------- |
| &lt;address&gt;        | 主网地址，NULS数量不少于1000，用来注册跨链资产 |
| &lt;assetChainId&gt;   | 链ID，唯一标识[10-65535]                       |
| &lt;assetId&gt;        | 资产ID                                         |
| &lt;assetName&gt;      | 资产名称                                       |
| &lt;symbol&gt;         | 资产符号                                       |
| &lt;initNumber&gt;     | 发行总量                                       |
| &lt;deccimalPlaces&gt; | 小数位数                                       |

返回

```
143a0f6ec36778c7991544b8acca74dbc4433d0a0d17f188465c01d26786a65c
```

示例

```
nuls>>> addcrossasset tNULSeBaMqpRQkHCs5ur3ck4LXEZB4qmmkPNo3 4 2 eth ETH 100000000 8
Please enter the password.
Enter your password:********
143a0f6ec36778c7991544b8acca74dbc4433d0a0d17f188465c01d26786a65c
```



## 在主链移除跨链交易的平行链资产

平行链是多资产的，在主网上要停止该资产的跨链交易时，使用移除指令，如果剩下最后一个资产，则该指令执行后，对应的链也将停止工作，平行链被注销

- **命令： disablecrossasset &lt;address&gt;&lt;chainId&gt;&lt;assetId&gt;**

| 参数            | 说明                       |
| --------------- | -------------------------- |
| &lt;address&gt; | 注册跨链资产时候使用的地址 |
| &lt;chainId&gt; | 注销资产的链id             |
| &lt;assetId&gt; | 注销资产的资产id           |

返回值

```
eb58da9321543c3a97f6d20721d3a9892a21fa630ccc6061a7b43c2229bb2f64
```

示例

```
nuls>>> disablecrossasset tNULSeBaMqpRQkHCs5ur3ck4LXEZB4qmmkPNo3 3 1
Please enter the password.
Enter your password:********
eb58da9321543c3a97f6d20721d3a9892a21fa630ccc6061a7b43c2229bb2f64
```



## 查询平行链注册信息

在主网查询某条平行链的注册信息

- **命令：crosschaininfo &lt;chainId&gt;**

| 参数            | 说明         |
| --------------- | ------------ |
| &lt;chainId&gt; | 注册链的链id |

返回值（见示例）

示例

```
nuls>>> crosschaininfo 4
{
  "chainId" : 4,
  "chainName" : "nerve",
  "addressType" : "1",
  "addressPrefix" : "TNVT",
  "magicNumber" : 20200422,
  "minAvailableNodeNum" : 3,
  "regAddress" : "tNULSeBaMqpRQkHCs5ur3ck4LXEZB4qmmkPNo3",
  "regTxHash" : "c9c2e6518afb0359817ccc74eff1a7d0e4f7ceab3fc5f86095a2b748622992bb",
  "createTime" : 1587628283,
  "verifierList" : [ "TNVTdN9i5aCwKBhaGeUZExLLLB8WtUSWxekcp", "TNVTdN9iFcMpYz5eVz41gdETPGNqqbFA8FfSf", "TNVTdN9i7xo3PmLj376B17Qntng3DyVio4Bqd" ],
  "signatureByzantineRatio" : 66,
  "maxSignatureCount" : 100,
  "selfAssetKeyList" : [ "4-1", "4-2" ],
  "totalAssetKeyList" : [ "4-1", "4-2" ],
  "mainNetVerifierSeeds" : "tNULSeBaMsWM1DWppv2H5AUjoxRALv8Rx1JL1V,tNULSeBaMgn16tSzn3Tr6EobmZ9UAfAwD9gPXt,tNULSeBaMjdg2vMBNG3RXeduADiiHbypgBtrfM",
  "mainNetCrossConnectSeeds" : "192.168.1.139:18002,192.168.1.137:18002,192.168.1.140:18002",
  "enable" : true
}
```

返回参数说明

| parameter                | required | type   | description                                |
| ------------------------ | -------- | ------ | ------------------------------------------ |
| chainId                  | true     | int    | 链标识                                     |
| chainName                | true     | string | 链名称                                     |
| addressType              | true     | int    | 链上创建的账户的地址类型：1生态内2非生态内 |
| addressPrefix            | true     | string | 地址前缀 1-5个 大写字母或数字              |
| magicNumber              | true     | string | 网络魔法参数                               |
| minAvailableNodeNum      | true     | int    | 最小可用节点数量                           |
| regAddress               | true     | string | 注册支付地址                               |
| regTxHash                | true     | string | 交易hash                                   |
| createTime               | true     | long   | 交易提交时间 ，1970相差的秒数              |
| verifierList             | true     | string | 验证人列表                                 |
| signatureByzantineRatio  | true     | int    | 拜占庭比例 [66-100]                        |
| maxSignatureCount        | true     | int    | 最大签名数                                 |
| selfAssetKeyList         | true     | string | 资产符号                                   |
| totalAssetKeyList        | true     | string | 资产名称                                   |
| mainNetVerifierSeeds     | true     | string | 主网种子验证人地址                         |
| mainNetCrossConnectSeeds | true     | string | 主网种子连接节点地址                       |
| enable                   | true     | string | 是否使用中                                 |

## 查询平行链注册资产信息

在主网查询某条平行链资产的注册信息

- **命令：crossassetinfo&lt;chainId&gt; &lt;assetId&gt;**

| 参数            | 说明       |
| --------------- | ---------- |
| &lt;chainId&gt; | 注册链的id |
| &lt;assetId&gt; | 资产id     |

返回值（见示例）

示例

```
nuls>>> crossassetinfo 4 1
{
  "chainId" : 4,
  "assetId" : 1,
  "symbol" : "TVNT",
  "assetName" : "nerve",
  "depositNuls" : "100000000000",
  "destroyNuls" : "20000000000",
  "initNumber" : "10000000000000000",
  "decimalPlaces" : 8,
  "enable" : true,
  "createTime" : 1587628283,
  "address" : "tNULSeBaMqpRQkHCs5ur3ck4LXEZB4qmmkPNo3",
  "txHash" : "c9c2e6518afb0359817ccc74eff1a7d0e4f7ceab3fc5f86095a2b748622992bb"
}
```

返回参数说明

| parameter     | required | type    | description                  |
| ------------- | -------- | ------- | ---------------------------- |
| chainId       | true     | int     | 链标识                       |
| assetId       | true     | int     | 资产id                       |
| symbol        | true     | string  | 资产简称 e.g. BTC            |
| assetName     | true     | string  | 资产名称                     |
| depositNuls   | true     | long    | 抵押的主网资产数量           |
| destroyNuls   | true     | long    | 销毁的主网资产数量           |
| initNumber    | true     | string  | 资产初始值                   |
| decimalPlaces | true     | int     | 资产可切割位数               |
| enable        | true     | boolean | 是否可用 true可用,false 停用 |
| createTime    | true     | long    | 交易产生时间                 |
| address       | true     | String  | 交易支付地址                 |
| txHash        | true     | String  | 交易hash                     |



## 在主链恢复平行链注册

平行链在主网注册并且注销后，需要恢复，则可以通过如下命令进行恢复并更新信息，此命令需要在主网节点运行

- **命令： updatecrosschain &lt;address&gt;、&lt;chainId&gt;、&lt;chainName&gt;、&lt;addressPrefix&gt;、&lt;magicNumber&gt;、&lt;maxSignatureCount&gt;、&lt;signatureBFTRatio&gt;、&lt;verifierList&gt;、&lt;asserId&gt;、&lt;symbol&gt;、&lt;assetName&gt;、&lt;initNumber&gt;、 [decimalPlaces]、[minAvailableNodeNum]**

| 参数                      | 说明                                             |
| ------------------------- | ------------------------------------------------ |
| &lt;address&gt;           | 主网地址，NULS数量不少于1000，用来注册跨链       |
| &lt;chainId&gt;           | 链ID，唯一标识[10-65535]                         |
| &lt;chainName&gt;         | 链名称                                           |
| &lt;addressPrefix&gt;     | 地址前缀（1-5位字符，大写）                      |
| &lt;magicNumber&gt;       | 魔法参数（8位数字）                              |
| &lt;maxSignatureCount&gt; | 最大签名数量（建议：100）                        |
| &lt;signatureBFTRatio&gt; | 签名拜占庭比例（0-100，建议：66）                |
| &lt;verifierList&gt;      | 链验证人列表（种子出块地址，多个地址用逗号分隔） |
| &lt;asserId&gt;           | 资产ID（建议：1）                                |
| &lt;symbol&gt;            | 资产符号（eg:NULS）                              |
| &lt;assetName&gt;         | 资产名称                                         |
| &lt;initNumber&gt;        | 资产发行总量                                     |
| [decimalPlaces]           | 资产小数位数，默认8                              |
| [minAvailableNodeNum]     | 最小连接数，默认5                                |

返回值

```
{
  "mainNetVerifierSeeds" : "tNULSeBaMsWM1DWppv2H5AUjoxRALv8Rx1JL1V,tNULSeBaMgn16tSzn3Tr6EobmZ9UAfAwD9gPXt,tNULSeBaMjdg2vMBNG3RXeduADiiHbypgBtrfM",
  "txHash" : "c9c2e6518afb0359817ccc74eff1a7d0e4f7ceab3fc5f86095a2b748622992bb",
  "mainNetCrossConnectSeeds" : "192.168.1.139:18002,192.168.1.137:18002,192.168.1.140:18002"
}
```

示例

```
nuls>>> updatecrosschain tNULSeBaMqpRQkHCs5ur3ck4LXEZB4qmmkPNo3 4 nerve TNVT 20200422 100 66 TNVTdN9i5aCwKBhaGeUZExLLLB8WtUSWxekcp,TNVTdN9iFcMpYz5eVz41gdETPGNqqbFA8FfSf,TNVTdN9i7xo3PmLj376B17Qntng3DyVio4Bqd 1 TVNT nerve 100000000 8 3
Please enter the password.
Enter your password:********
{
  "mainNetVerifierSeeds" : "tNULSeBaMsWM1DWppv2H5AUjoxRALv8Rx1JL1V,tNULSeBaMgn16tSzn3Tr6EobmZ9UAfAwD9gPXt,tNULSeBaMjdg2vMBNG3RXeduADiiHbypgBtrfM",
  "txHash" : "c9c2e6518afb0359817ccc74eff1a7d0e4f7ceab3fc5f86095a2b748622992bb",
  "mainNetCrossConnectSeeds" : "192.168.1.139:18002,192.168.1.137:18002,192.168.1.140:18002"
}
```

## NRC20资产注册跨链资产

见[NRC20 Token跨链指南](./c_nrc20.md)↓