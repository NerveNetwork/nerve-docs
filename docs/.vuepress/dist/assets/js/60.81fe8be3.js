(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{447:function(t,e,s){"use strict";s.r(e);var a=s(42),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"how-to-register-cross-chain-assets"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#how-to-register-cross-chain-assets"}},[t._v("#")]),t._v(" How to register cross chain assets")]),t._v(" "),s("p",[t._v("As the value embodiment of the chain, the most direct embodiment of the value interoperability between the chains is the transaction of the assets between the chains. However, before the cross chain transaction of assets, we need to register the assets across the chains.")]),t._v(" "),s("h2",{attrs:{id:"register-parallel-chain-cross-chain-assets"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#register-parallel-chain-cross-chain-assets"}},[t._v("#")]),t._v(" Register parallel chain cross chain assets")]),t._v(" "),s("p",[t._v("In the process of registering cross chain, parallel chain registers assets as cross chain assets by default:")]),t._v(" "),s("ul",[s("li",[t._v("Command： "),s("strong",[t._v("registercrosschain <address>、<chainId>、<chainName>、<addressPrefix>、<magicNumber>、<maxSignatureCount>、<signatureBFTRatio>、<verifierList>、<asserId>、<symbol>、<assetName>、<initNumber>、 [decimalPlaces]、[minAvailableNodeNum]")])])]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Parameter")]),t._v(" "),s("th",[t._v("Explain")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("< address >")]),t._v(" "),s("td",[t._v("primary network address, number of nuls is not less than 1000, used to register cross chain")])]),t._v(" "),s("tr",[s("td",[t._v("< chainid >")]),t._v(" "),s("td",[t._v("Chain ID, unique ID [10-65535]")])]),t._v(" "),s("tr",[s("td",[t._v("< chainname >")]),t._v(" "),s("td",[t._v("chain name")])]),t._v(" "),s("tr",[s("td",[t._v("< addressprefix >")]),t._v(" "),s("td",[t._v("address prefix (1-5 characters, upper case)")])]),t._v(" "),s("tr",[s("td",[t._v("< magicnumber > magic parameter (8 digits)")]),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("< maxsignaturecount >")]),t._v(" "),s("td",[t._v("maximum number of signatures (recommended: 100)")])]),t._v(" "),s("tr",[s("td",[t._v("< signaturebftratio >")]),t._v(" "),s("td",[t._v("Byzantine proportion of signatures (0-100, recommendation: 66)")])]),t._v(" "),s("tr",[s("td",[t._v("< verifierlist >")]),t._v(" "),s("td",[t._v("chain verifier list (seed block address, multiple addresses separated by commas)")])]),t._v(" "),s("tr",[s("td",[t._v("< asserid >")]),t._v(" "),s("td",[t._v("asset ID (recommended: 1)")])]),t._v(" "),s("tr",[s("td",[t._v("< Symbol >")]),t._v(" "),s("td",[t._v("asset symbol (eg: nuls)")])]),t._v(" "),s("tr",[s("td",[t._v("< assetname >")]),t._v(" "),s("td",[t._v("asset name")])]),t._v(" "),s("tr",[s("td",[t._v("< initnumber >")]),t._v(" "),s("td",[t._v("total asset issuance")])]),t._v(" "),s("tr",[s("td",[t._v("[DecimalPlaces]")]),t._v(" "),s("td",[t._v("asset decimal, default 8")])]),t._v(" "),s("tr",[s("td",[t._v("[minavailablenodenum]")]),t._v(" "),s("td",[t._v("minimum number of connections, default 5")])])])]),t._v(" "),s("p",[t._v("Returns：")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('{\n  "mainNetVerifierSeeds" : "tNULSeBaMsWM1DWppv2H5AUjoxRALv8Rx1JL1V,tNULSeBaMgn16tSzn3Tr6EobmZ9UAfAwD9gPXt,tNULSeBaMjdg2vMBNG3RXeduADiiHbypgBtrfM",\n  "txHash" : "c9c2e6518afb0359817ccc74eff1a7d0e4f7ceab3fc5f86095a2b748622992bb",\n  "mainNetCrossConnectSeeds" : "192.168.1.139:18002,192.168.1.137:18002,192.168.1.140:18002"\n}\n')])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br")])]),s("p",[t._v("Example")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('nuls>>> registercrosschain tNULSeBaMqpRQkHCs5ur3ck4LXEZB4qmmkPNo3 4 nerve TNVT 20200422 100 66 TNVTdN9i5aCwKBhaGeUZExLLLB8WtUSWxekcp,TNVTdN9iFcMpYz5eVz41gdETPGNqqbFA8FfSf,TNVTdN9i7xo3PmLj376B17Qntng3DyVio4Bqd 1 TVNT nerve 100000000 8 3\nPlease enter the password.\nEnter your password:********\n{\n  "mainNetVerifierSeeds" : "tNULSeBaMsWM1DWppv2H5AUjoxRALv8Rx1JL1V,tNULSeBaMgn16tSzn3Tr6EobmZ9UAfAwD9gPXt,tNULSeBaMjdg2vMBNG3RXeduADiiHbypgBtrfM",\n  "txHash" : "c9c2e6518afb0359817ccc74eff1a7d0e4f7ceab3fc5f86095a2b748622992bb",\n  "mainNetCrossConnectSeeds" : "192.168.1.139:18002,192.168.1.137:18002,192.168.1.140:18002"\n}\n')])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br")])]),s("h2",{attrs:{id:"add-parallel-chain-assets-that-need-to-cross-the-chain-in-the-main-chain"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#add-parallel-chain-assets-that-need-to-cross-the-chain-in-the-main-chain"}},[t._v("#")]),t._v(" Add parallel chain assets that need to cross the chain in the main chain")]),t._v(" "),s("p",[t._v("Parallel chain is multi asset. Registered cross chain parallel chain can add other assets of the chain on the main network to participate in cross chain")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Command： addcrossasset <address><assetChainId> <assetId> <assetName><symbol> <initNumber> [decimalPlaces]")])])]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Parameter")]),t._v(" "),s("th",[t._v("Explain")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("& lt; address & gt;")]),t._v(" "),s("td",[t._v("primary network address, number of nuls is not less than 1000, used to register cross chain assets")])]),t._v(" "),s("tr",[s("td",[t._v("& lt; assetchainid & gt;")]),t._v(" "),s("td",[t._v("Chain ID, unique ID [10-65535]")])]),t._v(" "),s("tr",[s("td",[t._v("& lt; assetid & gt;")]),t._v(" "),s("td",[t._v("asset ID")])]),t._v(" "),s("tr",[s("td",[t._v("& lt; assetname & gt;")]),t._v(" "),s("td",[t._v("asset name")])]),t._v(" "),s("tr",[s("td",[t._v("& lt; Symbol & gt;")]),t._v(" "),s("td",[t._v("asset symbol")])]),t._v(" "),s("tr",[s("td",[t._v("& lt; initnumber & gt;")]),t._v(" "),s("td",[t._v("total issues")])]),t._v(" "),s("tr",[s("td",[t._v("& lt; decimal places & gt;")]),t._v(" "),s("td",[t._v("decimal places")])])])]),t._v(" "),s("p",[t._v("Returns")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("143a0f6ec36778c7991544b8acca74dbc4433d0a0d17f188465c01d26786a65c\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v("Example")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("nuls>>> addcrossasset tNULSeBaMqpRQkHCs5ur3ck4LXEZB4qmmkPNo3 4 2 eth ETH 100000000 8\nPlease enter the password.\nEnter your password:********\n143a0f6ec36778c7991544b8acca74dbc4433d0a0d17f188465c01d26786a65c\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br")])]),s("h2",{attrs:{id:"remove-parallel-chain-assets-of-cross-chain-transactions-in-the-main-chain"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#remove-parallel-chain-assets-of-cross-chain-transactions-in-the-main-chain"}},[t._v("#")]),t._v(" Remove parallel chain assets of cross chain transactions in the main chain")]),t._v(" "),s("p",[t._v("The parallel chain is multi asset. When the cross chain transaction of the asset is to be stopped on the main network, the removal instruction is used. If the last asset is left, the corresponding chain will stop working and the parallel chain will be cancelled after the instruction is executed")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Command： disablecrossasset <address><chainId><assetId>")])])]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Parameter")]),t._v(" "),s("th",[t._v("Explain")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("& lt; address & gt;")]),t._v(" "),s("td",[t._v("address used to register cross chain assets")])]),t._v(" "),s("tr",[s("td",[t._v("& lt; chainid & gt;")]),t._v(" "),s("td",[t._v("write off the chain ID of the asset")])]),t._v(" "),s("tr",[s("td",[t._v("& lt; assetid & gt;")]),t._v(" "),s("td",[t._v("asset ID of write off asset")])])])]),t._v(" "),s("p",[t._v("Returns")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("eb58da9321543c3a97f6d20721d3a9892a21fa630ccc6061a7b43c2229bb2f64\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v("Example")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("nuls>>> disablecrossasset tNULSeBaMqpRQkHCs5ur3ck4LXEZB4qmmkPNo3 3 1\nPlease enter the password.\nEnter your password:********\neb58da9321543c3a97f6d20721d3a9892a21fa630ccc6061a7b43c2229bb2f64\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br")])]),s("h2",{attrs:{id:"query-parallel-chain-registration-information"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#query-parallel-chain-registration-information"}},[t._v("#")]),t._v(" Query parallel chain registration information")]),t._v(" "),s("p",[t._v("Query the registration information of a parallel chain in the main network")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Command：crosschaininfo <chainId>")])])]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Parameter")]),t._v(" "),s("th",[t._v("Explain")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("<chainId>")]),t._v(" "),s("td",[t._v("Chain ID of the registration chain")])])])]),t._v(" "),s("p",[t._v("Returns（see Example）")]),t._v(" "),s("p",[t._v("Example")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('nuls>>> crosschaininfo 4\n{\n  "chainId" : 4,\n  "chainName" : "nerve",\n  "addressType" : "1",\n  "addressPrefix" : "TNVT",\n  "magicNumber" : 20200422,\n  "minAvailableNodeNum" : 3,\n  "regAddress" : "tNULSeBaMqpRQkHCs5ur3ck4LXEZB4qmmkPNo3",\n  "regTxHash" : "c9c2e6518afb0359817ccc74eff1a7d0e4f7ceab3fc5f86095a2b748622992bb",\n  "createTime" : 1587628283,\n  "verifierList" : [ "TNVTdN9i5aCwKBhaGeUZExLLLB8WtUSWxekcp", "TNVTdN9iFcMpYz5eVz41gdETPGNqqbFA8FfSf", "TNVTdN9i7xo3PmLj376B17Qntng3DyVio4Bqd" ],\n  "signatureByzantineRatio" : 66,\n  "maxSignatureCount" : 100,\n  "selfAssetKeyList" : [ "4-1", "4-2" ],\n  "totalAssetKeyList" : [ "4-1", "4-2" ],\n  "mainNetVerifierSeeds" : "tNULSeBaMsWM1DWppv2H5AUjoxRALv8Rx1JL1V,tNULSeBaMgn16tSzn3Tr6EobmZ9UAfAwD9gPXt,tNULSeBaMjdg2vMBNG3RXeduADiiHbypgBtrfM",\n  "mainNetCrossConnectSeeds" : "192.168.1.139:18002,192.168.1.137:18002,192.168.1.140:18002",\n  "enable" : true\n}\n')])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br")])]),s("p",[t._v("返回Parameter说明")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("parameter")]),t._v(" "),s("th",[t._v("required")]),t._v(" "),s("th",[t._v("type")]),t._v(" "),s("th",[t._v("description")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("chainId")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("int")]),t._v(" "),s("td",[t._v("Chain identification")])]),t._v(" "),s("tr",[s("td",[t._v("chainName")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("Chain name")])]),t._v(" "),s("tr",[s("td",[t._v("addressType")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("int")]),t._v(" "),s("td",[t._v("Address type of the account created on the chain: 1ecological and non ecological")])]),t._v(" "),s("tr",[s("td",[t._v("addressPrefix")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("Address prefix 1-5 capital letters or numbers")])]),t._v(" "),s("tr",[s("td",[t._v("magicNumber")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("Network magic parameter")])]),t._v(" "),s("tr",[s("td",[t._v("minAvailableNodeNum")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("int")]),t._v(" "),s("td",[t._v("Minimum number of available nodes")])]),t._v(" "),s("tr",[s("td",[t._v("regAddress")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("Registered payment address")])]),t._v(" "),s("tr",[s("td",[t._v("regTxHash")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("Transaction hash")])]),t._v(" "),s("tr",[s("td",[t._v("createTime")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("long")]),t._v(" "),s("td",[t._v("Transaction submission time, seconds difference in 1970")])]),t._v(" "),s("tr",[s("td",[t._v("verifierList")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("Verifier list")])]),t._v(" "),s("tr",[s("td",[t._v("signatureByzantineRatio")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("int")]),t._v(" "),s("td",[t._v("Byzantine proportion [66-100]")])]),t._v(" "),s("tr",[s("td",[t._v("maxSignatureCount")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("int")]),t._v(" "),s("td",[t._v("Maximum number of signatures")])]),t._v(" "),s("tr",[s("td",[t._v("selfAssetKeyList")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("Asset symbol")])]),t._v(" "),s("tr",[s("td",[t._v("totalAssetKeyList")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("Asset name")])]),t._v(" "),s("tr",[s("td",[t._v("mainNetVerifierSeeds")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("Primary network seed verifier address")])]),t._v(" "),s("tr",[s("td",[t._v("mainNetCrossConnectSeeds")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("Primary network seed connection node address")])]),t._v(" "),s("tr",[s("td",[t._v("enable")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("In use or not")])])])]),t._v(" "),s("h2",{attrs:{id:"query-the-information-of-parallel-chain-registered-assets"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#query-the-information-of-parallel-chain-registered-assets"}},[t._v("#")]),t._v(" Query the information of parallel chain registered assets")]),t._v(" "),s("p",[t._v("Query the registration information of a parallel chain asset on the main network")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Command：crosschaininfo <chainId> <assetId>")])])]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Parameter")]),t._v(" "),s("th",[t._v("Explain")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("<chainId>")]),t._v(" "),s("td",[t._v("ID of the registration chain")])]),t._v(" "),s("tr",[s("td",[t._v("<assetId>")]),t._v(" "),s("td",[t._v("Asset ID")])])])]),t._v(" "),s("p",[t._v("Returns（see Example）")]),t._v(" "),s("p",[t._v("Example")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('nuls>>> crossassetinfo 4 1\n{\n  "chainId" : 4,\n  "assetId" : 1,\n  "symbol" : "TVNT",\n  "assetName" : "nerve",\n  "depositNuls" : "100000000000",\n  "destroyNuls" : "20000000000",\n  "initNumber" : "10000000000000000",\n  "decimalPlaces" : 8,\n  "enable" : true,\n  "createTime" : 1587628283,\n  "address" : "tNULSeBaMqpRQkHCs5ur3ck4LXEZB4qmmkPNo3",\n  "txHash" : "c9c2e6518afb0359817ccc74eff1a7d0e4f7ceab3fc5f86095a2b748622992bb"\n}\n')])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br")])]),s("p",[t._v("Return parameter description")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("parameter")]),t._v(" "),s("th",[t._v("required")]),t._v(" "),s("th",[t._v("type")]),t._v(" "),s("th",[t._v("description")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("chainId")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("int")]),t._v(" "),s("td",[t._v("Chain identification")])]),t._v(" "),s("tr",[s("td",[t._v("assetId")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("int")]),t._v(" "),s("td",[t._v("Asset ID")])]),t._v(" "),s("tr",[s("td",[t._v("symbol")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("E.g. BTC for short")])]),t._v(" "),s("tr",[s("td",[t._v("assetName")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("Asset name")])]),t._v(" "),s("tr",[s("td",[t._v("depositNuls")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("long")]),t._v(" "),s("td",[t._v("Number of main network assets mortgaged")])]),t._v(" "),s("tr",[s("td",[t._v("destroyNuls")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("long")]),t._v(" "),s("td",[t._v("Number of main network assets destroyed")])]),t._v(" "),s("tr",[s("td",[t._v("initNumber")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("Initial value of assets")])]),t._v(" "),s("tr",[s("td",[t._v("decimalPlaces")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("int")]),t._v(" "),s("td",[t._v("Number of assets that can be cut")])]),t._v(" "),s("tr",[s("td",[t._v("enable")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("boolean")]),t._v(" "),s("td",[t._v("Available or not true available, false disabled")])]),t._v(" "),s("tr",[s("td",[t._v("createTime")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("long")]),t._v(" "),s("td",[t._v("Transaction generation time")])]),t._v(" "),s("tr",[s("td",[t._v("address")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("String")]),t._v(" "),s("td",[t._v("Transaction payment address")])]),t._v(" "),s("tr",[s("td",[t._v("txHash")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("String")]),t._v(" "),s("td",[t._v("Transaction hash")])])])]),t._v(" "),s("h2",{attrs:{id:"restore-parallel-chain-registration-in-main-chain"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#restore-parallel-chain-registration-in-main-chain"}},[t._v("#")]),t._v(" Restore parallel chain registration in main chain")]),t._v(" "),s("p",[t._v("After the parallel chain is registered and logged out in the main network, if it needs to be restored, you can restore and update the information through the following command, which needs to run in the main network node")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("Command： updatecrosschain <address>、<chainId>、<chainName>、<addressPrefix>、<magicNumber>、<maxSignatureCount>、<signatureBFTRatio>、<verifierList>、<asserId>、<symbol>、<assetName>、<initNumber>、 [decimalPlaces]、[minAvailableNodeNum]")])])]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Parameter")]),t._v(" "),s("th",[t._v("Explain")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("<address>")]),t._v(" "),s("td",[t._v("Main network address, number of nuls is not less than 1000, used to register cross chain")])]),t._v(" "),s("tr",[s("td",[t._v("<chainId>")]),t._v(" "),s("td",[t._v("Chain ID, unique ID [10-65535]")])]),t._v(" "),s("tr",[s("td",[t._v("<chainName>")]),t._v(" "),s("td",[t._v("Chain name")])]),t._v(" "),s("tr",[s("td",[t._v("<addressPrefix>")]),t._v(" "),s("td",[t._v("Address prefix (1-5 characters, uppercase)")])]),t._v(" "),s("tr",[s("td",[t._v("<magicNumber>")]),t._v(" "),s("td",[t._v("Magic parameter (8 digits)")])]),t._v(" "),s("tr",[s("td",[t._v("<maxSignatureCount>")]),t._v(" "),s("td",[t._v("Maximum number of signatures (recommended: 100)")])]),t._v(" "),s("tr",[s("td",[t._v("<signatureBFTRatio>")]),t._v(" "),s("td",[t._v("Signed Byzantine proportion (0-100, recommendation: 66)")])]),t._v(" "),s("tr",[s("td",[t._v("<verifierList>")]),t._v(" "),s("td",[t._v("List of chain verifier (address of seed block, multiple addresses separated by commas)")])]),t._v(" "),s("tr",[s("td",[t._v("<asserId>")]),t._v(" "),s("td",[t._v("Asset ID (recommendation: 1)")])]),t._v(" "),s("tr",[s("td",[t._v("<symbol>")]),t._v(" "),s("td",[t._v("Asset symbol (eg: nuls)")])]),t._v(" "),s("tr",[s("td",[t._v("<assetName>")]),t._v(" "),s("td",[t._v("Asset name")])]),t._v(" "),s("tr",[s("td",[t._v("<initNumber>")]),t._v(" "),s("td",[t._v("Total assets issued")])]),t._v(" "),s("tr",[s("td",[t._v("[decimalPlaces]")]),t._v(" "),s("td",[t._v("Asset decimal, default 8")])]),t._v(" "),s("tr",[s("td",[t._v("[minAvailableNodeNum]")]),t._v(" "),s("td",[t._v("Minimum connections, default 5")])])])]),t._v(" "),s("p",[t._v("Returns")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('{\n  "mainNetVerifierSeeds" : "tNULSeBaMsWM1DWppv2H5AUjoxRALv8Rx1JL1V,tNULSeBaMgn16tSzn3Tr6EobmZ9UAfAwD9gPXt,tNULSeBaMjdg2vMBNG3RXeduADiiHbypgBtrfM",\n  "txHash" : "c9c2e6518afb0359817ccc74eff1a7d0e4f7ceab3fc5f86095a2b748622992bb",\n  "mainNetCrossConnectSeeds" : "192.168.1.139:18002,192.168.1.137:18002,192.168.1.140:18002"\n}\n')])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br")])]),s("p",[t._v("Example")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('nuls>>> updatecrosschain tNULSeBaMqpRQkHCs5ur3ck4LXEZB4qmmkPNo3 4 nerve TNVT 20200422 100 66 TNVTdN9i5aCwKBhaGeUZExLLLB8WtUSWxekcp,TNVTdN9iFcMpYz5eVz41gdETPGNqqbFA8FfSf,TNVTdN9i7xo3PmLj376B17Qntng3DyVio4Bqd 1 TVNT nerve 100000000 8 3\nPlease enter the password.\nEnter your password:********\n{\n  "mainNetVerifierSeeds" : "tNULSeBaMsWM1DWppv2H5AUjoxRALv8Rx1JL1V,tNULSeBaMgn16tSzn3Tr6EobmZ9UAfAwD9gPXt,tNULSeBaMjdg2vMBNG3RXeduADiiHbypgBtrfM",\n  "txHash" : "c9c2e6518afb0359817ccc74eff1a7d0e4f7ceab3fc5f86095a2b748622992bb",\n  "mainNetCrossConnectSeeds" : "192.168.1.139:18002,192.168.1.137:18002,192.168.1.140:18002"\n}\n')])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br")])]),s("h2",{attrs:{id:"nrc20-asset-registration-cross-chain-assets"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nrc20-asset-registration-cross-chain-assets"}},[t._v("#")]),t._v(" Nrc20 asset registration cross chain assets")]),t._v(" "),s("p",[t._v("see "),s("RouterLink",{attrs:{to:"/Guide/c_nrc20.html"}},[s("strong",[t._v("Nrc20 token cross chain guide")])]),t._v("↓")],1)])}),[],!1,null,null,null);e.default=n.exports}}]);