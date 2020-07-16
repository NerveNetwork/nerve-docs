# Quickly install node wallet

## Preparation

### Server hardware configuration

**The server for establishing Nerve nodes is not less than the following configuration:**

| CPU | Memory | Hard Disk | Broadband |
| ----------- | ---- | -------- | ------- |
| Quad-core 3.0GHz | 16G | 128G hard drive | 20M uplink |

**Recommended configuration:**

| CPU | Memory | Hard Disk | Broadband |
| ----------- | ---- | -------- | -------- |
| Eight-core 3.0GHz | 32G | 256G hard disk | 100M uplink |

### Understand node classification

#### Virtual bank node:

**Consensus reward:** It is 2 times the block reward of POS income + handling fee

To meet the conditions:
- Top 15 NVT staking
- The block address holds a certain amount of assets of the heterogeneous chain (the currently connected heterogeneous chain is Ethereum, it is recommended to hold at least 0.1ETH)
- Provide stable server equipment
- Block transaction and block verification
- Maintain cross-chain assets and proposals
  

#### Consensus node:

**Consensus Reward:** It is 1.73 times of POS revenue block reward + handling fee

To meet the conditions:
- Top 35 NVT staking
- Provide stable server equipment
- Block transaction and block verification
  


#### Ordinary node:

**Consensus reward:** equal to current POS

To meet the conditions:
- Stake at least 20W NVT
- Provide stable server equipment
- Participate in block broadcasting

## Centos7 system area

If your system is **centos7**, then congratulations, **you can skip the tutorial below**. Technical enthusiasts in the Nerve community spontaneously wrote an automated script for the centos7 system. Executing this script can automatically complete docker installation, node image installation/update, start the container, enter the command line and check the startup status, etc. Out of the box

[Click here to download the script](https://github.com/NerveNetwork/nerve/blob/master/docker_build/nerve)

## Install docker under Linux

### Log in to the system as a user with root privileges and view the system kernel version

The return value is greater than 3.10

Command: uname -r

```
[root@hope-2 /]# uname -r
3.10.0-957.27.2.el7.x86_64
```

### Make sure yum is the latest version

Command: yum update

### Add yum repository

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

### Install docker

Perform the following use cases to install separately:

```
yum install -y yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum makecache fast
yum -y install docker-ce
```

### Start docker

Command: systemctl start docker.service

### Check success

Use the command docker version to view, and the Client and Server appear indicating that the docker installation is started successfully

```
[root@hope-2 /]# docker version
Client: Docker Engine-Community
 Version: 19.03.11
 API version: 1.40
 Go version: go1.13.10
 Git commit: 42e35e61f3
 Built: Mon Jun 1 09:13:48 2020
 OS/Arch: linux/amd64
 Experimental: false

Server: Docker Engine-Community
 Engine:
  Version: 19.03.11
  API version: 1.40 (minimum version 1.12)
  Go version: go1.13.10
  Git commit: 42e35e61f3
  Built: Mon Jun 1 09:12:26 2020
  OS/Arch: linux/amd64
  Experimental: false
 containerd:
  Version: 1.2.13
  GitCommit: 7ad184331fa3e55e52b890ea95e65ba581ae3429
 runc:
  Version: 1.0.0-rc10
  GitCommit: dc9208a3303feef5b3839f4323d9beb36df0a9dd
 docker-init:
  Version: 0.18.0
  GitCommit: fec3683
```



### Set to start automatically at boot

Command: sudo systemctl enable docker

## Install docker under Windows

[Reference link](https://docs.microsoft.com/zh-cn/virtualization/windowscontainers/quick-start/set-up-environment?tabs=Windows-Server)



**PS: There are currently two ways to start the Nerve node wallet, the first is to use the command to start directly, and the other is to use docker-compose to start. **

## The first way to start Nerve node wallet

The node wallet has the most basic functions required for the operation of the main chain, and includes the nerve-api (http development interface) module. Users can only interact with the wallet through the command line.

Run the command:

```
docker run \
       --name nerve-wallet \
       -d \
       -p 17001:17001 \
       -p 17002:17002 \
       -p 17004:17004 \
       -v `pwd`/data:/nuls/data \
       -v `pwd`/logs:/nuls/Logs \
       nervenetwork/nerve-wallet-node:beta-1.0.6
```

**17001 Nerve chain protocol communication port (required)**

**17002 Nerve chain cross-chain protocol port (required)**

17004 http api interface using port (optional)

/nuls/data data storage directory

/nuls/Logs Log storage directory

**PS: Be sure to enable the above ports in the server firewall settings, otherwise it will affect the block synchronization**

## The second way docker-compose install and start Nerve node wallet

After the docker installation starts successfully, execute the following two commands to install docker-compose and grant permissions:

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/ bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

After the installation is successful, create a new file docker-compose.yml in a directory (optional), write the following code and save it:

```
version: '3.1'
services:
  nerve:
    image: nervenetwork/nerve-wallet-node:beta-1.0.6
    restart: always
    container_name: nerve-wallet
    ports:
      # Port Mapping
      -17001:17001
      -17002:17002
      -17004:17004
    volumes:
      # Database directory mapping
      -./data:/nuls/data
      -./logs:/nuls/Logs
    environment:
      TIME_ZONE: Asia/Shanghai
```

**17001 Nerve chain protocol communication port (required)**

**17002 Nerve chain cross-chain protocol port (required)**

17004 http api interface using port (optional)

/nuls/data data storage directory

/nuls/Logs Log storage directory

**PS: Be sure to enable the above ports in the server firewall settings, otherwise it will affect the block synchronization**

Wallet start and stop commands:

Start: docker-compose up -d

Stop: docker-compose down

## Enter the wallet command line and wallet management commands

Enter the wallet command line:

```
docker exec -it nerve-wallet cmd
```

Enter the wallet directory:

```
docker exec -it nerve-wallet bash
```

Check the module startup status:

```
docker exec -it nerve-wallet check-status
```

Stop wallet:

```
docker stop nerve-wallet
```

Start the wallet:

```
docker start nerve-wallet
```

Restart the wallet:

```
docker restart nerve-wallet
```

##

## Nerve node wallet update

First stop the running image on the server

```
docker stop nerve-wallet
```

Use the command to view the wallet container and delete the container according to the container ID

```
[root@c-7 ~]# docker ps -a
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
9b5f87f013fa a26aa7ced583 "/usr/local/bin/entr…" 15 hours ago Exited (137) 55 seconds ago nerve-wallet

[root@c-7 ~]# docker rm 9b5f87f013fa
```

Re-pull the image

```
docker pull nervenetwork/nerve-wallet-node:beta-1.0.0
```

Just start the nerve node wallet again, choose to repeat the first or second startup method according to different startup methods (if you need to clear the data, please delete the data and logs directories under the root directory)