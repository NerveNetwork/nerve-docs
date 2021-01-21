## 异构链离线跨链交易组装说明

### 主网信息介绍

- NERVE网络内注册的异构网络ID (用于跨链转出时指定转出的各个链网络)
    - Ethereum: 101
    - Binance: 102
    - Heco: 103
- 异构链网络多签合约 (用于跨链转入时指定各个链网络的资产锁定合约)
    - Ethereum: 0x6758d4C4734Ac7811358395A8E0c3832BA6Ac624
    - Binance: 0x3758AA66caD9F2606F1F501c9CB31b94b713A6d5
    - Heco: 0x23023c99dcede393d6d18ca7fb08541b3364fa90

### 测试网信息介绍

- NERVE网络内注册的异构网络ID (同上)
    - Ethereum: 101
    - Binance: 102
    - Heco: 103
- 异构链网络多签合约 (同上)
    - Ethereum: 0x7D759A3330ceC9B766Aa4c889715535eeD3c0484
    - Binance: 0xf7915d4de86b856F3e51b894134816680bf09EEE
    - Heco: 0xb339211438Dcbf3D00d7999ad009637472FC72b3

### JAVA支持

#### `JAVA-SDK`源代码仓库

- [https://github.com/NerveNetwork/nerve-sdk4j](https://github.com/NerveNetwork/nerve-sdk4j)
- [https://github.com/NerveNetwork/heterogeneous-tool](https://github.com/NerveNetwork/heterogeneous-tool)

#### 1. 运行环境

- jdk1.8
- jar包依赖
    
    安卓端引入
    
    ```xml
    <dependency>
      <groupId>network.nerve</groupId>
      <artifactId>heterogeneous-tool</artifactId>
      <version>1.0.8-android-BETA</version>
    </dependency>
    
    <dependency>
      <groupId>network.nerve</groupId>
      <artifactId>nerve-sdk4j</artifactId>
      <version>1.0.7-BETA</version>
    </dependency>
    ```
    
    电脑端引入
    
    ```xml
    <dependency>
      <groupId>network.nerve</groupId>
      <artifactId>heterogeneous-tool</artifactId>
      <version>1.0.8-BETA</version>
    </dependency>
    
    <dependency>
      <groupId>network.nerve</groupId>
      <artifactId>nerve-sdk4j</artifactId>
      <version>1.0.7-BETA</version>
    </dependency>
    ```
#### 2. 工具包初始化

    ```java
    // 测试网配置
    NerveSDKBootStrap.initTest("http://beta.api.nerve.network/")
    ETHTool.init("https://ropsten.infura.io/v3/e51e9f10a4f647af81d5f083873f27a5");
    BSCTool.init("https://data-seed-prebsc-1-s1.binance.org:8545/");
    HTTool.init("https://http-testnet.hecochain.com");
    
    // 主网配置
    ETHTool.init("http://geth.nerve.network");
    BSCTool.init("https://bsc-dataseed.binance.org/");
    HTTool.init("https://http-mainnet.hecochain.com");
    
    ```

#### 3. 跨链转入-从Heco,Ethereum,Binance跨链转入Nerve网络

- Heco网络跨链转入，参考代码示例，`multySignContractAddress`变量设置为此网络的多签合约地址
- Ethereum网络跨链转入，请将代码示例中的`HTTool`改为`ETHTool`，`multySignContractAddress`变量设置为此网络的多签合约地址
- Binance网络跨链转入，请将代码示例中的`HTTool`改为`BSCTool`，`multySignContractAddress`变量设置为此网络的多签合约地址
- 以Heco网络测试网为例，展示跨链转入的离线组装代码，以下为代码示例
    - 异构链网络主资产的转入
        
        ```java
        // 异构链网络主资产的转入
        String fromAddress = "0xfa27c84eC062b2fF89EB297C24aaEd366079c684";
        String privateKey = "B36097415F57FE0AC1665858E3D007BA066A7C022EC712928D2372B27E8513FF";
        String tokenAmount = "2.125";
        int tokenDecimals = 18;
        BigInteger value = new BigDecimal(tokenAmount).multiply(BigDecimal.TEN.pow(tokenDecimals)).toBigInteger();
        String toAddress = "TNVTdTSPEn3kK94RqiMffiKkXTQ2anRwhN1J9";
        String multySignContractAddress = "0xb339211438Dcbf3D00d7999ad009637472FC72b3";
        String hash = HTTool.rechargeHt(fromAddress, privateKey, value, toAddress, multySignContractAddress);
        System.out.println(hash);
        ``` 
    - ERC20标准的TOKEN资产的转入
        
        ```java
        // ERC20标准的TOKEN资产的转入
        String fromAddress = "0xfa27c84eC062b2fF89EB297C24aaEd366079c684";
        String privateKey = "B36097415F57FE0AC1665858E3D007BA066A7C022EC712928D2372B27E8513FF";
        String tokenAmount = "12";
        int tokenDecimals = 8;
        BigInteger value = new BigDecimal(tokenAmount).multiply(BigDecimal.TEN.pow(tokenDecimals)).toBigInteger();
        String toAddress = "TNVTdTSPEn3kK94RqiMffiKkXTQ2anRwhN1J9";
        String multySignContractAddress = "0xb339211438Dcbf3D00d7999ad009637472FC72b3";
        String erc20ContractAddress = "0x3f1f3d17619e916c4f04707ba57d8e0b9e994fb0";
        boolean authorized = HTTool.isAuthorized(fromAddress, multySignContractAddress, bep20ContractAddress);
        if (!authorized) {
            String authHash = HTTool.authorization(fromAddress, privateKey, multySignContractAddress, bep20ContractAddress);
            while (HTTool.getTxReceipt(authHash) == null) {
                System.out.println("等待8秒查询[ERC20授权]交易打包结果");
                TimeUnit.SECONDS.sleep(8);
            }
        }
        String hash = HTTool.rechargeERC20(fromAddress, privateKey, value, toAddress, multySignContractAddress, erc20ContractAddress);
        System.out.println(hash);
        ```


#### 4. 跨链转出-从Nerve网络跨链转出Heco,Ethereum,Binance

<b style="color:red">注意: </b>当设置的跨链转出手续费不足时，Nerve网络不会向Heco,Ethereum,Binance发出交易，此转出会被暂停，直至手续费足够，追加手续费的交易见第5点

- Heco, 设置异构链网络ID \- 103
- Ethereum, 设置异构链网络ID \- 101
- Binance, 设置异构链网络ID \- 102
- 以Heco测试网为例，展示跨链转出的离线组装代码

    ```java
    String fromAddress = "TNVTdTSPMcyC8e7jz8f6ngX5yTmK6S8CXEGva";
    String prikey = "17c50c6f7f18e7afd37d39f92c1d48054b6b3aa2373a70ecf2d6663eace2a7d6";
    // 声明提现资产ID
    int withdrawalAssetChainId = 5;
    int withdrawalAssetId = 9;
    // 声明异构链网络ID
    int heterogeneousChainId = 103;
    // 声明异构链网络提现接收地址
    String toAddress = "0xc11D9943805e56b630A401D4bd9A29550353EFa1";

    /**************************************** 以下需要在线请求的接口 ****************************************/
    // 获取账户提现资产、NVT资产的nonce值
    String withdrawalAssetNonce;
    String nvtFeeAssetNonce;
    Result withdrawalAssetBalance = NerveSDKTool.getAccountBalance(fromAddress, withdrawalAssetChainId, withdrawalAssetId);
    if (!withdrawalAssetBalance.isSuccess()) {
        throw new NulsException(AccountErrorCode.RPC_REQUEST_FAILD, withdrawalAssetBalance.toString());
    }
    Map withdrawalAssetBalanceData = (Map) withdrawalAssetBalance.getData();
    withdrawalAssetNonce = withdrawalAssetBalanceData.get("nonce").toString();

    Result nvtFeeAssetBalance = NerveSDKTool.getAccountBalance(fromAddress, SDKContext.main_chain_id, SDKContext.main_asset_id);
    if (!nvtFeeAssetBalance.isSuccess()) {
        throw new NulsException(AccountErrorCode.RPC_REQUEST_FAILD, nvtFeeAssetBalance.toString());
    }
    Map nvtFeeAssetBalanceData = (Map) nvtFeeAssetBalance.getData();
    nvtFeeAssetNonce = nvtFeeAssetBalanceData.get("nonce").toString();

    /**************************************** 以下是完全离线方式组装提现交易 ****************************************/
    WithdrawalTxDto withdrawalTxDto = new WithdrawalTxDto();
    // 设置转出账户
    withdrawalTxDto.setFromAddress(fromAddress);
    // 设置提现资产ID
    withdrawalTxDto.setAssetChainId(withdrawalAssetChainId);
    withdrawalTxDto.setAssetId(withdrawalAssetId);
    // 设置异构链网络ID
    withdrawalTxDto.setHeterogeneousChainId(heterogeneousChainId);
    // 设置异构链提现接收地址
    withdrawalTxDto.setHeterogeneousAddress(toAddress);
    // 设置提现金额
    String amount = "0.001";
    // 设置小数位
    int decimals = 18; //
    BigDecimal am = new BigDecimal(amount).movePointRight(decimals);
    withdrawalTxDto.setAmount(am.toBigInteger());

    // 设置提现的NVT手续费
    String feeStr = "2";
    int decimalsFee = 8; //小数位
    BigDecimal fee = new BigDecimal(feeStr).movePointRight(decimalsFee);
    withdrawalTxDto.setDistributionFee(fee.toBigInteger());
    withdrawalTxDto.setRemark(null);

    // 组装离线交易
    Result<Map> result = NerveSDKTool.createWithdrawalTx(withdrawalTxDto, withdrawalAssetNonce, nvtFeeAssetNonce);
    String txHex = (String) result.getData().get("txHex");
    // 离线交易签名
    result = NerveSDKTool.sign(txHex, fromAddress, prikey);
    txHex = (String) result.getData().get("txHex");
    String txHash = (String) result.getData().get("hash");
    /***************************************************************************************************/

    // 在线接口，广播交易
    result = NerveSDKTool.broadcast(txHex);
    Transaction tx = Transaction.getInstance(HexUtil.decode(txHex));
    System.out.println(tx.format());
    System.out.println(String.format("hash: %s", txHash));
    System.out.println(String.format("hash: %s", JSONUtils.obj2json(result)));
    
    ```

#### 5. 跨链转出手续费追加

- 当提现交易发出后，Nerve网络会计算跨链到异构网络所需的手续费，若手续费不足，则会暂停发出跨链交易，因此，需要追加手续费
- <b style="color:red">注意</b> 以下两点
    - 不能为已完成的提现交易追加手续费
    - 提现交易与追加手续费交易必须由相同的地址发起（相同私钥签名）
- 以下为代码示例
    
    ```java
    // 设置追加手续费的账户，必须与提现账户一致
    String fromAddress = "TNVTdTSPMcyC8e7jz8f6ngX5yTmK6S8CXEGva";
    String prikey = "17c50c6f7f18e7afd37d39f92c1d48054b6b3aa2373a70ecf2d6663eace2a7d6";
    // 发出的提现交易hash
    String withdrawalTxHash = "2dae6440f691e08552dd707a22412a6474c91e8f10810fd0dbddac301b167dff";
    // 追加的NVT手续费，此处设置为追加10个NVT
    BigInteger amount = new BigInteger("1000000000");
    String remark = null;

    /**************************************** 以下需要在线请求的接口 ****************************************/
    // 获取账NVT资产的nonce值
    String nvtFeeAssetNonce;
    Result nvtFeeAssetBalance = NerveSDKTool.getAccountBalance(fromAddress, SDKContext.main_chain_id, SDKContext.main_asset_id);
    if (!nvtFeeAssetBalance.isSuccess()) {
        throw new NulsException(AccountErrorCode.RPC_REQUEST_FAILD, nvtFeeAssetBalance.toString());
    }
    Map nvtFeeAssetBalanceData = (Map) nvtFeeAssetBalance.getData();
    nvtFeeAssetNonce = nvtFeeAssetBalanceData.get("nonce").toString();

    /**************************************** 以下是完全离线方式组装提现交易 ****************************************/
    // 组装离线交易
    Result<Map> result = NerveSDKTool.withdrawalAdditionalFeeTx(fromAddress, withdrawalTxHash, amount, 0, remark, nvtFeeAssetNonce);
    String txHex = (String) result.getData().get("txHex");
    // 离线交易签名

    result = NerveSDKTool.sign(txHex, fromAddress, prikey);
    txHex = (String) result.getData().get("txHex");
    String txHash = (String) result.getData().get("hash");
    /***************************************************************************************************/
    // 在线接口，广播交易
    result = NerveSDKTool.broadcast(txHex);
    Transaction tx = Transaction.getInstance(HexUtil.decode(txHex));
    System.out.println(tx.format(WithdrawalAdditionalFeeTxData.class));
    System.out.println(String.format("hash: %s", txHash));
    System.out.println(String.format("hash: %s", JSONUtils.obj2json(result)));
    ```

### JavaScript支持

#### `JavaScript-SDK`源代码仓库

- [https://github.com/nerve-admin/nerve-js-sdk](https://github.com/nerve-admin/nerve-js-sdk)

#### 1. 运行环境

- node.js
- 核心依赖包
    
    ```json
    "dependencies": {
        "nerve-sdk-js": "^1.0.4",
        "ethers": "^4.0.47"
    }
    ```


#### 2. 初始化

_**参考示例代码**[https://github.com/nerve-admin/nerve-js-sdk/blob/main/src/test/htgConfig.js](https://github.com/nerve-admin/nerve-js-sdk/blob/main/src/test/htgConfig.js)_

- 测试网配置

    ```javascript
    const HTGNET = 'ropsten';
    const NERVE_INFO = {
        chainId: 5,
        assetId: 1,
        prefix: "TNVT",
        symbol: "TNVT",
        decimals: 8,
        blackHolePublicKey: "000000000000000000000000000000000000000000000000000000000000000000",
        blockHoleAddress: "TNVTdTSPGwjgRMtHqjmg8yKeMLnpBpVN5ZuuY",
        feePubkey: "111111111111111111111111111111111111111111111111111111111111111111"
    };
    ```
- 主网配置

    ```javascript
    const HTGNET = 'homestead';
    const NERVE_INFO = {
        chainId: 9,
        assetId: 1,
        prefix: "NERVE",
        symbol: "NVT",
        decimals: 8,
        blackHolePublicKey: "000000000000000000000000000000000000000000000000000000000000000000",
        blockHoleAddress: "NERVEepb63T1M8JgQ26jwZpZXYL8ZMLdUAK31L"
        feePubkey: "111111111111111111111111111111111111111111111111111111111111111111"
    };
    ```

#### 3. 异构链RPC服务API选择

- HECO
    - ```let provider = getProvider("HT", HTGNET);```
- Binance
    - ```let provider = getProvider("BNB", HTGNET);```
- Ethereum
    - ```let provider = getProvider("ETH", HTGNET); ```

#### 4. 跨链转入-从Heco,Ethereum,Binance跨链转入Nerve网络

_**参考示例代码** [https://github.com/nerve-admin/nerve-js-sdk/blob/main/src/test/htgRecharge.js](https://github.com/nerve-admin/nerve-js-sdk/blob/main/src/test/htgRecharge.js)_

- 跨链转入主币，请参考函数`crossMainAssetTest`
- 跨链转入ERC20标准的token代币，请参考函数`crossTokenTest`
    - **<b style="color:red">注意</b>** 跨链转入token代币之前，需要用户授权token给多签合约，请使用以下函数授权
- 授权ERC20，请参考函数`approveCrossTokenTest`

#### 5. 跨链转出-从Nerve网络跨链转出Heco,Ethereum,Binance

_**参考示例代码** [https://github.com/nerve-admin/nerve-js-sdk/blob/main/src/test/htgWithdrawal.js](https://github.com/nerve-admin/nerve-js-sdk/blob/main/src/test/htgWithdrawal.js)_

- 跨链转出，请参考函数`withdrawalTest`
- <b style="color:red">注意: </b>当设置的跨链转出手续费不足时，Nerve网络不会向Heco,Ethereum,Binance发出交易，此转出会被暂停，直至手续费足够，追加手续费的交易见第6点

#### 6. 跨链转出手续费追加

_**参考示例代码** [https://github.com/nerve-admin/nerve-js-sdk/blob/main/src/test/htgWithdrawalAddFee.js](https://github.com/nerve-admin/nerve-js-sdk/blob/main/src/test/htgWithdrawalAddFee.js)_

- 追加跨链转出的手续费，请参考函数`withdrawalAddFeeTest`

    ##### 交易说明
    - 当提现交易发出后，Nerve网络会计算跨链到异构网络所需的手续费，若手续费不足，则会暂停发出跨链交易，因此，需要追加手续费
    - <b style="color:red">注意</b> 以下两点
        - 不能为已完成的提现交易追加手续费
        - 提现交易与追加手续费交易必须由相同的地址发起（相同私钥签名）
