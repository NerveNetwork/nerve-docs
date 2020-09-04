# Nervedex module

## Why have nervedex modules?

Throughout the current encrypted asset market, centralized trading platforms are more friendly to Internet users because of their good user experience. Centralized asset trading platform has become the mainstream trading mode in the industry. With the rapid development of the industry, more and more centralized exchanges have been established,However, in fact, many trading platforms do not have their own technical teams and asset management capabilities. Centralized exchanges need to be responsible for holding and keeping the assets of all users. They must manage some centralized wallets that control huge assets,Hackers have stolen billions of dollars worth of digital assets, and these exchanges are running away because they can't bear the losses, which highlights a huge security risk faced by the whole industry. On the other hand, centralized exchanges need to constantly make profits to promote business development. In the centralized trading market, its data is opaque,Some central exchanges take advantage of the platform to master the trading behavior of users to obtain huge profits

With the development of the industry, the demand for decentralized trading is increasing, and the underlying technology of blockchain is also making progress. If all transactions are point-to-point, for example, the decentralized trading platform will no longer need to hold and manage users' funds, making the whole industry safer;Users no longer need to register with the exchange as before, then frequently recharge and withdraw cash, and then wait for the exchange to confirm before they can trade normally. Users can directly use their own online address to register transactions, greatly simplifying the trading process, improving the user experience, and thus promoting the use of more currency investors. In addition, all transaction data are open and transparent,Users can be more assured to invest in encrypted assets, so as to promote the ecological development of the whole industry in a more benign direction

Almost all people in the blockchain field believe that the decentralized trading platform is the future of cryptocurrency transactions. Nervedex aims to return the blockchain to its essence, make digital assets transparent in circulation and transaction, and provide users with a completely decentralized encryption asset trading platform. It ensures that from the creation of asset transaction pairs, to the user's entrusted order, and finally to the matching transaction,All information will be stored on the nervenetwork public chain, and the data will be completely open and transparent. We also provide dex-api module to allow more people or third-party institutions to build nervedex decentralized exchange nodes, and open API interfaces to the outside world, allowing third parties to customize their own centralized trading platform on the chain through dex-api,Colleagues ensure that users can easily and quickly entrust transactions on the node to improve the user experience



## What does DEX module do?

- The bottom layer supports transaction protocol, including transaction pair creation agreement, user entrustment list agreement, user revocation delegation order agreement, matching transaction agreement and cancellation order confirmation agreement
- Create a trade pair. After the new trade pair creation agreement is packaged and confirmed, the system will automatically create a trade pair opening
- The system will automatically put the newly initiated transaction into the trading port according to the rules of the transaction agreement
-The order matching transaction is completed. When the consensus node takes out the order in the trading pair slot in turn, matching and matching. After the matching is successful, the * * transaction * * is generated

- Cancellation order confirmation. After the user initiates the consignment order, because the price fails to match the successful transaction, the user can cancel the order by sending the cancellation order transaction. When the consensus node is packaged, it will process the transaction according to the order of the packaged transaction. If the transaction can be matched by issuing the existing new order before processing the cancellation order, the transaction will be matched first,If there is no matching order, the order will be cancelled directly
-Update the inventory. After confirming the transaction packed in the new block, the inventory data should be updated. Remove the orders that have been matched successfully or canceled, and then add new orders



## Features of nervedex

At present, some decentralized trading platforms in the market have many assets on the Ethereum chain. Most of the decentralized exchanges only focus on Ethereum ecological assets and only exchange erc20 tokens. The limitations of these DEX are too large, limited by smart contracts,There will be a lack of several links in the whole transaction process (the whole process of the transaction: the creation of transaction pairs - the user's registration of orders for entrusted Trading - inventory data maintenance - user's cancellation of the order - transaction matching transaction); and the transaction process is restricted by the Ethereum network, and the transaction efficiency is low

There are still few DEX protocols that focus on non Ethereum ecology in the whole industry. Nervedex is a new DEX module based on the bottom layer of nervenetwork blockchain. DEX module is responsible for the creation and verification of asset exchange transactions, the maintenance and matching of assets to inventory positions, and ultimately ensures the whole transaction process to form a closed loop,Nervedex has the following features:

- Nervenetwork itself is a public chain. DEX module processes the whole asset transaction process by adding transaction protocol at the bottom
- Nervenetwork public chain pays more attention to the efficiency improvement of decentralized exchanges. In the whole chain, except for a small number of transfer transactions, there will only be data information of asset related transaction protocols. The underlying layer does not implement complex other logic, all processing logic has been written in the underlying module, so the execution efficiency will be higher, and all transactions sent can be confirmed within 2S
- It is easier to connect. Partners only need to understand the transaction protocol of DEX module, then query the block through the RPC interface, and then parse the transaction data in the block in order to obtain the desired information,The user can view the transaction information in the transaction center and the transaction information in the transaction center,Realize the visualization of data
- It supports the transaction of multi chain assets. Nervenetwork itself is a parallel chain belonging to the public chain of nuls. Therefore, all chain assets in the nuls ecosystem can be directly transferred to the nervenetwork chain through the cross chain protocol. After creating the asset transaction pairs, users can buy and sell on the order. In addition, nervenetwork also uses a unique heterogeneous cross chain network,It is allowed to transfer assets of other public chains to nervenetwork and nuls ecology. In this way, nervedex can also support the transaction of other public chain assets

- Users can generate NVT address and private key or keystore through nervenetwork wallet and other tools, and the private key is kept by the user himself. Users can easily log in to the visualized central exchange provided by the official or third-party node. After importing the private key or keystore, the user can start the order transaction
- The data is open and transparent. All the transaction information of the order, cancellation and transaction will be packed into the blockchain. Users can query and monitor at any time, and there will be no false transactions
- Transaction with ultra-low service charge. Although users will charge a little service charge for each order registration and cancellation, it is necessary for online transactions. For network security, only 0.02% matching service charge will be charged at the bottom of nervedex, and 50% of it will be used to exchange NVT for destruction



## DEX transaction module protocol

**Create a deal pair agreement**

The establishment of asset transaction pair is the premise for users to be able to trade orders normally. Only when the asset transaction pair is created can the inventory information be provided and the user can operate the order

Restrictions:

- For example, there must be two kinds of transaction information on the asset chain of nevetn
- For example, if a user has created a nulssnvt asset transaction pair, it cannot send a new transaction to create another nulssnvt asset transaction pair or nvttnuls asset transaction pair
- When the asset transaction pair is created, a specific handling fee (currently tentatively set at 20000 NVT) should be paid
- The minimum transaction unit of transaction currency and pricing currency must be set for asset transaction pair



**Agreement on consignment of bills**

After the asset transaction pair is created, the user can place an order. After the transaction is packaged, it will be added to the port for matching

Restrictions:

- The system will charge 0.001 NVT as the service charge for each transaction
- The number of consigned orders shall not be less than the minimum trading unit



**Entrustment cancellation agreement**

	After the user hangs up the order entrusts, cannot transact a deal for a long time, the user may cancel the entrustment

Restrictions:

- The system will charge 0.001 NVT as the service charge for each time the user sends a cancellation order
- Revoking a delegation cannot only cancel a part of the order



**Transaction pair modification agreement**

After the asset transaction pair is created, the creator can modify the asset transaction pair information

Restrictions:

- Only the creator can modify it
- Only the minimum trading unit and the smallest visible decimal place can be modified. The information of the transaction pair itself cannot be modified. For example, nulssnvt transaction pair cannot be modified to btccnvt transaction pair
- The system will charge 0.001 NVT as the service charge for each transaction modification



**Transaction agreement**

The transaction agreement is a system protocol. When the node packs the block, it matches it according to the current inventory data. After successful matching, the transaction agreement is generated and packaged into the block

Restrictions:

- It can only be generated when the consensus node packs blocks
- The order of the consensus node matchmaking must strictly abide by the nervedex module matchmaking rules (the specific rules will be described in detail later). The packaged blocks will be verified throughout the network. If the verification fails, the blocks will not be packed
- After successful matching, the nervedex API operator will charge 0.06% of the transaction value of the buyer and the seller as the matching fee
- If the user is the third-party node to provide visualization to the central exchange initiated by the entrusted order operation, after the summary and delivery, the third-party node can charge an additional 0.98% of the transaction value of the buyer and the seller according to its configuration as the service fee



**Cancellation order confirmation agreement**

After a user initiates a revocation transaction, it is not always possible to cancel the delegation

When a node is packing a block, it may pack a consignment order transaction before processing the user's revocation of the entrusted transaction. The new order can match the order that the user needs to cancel. At this time, the system will match the transaction to generate a transaction. If there is still a surplus of the order after the transaction, the remaining delegation will be revoked. If the order is completed, the transaction will be cancelled,This transaction finally confirms whether the user's revocation delegation is effective. Whether it is completely revoked, partially revoked or revoked invalid, it is clearly recorded in this transaction

Restrictions:

- It can only be generated when the consensus node packs blocks
- The confirmation order of the revocation order of consensus node must strictly comply with the nervedex module matching rules (the specific rules will be described in detail later). The packaged blocks will be verified throughout the network. If the verification fails, the blocks will not be packed



## Underlying implementation mechanism of nervedex module

**Transaction broadcast and confirmation**

The user can initiate the order transaction through the wallet or decentralized exchange. The transaction will be confirmed by the node first. If the confirmation fails, the error details will be returned directly. After the confirmation is successful, the node will broadcast the transaction to other nodes in the whole network. Finally, the consensus node will confirm the transaction and send the packet to the block. After the block is confirmed by Byzantine voting, the block will be finally persistent stored

**Confirmation sequence of packaged transactions**

The public chain of nervenetwork adopts pocbft consensus mechanism, which consists of at least 15 consensus nodes and at most 35 consensus nodes. Consensus nodes will produce blocks in turn, one block every 2 seconds, and each node will only produce one block in each round. The blocks will be finally confirmed after 66% consensus is reached through Byzantine voting of consensus nodes

Due to the decentralized matchmaking mechanism, it is possible that the newly sent order transaction by the user can not be broadcast to the consensus node which is the turn to package the block. Therefore, the order of confirmation of the transaction is not the creation time sequence of the transaction, but the sequence of the consensus node after receiving the transaction and packing it into the block

**Maintenance and matching rules**

check:The lower the price, the farther away from the opening; the higher the price, the closer to the opening, and the priority of transaction; if the price is the same, the entrusted purchase order which is first packaged and confirmed will be closed first;

Sales order:The higher the price is, the farther away from the opening; the lower the price is, the closer it is to the opening, and the transaction priority will be given; if the price is the same, the entrusted sales order which is first packaged and confirmed will be closed first;

**Package matching transaction and cancellation confirmation**

When the consensus node packs the block, it will match and generate the transaction according to the order of the packaged order transaction, and then match the transaction according to the matching rules. The generated transaction will also be added to the package block in order

Each transaction will generate a transaction. At present, the maximum capacity accepted by a block of nerve network is to allow 200 transactions to be packed. If a hanging order consumes more than 200 orders, it will be sent to several consecutive blocks in batches

If a pending order has not been completed or not completely completed, the node is packaged into a user's revocation delegation, then the revocation confirmation transaction is generated according to the remaining number of orders, and added to the packed block in order

**Confirmation of blocks**

After the consensus node packs the block, it will first broadcast to other consensus nodes. When the other consensus nodes receive the block, they will verify the order pending and cancellation entrustment transactions packaged in the block in turn. According to the order listing entrustment transaction, the transaction transaction is generated according to the matchmaking rules,Finally, Byzantine consensus is reached by consensus nodes

After the block is confirmed, the data will be saved persistently. Only then can the data in the disk port be updated, and the completed and cancelled orders will be cancelled, and then the new orders will be added



##Nervedex development direction

- Continue to optimize the underlying protocol, improve transaction processing efficiency and block packaging efficiency
- Continuously optimize DEX API module, provide more interfaces for users to use, continuously optimize transaction interface function points, and give users a better experience
- It provides DEX API services and customized cloud services for the three parties
- Heterogeneous cross chain supports more public chain assets (currently, only nulssnrc20 and ethherc20 are supported, but gradually increased in the future, such as BTC, EOS, BNB main chain, etc.)

## Others

Please refer to nervedex design document for details of new transaction protocol, protocol verification logic, module configuration description, and disk port maintenance and matchmaking

Dex-api module provides exchange RPC interface. See nervedex-api interface document
















