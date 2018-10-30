# linux 命令

---

### 后台运行和关闭、查看后台任务

[blog](http://www.cnblogs.com/kaituorensheng/p/3980334.html)

1.  &
    加在一个命令的最后，可以把这个命令放到后台执行，如
    watch -n 10 sh test.sh & #每 10s 在后台执行一次 test.sh 脚本

2.  ctrl + z
    可以将一个正在前台执行的命令放到后台，并且处于暂停状态。

3.  jobs
    查看当前有多少在后台运行的命令
    jobs -l 选项可显示所有任务的 PID，jobs 的状态可以是 running, stopped, Terminated。但是如果任务被终止了（kill），shell 从当前的 shell 环境已知的列表中删除任务的进程标识。

4.  fg
    将后台中的命令调至前台继续运行。如果后台中有多个命令，可以用 fg jobnumber（是命令编号，不是进程号）将选中的命令调出。

5.  bg
    将一个在后台暂停的命令，变成在后台继续执行。如果后台中有多个命令，可以用 bg jobnumber 将选中的命令调出。

6.  kill
    法子 1：通过 jobs 命令查看 job 号（假设为 num），然后执行 kill num
    法子 2：通过 ps 命令查看 job 的进程号（PID，假设为 pid），然后执行 kill pid
    前台进程的终止：Ctrl+c

7.  nohup
    如果让程序始终在后台执行，即使关闭当前的终端也执行（之前的&做不到），这时候需要 nohup。该命令可以在你退出帐户/关闭终端之后继续运行相应的进程。关闭中断后，在另一个终端 jobs 已经无法看到后台跑得程序了，此时利用 ps（进程查看命令）
    ps -aux | grep "test.sh" #a:显示所有程序 u:以用户为主的格式来显示 x:显示所有程序，不以终端机来区分
