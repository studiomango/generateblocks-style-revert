# GenerateBlocks Style Revert

A WordPress plugin that adds undo/redo functionality for GenerateBlocks and GenerateBlocks Pro block style changes.

![WordPress](https://img.shields.io/badge/WordPress-5.0%2B-blue.svg)
![GenerateBlocks](https://img.shields.io/badge/GenerateBlocks-Required-green.svg)
![License](https://img.shields.io/badge/License-GPL%20v2-blue.svg)

## ⚠️ Important Note

This is **not an official plugin** - it's a community solution while the GenerateBlocks team works on an official fix.

📢 **Follow the official discussion**: [Undo/Redo Actions in Gutenberg Editor](https://generate.support/topic/undo-redo-actions-in-gutenberg-editor-dont-seem-to-work-anymore/#post-178392)

## ✨ Features

- 🎯 **Floating Panel**: Small, unobtrusive undo/redo buttons appear when editing GenerateBlocks
- 📚 **Smart History**: Tracks up to 30 style changes per block
- ⚡ **Debounced Tracking**: Prevents intermediate typing states from cluttering history
- 🆓 **Free + Pro Support**: Works with both GenerateBlocks free and Pro versions
- 🔄 **Auto-Detection**: Automatically enables appropriate functionality based on your version

[![GenerateBlocks - Revert style buttons - Watch Video](https://cdn.loom.com/sessions/thumbnails/f51ef922f1044b31a220bb1d26ea4a7d-0f208f8a6726fb89-full-play.gif)](https://www.loom.com/share/f51ef922f1044b31a220bb1d26ea4a7d)

*Click the image above to watch the demo video*

## 🎛️ Supported Blocks

### GenerateBlocks (Free)
- Container
- Headline  
- Button
- Grid
- All other free blocks

### GenerateBlocks Pro
- Accordion & Accordion Items
- Tabs & Tab Items
- Query Loop & Query elements
- All other Pro blocks

## 🚀 Installation

### Method 1: Download from GitHub
1. Download the latest release or clone this repository
2. Upload the plugin folder to `/wp-content/plugins/`
3. Activate through WordPress admin → Plugins

### Method 2: Direct Download
1. Click the green "Code" button → "Download ZIP"
2. Extract the zip file
3. Upload the `generateblocks-style-revert` folder to `/wp-content/plugins/`
4. Activate the plugin

## 💡 How It Works

1. Select any GenerateBlocks or GenerateBlocks Pro block
2. A small floating panel appears in the bottom-right corner
3. Make style changes (colors, spacing, typography, etc.)
4. Use the undo/redo buttons to revert style changes
5. History is independent from WordPress's main undo/redo system

## 📋 Requirements

- WordPress 5.0 or higher
- GenerateBlocks plugin (free or pro version)

## 🛠️ Development

This plugin was created to address a temporary issue where GenerateBlocks style changes weren't properly integrating with WordPress's undo/redo system.

### Built With
- JavaScript (ES6+)
- WordPress Block Editor APIs
- Lodash (for debouncing)

## 📄 License

This project is licensed under the GPL v2 License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/studio-mango/generateblocks-style-revert/issues)
- 💬 **Discussions**: [GenerateBlocks Support Forum](https://generate.support/)
- 🌐 **Studio Mango**: [mango.is](https://mango.is)

## 🙏 Acknowledgments

- Thanks to the GenerateBlocks team for their amazing plugin
- Thanks to the WordPress community for feedback and testing

---

Made with ❤️ by [Studio Mango](https://mango.is)
