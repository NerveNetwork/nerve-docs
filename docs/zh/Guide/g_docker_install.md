# 快速安装节点钱包

## Linux下安装docker

### 使用root权限用户登录系统并查看系统内核版本

返回值大于3.10即可

命令：`uname -r`

```
[root@hope-2 /]# uname -r
3.10.0-957.27.2.el7.x86_64
```

### 确保yum为最新版本

命令：`yum update`

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

命令：`yum install -y docker-engine `

安装成功之后，用docker version命令查看是否安装成功

### 启动docker

命令：`systemctl start docker.service `

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

命令：`sudo systemctl enable docker`

## Windows下安装docker

[参考链接](https://docs.microsoft.com/zh-cn/virtualization/windowscontainers/quick-start/set-up-environment?tabs=Windows-Server)

## 启动Nerve节点钱包

### 钱包启动

节点钱包带有主链运行所需的最基础功能，并包括nerve-api（http的开发接口）模块，用户只能通过命令行与钱包进行交互。

运行命令（复制执行即可）：

```
docker run \
       --name nerve-wallet \
       -d \
       -p 17001:17001 \
       -p 17002:17002 \
       -p 17004:17004 \
       -v `pwd`/data:/data \
       -v `pwd`/logs:/nuls/Logs \
       nervenetwork/nerve-wallet-node:beta-1.0.0-fe2eb1b
```

17001 Nerve链协议通信端口（必选）

17002 Nerve链跨链协议端口（必选）

17004 http api接口使用端口（可选）

/nuls/data 数据存储目录

/nuls/Logs 日志存储目录

PS：请务必在服务器防火墙设置开启以上端口，否则会影响区块同步

### 进入钱包及钱包管理命令

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

## docker-compose安装

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
    image: nervenetwork/nerve-wallet-node:beta-1.0.0-fe2eb1b
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

钱包启动、停止命令：

启动：`docker-compose up -d`

停止：`docker-compose down`ß

## Nerve节点钱包最新docker镜像查看

[点这里查看！](https://hub.docker.com/r/nervenetwork/nerve-wallet-node/tags)获取最新的版本信息，更改命令中的版本号执行。