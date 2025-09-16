<?php
/**
 * Plugin Name: GenerateBlocks & GenerateBlocks Pro Style Revert
 * Plugin URI: https://github.com/studiomango/generateblocks-style-revert
 * Description: Adds undo/redo buttons for GenerateBlocks and GenerateBlocks Pro block style changes.
 * Version: 1.1.0
 * Author: Studio Mango
 * Author URI: https://mango.is
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: gb-style-revert
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Enqueue the script and styles
add_action( 'enqueue_block_editor_assets', function() {
    // Load if GenerateBlocks is active (covers both free and pro)
    $should_load = defined( 'GENERATEBLOCKS_VERSION' );
    
    if ( ! $should_load ) {
        return;
    }
    
    wp_enqueue_script(
        'gb-style-revert',
        plugin_dir_url( __FILE__ ) . 'style-revert-floating.js',
        array( 'wp-data', 'lodash' ),
        '1.1.0',
        true
    );
    
    wp_enqueue_style(
        'gb-style-revert',
        plugin_dir_url( __FILE__ ) . 'style-revert.css',
        array(),
        '1.1.0'
    );
}, 20 );
