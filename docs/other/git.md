---
title: Git记录
order: 1
nav:
  title: Other
  order: 1
---

## 创建版本库

### 初始化

```bash
$ mkdir Test
$ cd Test
$ git init
```

<br />执行完 git init 将会在文件夹下产生`.git` 文件夹，用来跟踪管理版本库，默认是隐藏的，可使用`ls -ah`查看到。<br />

<a name="8d0cfb58"></a>

### 添加文件

```bash
$ git add <filename>  或  git add .
$ git commit -m <message>
```

```
git commit 不输入 -m 以及后面的内容会进入vim模式

vi & vim 有两种工作模式：
（1） 命令模式：接受、执行 vi & vim 操作命令的模式，打开文件后的默认模式；
（2） 编辑模式：对打开的文件内容进行 增、删、改 操作的模式； 在编辑模式下按下 ESC 键，回退到命令模式。

创建、打开文件：$ vi [filename]
（1）使用 vi 加 文件路径（或文件名）的模式打开文件，如果文件存在则打开现有文件，如果文件不存在则新建文件，并			在终端最下面一行显示打开的是一个新文件。
（2）键盘输入字母 “i”或“Insert”键进入最常用的插入编辑模式。

保存文件：
（1）在插入编辑模式下编辑文件。
（2）按下 “ESC” 键，退出编辑模式，切换到命令模式。
（3）在命令模式下键入"ZZ"或者":wq"保存修改并且退出 vi 。
（4）如果只想保存文件，则键入":w"，回车后底行会提示写入操作结果，并保持停留在命令模式。

放弃所有文件修改：
（1）放弃所有文件修改：按下 "ESC" 键进入命令模式，键入 ":q!" 回车后放弃修改并退出vi。
（2）放弃所有文件修改，但不退出 vi ，即回退到文件打开后最后一次保存操作的状态，继续进行文件操作：按下 "ESC" 		键进入命令模式，键入 ":e!" ，回车后回到命令模式。
```

<a name="bf90a614"></a>

## 开发中常用

<a name="d76d37c2"></a>

### 查看状态和变更

```bash
$ git status  							查看工作区状态
$ git diff <filename> 			查看工作区该文件与版本库中当前分支上该文件之间的差异
```

<br />注意`git diff`在`git add`之前使用有效<br />

<a name="e585e8a2"></a>

### 查看历史记录

```bash
$ git log 									查看最近到最远的提交记录
$ git log --pretty=oneline  查看最近到最远的提交记录,每条显示一行

$ git reflog 								查看我们每一次命令
```

<a name="a9bf971a"></a>

### 版本回退

<br />Git 必须知道当前版本是哪个版本，在 Git 中，用`HEAD`表示当前版本，上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上 100 个版本写 100 个`^`比较容易数不过来，所以写成`HEAD~100`；<br />

```bash
$ git reset --hard HEAD^ 		回退到上一个版本
$ git reset --hard commitId 回退到指定的commitId
```

<br />**git reset 和 git revert 的比较：**

1. git revert 是生成一个新的提交来撤销某次提交，此次提交之前的 commit 都会被保留。
   <br />撤销某次操作，提交一个新的版本，将需要 revert 的版本的内容再反向修改回去，版本会递增，不影响之前提交的内容。
1. git reset 是回到某次提交，提交及之前的 commit 都会被保留，但是此次之后的修改都会被退回到暂存区
   <br />回退版本，回到某次提交。
   <br />git reset 可以有不同参数：
   <br />`git reset [--soft | --mixed | --hard | --merge | --keep] [-q] [<commit>]`

<br />**git reset 有三个参数  --soft, --mixed, --hard, 默认是 --mixed**<br />**--soft**参数告诉 Git 重置 HEAD 到另外一个 commit，但也到此为止。如果你指定--soft 参数，Git 将停止在那里而什么也不会根本变化。这意味着 index,working copy 都不会做任何变化，所有的在 original HEAD 和你重置到的那个 commit 之间的所有变更集都放在 stage(index)区域中。<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/368754/1588993174767-df387bd1-2d7c-4ef6-bd1f-6af093b0c2f4.png#align=left&display=inline&height=68&margin=%5Bobject%20Object%5D&name=image.png&originHeight=136&originWidth=580&size=18717&status=done&style=none&width=290)<br />**--hard**参数将会 blow out everything.它将重置 HEAD 返回到另外一个 commit(取决于~12 的参数），重置 index 以便反映 HEAD 的变化，并且重置 working copy 也使得其完全匹配起来。这是一个比较危险的动作，具有破坏性，数据因此可能会丢失！如果真是发生了数据丢失又希望找回来，那么只有使用：[git reflog](http://blog.csdn.net/ibingow/article/details/7541402)命令了。makes everything match the commit you have reset to.你的所有本地修改将丢失。<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/368754/1588993245194-995cbc6e-2f72-483b-927b-65bf950dd52d.png#align=left&display=inline&height=68&margin=%5Bobject%20Object%5D&name=image.png&originHeight=188&originWidth=800&size=11107&status=done&style=none&width=292)<br />**--mixed**是 reset 的默认参数，也就是当你不指定任何参数时的参数。它将重置 HEAD 到另外一个 commit,并且重置 index 以便和 HEAD 相匹配，但是也到此为止。working copy 不会被更改。所有该 branch 上从 original HEAD（commit）到你重置到的那个 commit 之间的所有变更将作为 local modifications 保存在 working area 中，（被标示为 local modification or untracked via git status)，但是并未 staged 的状态，你可以重新检视然后再做修改和 commit<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/368754/1588993291670-b094ff01-3629-4242-a39f-8b176ab4047a.png#align=left&display=inline&height=68&margin=%5Bobject%20Object%5D&name=image.png&originHeight=136&originWidth=580&size=18780&status=done&style=none&width=290)<br />
<br />
<br />[https://www.cnblogs.com/kidsitcn/p/4513297.html](https://www.cnblogs.com/kidsitcn/p/4513297.html)<br />
<br />![](https://cdn.nlark.com/yuque/0/2019/jpeg/368754/1563344285441-e42c61c2-4b6c-4c51-82f8-fd4d2f69bd45.jpeg#align=left&display=inline&height=234&margin=%5Bobject%20Object%5D&originHeight=234&originWidth=458&size=0&status=done&style=none&width=458)<br />

<a name="a44c97d0"></a>

### 撤销修改

<br />场景 1：当改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。<br />
<br />场景 2：当不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景 1，第二步按场景 1 操作。<br />
<br />场景 3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。<br />

```bash
# 没有git add
$ git checkout -- <file>

# git add了，还没有commit
$ git reset HEAD <file>
$ git checkout -- <file>
```

<br />
<br />`git checkout`其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。<br />

<a name="53518c22"></a>

### 删除文件

<br />在文件管理器中把没用的文件删了，或者用`rm`命令删了。<br />

```bash
$ rm filename
```

<br />此时 `git status`可查看到你删除的记录。<br />
<br />确实要从版本库中删除该文件，那就用命令 git rm 删掉，并且 git commit：<br />

```bash
$ git rm filename
$ git commit
```

<br />先手动删除文件，然后使用 git rm 和 git add 效果是一样的。<br />

<a name="5aa52869"></a>

## 分支管理

<a name="b8070dcb"></a>

### 分支增删改

<br />查看分支：`git branch`<br />
<br />创建分支：`git branch <name>`<br />
<br />切换分支：`git checkout <name>`<br />
<br />创建+切换分支：`git checkout -b <name>`<br />
<br />合并某分支到当前分支：`git merge <name>`<br />
<br />删除分支：`git branch -d <name>`<br />
<br />删除远程分支 `git push origin -d <branch name>`<br />
<br />本地分支重命名 `git branch-m oldName newName`<br />

<a name="800b54cc"></a>

### 解决冲突

<br />修改同一个文件同一地方容易产生冲突<br />

```bash
$ git log —graph 								查看分支合并图
$ git log --graph --pretty=oneline --abbrev-commit

git log --graph --pretty=format:'%Cred%h - %Cgreen[%an]%Creset -%C(yellow)%d%Creset %s %C(yellow)<%cr>%Creset' --abbrev-commit --date=relative
```

<br />获取冲突文件名称<br />

```bash
$ git ls-files --unmerged
```

<br />[https://jsproxy.ga/-----http://www.voidcn.com/article/p-qbuzqlan-bud.html](https://jsproxy.ga/-----http://www.voidcn.com/article/p-qbuzqlan-bud.html)<br />

<a name="5317a015"></a>

### git stash

<br />在工作中会发现，当我们做的修改如果没有 add commit 是无法切换分支的，当目前分支中的工作没有完成，就像切换到其他分支处理 bug，就必须使用 stash。<br />
<br />`git stash` 可以理解是暂存当前的修改。<br />
<br />`git stash lish` 查看当期 stash 内容。<br />
<br />恢复的方法：<br />
<br /> 1 用`git stash apply`恢复，但是恢复后，stash 内容并不删除，需要用`git stash drop`来删除；<br />
<br /> 2 用`git stash pop`，恢复的同时把 stash 内容也删了<br />

<a name="374d26f3"></a>

### 多人分支开发

- 查看远程库信息，使用`git remote -v`；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；
- 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用`git branch --set-upstream-to origin/<branch-name> <branch-name>`；
- 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

<a name="6f808f5a"></a>

## git pull

1. 拉取远程某分支并与本地某一分支合并（没有则默认会创建）： `git pull<远程主机名><远程分支名>:<本地分支名>`。
1. 如果远程分支是与当前所在分支合并，则冒号后面的部分可以省略： `git pull<远程主机名><远程分支名>`。
1. 如果当前分支与远程分支存在追踪关系，则可以省略远程分支名： `git pull<远程主机名>`。
1. 如果当前分支只有一个追踪分支，则远程主机名都可以省略： `git pull`。

<a name="0380e71d"></a>

## git push

1. 将本地分支推送到远程分支： `git push<远程主机名><本地分支名>:<远程分支名>`。
   <br />git push origin master:master
1. 如果省略远程分支名，则默认为将本地分支推送到与之关联的远程分支：(一般设置本地分支和与之关联的远程分支同名，防止混淆) `git push<远程主机名><本地分支名>`。
   <br />如果对应的远程分支不存在，则会被创建（m 默认与本地分支同名）。
   <br />git push origin master
1. 如果省略本地分支名，则表示删除指定的远程分支，这等同于推送一个空的本地分支到对应远程分支： `git push origin:<远程分支>`等同于 `git push origin--delete<远程分支>`

<a name="2ec512a4"></a>

## 标签管理

<br /> ……..<br />
<br />

<a name="0d98c747"></a>

## 其他

<a name="305cf65c"></a>

### 禁用 Fast forward 模式

<br />如果要强制禁用`Fast forward`模式，Git 就会在 merge 时生成一个新的 commit，这样，从分支历史上就可以看出分支信息。`fast forward`合并就看不出来曾经做过合并。<br />

```bash
$ git merge --no-ff -m "merge with no-ff" dev   其中--no-ff表示禁用
```

<a name="8247e209"></a>

### Git 密码更新

```bash
$ git config --global --unset user.password
```

<br />执行以上命令，当与远程库有交互，会让我们重新输入账号密码<br />
<br /><br />
<br /><br />
<br /><br />

## 参考文档

<br />[https://git-scm.com/book/zh/v1/](https://git-scm.com/book/zh/v1/)<br />
