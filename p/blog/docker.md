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