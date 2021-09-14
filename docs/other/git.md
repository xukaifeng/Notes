---
title: Git记录
order: 1
nav:
  title: Other
  order: 1
---

## global config

```bash
git config --global -l
git config --global user.email "eamil@example.com"
```

<br />

## .gitignore

模板

```bash
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/npm-debug.log*
/yarn-error.log

/.idea
/.vscode
# production
dist
.cache
stats.json
# misc
.DS_Store

.idea
.vscode
.history

```

**.gitignore 文件内容更新步骤：**<br />git 更新 ignore 文件直接修改 gitignore 是不会生效的，需要先去掉已经托管的文件，修改完成之后再重新添加并提交。

- git rm -r --cached .

去掉已经托管的文件

- 修改自己的 igonre 文件内容
- git add .
- git commit -m "clear cached"

<br />

## 创建版本库

### 初始化

```bash
$ mkdir Test
$ cd Test
$ git init
```

<br />执行完 git init 将会在文件夹下产生`.git` 文件夹，用来跟踪管理版本库，默认是隐藏的，可使用`ls -ah`查看到。<br />

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

## 开发中常用

### 查看状态和变更

```bash
$ git status  							查看工作区状态
$ git diff <filename> 			查看工作区该文件与版本库中当前分支上该文件之间的差异
```

<br />注意`git diff`在`git add`之前使用有效<br />

### 查看历史记录

```bash
$ git log 									查看最近到最远的提交记录
$ git log --pretty=oneline  查看最近到最远的提交记录,每条显示一行

$ git reflog 								查看我们每一次命令
```

### 版本回退

<br />Git 必须知道当前版本是哪个版本，在 Git 中，用`HEAD`表示当前版本，上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上 100 个版本写 100 个`^`比较容易数不过来，所以写成`HEAD~100`；<br />

```bash
$ git reset --hard HEAD^ 		回退到上一个版本
$ git reset --hard commitId 回退到指定的commitId
```

<br />**git reset 和 git revert 的比较：**

1. git revert 是生成一个新的提交来撤销某次提交，此次提交之前的 commit 都会被保留。<br />撤销某次操作，提交一个新的版本，将需要 revert 的版本的内容再反向修改回去，版本会递增，不影响之前提交的内容。
1. git reset 是回到某次提交，提交及之前的 commit 都会被保留。<br />git reset 可以有不同参数：<br />`git reset [--soft | --mixed | --hard | --merge | --keep] [-q] [<commit>]`

<br />**git reset 有三个参数  --soft, --mixed, --hard, 默认是 --mixed**<br />**--soft**参数告诉 Git 重置 HEAD 到另外一个 commit。如果你指定--soft 参数，index,working copy 都不会做任何变化，所有的在 original HEAD 和你重置到的那个 commit 之间的所有变更集都放在 index(暂存库)中。<br />![screenshot-20210914-232009.png](https://i.loli.net/2021/09/14/U6nWrhATmHJlMIv.png)<br />**--hard**参数将会 blow out everything.它将重置 HEAD 返回到另外一个 commit(取决于~12 的参数），重置 index 以便反映 HEAD 的变化，并且重置 working copy 也使得其完全匹配起来。这是一个比较危险的动作，具有破坏性，数据因此可能会丢失！如果真是发生了数据丢失又希望找回来，那么只有使用：[git reflog](http://blog.csdn.net/ibingow/article/details/7541402)命令了。你的所有本地修改将丢失。<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/368754/1588993245194-995cbc6e-2f72-483b-927b-65bf950dd52d.png#align=left&display=inline&height=69&id=FG8Os&margin=%5Bobject%20Object%5D&name=image.png&originHeight=188&originWidth=800&size=11107&status=done&style=none&width=292)<br />**--mixed**是 reset 的默认参数，。所有该 branch 上从 original HEAD（commit）到你重置到的那个 commit 之间的所有变更将作为 local modifications 保存在 working area 中，你可以重新修改代码再 commit。<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/368754/1588993291670-b094ff01-3629-4242-a39f-8b176ab4047a.png#align=left&display=inline&height=68&id=xM92c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=136&originWidth=580&size=18780&status=done&style=none&width=290)<br />

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

## 分支管理

### 分支增删改

<br />查看分支：`git branch`<br />
<br />创建分支：`git branch <name>`<br />
<br />切换分支：`git checkout <name>`<br />
<br />创建+切换分支：`git checkout -b <name>`<br />
<br />合并某分支到当前分支：`git merge <name>`<br />
<br />删除分支：`git branch -d <name>`<br />
<br />删除远程分支 `git push origin -d <branch name>`<br />
<br />本地分支重命名 `git branch-m oldName newName`<br />

### 解决冲突

<br />修改同一个文件同一地方容易产生冲突<br />

```bash
$ git log —graph 								查看分支合并图
$ git log --graph --pretty=oneline --abbrev-commit

git log --graph --pretty=format:'%C(red)%h - %Cgreen[%an]%Creset -%C(blue)%d%Creset %s %C(yellow)<%cd>%Creset' --abbrev-commit --date=format:'%Y-%m-%d %H:%M:%S'
# 设置别名样式  https://www.cnblogs.com/bellkosmos/p/5923439.html
git config --global alias.logs "log --graph --pretty=format:'%C(red)%h - %Cgreen[%an]%Creset -%C(blue)%d%Creset %s %C(yellow)<%cd>%Creset' --abbrev-commit --date=format:'%Y-%m-%d %H:%M:%S'"
```

<br />获取冲突文件名称<br />

```bash
$ git ls-files --unmerged

!git ls-files -u | cut -f 2 | sort -u
```

<br />[http://www.voidcn.com/article/p-qbuzqlan-bud.html](http://www.voidcn.com/article/p-qbuzqlan-bud.html)<br />

### git stash

<br />在工作中会发现，当我们做的修改如果没有 add commit 是无法切换分支的，当目前分支中的工作没有完成，就像切换到其他分支处理 bug，就必须使用 stash。<br />
<br />`git stash` 暂存当前的修改（不包含新增文件）。<br />
<br />`git stash -u` 暂存当前的修改（包含新增文件）。<br />
<br />`git stash list` 查看当期 stash 内容。<br />
<br />恢复的方法：<br />
<br /> 1 用`git stash apply`恢复，但是恢复后，stash 内容并不删除，需要用`git stash drop`来删除；<br />
<br /> 2 用`git stash pop`，恢复的同时把 stash 内容也删了<br />

### 多人分支开发

- 查看远程库信息，使用`git remote -v`；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；
- 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用`git branch --set-upstream-to origin/<branch-name> <branch-name>`；
- 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

```bash

git remote add origin git@github.com:userName/Linux_base.git
```

## git pull

1. 拉取远程某分支并与本地某一分支合并（没有则默认会创建）： `git pull<远程主机名><远程分支名>:<本地分支名>`。
1. 如果远程分支是与当前所在分支合并，则冒号后面的部分可以省略： `git pull<远程主机名><远程分支名>`。
1. 如果当前分支与远程分支存在追踪关系，则可以省略远程分支名： `git pull<远程主机名>`。
1. 如果当前分支只有一个追踪分支，则远程主机名都可以省略： `git pull`。

## git push

1. 将本地分支推送到远程分支： `git push<远程主机名><本地分支名>:<远程分支名>`。<br />git push origin master:master
1. 如果省略远程分支名，则默认为将本地分支推送到与之关联的远程分支：(一般设置本地分支和与之关联的远程分支同名，防止混淆) `git push<远程主机名><本地分支名>`。<br />如果对应的远程分支不存在，则会被创建（m 默认与本地分支同名）。<br />git push origin master
1. 如果省略本地分支名，则表示删除指定的远程分支，这等同于推送一个空的本地分支到对应远程分支： `git push origin:<远程分支>`等同于 `git push origin--delete<远程分支>`

## 标签管理

Git 可以给仓库历史中的某一个提交打上标签，以示重要<br />

1. 列出标签

```bash
git tag
```

2. 创建标签

```bash
git tag -a v1.4 -m "my version 1.4"

git tag v1.4-lw

git tag -a v1.2 <commitId>
```

3. 其他

```bash
# 查看标签详情
git show v1.1

# 共享标签
git push origin v1.5

# 删除标签
git tag -d v1.4-lw

# 删除远程标签
git push origin --delete <tagname>

# 检出标签
git checkout 2.0.0
```

## 其他

MacOS 系统下会默认生成.DS_Store 文件，.DS_Store 是 Mac OS 保存文件夹的自定义属性的隐藏文件。连带.DS_Store 发布后可能造成风险<br />[https://blog.csdn.net/chao2016/article/details/78985749](https://blog.csdn.net/chao2016/article/details/78985749)<br />
<br />或<br />
<br />build 命令后追加

```bash
&&  find ./dist -name ".DS_Store" -depth -exec rm {} \;
## 也许你要转义 哈哈哈哈
&& find ./dist -name \".DS_Store\" -depth -exec rm {} \\;",
```

### 禁用 Fast forward 模式

<br />如果要强制禁用`Fast forward`模式，Git 就会在 merge 时生成一个新的 commit，这样，从分支历史上就可以看出分支信息。`fast forward`合并就看不出来曾经做过合并。<br />

```bash
$ git merge --no-ff -m "merge with no-ff" dev   其中--no-ff表示禁用
```

### Git 密码更新

```bash
$ git config --global --unset user.password
```

<br />执行以上命令，当与远程库有交互，会让我们重新输入账号密码<br />

### 修改已提交的用户邮箱

```bash
修改邮箱地址:
git config --global user.email "eamil@example.com"

git config --global user.email "953555581@qq.com"
git config --global user.email "kaifeng@dtstack.com"

查看当前邮箱:
git config user.email

git config alias.change-commits '!'"f() { VAR=\$1; OLD=\$2; NEW=\$3; shift 3; git filter-branch --env-filter \"if [[ \\\"\$\`echo \$VAR\`\\\" = '\$OLD' ]]; then export \$VAR='\$NEW'; fi\" \$@; }; f "

## 近3次提交
git change-commits GIT_AUTHOR_EMAIL "oldEmail@example.com" "newEmail@example.com" HEAD~3..HEAD

# 删除备份
git update-ref -d refs/original/refs/heads/master
```

## 全局配置参考

```bash
1 git config -e --global 进入全局配置文件
2 点击字母i,进入编辑状态，可以修改里面的内容。
3 退出，按下ESC,  输入 :wq 保存退出。输入 :q,退出不保存。

alias.conflicts=!git ls-files -u | cut -f 2 | sort -u
alias.ch=checkout
alias.ss=status
alias.logs=log --graph --pretty=format:'%C(red)%h - %Cgreen[%an]%Creset -%C(blue)%d%Creset %s %C(yellow)<%cd>%Creset' --abbrev-commit --date=format:'%Y-%m-%d %H:%M:%S'
```

<br />
<br />[https://git-scm.com/book/zh/v1/](https://git-scm.com/book/zh/v1/)<br />
