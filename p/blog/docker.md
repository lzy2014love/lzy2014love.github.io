### 添加用户
useradd lzy

### 用户密码
passwd lzy

### 安装docker
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun

### 创建docker组
sudo groupadd docker

### 将您的用户添加到docker组中
sudo usermod -aG docker $USER

### service 命令的用法
sudo service docker start

### systemctl 命令的用法
sudo systemctl start docker

### 配置Docker在启动时启动
sudo systemctl enable docker

### dockerfile
``` dockerfile
FROM node:7
MAINTAINER Mumudeveloper
#hardcode
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN yarn global add forever

# Create www directory
RUN mkdir -p /api
COPY ./api /api

# Install www dependencies
WORKDIR /api
RUN yarn install

EXPOSE 7001
# Define default command.  
ENTRYPOINT forever start  -l forever.log -a index.js && tail -f ~/.forever/forever.log
```