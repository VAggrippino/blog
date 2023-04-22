---
title: Use Vim as a Pager
date: 2023-04-22
---
I wanted to be able to scroll a `man` page in the terminal with my mouse wheel. While looking for a setting to change, I learned that Vim can be used as a pager allowing mouse support and much more.
Inspired by [this entry at the Vim Tips Wiki](https://vim.fandom.com/wiki/Using_vim_as_a_man-page_viewer_under_Unix), I decided to set it up for myself, but with a few minor changes. I did all this in WSL with Ubuntu 20.04.6 and Zsh on Windows 11, but it should work as well with any Unix or Linux variant:

`~/.zshrc`:
```bash
export PAGER="/bin/sh -c \"unset PAGER;col -b -x | vim -R \
    -c 'set ft=man mouse=a nonumber' \
    -c 'highlight Normal ctermbg=NONE guibg=NONE' \
    -c 'map q :q<CR>' \
    -c 'map <SPACE> <C-D>' \
    -c 'map b <C-U>' \
    -c 'nmap K :Man <C-R>=expand(\\\"<cword>\\\")<CR><CR>' -\""
```

This is very similar to what was documented in the Vim Tips Wiki, but I've made a few changes to suit my needs...

- `/bin/sh -c` executes a command with the most basic shell on the system (Bash on most modern systems)
- `col -b -x` filters out reverse line feeds used by `man` to show underlined text when outputting directly to the console.
- `vim -R` starts Vim in read-only mode
    - I initially replaced this with `nvim`, but the key mapping for the `q` key doesn't work with Neovim.
- `-c 'set ft=man mouse=a nonumber'`
    - `-c`: executes a command in Vim. This line `set`s a few options
    - `ft=man` (a.k.a. `filetype=man`) enables proper syntax highlighting for `man` pages
    - `mouse=a`: enables mouse support for all editor modes
    - `nonumber`: turns off the line numbers I usually have enabled for editing code
- `-c 'highlight Normal ctermbg=NONE guibg=NONE'`: This disables the background color that I use in the editor when editing code so that my terminal transparency is still in effect.
- The rest of the lines change some key mappings so that it works in a familiar way if you're used to `less` (the default pager for `man` pages)

