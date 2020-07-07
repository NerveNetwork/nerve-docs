# 快速安装节点钱包

## 准备

### 服务器硬件配置

**建立Nerve节点的服务器不低于如下配置：**

| CPU         | 内存 | 硬盘     | 宽带    |
| ----------- | ---- | -------- | ------- |
| 四核 3.0GHz | 16G  | 128G硬盘 | 20M上行 |

**推荐配置：**

| CPU         | 内存 | 硬盘     | 宽带     |
| ----------- | ---- | -------- | -------- |
| 八核 3.0GHz | 32G  | 256G硬盘 | 100M上行 |

### 了解节点分类

#### 虚拟银行节点：

**共识奖励：** 是POS收益的2倍块奖励+手续费

满足条件：
- NVT质押排名前15位
- 出块地址持有一定量异构链的资产（目前已接入的异构链为以太坊，建议持有至少0.1ETH）
- 提供稳定的服务器设备
- 打包交易出块和区块验证
- 维护跨链资产和提案
  

#### 共识节点：

**共识奖励：** 是POS收益的1.73倍块奖励+手续费

满足条件：
- NVT质押排名前35位
- 提供稳定的服务器设备
- 打包交易出块和区块验证
  


#### 普通节点：

**共识奖励：** 等于活期POS

满足条件：
- 质押最少20W NVT
- 提供稳定的服务器设备
- 参与区块广播

## Centos7系统小专区

如果你的系统是**centos7**，那么恭喜你，下方的教程可以**不用继续看了**。Nerve社区的技术爱好者自发为centos7的系统编写了一个自动化脚本，执行该脚本即可自动完成docker安装，节点镜像安装/更新，启动容器，进入命令行和检查启动状态等一系列任务，做到了开箱即用

[点击此处下载脚本](https://github.com/NerveNetwork/nerve/blob/master/docker_build/nerve)

## Linux下安装docker

### 使用root权限用户登录系统并查看系统内核版本

返回值大于3.10即可

命令：uname -r

```
[root@hope-2 /]# uname -r
3.10.0-957.27.2.el7.x86_64
```

### 确保yum为最新版本

命令：yum update

### 添加yum仓库

```
tee /etc/yum.repos.d/docker.repo <<-'EOF'
[dockerrepo]
name=Docker Repository
baseurl=https://yum.dockerproject.org/repo/main/centos/$releasever/
enabled=1
gpgcheck=1
gpgkey=https://yum.dockerproject.org/gpg
EOF
```

### 安装docker

分别执行以下用例进行安装：

```
yum install -y yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum makecache fast
yum -y install docker-ce
```

### 启动docker

命令：systemctl start docker.service 

### 检查是否成功

使用命令docker version 查看，出现Client和Server说明docker安装启动成功

```
[root@hope-2 /]# docker version
Client: Docker Engine - Community
 Version:           19.03.11
 API version:       1.40
 Go version:        go1.13.10
 Git commit:        42e35e61f3
 Built:             Mon Jun  1 09:13:48 2020
 OS/Arch:           linux/amd64
 Experimental:      false

Server: Docker Engine - Community
 Engine:
  Version:          19.03.11
  API version:      1.40 (minimum version 1.12)
  Go version:       go1.13.10
  Git commit:       42e35e61f3
  Built:            Mon Jun  1 09:12:26 2020
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.2.13
  GitCommit:        7ad184331fa3e55e52b890ea95e65ba581ae3429
 runc:
  Version:          1.0.0-rc10
  GitCommit:        dc9208a3303feef5b3839f4323d9beb36df0a9dd
 docker-init:
  Version:          0.18.0
  GitCommit:        fec3683
```



### 设置开机自动启动

命令：sudo systemctl enable docker

## Windows下安装docker

[参考链接](https://docs.microsoft.com/zh-cn/virtualization/windowscontainers/quick-start/set-up-environment?tabs=Windows-Server)



**PS：目前提供两种方式启动Nerve节点钱包，第一种是使用命令直接启动，另一种是使用docker-compose启动。**

## 第一种方式启动Nerve节点钱包

节点钱包带有主链运行所需的最基础功能，并包括nerve-api（http的开发接口）模块，用户只能通过命令行与钱包进行交互。

运行命令：

```
docker run \
       --name nerve-wallet \
       -d \
       -p 17001:17001 \
       -p 17002:17002 \
       -p 17004:17004 \
       -v `pwd`/data:/nuls/data \
       -v `pwd`/logs:/nuls/Logs \
       nervenetwork/nerve-wallet-node:beta-1.0.4
```

**17001 Nerve链协议通信端口（必选）**

**17002 Nerve链跨链协议端口（必选）**

17004 http api接口使用端口（可选）

/nuls/data 数据存储目录

/nuls/Logs 日志存储目录

**PS：请务必在服务器防火墙设置开启以上端口，否则会影响区块同步**

## 第二种方式docker-compose安装启动Nerve节点钱包

docker安装启动成功之后，执行下面两条命令安装docker-compose并赋予权限：

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

安装成功之后，在某个目录（随意）下新建一个文件docker-compose.yml，写入下面的代码并保存：

```
version: '3.1'
services:
  nerve:
    image: nervenetwork/nerve-wallet-node:beta-1.0.4
    restart: always
    container_name: nerve-wallet
    ports:
      # 端口映射
      - 17001:17001
      - 17002:17002
      - 17004:17004
    volumes:
      # 数据库目录映射
      - ./data:/nuls/data
      - ./logs:/nuls/Logs
    environment:
      TIME_ZONE: Asia/Shanghai
```

**17001 Nerve链协议通信端口（必选）**

**17002 Nerve链跨链协议端口（必选）**

17004 http api接口使用端口（可选）

/nuls/data 数据存储目录

/nuls/Logs 日志存储目录

**PS：请务必在服务器防火墙设置开启以上端口，否则会影响区块同步**

钱包启动、停止命令：

启动：docker-compose up -d

停止：docker-compose down

## 进入钱包命令行及钱包管理命令

进入钱包命令行：

```
docker exec -it nerve-wallet cmd
```

进入钱包目录：

```
docker exec -it nerve-wallet bash
```

查看模块启动情况：

```
docker exec -it nerve-wallet check-status
```

停止钱包：

```
docker stop nerve-wallet
```

启动钱包：

```
docker start nerve-wallet
```

重启钱包：

```
docker restart nerve-wallet
```

## 

## Nerve节点钱包更新

首先在服务器上停止已运行的镜像

```
docker stop nerve-wallet
```

使用命令查看钱包的容器并且根据容器ID删除该容器

```
[root@c-7 ~]# docker ps -a
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS                        PORTS               NAMES
9b5f87f013fa        a26aa7ced583             "/usr/local/bin/entr…"   15 hours ago        Exited (137) 55 seconds ago                       nerve-wallet

[root@c-7 ~]# docker rm 9b5f87f013fa
```

重新拉取镜像

```
docker pull nervenetwork/nerve-wallet-node:beta-1.0.0
```

再次启动nerve节点钱包即可，根据不同的启动方法选择重复第一种或第二种启动方法（如果需要清数据，请删除root目录下的data、logs目录）

