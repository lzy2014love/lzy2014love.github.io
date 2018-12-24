## git工作流程
1. 去自己的工作分支
`$ git checkout work`

2. 工作
`....`

3. 提交工作分支的修改
`$ git commit -a`

4. 回到主分支
`$ git checkout master`

5. 获取远程最新的修改，此时不会产生冲突
`$ git pull`

6. 回到工作分支
`$ git checkout work`

7. 用rebase合并主干的修改，如果有冲突在此时解决
`$ git rebase master`

8. 回到主分支
`$ git checkout master`

9. 合并工作分支的修改，此时不会产生冲突。
`$ git merge work`

10. 提交到远程主干
`$ git push`

这样做的好处是，远程主干上的历史永远是线性的。每个人在本地分支解决冲突，不会在主干上产生冲突。
> 注意: 在最后一步，你提交的时候，若正巧有人在你前面执行了和你一样的流程，这时就会冲突了，就得`git pull git rebase origin/master git push`

## git回滚到任意版本
1. 先显示提交的log
`git log -3`

2. 回滚到指定的版本
`git reset --hard [commit的hash]`

3. 强制提交
`git push -f origin master`