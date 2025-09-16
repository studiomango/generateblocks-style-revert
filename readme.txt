=== GenerateBlocks & GenerateBlocks Pro Style Revert ===
Contributors: studiomango
Tags: generateblocks, undo, redo, styles, generateblocks-pro
Requires at least: 5.0
Tested up to: 6.4
Stable tag: 1.1.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Plugin URI: https://github.com/studiomango/generateblocks-style-revert

Adds undo/redo functionality for GenerateBlocks and GenerateBlocks Pro block style changes.

== Description ==

This plugin adds a small floating panel with undo/redo buttons that appears when you're editing GenerateBlocks or GenerateBlocks Pro blocks. It tracks style changes independently from WordPress's main undo/redo system, allowing you to revert style changes without affecting content changes.

Features:
* Floating undo/redo buttons appear when editing supported blocks
* Tracks up to 30 style changes per block
* Debounced tracking prevents intermediate typing states from being saved
* Works with all GenerateBlocks free blocks (Container, Headline, Button, Grid, etc.)
* Works with all GenerateBlocks Pro blocks (Accordion, Tabs, Query Loop, etc.)
* Automatically detects which version you have and enables appropriate functionality

== Supported Blocks ==

**GenerateBlocks (Free):**
* Container, Headline, Button, Grid, and all other free blocks

**GenerateBlocks Pro:**
* Accordion & Accordion Items
* Tabs & Tab Items  
* Query Loop & Query elements
* All other Pro blocks

== Note ==

This is not an official plugin - it's a community solution while the GenerateBlocks team works on an official fix. 

Follow the official discussion for updates: https://generate.support/topic/undo-redo-actions-in-gutenberg-editor-dont-seem-to-work-anymore/#post-178392

== Installation ==

1. Upload the plugin folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. The floating panel will automatically appear when editing supported blocks

== Requirements ==

* GenerateBlocks plugin (free or pro version)
* WordPress 5.0 or higher

== Changelog ==

= 1.1.0 =
* Added support for GenerateBlocks Pro blocks
* Updated plugin name to reflect expanded functionality
* Clarified compatibility with both free and pro versions

= 1.0.0 =
* Initial release with GenerateBlocks free support
