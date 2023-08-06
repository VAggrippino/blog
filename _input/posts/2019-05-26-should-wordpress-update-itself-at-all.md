---
id: 654
title: 'Should WordPress update itself at all?'
date: '2019-05-26T04:32:28+08:00'
author: 'Vince Aggrippino'
layout: post
guid: 'https://www.aggrippino.com/?p=654'
permalink: /should-wordpress-update-itself-at-all/
inline_featured_image:
    - '0'
image: /wp-content/uploads/2019/05/WordPress_Security_header-min.jpg
categories:
    - Security
    - WordPress
tags:
    - FTP
    - security
    - SSH
    - wordpress
---

Most of the time, when you need to update a plugin, a theme, or even WordPress core, you just click an update button and the rest is handled *automagically*. This works because web hosts usually set the web server to use the same user as the one that owns the files. This has some inherent security problems.

[My current hosting provider](https://www.nearlyfreespeech.net/) takes an *opinionated* approach to security which, among other things, breaks WordPress’ automated updates by default. They even discourage the use of FTP, calling it “[an obsolete protocol that should never be used](https://members.nearlyfreespeech.net/forums/viewtopic.php?t=10232&highlight=wordpress+ftp#50031)“.

## Direct file modification or FTP?

Now that I understand the cause of the problem, I can easily fix it by changing the appropriate file and directory permissions. In fact, the first solution I’d be likely to find on the web would be to just recursively remove restrictions (`chmod 777`) on certain directories. But my host’s admin team isn’t wrong. As the Hardening WordPress article at wordpress.org [explains](https://wordpress.org/support/article/hardening-wordpress/#file-permissions) “allowing write access to your files is potentially dangerous”.

## Secure Shell?

SSH seems like it should be a better solution. The login process itself is more secure than FTP and it allows you to perform updates with a different user than the one the web server uses. WordPress even has limited inbuilt support for SSH. The problem here is that it requires you to put your SSH login credentials within reach of WordPress and that usually means they’re also within reach of the entire Internet. This presents a far greater risk than file and directory permissions.

## Conclusion

I thought that if automated updates are a basic WordPress feature, there must be way to get it to work without compromising security. But I’ve done a lot of reading and performed a lot of trial and error. I’ve even read carefully through code to understand the process more fully. After all that, I’m beginning to agree with the idea that WordPress shouldn’t update itself. Yes, you can get it to work but there’s always a trade-off between security and convenience. It would only take one bad experience to make you regret avoiding a few manually typed SSH commands.