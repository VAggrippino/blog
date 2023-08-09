---
id: 635
title: 'WordPress Update Failed'
date: '2019-05-22T13:06:19+08:00'
author: 'Vince Aggrippino'
layout: post
guid: 'https://www.aggrippino.com/?p=635'
permalink: /wordpress-update-failed/
inline_featured_image:
    - '0'
image: /wp-content/uploads/2019/05/20190522_101438_WordPress_Update_failed-min.png
categories:
    - WordPress
tags:
    - error
    - PHP
    - update
    - wordpress
published: true
---
## {{ title }}
<div class="wp-block-image"><figure class="aligncenter">![WordPress update error message](https://i0.wp.com/www.aggrippino.com/wp-content/uploads/2019/05/20190522_101438_WordPress_Update_failed-min.png?resize=661%2C300&ssl=1)</figure></div><div style="background-color: beige; padding: 0 1rem 1rem 1rem; margin: 1rem; box-shadow: 0 0.25rem 0.25rem 1px rgba(0, 0, 0, 0.3);">## tl;dr

 When WordPress fails to do something automatically, it’s almost always a permissions problem. This is no exception.

 I haven’t found an easy and secure way to enable automatic WordPress updates. The only way I have found is to make all WordPress files and folders writable by the web server process…

 `    chgrp -R web ...  ` This isn’t a good solution, but it may be the only option for clients that can’t do updates any other way. It’s too insecure and it’s not suitable for a production website. I need to keep looking for a better way. I’ll be looking into other ways of *Hardening WordPress* as well.

</div>## Rejected “Solutions”:

### Change all the permissions

Any answer that includes `chmod -R 777 ...` or `chgrp -R ...` introduces a security problem. If you do this, anyone who visits your site can potentially add/delete/modify files and run arbitrary code.

By the way, most web hosts run their services in a Unix-like environment. If you’re not familiar with [Unix file and directory permissions](https://en.wikipedia.org/wiki/File_system_permissions#Traditional_Unix_permissions), it’s a good idea to learn.

### Manual upgrade

If you say the only solution is to do a manual upgrade, you’re basically giving up on WordPress’ automated tools. It doesn’t fix anything and I’d almost certainly face the same problem next time it’s time for an upgrade.

### Don’t use automation

Some would say that we sacrifice security when we rely on WordPress’ automated tools for installing themes, installing plugins, or performing updates. We should perform all server-side administration manually because it’s more secure.

Well, that’s a valid point. However, I’d argue that just by using WordPress we paint a big target on our website for hackers.

A site built with read-only files written in static HTML and CSS and no database would no doubt be more secure than any WordPress site, but we trad some of that security for the power and convenience of WordPress. There should be a way to balance security and convenience.

This option also doesn’t work for clients who are less technically inclined. I build sites for people who aren’t interested in learning about SSH, tar, and gzip. And I’m not interested in performing manual updates for a hundred clients with automatic updates disabled.

## Finding my own way:

I started looking into the code with ` update-core.php `, which was mentioned in the error message. I’m not going to go into detail on the whole convoluted process, but the gist of it is that it checks a list of files for writability and if it finds any that can’t be overwritten, it appends their names to the end of the error message.

In this case there’s only one file, but I want to try and make this future-proof if I can.

Here’s a relevant block of the code from `wp-admin\includes\update-core.php`:

```
<pre class="wp-block-code">```
// If we're using the direct method, we can predict write failures that are due to permissions.
if ( $check_is_writable && 'direct' === $wp_filesystem->method ) {
  $files_writable = array_filter( $check_is_writable, array( $wp_filesystem, 'is_writable' ) );
  if ( $files_writable !== $check_is_writable ) {
    $files_not_writable = array_diff_key( $check_is_writable, $files_writable );
    foreach ( $files_not_writable as $relative_file_not_writable => $file_not_writable ) {
      // If the writable check failed, chmod file to 0644 and try again, same as copy_dir().
      $wp_filesystem->chmod( $file_not_writable, FS_CHMOD_FILE );
      if ( $wp_filesystem->is_writable( $file_not_writable ) ) {
        unset( $files_not_writable[ $relative_file_not_writable ] );
      }
    }

    // Store package-relative paths (the key) of non-writable files in the WP_Error object.
    $error_data = version_compare( $old_wp_version, '3.7-beta2', '>' ) ? array_keys( $files_not_writable ) : '';

    if ( $files_not_writable ) {
      return new WP_Error( 'files_not_writable', __( 'The update cannot be installed because we will be unable to copy some files. This is usually due to inconsistent file permissions.' ), implode( ', ', $error_data ) );
    }
  }
}
```
```

## Conclusion:

A WordPress update might need to overwrite any of the files that are part of the installation. It might need to add new files, too. As far as I can tell, the only way is to make all of these files and directories writable by the (UNIX / Linux) user that runs the website. That’s not a solution.