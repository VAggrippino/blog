---
title: Starting Your Terminal with tmux
HTMLTitle: "Starting Your Terminal with <code>tmux</code>"
date: 2023-04-22
published: true
---
## {{ title }}

I am getting more comfortable with [`tmux`](https://github.com/tmux/tmux/wiki) and I want to make sure I don't forget to use it when I'm at the command prompt. So, I made a simple Bash script to automatically connect to an existing session or start a new session when I start my terminal:

`tmux-start.sh`:
```bash
#!/bin/bash
tmux ls > /dev/null ; [ $? == 0 ] && tmux attach || tmux
```

- `tmux ls` will list existing sessions, but I'm dumping that output and just using its return value which will be `0` if there are any existing sessions.
- `$?` is the return value of the previous command
- `&&` ... `||` is basically equivalent to a ternary operator in other programming languages
