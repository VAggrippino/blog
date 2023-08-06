---
id: 663
title: 'Fully Integrate Linux into VS Code on Windows'
date: '2019-06-13T15:56:12+08:00'
author: 'Vince Aggrippino'
layout: post
guid: 'https://www.aggrippino.com/?p=663'
permalink: /fully-integrate-linux-into-vs-code-on-windows/
inline_featured_image:
    - '0'
image: /wp-content/uploads/2019/05/20190531_075440_VSCode_Integrated_WSL-min.png
categories:
    - Software
    - Windows
    - WSL
tags:
    - HowTo
    - VSCode
    - WSL
---

> Linux is a cancer that attaches itself in an intellectual property sense to everything it touches.
> 
> <cite>Steve Ballmer, Microsoft CEO, June 2001</cite>

This ain’t yer Dad’s Microsoft…

In the past few years, Microsoft has made [Visual Studio Code](https://code.visualstudio.com/), the [free](https://directory.fsf.org/wiki/Visual_Studio_Code) code editor that runs everywhere, into [the preferred choice](https://insights.stackoverflow.com/survey/2019?utm_source=Iterable&utm_medium=email&utm_campaign=dev-survey-2019#technology-_-most-popular-development-environments) of many developers. And, rather than relentlessly pushing their own alternative, they’ve built the Linux command line into Windows as the [Windows Subsystem for Linux](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux).

If you’re like me, you’ve already set up both your <abbr title="Windows Subsystem for Linux">WSL</abbr> Linux shell and your VS Code environment just how you like ’em. But when you open the integrated terminal, you’re disappointed to see a Powershell prompt …

<div class="wp-block-image"><figure class="aligncenter">[![VS Code integrated Powershell terminal](https://i0.wp.com/www.aggrippino.com/wp-content/uploads/2019/06/20190624_113508_VSCode_integrated_Powershell_terminal-min.jpg?resize=1024%2C268&ssl=1)](https://www.aggrippino.com/fully-integrate-linux-into-vs-code-on-windows/20190624_113508_vscode_integrated_powershell_terminal-min/)<figcaption>VS Code’s default integrated terminal is Powershell</figcaption></figure></div>Let’s fix that …

<style>
  .va-tldr {
    background-color: beige;
    padding: 0 1rem 1rem 1rem;
    margin: 1rem;
    box-shadow: 0 0.25rem 0.25rem 1px rgba(0, 0, 0, 0.3);
  }

  .va-tldr--code {
    font-size: 0.75em;
  }
</style><div class="va-tldr">## tl;dr

1. Set your integrated shell:  
     ```
    <pre class="wp-block-code">        ```
    "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\wsl.exe"
    ```
          
    ```
2. Install the [Remote Development Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
3. Open your project from the Linux shell
4. Install extensions in WSL
 
</div>\[ez-toc\]

## Use the right shell

[By default](https://code.visualstudio.com/docs/terminal/basics#_terminal-shells), VS Code uses Powershell on Windows 10, but it’s easy to change. Just set the path to your WSL executable as the integrated shell for Windows in your settings:

1. Click the gear icon near the lower left corner.
2. Click Settings, then click the curly braces near the upper right corner.
    - This opens the `settings.json` file directly rather than using the GUI to change the setting. If you prefer the GUI, read more below.
3. Add a property for `terminal.integrated.shell.windows` and set it to the full path to `wsl.exe`.
    - You have to double-up the backslashes in the path definition because JSON uses the backslash as an escape character.
    - Don’t forget to add a comma at the end of the previous entry, or at the end of this new entry if you’re not putting it at the end.

```
<pre class="wp-block-code">```
"terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\wsl.exe"
```
```

<div class="wp-block-image"><figure class="aligncenter">[![Add WSL as integrated terminal for Windows in settings.json](https://i0.wp.com/www.aggrippino.com/wp-content/uploads/2019/06/20190603_210624_Change_settings.json-GIMP-min.gif?resize=1200%2C628&ssl=1)](https://www.aggrippino.com/fully-integrate-linux-into-vs-code-on-windows/20190603_210624_change_settings-json-gimp-min/)<figcaption>Changing the integrated shell in settings.json</figcaption></figure></div><style>
  .va-manual-accordion {
    --border-radius: 0.25rem;
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
  }

  .va-manual-accordion[open] .va-manual-accordion--title {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .va-manual-accordion--title {
    background-color: whitesmoke;
    padding: 0.75em 1em;
    display: list-item;
    cursor: pointer;
    transition: background-color 100ms;
    border-radius: var(--border-radius);
    font-weight: bold;
  }

  .va-manual-accordion--content {
    padding-top: 0.5em;
    border-style: solid;
    border-color: whitesmoke;
    border-width: 0 1px 1px;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    box-sizing: border-box;
  }

  summary:hover {
    background-color: gainsboro;
  }

  summary:focus {
    outline: none;
  }
</style><details class="va-manual-accordion"> <summary class="va-manual-accordion--title">If you prefer to change settings in the GUI:</summary><div class="va-manual-accordion--content">1. Click the gear icon near the lower left corner.
2. Click Settings.
3. Enter *integrated shell windows* into the Search Settings field.
4. Enter the full path to wsl.exe as the value of the Terminal﹥Integrated﹥Shell: Windows

<div class="wp-block-image"><figure class="aligncenter">[![Change your integrated shell using the GUI](https://i0.wp.com/www.aggrippino.com/wp-content/uploads/2019/06/20190605_184641_Change_integrated_shell_via_gui-GIMP-min.gif?resize=1200%2C628&ssl=1)](https://www.aggrippino.com/fully-integrate-linux-into-vs-code-on-windows/20190605_184641_change_integrated_shell_via_gui-gimp-min/)<figcaption>Changing the integrated shell using the GUI</figcaption></figure></div> </div></details>Note that this has to go in the User settings. For “[enhanced security](https://code.visualstudio.com/docs/getstarted/settings#_settings-and-security)“, you can’t set a different shell for each workspace (project).

## Make VS Code work *in* Linux

We’ve configured VS Code to open the Linux shell in the integrated terminal, but it still runs itself in the Windows environment. This is a problem for extensions that work by processing the output of command line tools. You could install them in the Windows shell, but you you wouldn’t be here if you wanted to work in the Windows shell. Besides, most of these tools were written for a <abbr title="Unix-like">\*NIX</abbr> shell. Installation on Windows usually isn’t easy, well-documented, or frequently updated when compared to installation in a Linux shell.

<div class="wp-block-image"><figure class="aligncenter">[![ESLint failed error message in VSCode](https://i0.wp.com/www.aggrippino.com/wp-content/uploads/2019/06/20190612_122001_VSCode_ESLint-failed-min.jpg?resize=1024%2C268&ssl=1)](https://www.aggrippino.com/fully-integrate-linux-into-vs-code-on-windows/20190612_122001_vscode_eslint-failed-min/)<figcaption>The [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) fails on Windows.</figcaption></figure></div>As of the [May 2019 release](https://code.visualstudio.com/updates/v1_35) (or sooner if you’re using [VS Code Insiders](https://code.visualstudio.com/insiders/)), Microsoft has provided a solution for this problem in the [Remote Development Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack). [Remote – WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) (included in the pack) allows VS Code, running from Windows, to work with your code in the Linux shell.

<div class="wp-block-image"><figure class="aligncenter">[![VSCode Remote Development Extension Pack](https://i0.wp.com/www.aggrippino.com/wp-content/uploads/2019/06/20190612_150822_VSCode_Remote-Development_extension.jpg?resize=1024%2C536&ssl=1)](https://www.aggrippino.com/fully-integrate-linux-into-vs-code-on-windows/20190612_150822_vscode_remote-development_extension/)<figcaption>Install the Remote Development Extension Pack</figcaption></figure></div>The first time you run VS Code from the Linux shell after installing the extension pack, it’ll spend some time “Installing VS Code Server”.

## Install Extensions in WSL

Now that everything’s ready to go, you have to tell VS Code which of your extensions you want to work in WSL. Extensions that are already installed locally will have an “Install on WSL” button. Extensions that aren’t installed yet will install on WSL by default when you’re working in a WSL project.

<div class="wp-block-image"><figure class="aligncenter">[![VS Code: Install on WSL](https://i0.wp.com/www.aggrippino.com/wp-content/uploads/2019/06/20190612_173437_VSCode_Install-on-WSL-min.jpg?resize=1024%2C536&ssl=1)](https://www.aggrippino.com/fully-integrate-linux-into-vs-code-on-windows/20190612_173437_vscode_install-on-wsl-min/)<figcaption>Install your extensions on WSL</figcaption></figure></div>