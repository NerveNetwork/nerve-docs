# 命令行使用手册

## 介绍

​	本文档为Nerve beta版本测试网Linux版全节点钱包的使用指南，阅读本文档前用户需了解Linux系统的基本操作和使用方式，本文介绍了在Linux系统中如何利用Nerve钱包创建账户、导入账户、转账、建立节点、参与Staking等操作。我们建议用户利用Linux系统服务器建立稳定的Nerve节点。

## 版本更新记录

| 版本   | 更新日期   | 内容 | 作者   |
| ------ | ---------- | ---- | ------ |
| V1.0.0 | 2020-04-21 | beta | Albert |

## 准备

### **服务器硬件配置**

**建立Nerve节点的服务器不低于如下配置：**

| CPU         | 内存 | 硬盘     | 宽带    |
| ----------- | ---- | -------- | ------- |
| 四核 3.0GHz | 16G  | 128G硬盘 | 20M上行 |

**推荐配置：**

| CPU         | 内存 | 硬盘     | 宽带     |
| ----------- | ---- | -------- | -------- |
| 八核 3.0GHz | 32G  | 256G硬盘 | 100M上行 |

### **系统及内核版本**

**Linux系统**

- CentOS 6,7
- Ubuntu 14 +

Linux内核版本推荐使用 2.6.32及以上

## 安装


[快速安装节点钱包](/zh/guide/g_docker_install.md)


### 运行

- 进入解压后的目录，并运行启动脚本，启动节点钱包

  ```
  $ cd NERVE_Wallet_linux1.0.0
  $ ./start
  ```

## 使用钱包

### 快速入门

- 在确定钱包已经启动后，启动钱包的命令行程序，可对钱包进行操作。

  进入钱包根目录，执行如下命令：

  ```
  $ ./cmd
  ```

  将会出现Nerve命名输入提示符`nerve>>>` ，然后可直接输入Nerve钱包操作命令，来进行操作。

  例如，创建账户的示例如下：

  ```
  nerve>>> create
  Please enter the new password(8-20 characters, the combination of letters and numbers).
  Enter your new password:********
  Please confirm new password:********
  [ "TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG" ]
  ```

  执行`create`命令表示创建单个账户，然后输入密码，以及再次确认输入的密码，创建成功后将会返回账户的地址。

### 约定

- 设置密码规则：密码长度在8至20位，必须同时包含字母和数字。
- 命令参数说明： &lt;parameter&gt; 表示必填参数；[parameter] 表示选填参数。"|" 在参数中表示或者，表示前后参数只能选其一。

## 钱包命令

### 帮助命令

输出打印所有的命令，

- **命令： help [-a]|[group]|[command]**

| 参数    | 说明                             |
| ------- | -------------------------------- |
| -a      | 格式化打印命令，选填             |
| command | 查看指定命令使用说明             |
| group   | 查看指定命令组的所有命令使用说明 |

返回信息 help

```
getaccount <address> --get account information
```

返回信息 help -a

```
getaccount <address> --get account information
	OPTIONS:
	<address> the account address - Required
```

示例

```
nerve>>> help
nerve>>> help -a
nerve>>> help account
nerve>>> help create
```

### 创建账户

创建账户，返回账户地址集合

- **命令： create [number]**

| 参数     | 说明                 |
| -------- | -------------------- |
| [number] | 创建账户的数量，选填 |

创建账户时，将会提示输入密码，为了保证资产安全，必须给账户设置密码；

返回账户集合

```json
[ "TNVTdN9iDZnRXWovPkiYQRRLj3v4d93pxLhcA", "TNVTdN9iGbkjcWsUCEXSTT4yEPNDBSKsfXDxZ" ]
```

示例

创建1个账户

```
nerve>>> create
Please enter the new password(8-20 characters, the combination of letters and numbers).
Enter your new password:********
Please confirm new password:********
[ "TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG" ]
```

一次创建多个账户

```
nerve>>> create 2
Please enter the new password(8-20 characters, the combination of letters and numbers).
Enter your new password:********
Please confirm new password:********
[ "TNVTdN9iDZnRXWovPkiYQRRLj3v4d93pxLhcA", "TNVTdN9iGbkjcWsUCEXSTT4yEPNDBSKsfXDxZ" ]
```

### 备份账户

备份账户，将生成一个名称为账户地址，扩展名为.keystore的文件，该文件为账户的备份文件

- **命令：backup &lt;address&gt;[path]**

| 参数      | 说明                                                 |
| --------- | ---------------------------------------------------- |
| [address] | 账户地址，必填                                       |
| [path]    | 文件生成备份文件的目标文件夹，默认为当前文件夹，选填 |

返回信息

```
The path to the backup file is /nerve/data/keystore/backup/TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG.keystore
```

示例 备份一个有密码的账户

```
nerve>>> backup TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG /home/nerve/NERVE-Wallet-linux64-beta
Please enter the password.
Enter your password:********
The path to the backup file is /home/nerve/NERVE-Wallet-linux64-beta/TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG.keystore
```

### 移除账户

根据账户地址移除本地账户，需要输入密码

- **命令：remove &lt;address&gt;**

| 参数            | 说明             |
| --------------- | ---------------- |
| &lt;address&gt; | 账户的地址，必填 |

返回信息

```json
Success
```

示例

```
nerve>>> remove TNVTdN9iGbkjcWsUCEXSTT4yEPNDBSKsfXDxZ
Please enter the password.
Enter your password:********
Success
```

### 修改账户密码

根据账户地址和账户密码重新设置新密码。

- **命令：resetpwd &lt;address&gt;**

| 参数            | 说明             |
| --------------- | ---------------- |
| &lt;address&gt; | 账户的地址，必填 |

返回信息

```json
Success
```

示例

```
nerve>>> resetpwd  TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG
Enter your old password:********
Enter new password:**********
Please confirm new password:**********
Success
```

### 设置别名

给账户设置一个别名，如果用此账户建立节点，别名将作为节点来源显示

- **命令：setalias &lt;address&gt; &lt;alias&gt;**

| 参数            | 说明             |
| --------------- | ---------------- |
| &lt;address&gt; | 账户的地址，必填 |
| &lt;alias&gt;   | 别名名称，必填   |

返回信息 交易hash

```json
"txHash:efa00a925a8e5aebc9b12f8e5c6c016290d0245624308328c500a05f742384c8"
```

示例

```
nerve>>> setalias TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG alce
Please enter the password.
Enter your password:**********
txHash:efa00a925a8e5aebc9b12f8e5c6c016290d0245624308328c500a05f742384c8
```

### 导入账户keystore

导入账户keystore文件，生成本地账户，如果本地已有该账户将无法导入。

- **命令：importkeystore &lt;path&gt;**

| 参数         | 说明                           |
| ------------ | ------------------------------ |
| &lt;path&gt; | 待导入的keystore文件地址，必填 |

注意：导入keystore文件生成账户时，需要原始密码

返回信息 导入的账户地址

```json
"TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG"
```

示例

```
nerve>>> importkeystore /home/nerve/TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG.keystore
Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, return directly.
Enter your password:********
TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG
```

### 导入账户私钥

导入账户私钥，生成本地账户，如果本地已有该账户将覆盖,导入时需要给账户设置密码。此功能可以用于忘记账户密码后，通过私钥重新找回账户。

- **命令：import &lt;privatekey&gt;**

| 参数               | 说明             |
| ------------------ | ---------------- |
| &lt;privatekey&gt; | 账户的私钥，必填 |

```json
"TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG"
```

示例

```
nerve>>> import f3bf2993dcbf7a531504333f2b55a73a10eea2fb2739b96e1b3c7ac64455f770
Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, return directly.
Enter your password:********
Please confirm new password:********
TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG
```

### 查询账户信息

根据账户地址查询账户信息

- **命令：getaccount &lt;address&gt;**

| 参数            | 说明           |
| --------------- | -------------- |
| &lt;address&gt; | 账户地址，必填 |

返回信息

```json
{
  "encryptedPrikeyHex" : "04d5c7a7068d1ad5d0e1974fe3bea7076e4f6eec434e4a2781ae1b7d9f4e2403b6cb2ba59cd600029aefa05ae464ff3f",//加密私钥
  "alias" : "alce",//别名
  "address" : "TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG",//地址
  "pubkeyHex" : "03b0eec9c5c7daf1a64144f13c7e6de41a86788eeceb9af0e445a8703ca79498d9",//加密公钥
  "balance" : {
    "available" : 198.999,//可用资产数量
    "total" : 198.999,//总资产数量
    "freeze" : 0//冻结资产数量
  }
}
```

示例

```
nerve>>> getaccount TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG
{
  "encryptedPrikeyHex" : "04d5c7a7068d1ad5d0e1974fe3bea7076e4f6eec434e4a2781ae1b7d9f4e2403b6cb2ba59cd600029aefa05ae464ff3f",
  "alias" : "alce",
  "address" : "TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG",
  "pubkeyHex" : "03b0eec9c5c7daf1a64144f13c7e6de41a86788eeceb9af0e445a8703ca79498d9",
  "balance" : {
    "available" : 198.999,
    "total" : 198.999,
    "freeze" : 0
  }
}

```

### 查询账户列表

根据分页参数查询账户列表，所有账户以创建时间倒序输出。

- **命令：getaccounts &lt;pageNumber&gt; &lt;pageSize&gt;**

| 参数               | 说明                             |
| ------------------ | -------------------------------- |
| &lt;pageNumber&gt; | 页数，需要获取第几页的数据，必填 |
| &lt;pageSize&gt;   | 每一页显示的数据条数，必填       |

返回信息，将输出账户集合

```json
[ {
  "address" : "TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA",
  "alias" : null,
  "pubkeyHex" : "03958b790c331954ed367d37bac901de5c2f06ac8368b37d7bd6cd5ae143c1d7e3",
  "encryptedPrikeyHex" : "709c90bb90d2aea2fbfb16361630ecea8dfb5619151bcf11d04b085e92f50aa78063f3d6b4331e44c71b8255922b9047"
}, {
  "address" : "TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG",
  "alias" : "alce",
  "pubkeyHex" : "03b0eec9c5c7daf1a64144f13c7e6de41a86788eeceb9af0e445a8703ca79498d9",
  "encryptedPrikeyHex" : "04d5c7a7068d1ad5d0e1974fe3bea7076e4f6eec434e4a2781ae1b7d9f4e2403b6cb2ba59cd600029aefa05ae464ff3f"
}, {
  "address" : "TNVTdN9iDZnRXWovPkiYQRRLj3v4d93pxLhcA",
  "alias" : null,
  "pubkeyHex" : "02c46ccb48092b3845652f711a2db3f3eed1d2039bb820d96cc9c5d48386b7b91d",
  "encryptedPrikeyHex" : "4224217ba32209fb071b4c587590957503211e6674598775ae85153820917928b806808a2fcdfaaac8976379479e11d9"
} ]

```

示例 获取账户列表

```
nerve>>> getaccounts
[ {
  "address" : "TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA",
  "alias" : null,
  "pubkeyHex" : "03958b790c331954ed367d37bac901de5c2f06ac8368b37d7bd6cd5ae143c1d7e3",
  "encryptedPrikeyHex" : "709c90bb90d2aea2fbfb16361630ecea8dfb5619151bcf11d04b085e92f50aa78063f3d6b4331e44c71b8255922b9047"
}, {
  "address" : "TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG",
  "alias" : "alce",
  "pubkeyHex" : "03b0eec9c5c7daf1a64144f13c7e6de41a86788eeceb9af0e445a8703ca79498d9",
  "encryptedPrikeyHex" : "04d5c7a7068d1ad5d0e1974fe3bea7076e4f6eec434e4a2781ae1b7d9f4e2403b6cb2ba59cd600029aefa05ae464ff3f"
}, {
  "address" : "TNVTdN9iDZnRXWovPkiYQRRLj3v4d93pxLhcA",
  "alias" : null,
  "pubkeyHex" : "02c46ccb48092b3845652f711a2db3f3eed1d2039bb820d96cc9c5d48386b7b91d",
  "encryptedPrikeyHex" : "4224217ba32209fb071b4c587590957503211e6674598775ae85153820917928b806808a2fcdfaaac8976379479e11d9"
} ]

```

### 查询账户私钥

根据账户地址个密码查询账户私钥

- **命令：getprikey &lt;address&gt;**

| 参数            | 说明             |
| --------------- | ---------------- |
| &lt;address&gt; | 账户的地址，必填 |

返回信息 导入的账户的私钥（未加密）

```json
f3bf2993dcbf7a531504333f2b55a73a10eea2fb2739b96e1b3c7ac64455f770
```

示例

```
nerve>>> getprikey TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG
Enter your account password**********
f3bf2993dcbf7a531504333f2b55a73a10eea2fb2739b96e1b3c7ac64455f770
```

### 查询账户余额

根据账户地址查询账户余额

- **命令：getbalance &lt;address&gt;**

| 参数            | 说明                                             |
| --------------- | ------------------------------------------------ |
| &lt;address&gt; | 账户的地址，必填                                 |
| [chainId]       | 资产链ID，选填（默认为本链链ID）                 |
| [assetId]       | 资产ID，条件必填（若填了chainId，则assetId必填） |

返回信息 导入的账户地址

```json
{
  "available" : 200,
  "total" : 200,
  "freeze" : 0
}
```

示例

```
nerve>>> getbalance TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG 2 1
{
  "available" : 200,
  "total" : 200,
  "freeze" : 0
}
```

### 转账

根据账户地址或别名将NVT转入另一账户地址或别名中

- **命令：transfer &lt;fromAddress&gt;|&lt;fromAlias&gt; &lt;toAddress&gt;|&lt;toAlias&gt; &lt;amount&gt; [remark] **

| 参数                | 说明                                 |
| ------------------- | ------------------------------------ |
| &lt;fromAddress&gt; | 转出地址(与fromAlias任选一项）       |
| &lt;fromAlias&gt;   | 转出地址别名(与fromAddress任选一项） |
| &lt;toAddress&gt;   | 接收地址(与toAlias任选一项）         |
| &lt;toAlias&gt;     | 接收地址别名(与toAddress任选一项）   |
| &lt;amount&gt;      | 转账数量，必填                       |
| [remark]            | 备注信息，选填                       |

返回信息 转账交易hash

```json
"7a6c7758380781f4616ffb7e8b4571c4e383bc87fe59c4071239d2f8ccc65b3a"
```

示例

```
nerve>>> transfer TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG 200
Enter your account password**********
7a6c7758380781f4616ffb7e8b4571c4e383bc87fe59c4071239d2f8ccc65b3a
```

### 查询交易详情

根据交易hash查询交易详细信息

- **命令：gettx &lt;hash&gt;**

| 参数         | 说明           |
| ------------ | -------------- |
| &lt;hash&gt; | 交易hash，必填 |

返回信息 交易详细信息

```json
{
  "type" : 3,//交易类型（枚举说明见下表【type 枚举类型说明】）
  "time" : "2020-04-21 08:08:08.008",
  "transactionSignature" : "2103b0eec9c5c7daf1a64144f13c7e6de41a86788eeceb9af0e445a8703ca79498d9473045022100f7b5dfd2c303e7e7c388d750ef0f2a8c5ca8ef58b47eae0cd2710721c7d6a42502205fd256b7bcfaf54f99cc0317e2d2747ec49757909ea4d80c48c8b49b12e4f329",
  "remark" : null,
  "hash" : "efa00a925a8e5aebc9b12f8e5c6c016290d0245624308328c500a05f742384c8",
  "blockHeight" : 679,//交易高度
  "status" : "CONFIRMED",//确认状态
  "size" : 285,
  "inBlockIndex" : 0,
  "from" : [ {
    "address" : "TVNTdN9i6eWsUxTTtC36JRqTAQit92vydnASG",
    "assetsChainId" : 4,
    "assetsId" : 1,
    "amount" : 100100000,
    "nonce" : "0000000000000000"
  } ],
  "to" : [ {
    "address" : "TVNTdN9i5pRGF8BmJ9XcHG1g46TNtwTLZP8db",
    "assetsChainId" : 4,
    "assetsId" : 1,
    "amount" : 100000000,
    "nonce" : null
  } ]
}
```

示例 查询转账交易

```
nerve>>> gettx efa00a925a8e5aebc9b12f8e5c6c016290d0245624308328c500a05f742384c8
{
  "type" : 3,
  "time" : "2020-04-21 08:08:08.008",
  "transactionSignature" : "2103b0eec9c5c7daf1a64144f13c7e6de41a86788eeceb9af0e445a8703ca79498d9473045022100f7b5dfd2c303e7e7c388d750ef0f2a8c5ca8ef58b47eae0cd2710721c7d6a42502205fd256b7bcfaf54f99cc0317e2d2747ec49757909ea4d80c48c8b49b12e4f329",
  "remark" : null,
  "hash" : "efa00a925a8e5aebc9b12f8e5c6c016290d0245624308328c500a05f742384c8",
  "blockHeight" : 679,
  "status" : "CONFIRMED",
  "size" : 285,
  "inBlockIndex" : 0,
  "from" : [ {
    "address" : "TVNTdN9i6eWsUxTTtC36JRqTAQit92vydnASG",
    "assetsChainId" : 4,
    "assetsId" : 1,
    "amount" : 100100000,
    "nonce" : "0000000000000000"
  } ],
  "to" : [ {
    "address" : "TVNTdN9i5pRGF8BmJ9XcHG1g46TNtwTLZP8db",
    "assetsChainId" : 4,
    "assetsId" : 1,
    "amount" : 100000000,
    "nonce" : null
  } ]
}
```

### 创建节点

根据账户地址创建节点,创建节点时需要提供两个地址，第一个地址为节点地址，需要输入节点地址账户密码。同时需要至少200000NVT的保证金。

- **命令：createagent &lt;agentAddress&gt; &lt;packingAddress&gt; &lt;deposit&gt;** [RewardAddress]

| 参数                   | 说明                                                         |
| ---------------------- | ------------------------------------------------------------ |
| &lt;agentAddress&gt;   | 创建节点的账户地址，必填                                     |
| &lt;packingAddress&gt; | 节点打包账户地址，必填（注：该账户默认密码：nuls123456，可以通过配置文件设置，否则节点不能打包出块） |
| &lt;deposit&gt;        | 创建节点的保证金，不能低于200000NVT，必填                     |
| [RewardAddress]        | 奖励地址，默认为节点创建地址（选填）                         |

返回信息 返回节点的agent hash

```json
"dfcdd777ed75889fbea9756c3fb287766c4e511c6e37daa54deb29c17ccb72cc"
```

示例 创建一个节点，押金200000NVT。

```
nerve>>>; createagent TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG 200000
Enter agent address password**********
"dfcdd777ed75889fbea9756c3fb287766c4e511c6e37daa54deb29c17ccb72cc"
```

### 增加节点保证金

节点创建地址，创建节点后增加节点保证金

- **命令：appendAgentDeposit &lt;address&gt; &lt;agentHash&gt; &lt;deposit**&gt;

| 参数              | 说明                            |
| ----------------- | ------------------------------- |
| &lt;address&gt;   | 节点拥有地址                    |
| &lt;agentHash&gt; | 节点创建hash                    |
| &lt;deposit&gt;   | 增加保证金数量（不小于2000NVT） |

返回值，交易hash

```
"e715545c1b91c67924b607d0b401519839b1ca268f4391b318603a44269e7399"
```

示例

```
nerve>>> appendAgentDeposit TNVTdN9i8H46GtktXW9RwQaboGcAAVNHLbjfp 3b2076bc68aa53eef18289cb6eb618449e039171b8759d71d824847aee872c14 20000
Please enter the password.
Enter your password:********
"e715545c1b91c67924b607d0b401519839b1ca268f4391b318603a44269e7399"
```



### 减少节点保证金

地址创建节点之后，当需要减少节点保证金的时候，使用该方法，减少的保证金锁定72小时

- **命令：reduceAgentDeposit &lt;address&gt; &lt;agentHash&gt; &lt;deposit**&gt;

| 参数              | 说明                             |
| ----------------- | -------------------------------- |
| &lt;address&gt;   | 节点拥有地址                     |
| &lt;agentHash&gt; | 节点创建hash                     |
| &lt;deposit&gt;   | 减少保证金数量（不小于20000NVT） |

返回值，交易hash

```
"9ce21dad67e0f0af2599b41b515a7f7018059418bab892a7b68f283d489abc4b"
```

示例

```
nerve>>> reduceAgentDeposit TNVTdN9i8H46GtktXW9RwQaboGcAAVNHLbjfp 9f89db1378bdbb4f2b95edf9f88926311a974839bd1877673d5da17cba0c82f0 20000
Please enter the password.
Enter your password:********
"9ce21dad67e0f0af2599b41b515a7f7018059418bab892a7b68f283d489abc4b"
```







### 查询共识节点信息

根据agentHash查询指定节点信息

-**命令：getagent &lt;agentHash&gt;**

| 参数              | 说明     |
| ----------------- | -------- |
| &lt;agentHash&gt; | 节点hash |

返回值

```
略 见示例
```

示例

```
nerve>>> getagent dfcdd777ed75889fbea9756c3fb287766c4e511c6e37daa54deb29c17ccb72cc
{
  "agentAddress" : "TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA",
  "agentId" : "7CCB72CC",
  "delHeight" : -1,
  "agentHash" : "dfcdd777ed75889fbea9756c3fb287766c4e511c6e37daa54deb29c17ccb72cc",
  "memberCount" : 0,
  "agentName" : null,
  "packingAddress" : "TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG",
  "version" : null,
  "blockHeight" : 2809,
  "rewardAddress" : "TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA",
  "deposit" : 200000,
  "time" : "2020-04-21 09:22:56.056",
  "creditVal" : 0.17,
  "txHash" : "dfcdd777ed75889fbea9756c3fb287766c4e511c6e37daa54deb29c17ccb72cc",
  "status" : "consensus"
}

```

### 查询共识节点列表

查询共识节点列表 -**命令：getagents &lt;pageNumber&gt;&lt;pageSize&gt;[keyWord]**

| 参数         | 说明               |
| ------------ | ------------------ |
| [pageNumber] | 列表页号位置       |
| [pageSize]   | 每页显示条数       |
| [keyWord]    | 匹配节点别名关键字 |

返回值

```
略 见示例
```

示例 获取第1页，共10条的节点列表

```
nerve>>> getagents 1 11
[ {
  "agentAddress" : "TNVTdN9iCjr3Xy5yDPbEku2svp3QKPPNt7a5u",
  "agentId" : "11CC1444",
  "delHeight" : -1,
  "agentHash" : "c13781beefafc569c6da23b43655ce42ac190cf88bd4459d05e0bda411cc1444",
  "memberCount" : 0,
  "agentName" : null,
  "packingAddress" : "TNVTdN9iHHSkKr36zJELnNYmzVzsbxWFCPU7J",
  "version" : null,
  "blockHeight" : 39,
  "rewardAddress" : "TNVTdN9iCjr3Xy5yDPbEku2svp3QKPPNt7a5u",
  "deposit" : 200000,
  "time" : "2020-04-21 07:45:51.051",
  "creditVal" : 1.0,
  "txHash" : "c13781beefafc569c6da23b43655ce42ac190cf88bd4459d05e0bda411cc1444",
  "status" : "consensus"
}, {
  "agentAddress" : "TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA",
  "agentId" : "7CCB72CC",
  "delHeight" : -1,
  "agentHash" : "dfcdd777ed75889fbea9756c3fb287766c4e511c6e37daa54deb29c17ccb72cc",
  "memberCount" : 0,
  "agentName" : null,
  "packingAddress" : "TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG",
  "version" : null,
  "blockHeight" : 2809,
  "rewardAddress" : "TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA",
  "deposit" : 200000,
  "time" : "2020-04-21 09:22:56.056",
  "creditVal" : 0.23,
  "txHash" : "dfcdd777ed75889fbea9756c3fb287766c4e511c6e37daa54deb29c17ccb72cc",
  "status" : "consensus"
} ]
```

### 活期staking

根据账户地址，加入staking，至少需要10000NVT

- **命令：deposit &lt;address&gt; &lt;deposit&gt;[symbol]**

| 参数            | 说明                                      |
| --------------- | ----------------------------------------- |
| &lt;address&gt; | 账户地址，必填                            |
| &lt;deposit&gt; | 加入staking保证金，不能低于10000NVT，必填 |
| [symbol]        | 抵押资产，默认为NVT                       |

返回信息 加入staking的交易hash，如果要退出这笔共识，则需要该hash。

```json
"cb74179c27c42a77f32df4773fe0821bc6d47b1435bfbf08331a744711ab3066"
```

示例

```
nerve>>> deposit TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA 10000
Please enter the password.
Enter your password:**********
cb74179c27c42a77f32df4773fe0821bc6d47b1435bfbf08331a744711ab3066
```

### 定期staking

根据账户地址，加入staking金额，staking时长，加入staking

- **命令：depositFixed&lt;address&gt; &lt;deposit&gt;&lt;deposit time&gt;[symbol]**

| 参数                 | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| &lt;address&gt;      | 账户地址，必填                                               |
| &lt;deposit&gt;      | 加入staking保证金，不能低于10000NVT，必填                    |
| &lt;deposit time&gt; | staking时长，取值有（THREE_MONTHS, HALF_YEAR, ONE_YEAR, TOW_YEARS, THREE_YEARS, FIVE_YEARS, TEN_YEARS） |
| [symbol]             | 资产，默认NVT                                                |

返回信息 退出共识交易hash

```json
"ac3b3b783df158f1643fcddd570d258c8a09970706907fb910c951c9ae7a9662"
```

示例

```
nerve>>> depositFixed TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA 10000 THREE_MONTHS
Please enter the password.
Enter your password:********
ac3b3b783df158f1643fcddd570d258c8a09970706907fb910c951c9ae7a9662
```

### 退出staking

根据账户地址和加入staking时的交易hash来退出staking

- **命令：withdraw &lt;address&gt; &lt;txHash&gt;**

| 参数            | 说明                   |
| --------------- | ---------------------- |
| &lt;address&gt; | 账户地址，必填         |
| &lt;txHash&gt;  | 委托时的交易hash，必填 |

返回信息 退出共识交易hash

```json
"d8e1784239d73e064e83e448adcf0feec9ba8e56a4b55280d7a0a8149d9da545"
```

示例

```
nerve>>> withdraw TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA f5b2622a2ca23710a0a1f28bd0cb9c054220ba0719275abca5e4a7750dcf933a 
Please enter the password.
Enter your password:**********
"d8e1784239d73e064e83e448adcf0feec9ba8e56a4b55280d7a0a8149d9da545"
```



### 停止节点

停止节点，节点注销，退还创建节点的保证金，锁定72小时

- **命令：stopagent &lt;address&gt;**

| 参数            | 说明           |
| --------------- | -------------- |
| &lt;address&gt; | 账户地址，必填 |

返回信息 停止节点交易hash

```json
"0020f15eecd7c85be76521ed6af4d58a3810f7df58e536481cff4a96af6d4fddec5f"
```

示例

```
nerve>>> stopagent TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA
Please enter the password.
Enter your password:**********
"0020f15eecd7c85be76521ed6af4d58a3810f7df58e536481cff4a96af6d4fddec5f"
```

### 获取最新的区块头信息

获取最新的区块头信息

- **命令：getlatestblockheader**

返回信息

```json
{
  "hash" : "4eff3eaf57d43b0eebf00911973648df68bf7929fc31580e9e22aa818eb3dc24",//区块hash
  "preHash" : "ba626c0d5b7c7d95903e968f15a6b6ccf1bdcd59fadc80f4cd0c3c033d1995ac",//上一个区块hash
  "merkleHash" : "1f41e5619615e0e3a8c4a5faf2f1a4eb191f873a747c1026f96018cbaf9dda0a",//merkle hash
  "time" : "2020-04-21 08:32:18.018",//打包时间
  "timestamp" : 1587457938,
  "height" : 1320,
  "txCount" : 1,
  "blockSignature" : "46304402205ac0b0cdac534a56d26b13a3a6218e461a1f8b3138dd25f1510a580070c2ddfa02206e68cd3a687496b34a7dfffc59e6b7a3ffb3cd76c9d0310c862a118026a52a5c",//区块签名
  "size" : 214,
  "packingAddress" : "TVNTdN9iFcMpYz5eVz41gdETPGNqqbFA8FfSf",//打包地址
  "roundIndex" : 300,
  "consensusMemberCount" : 5,
  "roundStartTime" : "2020-04-21 08:32:18.018",
  "roundStartTimestamp" : 1587457938,
  "packingIndexOfRound" : 1,
  "mainVersion" : 1,
  "blockVersion" : 1,
  "stateRoot" : null,
  "txHashList" : [ "1f41e5619615e0e3a8c4a5faf2f1a4eb191f873a747c1026f96018cbaf9dda0a" ]
}
```

示例

```
nerve>>> getlatestblockheader 
{
  "hash" : "4eff3eaf57d43b0eebf00911973648df68bf7929fc31580e9e22aa818eb3dc24",//区块hash
  "preHash" : "ba626c0d5b7c7d95903e968f15a6b6ccf1bdcd59fadc80f4cd0c3c033d1995ac",//上一个区块hash
  "merkleHash" : "1f41e5619615e0e3a8c4a5faf2f1a4eb191f873a747c1026f96018cbaf9dda0a",//merkle hash
  "time" : "2020-04-21 08:32:18.018",//打包时间
  "timestamp" : 1587457938,
  "height" : 1320,
  "txCount" : 1,
  "blockSignature" : "46304402205ac0b0cdac534a56d26b13a3a6218e461a1f8b3138dd25f1510a580070c2ddfa02206e68cd3a687496b34a7dfffc59e6b7a3ffb3cd76c9d0310c862a118026a52a5c",//区块签名
  "size" : 214,
  "packingAddress" : "TVNTdN9iFcMpYz5eVz41gdETPGNqqbFA8FfSf",//打包地址
  "roundIndex" : 300,
  "consensusMemberCount" : 5,
  "roundStartTime" : "2020-04-21 08:32:18.018",
  "roundStartTimestamp" : 1587457938,
  "packingIndexOfRound" : 1,
  "mainVersion" : 1,
  "blockVersion" : 1,
  "stateRoot" : null,
  "txHashList" : [ "1f41e5619615e0e3a8c4a5faf2f1a4eb191f873a747c1026f96018cbaf9dda0a" ]
}
```

### 查询区块头信息

根据区块高度或者区块hash，查询区块头信息，必须并且只能选择一种参数作为查询条件。

- **命令：getblockheader &lt;hash&gt; | &lt;height&gt;**

| 参数           | 说明         |
| -------------- | ------------ |
| &lt;hash&gt;   | 区块的hash值 |
| &lt;height&gt; | 区块的高度   |

返回信息

```json
见示例
```

示例 根据高度获取区块头

```
nerve>>> getblockheader 293
{
  "hash" : "ae6504e17393a6a100af9747fa67ebc1b3f732d7ee13b4418211647d0707f147",
  "preHash" : "6f3ace859ab693a1044909fb6ae6379c7a01d045339df5e776da34a5e0cdf4ad",
  "merkleHash" : "001eaa99a168bb995c8a42637a1818432bbe1515b1fc6b8805a23b49a8f6f332",
  "time" : "2020-04-21 07:54:26.026",
  "timestamp" : 1587455666,
  "height" : 293,
  "txCount" : 1,
  "blockSignature" : "46304402204d5b6ea0ceec034cd4aa1e4ecdae4f9258ab068a64659f2ba913ba4d69e951b6022067eba7bcee6cb567280e9a44023b7d3aa11e9a43573375f1a1317c732f192c42",
  "size" : 214,
  "packingAddress" : "TVNTdN9iFcMpYz5eVz41gdETPGNqqbFA8FfSf",
  "roundIndex" : 72,
  "consensusMemberCount" : 5,
  "roundStartTime" : "2020-04-21 07:54:18.018",
  "roundStartTimestamp" : 1587455658,
  "packingIndexOfRound" : 5,
  "mainVersion" : 1,
  "blockVersion" : 1,
  "stateRoot" : null,
  "txHashList" : [ "001eaa99a168bb995c8a42637a1818432bbe1515b1fc6b8805a23b49a8f6f332" ]
}
```



### 查询网络信息

查询网络基本信息

- **命令：network info**

返回信息

```json
{
  "localBestHeight" : 1423,//本地最新区块高度
  "netBestHeight" : 1423,//网络最新区块高度
  "timeOffset" : 16,//网络时间偏移值
  "inCount" : 0,//被动连接节点数量
  "outCount" : 5//主动连接节点数量
}
```

示例

```
nerve>>> network info
{
  "localBestHeight" : 1423,
  "netBestHeight" : 1423,
  "timeOffset" : 16,
  "inCount" : 0,
  "outCount" : 5
}
```

### 查询网络节点IP

查询网络节点IP

- **命令：network nodes**

返回信息

```json
见示例
```

示例 根据高度获取区块

```
nerve>>> network nodes
[ {
  "blockHash" : "a123610e655ce7bf7637f60904d5163a050119cb07e446cf0f9f3b2320aff676",
  "blockHeight" : 31198,
  "peer" : "39.98.226.51:17001"
}, {
  "blockHash" : "a123610e655ce7bf7637f60904d5163a050119cb07e446cf0f9f3b2320aff676",
  "blockHeight" : 31198,
  "peer" : "47.244.186.65:17001"
}, {
  "blockHash" : "a123610e655ce7bf7637f60904d5163a050119cb07e446cf0f9f3b2320aff676",
  "blockHeight" : 31198,
  "peer" : "149.129.176.20:17001"
}, {
  "blockHash" : "a123610e655ce7bf7637f60904d5163a050119cb07e446cf0f9f3b2320aff676",
  "blockHeight" : 31198,
  "peer" : "47.252.86.42:17001"
}, {
  "blockHash" : "a123610e655ce7bf7637f60904d5163a050119cb07e446cf0f9f3b2320aff676",
  "blockHeight" : 31198,
  "peer" : "47.74.86.85:17001"
}, {
  "blockHash" : "",
  "blockHeight" : 0,
  "peer" : "161.117.11.137:18002"
}, {
  "blockHash" : "",
  "blockHeight" : 0,
  "peer" : "seede.nuls.io:18002"
}, {
  "blockHash" : "",
  "blockHeight" : 0,
  "peer" : "seedc.nuls.io:18002"
}, {
  "blockHash" : "",
  "blockHeight" : 0,
  "peer" : "149.129.251.238:18002"
}, {
  "blockHash" : "",
  "blockHeight" : 0,
  "peer" : "47.74.86.85:18002"
}, {
  "blockHash" : "",
  "blockHeight" : 0,
  "peer" : "seedg.nuls.io:18002"
}, {
  "blockHash" : "",
  "blockHeight" : 0,
  "peer" : "47.252.86.42:18002"
} ]
```

### 创建跨链交易

- 命令：createcrosstx &lt;formAddress&gt; &lt;toAddress&gt; &lt;assetChainId&gt; &lt;assetId&gt; &lt;amount&gt; [remark]**

| 参数                 | 说明              |
| -------------------- | ----------------- |
| &lt;formAddress&gt;  | 转出地址          |
| &lt;toAddress&gt;    | 转入地址          |
| &lt;assetChainId&gt; | 转账资产的chainId |
| &lt;assetId&gt;      | 转账资产id        |
| &lt;amount&gt;       | 转账资产数量      |
| &lt;remark&gt;       | 转账备注          |

返回值:交易hash

```
"6fe7897431b65fc8e9f74da2dffbf120eac1497fcafd712147693aa3aef71a38"
```

示例

```
nerve>>> createcrosstx TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG tNULSeBaMqpRQkHCs5ur3ck4LXEZB4qmmkPNo3 4 1 20
Please enter the password.
Enter your password:**********
6fe7897431b65fc8e9f74da2dffbf120eac1497fcafd712147693aa3aef71a38
```

### 查询跨链交易确认状态

- **命令：getcrosstxstate &lt;txHash&gt;**

| 参数           | 说明     |
| -------------- | -------- |
| &lt;txHash&gt; | 交易hash |

返回值

```
0(0:Unconfirmed  1:MainNetConfirmed  2:Confirmed)
```

示例

```
nerve>>> getcrosstxstate 6fe7897431b65fc8e9f74da2dffbf120eac1497fcafd712147693aa3aef71a38
2(0:Unconfirmed  1:MainNetConfirmed  2:Confirmed)
```

### 退出钱包命令程序

退出操作钱包的命令行程序，不会退出已启动的钱包节点。

- **命令：exit**

示例

```
nerve>>> exit
```