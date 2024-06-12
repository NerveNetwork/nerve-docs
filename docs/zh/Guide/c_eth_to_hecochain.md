# 使用NerveNetwork中继网络创建跨链Token

NerveNetwork作为中继网络，NerveNetwork现已支持ETH/Polygon等资产跨链流通，允许项目将Token资产注册跨链进入NerveNetwork网络，从而使用NerveBridge桥接到其他NerveNetwork支持的网络中。

目前支持NerveNetwork通道的跨链桥为：NerveBridge 和 SwapBox。

## 以ETH网络为例使用NerveNetwork跨链

​要进行ETH资产的跨链，首先得准备一个拥有ETH或ERC20资产的地址，该地址已导入MetaMask钱包。
进入NerveNetwork资产页面，点击跨入，授权Token，跨链转入Token，等待交易确认即可。如果该Token已经注册到其他网络，此时，我们切换网络连接到该网络下，资产页面可以看到该资产的“跨出”功能。点击跨出，使用钱包签名。


注意：在使用MetaMask等EVM钱包对NerveNetwork网络的交易签名时，由于NerveNetwork不属于EVM兼容网络，我们使用了eth_sign签名方法，您可能会收到风险提示或者开启eth_sign功能的提示，请放心使用，这不会为你的资产带来风险。


## 使用其他跨链桥产品跨链


NerveBridge 和 SwapBox


