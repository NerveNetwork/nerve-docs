# Command line manual

## Introduce

​	This document is a guide for the use of the Linux version of the node wallet of the Nerve beta version. Before reading this document, users need to understand the basic operation and usage of the Linux system.The document describes how to use the Nerve wallet to create an account, import an account, transfer , create agent, participate in Staking and other operations in the Linux system.We recommend that users use Linux system servers to establish stable Nerve nodes.

## Version

| version | date       | detail | author |
| ------- | ---------- | ------ | ------ |
| V1.0.0  | 2020-04-21 | beta   | Albert |

## Prepare

### **Server hardware configuration**

**The server for nerve node is not less than the following configuration：**

| CPU              | RAM  | Hard drive capacity | Bandwidth |
| ---------------- | ---- | ------------------- | --------- |
| Quad-core 3.0GHz | 16G  | 128G                | 20M       |

**Recommended configuration：**

| CPU              | RAM  | Hard drive capacity | Bandwidth |
| ---------------- | ---- | ------------------- | --------- |
| Octa-core 3.0GHz | 32G  | 256G                | 100M      |

### **System and kernel version**

**Linux system**

- CentOS 6,7
- Ubuntu 14 +

Linux kernel version 2.6.32 and above is recommended

## Install

[Quickly install node wallet](/guide/g_docker_install.md)


### RUN

- Enter the directory after decompression, run the startup script, and start the node wallet

  ```
  $ cd NERVE_Wallet_linux1.0.0
  $ ./start
  ```

## Use wallet

### Quickstart

- After confirming that the wallet has been started, start the command line program of the wallet to operate the wallet.  

Enter the wallet root directory and execute the following command:

  ```
  $ ./cmd
  ```

 The "nerve >>&gt;" prompt will appear, and then you can directly enter the nerve wallet operation command to operate.  
 For example, an example of creating an account is as follows:

  ```
  nerve>>> create
  Please enter the new password(8-20 characters, the combination of letters and numbers).
  Enter your new password:********
  Please confirm new password:********
  [ "TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG" ]
  ```

  Execute the 'create' command to create a single account, then enter the password, and confirm the password again. After the creation is successful, the account address will be returned.
###  Agreement
- Set password rule: the password length is between 8 and 20 digits, and it must contain both letters and numbers.

- Command parameter description: &lt;address&gt; indicates required parameter; [parameter] indicates optional parameter. "|" means or in the parameter, and only one of the front and back parameters can be selected.
##  Wallet command
###  Help Aommand
Print all commands,

- **Command： help [-a]|[group]|[command]**

| Parameter    | Explain                          |
| ------- | -------------------------------- |
| -a      | Format print command, optional             |
| command | View the instructions for using the specified command          |
| group   | View all command instructions for the specified command group |

Example

```
nerve>>> help
nerve>>> help -a
nerve>>> help account
nerve>>> help create
```

### Create Address

Create an address and Return to the address collection

- **Command： create [number]**

| Parameter | Explain                             |
| --------- | ----------------------------------- |
| [number]  | Number of address created, optional |

When creating an address, you will be prompted to enter a password. In order to ensure asset security, you must set a password for the address;

 Return to the address collection：

```json
[ "TNVTdN9iDZnRXWovPkiYQRRLj3v4d93pxLhcA", "TNVTdN9iGbkjcWsUCEXSTT4yEPNDBSKsfXDxZ" ]
```

Example

Create a account

```
nerve>>> create
Please enter the new password(8-20 characters, the combination of letters and numbers).
Enter your new password:********
Please confirm new password:********
[ "TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG" ]
```

Create multiple accounts

```
nerve>>> create 2
Please enter the new password(8-20 characters, the combination of letters and numbers).
Enter your new password:********
Please confirm new password:********
[ "TNVTdN9iDZnRXWovPkiYQRRLj3v4d93pxLhcA", "TNVTdN9iGbkjcWsUCEXSTT4yEPNDBSKsfXDxZ" ]
```

### Backup

Backup address keystore,a file with the name of the address and the extension .keystore is generated as a backup file for the address

- **Command：backup &lt;address&gt;[path]**

| Parameter | Explain                                                      |
| --------- | ------------------------------------------------------------ |
| [address] | address,Required                                             |
| [path]    | The target folder for file backup files, the default is the current folder,Optional |

Return

```
The path to the backup file is /nerve/data/keystore/backup/TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG.keystore
```

Example backup address

```
nerve>>> backup TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG /home/nerve/NERVE-Wallet-linux64-beta
Please enter the password.
Enter your password:********
The path to the backup file is /home/nerve/NERVE-Wallet-linux64-beta/TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG.keystore
```

### Remove Address

Remove local address,you need to enter the password

- **Command：remove &lt;address&gt;**

| Parameter       | Explain          |
| --------------- | ---------------- |
| &lt;address&gt; | address,Required |

Return

```json
Success
```

Example

```
nerve>>> remove TNVTdN9iGbkjcWsUCEXSTT4yEPNDBSKsfXDxZ
Please enter the password.
Enter your password:********
Success
```

### Change Password

Set a new password for address

- **Command：resetpwd &lt;address&gt;**

| Parameter       | Explain          |
| --------------- | ---------------- |
| &lt;address&gt; | address,Required |

Return

```json
Success
```

Example

```
nerve>>> resetpwd  TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG
Enter your old password:********
Enter new password:**********
Please confirm new password:**********
Success
```

### Set Alias

Set an alias for the address, if you use this address to create a node, the alias will be displayed as the source of the node

- **Command：setalias &lt;address&gt; &lt;alias&gt;**

| Parameter       | Explain          |
| --------------- | ---------------- |
| &lt;address&gt; | address,Required |
| &lt;alias&gt;   | alias,Required   |

Return tx hash

```json
"txHash:efa00a925a8e5aebc9b12f8e5c6c016290d0245624308328c500a05f742384c8"
```

Example

```
nerve>>> setalias TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG alce
Please enter the password.
Enter your password:**********
txHash:efa00a925a8e5aebc9b12f8e5c6c016290d0245624308328c500a05f742384c8
```

### Import Keystore

Import the address keystore file to generate a local address.

- **Command：importkeystore &lt;path&gt;**

| Parameter    | Explain                                                  |
| ------------ | -------------------------------------------------------- |
| &lt;path&gt; | The address of the keystore file to be imported,Required |

Note:When importing a keystore file to generate an address, the original password is required

Return address

```json
"TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG"
```

Example

```
nerve>>> importkeystore /home/nerve/TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG.keystore
Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, Return directly.
Enter your password:********
TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG
```

### Import Privatekey

Import the address private key to generate a local address. If the address already exists locally, it will be overwritten. The password needs to be set for the address during import. This function can be used to retrieve the address through the private key after forgetting the address password.

- **Command：import &lt;privatekey&gt;**

| Parameter          | Explain                      |
| ------------------ | ---------------------------- |
| &lt;privatekey&gt; | address private key,Required |

```json
"TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG"
```

Example

```
nerve>>> import f3bf2993dcbf7a531504333f2b55a73a10eea2fb2739b96e1b3c7ac64455f770
Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, Return directly.
Enter your password:********
Please confirm new password:********
TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG
```

### Query Address Information

Query address information by address

- **Command：getaccount &lt;address&gt;**

| Parameter       | Explain          |
| --------------- | ---------------- |
| &lt;address&gt; | address,Required |

Return

```json
{
  "encryptedPrikeyHex" : "04d5c7a7068d1ad5d0e1974fe3bea7076e4f6eec434e4a2781ae1b7d9f4e2403b6cb2ba59cd600029aefa05ae464ff
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

Example

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

### Query Address List

Query address list according to paging Parameter, all addresses are output in reverse order of creation time

- **Command：getaccounts &lt;pageNumber&gt; &lt;pageSize&gt;**

| Parameter          | Explain                                                      |
| ------------------ | ------------------------------------------------------------ |
| &lt;pageNumber&gt; | Number of pages, need to get the data of the first few pages,Required |
| &lt;pageSize&gt;   | Number of data displayed on each page,Required               |

Return information, output address collection

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

Example 

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

### Query Address Privatekey

Query address private key based on address and password

- **Command：getprikey &lt;address&gt;**

| Parameter       | Explain          |
| --------------- | ---------------- |
| &lt;address&gt; | address,Required |

Return information Imported account private key (unencrypted)

```json
f3bf2993dcbf7a531504333f2b55a73a10eea2fb2739b96e1b3c7ac64455f770
```

Example

```
nerve>>> getprikey TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG
Enter your account password**********
f3bf2993dcbf7a531504333f2b55a73a10eea2fb2739b96e1b3c7ac64455f770
```

### Query Address Balance

Query address balance by address,chainId,assetId

- **Command：getbalance &lt;address&gt;**

| Parameter       | Explain                                                      |
| --------------- | ------------------------------------------------------------ |
| &lt;address&gt; | address,Required                                             |
| [chainId]       | the chainId of the asset,Optional（default:local chain ID）  |
| [assetId]       | the assetID of the asset ,mandatory-if-applicable（If chainId is filled, assetId Required） |

Return

```json
{
  "available" : 200,
  "total" : 200,
  "freeze" : 0
}
```

Example

```
nerve>>> getbalance TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG 2 1
{
  "available" : 200,
  "total" : 200,
  "freeze" : 0
}
```

### Transfer

Transfer NVT to another address or alias based on address or alias

- **Command：transfer &lt;formAddress&gt;|&lt;formAlias&gt; &lt;toAddress&gt;|&lt;toAlias&gt; &lt;amount&gt; [remark] **

| Parameter           | Explain                                                 |
| ------------------- | ------------------------------------------------------- |
| &lt;formAddress&gt; | Transfer-out address (choose one with formAlias)        |
| &lt;formAlias&gt;   | Transfer-out address alias (choose one with formAddress |
| &lt;toAddress&gt;   | Receive address (choose one with toAlias)               |
| &lt;toAlias&gt;     | Receive address alias (optional with toAddress)         |
| &lt;amount&gt;      | amount,Required                                         |
| [remark]            | remark,Optional                                         |

Return tx hash

```json
"7a6c7758380781f4616ffb7e8b4571c4e383bc87fe59c4071239d2f8ccc65b3a"
```

Example

```
nerve>>> transfer TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG 200
Enter your account password**********
7a6c7758380781f4616ffb7e8b4571c4e383bc87fe59c4071239d2f8ccc65b3a
```

### Query Transaction Details

Query transaction details according to transaction hash

- **Command：gettx &lt;hash&gt;**

| Parameter    | Explain          |
| ------------ | ---------------- |
| &lt;hash&gt; | tx hash,Required |

Return tx detail

```json
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

Example

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

### Create Agent

Create a agent based on the address, you need to provide two addresses when creating the agent, the first address is the agent address, you need to enter the agent address password. At the same time, a minimum deposit of 20,000 NVT is required.

- **Command：createagent &lt;agentAddress&gt; &lt;packingAddress&gt; &lt;deposit&gt;** [RewardAddress]

| Parameter              | Explain                                                      |
| ---------------------- | ------------------------------------------------------------ |
| &lt;agentAddress&gt;   | Create the address of the agent,Required                     |
| &lt;packingAddress&gt; | Agent packing address,Required（Note：Default password：nuls123456,it can be set through the nuls.ncf, otherwise the agent cannot pack the block） |
| &lt;deposit&gt;        | Margin for creating agent,not less than 20000NVT,Required    |
| [RewardAddress]        | Reward address,default agentAddress（Optional）              |

Return agent hash

```json
"dfcdd777ed75889fbea9756c3fb287766c4e511c6e37daa54deb29c17ccb72cc"
```

Example

```
nerve>>> createagent TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG 200000
Enter agent address password**********
"dfcdd777ed75889fbea9756c3fb287766c4e511c6e37daa54deb29c17ccb72cc"
```

### Increase Agent Margin

Increase the node margin after creating a agent.

- **Command：appendAgentDeposit &lt;address&gt; &lt;agentHash&gt; &lt;deposit**&gt;

| Parameter         | Explain                                                |
| ----------------- | ------------------------------------------------------ |
| &lt;address&gt;   | Create the address of the agent                        |
| &lt;agentHash&gt; | the agemt hash                                         |
| &lt;deposit&gt;   | Increase the amount of margin（Not less than 2000NVT） |

Return hash

```
"e715545c1b91c67924b607d0b401519839b1ca268f4391b318603a44269e7399"
```

Example

```
nerve>>> appendAgentDeposit TNVTdN9i8H46GtktXW9RwQaboGcAAVNHLbjfp 3b2076bc68aa53eef18289cb6eb618449e039171b8759d71d824847aee872c14 20000
Please enter the password.
Enter your password:********
"e715545c1b91c67924b607d0b401519839b1ca268f4391b318603a44269e7399"
```



### Reduce Agent Margin

After the agent is created at the address, when the agentdeposit needs to be reduced, this method is used to lock the reduced deposit for 72 hours

- **Command：reduceAgentDeposit &lt;address&gt; &lt;agentHash&gt; &lt;deposit**&gt;

| Parameter         | Explain                  |
| ----------------- | ------------------------ |
| &lt;address&gt;   | the address create agent |
| &lt;agentHash&gt; | the hash create agent    |
| &lt;deposit&gt;   | amount of reduce         |

Return tx hash

```
"32d7c00438e5dcdbef144b04fb4c7431cd8375723f38c3df01e6c17938b510c5"
```

Example

```
nerve>>> reduceAgentDeposit TNVTdN9i4ueJm2o9Cudrko7V9ssrtftwAoDKC 734584d739c431cf8ce8e73c44dcac4cdde306323c5ab237f429e945cbe7b6ed 20000
Please enter the password.
Enter your password:********
"32d7c00438e5dcdbef144b04fb4c7431cd8375723f38c3df01e6c17938b510c5"
```







### Query Agent Infomation

Query specified agent information according to agentHash

- **Command：getagent &lt;agentHash&gt;**

| Parameter         | Explain        |
| ----------------- | -------------- |
| &lt;agentHash&gt; | the agent hash |

Return

```
Pls check the example below
```

Example

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

### Query Agent List

Query the list of consensus agents

- **Command：getagents &lt;pageNumber&gt;&lt;pageSize&gt;[keyWord]**

| Parameter    | Explain                    |
| ------------ | -------------------------- |
| [pageNumber] | List page number position  |
| [pageSize]   | Number of entries per page |
| [keyWord]    | Match node alias keywords  |

Return 

```

```

Example (Get a list of 10 agents on page 1)

```
nerve>>> getagents 1 10
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

### Current Staking

According to the address to join the staking, at least 2000NVT is required

- **Command：deposit &lt;address&gt; &lt;deposit&gt;[symbol]**

| Parameter       | Explain                                                  |
| --------------- | -------------------------------------------------------- |
| &lt;address&gt; | address ,Required                                        |
| &lt;deposit&gt; | Join the staking deposit, not less than 2000NVT,Required |
| [symbol]        | Mortgage asset, default NVT                              |

Return tx hash.

```json
"cb74179c27c42a77f32df4773fe0821bc6d47b1435bfbf08331a744711ab3066"
```

Example

```
nerve>>> deposit TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA 2000
Please enter the password.
Enter your password:**********
cb74179c27c42a77f32df4773fe0821bc6d47b1435bfbf08331a744711ab3066
```

### Regular Staking

According to the address to join the staking, at least 2000NVT is required

- **Command：depositFixed&lt;address&gt; &lt;deposit&gt;&lt;deposit time&gt;[symbol]**

| Parameter            | Explain                                                      |
| -------------------- | ------------------------------------------------------------ |
| &lt;address&gt;      | address,Required                                             |
| &lt;deposit&gt;      | Join the staking deposit, not less than 2000NVT,Required     |
| &lt;deposit time&gt; | staking time,value（THREE_MONTHS, HALF_YEAR, ONE_YEAR, TOW_YEARS, THREE_YEARS, FIVE_YEARS, TEN_YEARS） |
| [symbol]             | Assets, default NVT                                          |

Return tx hash

```json
"ac3b3b783df158f1643fcddd570d258c8a09970706907fb910c951c9ae7a9662"
```

Example

```
nerve>>> depositFixed TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA 2000 THREE_MONTHS
Please enter the password.
Enter your password:********
ac3b3b783df158f1643fcddd570d258c8a09970706907fb910c951c9ae7a9662
```

### Quit Staking

Exit staking based on address and tx hash when joining staking

- **Command：withdraw &lt;address&gt; &lt;txHash&gt;**

| Parameter       | Explain                                   |
| --------------- | ----------------------------------------- |
| &lt;address&gt; | address,Required                          |
| &lt;txHash&gt;  | the tx hash when joining staking,Required |

Return tx hash

```json
"d8e1784239d73e064e83e448adcf0feec9ba8e56a4b55280d7a0a8149d9da545"
```

Example

```
nerve>>> withdraw TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA f5b2622a2ca23710a0a1f28bd0cb9c054220ba0719275abca5e4a7750dcf933a 
Please enter the password.
Enter your password:**********
"d8e1784239d73e064e83e448adcf0feec9ba8e56a4b55280d7a0a8149d9da545"
```



### Stop Agent

Stop the agent, cancel the agent, refund the deposit of the created agent, lock for 72 hours

- **Command：stopagent &lt;address&gt;**

| Parameter       | Explain          |
| --------------- | ---------------- |
| &lt;address&gt; | address,Required |

Rerun tx hash

```json
"0020f15eecd7c85be76521ed6af4d58a3810f7df58e536481cff4a96af6d4fddec5f"
```

Example

```
nerve>>> stopagent TNVTdN9iJVX42PxxzvhnkC7vFmTuoPnRAgtyA
Please enter the password.
Enter your password:**********
"0020f15eecd7c85be76521ed6af4d58a3810f7df58e536481cff4a96af6d4fddec5f"
```

### Get the latest block header information

Get the latest block header information

- **Command：getlatestblockheader**

Return

```json
{
  "hash" : "4eff3eaf57d43b0eebf00911973648df68bf7929fc31580e9e22aa818eb3dc24",hash
  "preHash" : "ba626c0d5b7c7d95903e968f15a6b6ccf1bdcd59fadc80f4cd0c3c033d1995ac",
  "merkleHash" : "1f41e5619615e0e3a8c4a5faf2f1a4eb191f873a747c1026f96018cbaf9dda0a",//merkle hash
  "time" : "2020-04-21 08:32:18.018",
  "timestamp" : 1587457938,
  "height" : 1320,
  "txCount" : 1,
  "blockSignature" : "46304402205ac0b0cdac534a56d26b13a3a6218e461a1f8b3138dd25f1510a580070c2ddfa02206e68cd3a687496b34a7dfffc59e6b7a3ffb3cd76c9d0310c862a118026a52a5c",
  "size" : 214,
  "packingAddress" : "TVNTdN9iFcMpYz5eVz41gdETPGNqqbFA8FfSf",
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

Example

```
nerve>>> getlatestblockheader 
{
  "hash" : "4eff3eaf57d43b0eebf00911973648df68bf7929fc31580e9e22aa818eb3dc24",hash
  "preHash" : "ba626c0d5b7c7d95903e968f15a6b6ccf1bdcd59fadc80f4cd0c3c033d1995ac",
  "merkleHash" : "1f41e5619615e0e3a8c4a5faf2f1a4eb191f873a747c1026f96018cbaf9dda0a",//merkle hash
  "time" : "2020-04-21 08:32:18.018",
  "timestamp" : 1587457938,
  "height" : 1320,
  "txCount" : 1,
  "blockSignature" : "46304402205ac0b0cdac534a56d26b13a3a6218e461a1f8b3138dd25f1510a580070c2ddfa02206e68cd3a687496b34a7dfffc59e6b7a3ffb3cd76c9d0310c862a118026a52a5c",
  "size" : 214,
  "packingAddress" : "TVNTdN9iFcMpYz5eVz41gdETPGNqqbFA8FfSf",
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

### Query block header information

According to the block height or block hash, to query block header information, you must and can only choose one parameter as the query condition.

- **Command：getblockheader &lt;hash&gt; | &lt;height&gt;**

| Parameter      | Explain      |
| -------------- | ------------ |
| &lt;hash&gt;   | block hash   |
| &lt;height&gt; | block height |

Return

```json
Pls check the example below
```

Example

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



### Query network information

Query network information

- **Command：network info**

Return

```json
{
  "localBestHeight" : 1423,
  "netBestHeight" : 1423,
  "timeOffset" : 16,
  "inCount" : 0,
  "outCount" : 5
}
```

Example

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

### Query network node IP

Query network node IP

- **Command：network nodes**

Return

```json
Pls check the example below
```

Example

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

### Create cross-chain transactions

- 命令：createcrosstx &lt;formAddress&gt; &lt;toAddress&gt; &lt;assetChainId&gt; &lt;assetId&gt; &lt;amount&gt; [remark]**

| Parameter            | Explain              |
| -------------------- | -------------------- |
| &lt;formAddress&gt;  | Transfer-out address |
| &lt;toAddress&gt;    | Transfer-in address  |
| &lt;assetChainId&gt; | the asset chainId    |
| &lt;assetId&gt;      | the asset id         |
| &lt;amount&gt;       | the amount of asset  |
| &lt;remark&gt;       | remark               |

Return

```
"6fe7897431b65fc8e9f74da2dffbf120eac1497fcafd712147693aa3aef71a38"
```

Example

```
nerve>>> createcrosstx TNVTdN9i6eWsUxTTtC36JRqTAQit92vydnASG tNULSeBaMqpRQkHCs5ur3ck4LXEZB4qmmkPNo3 4 1 20
Please enter the password.
Enter your password:**********
6fe7897431b65fc8e9f74da2dffbf120eac1497fcafd712147693aa3aef71a38
```

### Query the status of cross-chain transactions

- **Command：getcrosstxstate &lt;txHash&gt;**

| Parameter      | Explain          |
| -------------- | ---------------- |
| &lt;txHash&gt; | transaction hash |

Return

```
0(0:Unconfirmed  1:MainNetConfirmed  2:Confirmed)
```

Example

```
nerve>>> getcrosstxstate 6fe7897431b65fc8e9f74da2dffbf120eac1497fcafd712147693aa3aef71a38
2(0:Unconfirmed  1:MainNetConfirmed  2:Confirmed)
```

### Quit wallet 

Exit the command line program that operates the wallet, and will not exit the wallet node that has been started.

- **Command：exit**

Example

```
nerve>>> exit
```









