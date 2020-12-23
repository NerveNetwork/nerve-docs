# How to register cross chain assets

As the value embodiment of the chain, the most direct embodiment of the value interoperability between the chains is the transaction of the assets between the chains. However, before the cross chain transaction of assets, we need to register the assets across the chains.

## Register parallel chain cross chain assets

In the process of registering cross chain, parallel chain registers assets as cross chain assets by default:

- Command： **registercrosschain &lt;address&gt;、&lt;chainId&gt;、&lt;chainName&gt;、&lt;addressPrefix&gt;、&lt;magicNumber&gt;、&lt;maxSignatureCount&gt;、&lt;signatureBFTRatio&gt;、&lt;verifierList&gt;、&lt;asserId&gt;、&lt;symbol&gt;、&lt;assetName&gt;、&lt;initNumber&gt;、 [decimalPlaces]、[minAvailableNodeNum]**

| Parameter                      | Explain                                           |
| ------------------------- | ------------------------------------------------ |
|&lt; address &gt; | primary network address, number of nuls is not less than 1000, used to register cross chain|
|&lt; chainid &gt; | Chain ID, unique ID [10-65535]|
|&lt; chainname &gt; | chain name|
|&lt; addressprefix &gt; | address prefix (1-5 characters, upper case)|
|&lt; magicnumber &gt; magic parameter (8 digits)|
|&lt; maxsignaturecount &gt; | maximum number of signatures (recommended: 100)|
|&lt; signaturebftratio &gt; | Byzantine proportion of signatures (0-100, recommendation: 66)|
|&lt; verifierlist &gt; | chain verifier list (seed block address, multiple addresses separated by commas)|
|&lt; asserid &gt; | asset ID (recommended: 1)|
|&lt; Symbol &gt; | asset symbol (eg: nuls)|
|&lt; assetname &gt; | asset name|
|&lt; initnumber &gt; | total asset issuance|
|[DecimalPlaces] | asset decimal, default 8|
|[minavailablenodenum] | minimum number of connections, default 5|

Returns：

```
{
  "mainNetVerifierSeeds" : "tNULSeBaMsWM1DWppv2H5AUjoxRALv8Rx1JL1V,tNULSeBaMgn16tSzn3Tr6EobmZ9UAfAwD9gPXt,tNULSeBaMjdg2vMBNG3RXeduADiiHbypgBtrfM",
  "txHash" : "c9c2e6518afb0359817ccc74eff1a7d0e4f7ceab3fc5f86095a2b748622992bb",
  "mainNetCrossConnectSeeds" : "192.168.1.139:18002,192.168.1.137:18002,192.168.1.140:18002"
}
```

Example

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



## Add parallel chain assets that need to cross the chain in the main chain

Parallel chain is multi asset. Registered cross chain parallel chain can add other assets of the chain on the main network to participate in cross chain  

-  **Command： addcrossasset &lt;address&gt;&lt;assetChainId&gt; &lt;assetId&gt; &lt;assetName&gt;&lt;symbol&gt; &lt;initNumber&gt; [decimalPlaces]** 

| Parameter                   | Explain                                         |
| ---------------------- | ---------------------------------------------- |
|&amp; lt; address &amp; gt; | primary network address, number of nuls is not less than 1000, used to register cross chain assets|
|&amp; lt; assetchainid &amp; gt; | Chain ID, unique ID [10-65535]|
|&amp; lt; assetid &amp; gt; | asset ID|
|&amp; lt; assetname &amp; gt; | asset name|
|&amp; lt; Symbol &amp; gt; | asset symbol|
|&amp; lt; initnumber &amp; gt; | total issues|
|&amp; lt; decimal places &amp; gt; | decimal places|

Returns

```
143a0f6ec36778c7991544b8acca74dbc4433d0a0d17f188465c01d26786a65c
```

Example

```
nuls>>> addcrossasset tNULSeBaMqpRQkHCs5ur3ck4LXEZB4qmmkPNo3 4 2 eth ETH 100000000 8
Please enter the password.
Enter your password:********
143a0f6ec36778c7991544b8acca74dbc4433d0a0d17f188465c01d26786a65c
```


## Remove parallel chain assets of cross chain transactions in the main chain

The parallel chain is multi asset. When the cross chain transaction of the asset is to be stopped on the main network, the removal instruction is used. If the last asset is left, the corresponding chain will stop working and the parallel chain will be cancelled after the instruction is executed
- **Command： disablecrossasset &lt;address&gt;&lt;chainId&gt;&lt;assetId&gt;**

| Parameter            | Explain                     |
| --------------- | -------------------------- |
|&amp; lt; address &amp; gt; | address used to register cross chain assets|
|&amp; lt; chainid &amp; gt; | write off the chain ID of the asset|
|&amp; lt; assetid &amp; gt; | asset ID of write off asset|

Returns

```
eb58da9321543c3a97f6d20721d3a9892a21fa630ccc6061a7b43c2229bb2f64
```

Example

```
nuls>>> disablecrossasset tNULSeBaMqpRQkHCs5ur3ck4LXEZB4qmmkPNo3 3 1
Please enter the password.
Enter your password:********
eb58da9321543c3a97f6d20721d3a9892a21fa630ccc6061a7b43c2229bb2f64
```



## Query parallel chain registration information  

Query the registration information of a parallel chain in the main network

- **Command：crosschaininfo &lt;chainId&gt;**

| Parameter            | Explain       |
| --------------- | ------------ |
| &lt;chainId&gt; | Chain ID of the registration chain |

Returns（see Example）

Example

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

返回Parameter说明

| parameter                | required | type   | description                                |
| ------------------------ | -------- | ------ | ------------------------------------------ |
| chainId                  | true     | int    | Chain identification                  |
| chainName                | true     | string | Chain name                  |
| addressType              | true     | int    | Address type of the account created on the chain: 1ecological and non ecological |
| addressPrefix            | true     | string | Address prefix 1-5 capital letters or numbers         |
| magicNumber              | true     | string | Network magic parameter                      |
| minAvailableNodeNum      | true     | int    | Minimum number of available nodes             |
| regAddress               | true     | string | Registered payment address               |
| regTxHash                | true     | string | Transaction hash                   |
| createTime               | true     | long   | Transaction submission time, seconds difference in 1970         |
| verifierList             | true     | string | Verifier list                |
| signatureByzantineRatio  | true     | int    | Byzantine proportion [66-100]                |
| maxSignatureCount        | true     | int    | Maximum number of signatures                |
| selfAssetKeyList         | true     | string | Asset symbol                 |
| totalAssetKeyList        | true     | string | Asset name                 |
| mainNetVerifierSeeds     | true     | string | Primary network seed verifier address            |
| mainNetCrossConnectSeeds | true     | string | Primary network seed connection node address           |
| enable                   | true     | string | In use or not                |

## Query the information of parallel chain registered assets

   Query the registration information of a parallel chain asset on the main network

- **Command：crossassetinfo &lt;chainId&gt; &lt;assetId&gt;**

| Parameter            | Explain     |
| --------------- | ---------- |
| &lt;chainId&gt; | ID of the registration chain|
| &lt;assetId&gt; | Asset ID  |

Returns（see Example）

Example

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

Return parameter description

| parameter     | required | type    | description                  |
| ------------- | -------- | ------- | ---------------------------- |
| chainId       | true     | int     | Chain identification      |
| assetId       | true     | int     | Asset ID       |
| symbol        | true     | string  | E.g. BTC for short     |
| assetName     | true     | string  | Asset name     |
| depositNuls   | true     | long    | Number of main network assets mortgaged|
| destroyNuls   | true     | long    | Number of main network assets destroyed|
| initNumber    | true     | string  | Initial value of assets    |
| decimalPlaces | true     | int     | Number of assets that can be cut  |
| enable        | true     | boolean | Available or not true available, false disabled |
| createTime    | true     | long    | Transaction generation time   |
| address       | true     | String  | Transaction payment address   |
| txHash        | true     | String  | Transaction hash       |



## Restore parallel chain registration in main chain

   After the parallel chain is registered and logged out in the main network, if it needs to be restored, you can restore and update the information through the following command, which needs to run in the main network node

- **Command： updatecrosschain &lt;address&gt;、&lt;chainId&gt;、&lt;chainName&gt;、&lt;addressPrefix&gt;、&lt;magicNumber&gt;、&lt;maxSignatureCount&gt;、&lt;signatureBFTRatio&gt;、&lt;verifierList&gt;、&lt;asserId&gt;、&lt;symbol&gt;、&lt;assetName&gt;、&lt;initNumber&gt;、 [decimalPlaces]、[minAvailableNodeNum]**

| Parameter                      | Explain                                           |
| ------------------------- | ------------------------------------------------ |
| &lt;address&gt;           | Main network address, number of nuls is not less than 1000, used to register cross chain       |
| &lt;chainId&gt;           | Chain ID, unique ID [10-65535]                  |
| &lt;chainName&gt;         | Chain name                     |
| &lt;addressPrefix&gt;     | Address prefix (1-5 characters, uppercase)            |
| &lt;magicNumber&gt;       | Magic parameter (8 digits)                      |
| &lt;maxSignatureCount&gt; | Maximum number of signatures (recommended: 100)             |
| &lt;signatureBFTRatio&gt; | Signed Byzantine proportion (0-100, recommendation: 66)           |
| &lt;verifierList&gt;      | List of chain verifier (address of seed block, multiple addresses separated by commas)|
| &lt;asserId&gt;           | Asset ID (recommendation: 1)                 |
| &lt;symbol&gt;            | Asset symbol (eg: nuls)                  |
| &lt;assetName&gt;         | Asset name                    |
| &lt;initNumber&gt;        | Total assets issued                  |
| [decimalPlaces]           | Asset decimal, default 8               |
| [minAvailableNodeNum]     | Minimum connections, default 5                |

Returns

```
{
  "mainNetVerifierSeeds" : "tNULSeBaMsWM1DWppv2H5AUjoxRALv8Rx1JL1V,tNULSeBaMgn16tSzn3Tr6EobmZ9UAfAwD9gPXt,tNULSeBaMjdg2vMBNG3RXeduADiiHbypgBtrfM",
  "txHash" : "c9c2e6518afb0359817ccc74eff1a7d0e4f7ceab3fc5f86095a2b748622992bb",
  "mainNetCrossConnectSeeds" : "192.168.1.139:18002,192.168.1.137:18002,192.168.1.140:18002"
}
```

Example

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

## Nrc20 asset registration cross chain assets

see [**Nrc20 token cross chain guide**](./c_nrc20.md)↓