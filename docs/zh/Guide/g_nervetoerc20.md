# NERVE资产跨链到ETH网络（ERC20资产）

## 一 在ETH网络创建定制的ERC20合约

- **注意1**：必须使用NERVE团队提供的[ERC20合约源代码](https://github.com/NerveNetwork/contracts/blob/master/ERC20Minter.sol) `ERC20Minter.sol`
- **注意2**：创建ERC20合约时，`decimals`必须与NERVE网络的资产的`decimals`一致

1、打开[以太坊智能合约在线开发工具](http://remix.ethereum.org/#optimize=true&evmVersion=null&version=soljson-v0.6.12+commit.27d51765.js)，选择SOLIDITY

![1](./g_nervetoerc20/1.png)

2、创建文件

![2](./g_nervetoerc20/2.png)

1. 点击“New File”
2. 创建一个新的sol文件

3、将NERVE团队提供的ERC20合约源代码复制进新建的文件中并保存（ctrl+s)

4、编译

![3](./g_nervetoerc20/3.png)

1. 点击选择红框的图标
2. <b style="color:red">选择“0.6.12+commit.27d51765”，版本一定不能选错</b>
3. <b style="color:red">勾选红框内的两个多选框，一定要勾上</b>
4. 点击按钮

编译成功之后，需要导入ETH账户（有eth做手续费）（matemask导入过程略）

5、创建ERC20合约

![4](./g_nervetoerc20/4.png)

1. 点击图标

2. 选择之前创建的Pklong.sol文件，一定要是ERC20Minter

3. 输入参数（NAME、SYMBOL、DECIMALS、MINTER）：其中NAME和SYMBOL原则上需要跟已创建的NRC20（NERVE资产）保持一致，DECIMALS必须跟已创建的NRC20（NERVE资产）保持一致；

   MINTER参数
   
   测试网: 0x7D759A3330ceC9B766Aa4c889715535eeD3c0484

   正式网: 0x6758d4C4734Ac7811358395A8E0c3832BA6Ac624

4. 点击按钮，发起创建合约交易（通过matemask确认），交易发起确认之后，通过查询交易**获取ERC20合约地址**

## 二 向NERVE团队提供NERVE网络的资产信息和创建好的ERC20合约地址

- 刚创建的NERVE团队定制的ERC20合约地址
- NERVE网络资产链ID和资产ID（assetChainId, assetId）

- [NERVE资产查看地址](https://scan.nerve.network/assets)

发送邮件（support@nerve.network）或添加微信（nervenetwork）

## 三 等待NERVE团队注册资产信息

- 在ETH多签合约中注册上述ERC20合约
- 在NERVE网络注册绑定ERC20合约至提供的NERVE资产

## 四 参考文档

1、将NRC20合约token跨链到NERVE网络[[1]](http://docs.nerve.network/zh/Guide/c_nrc20.html#%E5%88%9B%E5%BB%BA%E8%B7%A8%E9%93%BEtoken)

2、在NerveDEX创建交易对[[2]](http://docs.nerve.network/zh/Guide/c_nrc20.html#%E5%9C%A8nervedex%E4%B8%8A%E5%88%9B%E5%BB%BAnrc20-token%E4%BA%A4%E6%98%93%E5%AF%B9)

