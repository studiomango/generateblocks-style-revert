/**
 * GenerateBlocks & GeneratePress Style Revert - Floating Panel
 * Adds undo/redo functionality for GenerateBlocks and GeneratePress Premium block style changes
 */
(function() {
    const { subscribe, select, dispatch } = wp.data;
    const { debounce } = window.lodash || {};
    
    // History storage
    const blockHistory = new Map();
    let currentBlockId = null;
    let floatingPanel = null;
    let isUpdatingFromHistory = false;
    let lastSeenAttributes = null;
    let pendingAttributes = null;
    
    // Check if block is supported (GenerateBlocks and GenerateBlocks Pro blocks)
    function isSupportedBlock(blockName) {
        if (!blockName) return false;
        
        // GenerateBlocks and GenerateBlocks Pro support
        if (blockName.startsWith('generateblocks/') || blockName.startsWith('generateblocks-pro/')) {
            return true;
        }
        
        return false;
    }
    
    // Create floating panel
    function createFloatingPanel() {
        const panel = document.createElement('div');
        panel.className = 'gb-style-revert-floating';
        panel.innerHTML = `
            <div class="gb-style-revert-buttons">
                <button id="gb-style-undo" class="gb-style-revert-btn" disabled>
                    <span class="dashicons dashicons-undo"></span>
                </button>
                <button id="gb-style-redo" class="gb-style-revert-btn" disabled>
                    <span class="dashicons dashicons-redo"></span>
                </button>
            </div>
            <div class="gb-style-revert-info"></div>
        `;
        
        document.body.appendChild(panel);
        
        // Add event listeners
        panel.querySelector('#gb-style-undo').addEventListener('click', handleUndo);
        panel.querySelector('#gb-style-redo').addEventListener('click', handleRedo);
        
        return panel;
    }
    
    // Update UI state
    function updateUI() {
        if (!floatingPanel || !currentBlockId) return;
        
        const history = blockHistory.get(currentBlockId);
        if (!history) return;
        
        const undoBtn = floatingPanel.querySelector('#gb-style-undo');
        const redoBtn = floatingPanel.querySelector('#gb-style-redo');
        const info = floatingPanel.querySelector('.gb-style-revert-info');
        
        undoBtn.disabled = history.currentIndex <= 0;
        redoBtn.disabled = history.currentIndex >= history.snapshots.length - 1;
        
        info.textContent = `${history.currentIndex + 1} / ${history.snapshots.length}`;
    }
    
    // Add snapshot to history (debounced)
    const addSnapshotDebounced = debounce ? debounce(function() {
        if (!pendingAttributes || !currentBlockId || isUpdatingFromHistory) return;
        
        const history = blockHistory.get(currentBlockId);
        if (!history) return;
        
        const currentSnapshot = JSON.stringify(history.snapshots[history.currentIndex]);
        const pendingSnapshot = JSON.stringify(pendingAttributes);
        
        if (pendingSnapshot !== currentSnapshot) {
            const newSnapshots = history.snapshots.slice(0, history.currentIndex + 1);
            newSnapshots.push({ ...pendingAttributes });
            
            if (newSnapshots.length > 30) {
                newSnapshots.shift();
            }
            
            blockHistory.set(currentBlockId, {
                snapshots: newSnapshots,
                currentIndex: newSnapshots.length - 1
            });
            
            updateUI();
        }
        
        pendingAttributes = null;
    }, 500) : function() {};
    
    // Subscribe to editor changes
    subscribe(() => {
        if (isUpdatingFromHistory) return;
        
        const selectedBlock = select('core/block-editor').getSelectedBlock();
        
        if (!selectedBlock || !isSupportedBlock(selectedBlock.name)) {
            if (floatingPanel) {
                floatingPanel.style.display = 'none';
            }
            currentBlockId = null;
            lastSeenAttributes = null;
            pendingAttributes = null;
            return;
        }
        
        // Show panel
        if (!floatingPanel) {
            floatingPanel = createFloatingPanel();
        }
        floatingPanel.style.display = 'block';
        
        const blockId = selectedBlock.clientId;
        const currentAttributesString = JSON.stringify(selectedBlock.attributes);
        
        // New block selection
        if (blockId !== currentBlockId) {
            currentBlockId = blockId;
            
            if (!blockHistory.has(blockId)) {
                blockHistory.set(blockId, {
                    snapshots: [{ ...selectedBlock.attributes }],
                    currentIndex: 0
                });
            }
            
            lastSeenAttributes = currentAttributesString;
            updateUI();
            return;
        }
        
        // Attributes changed
        if (currentAttributesString !== lastSeenAttributes) {
            pendingAttributes = { ...selectedBlock.attributes };
            addSnapshotDebounced();
            lastSeenAttributes = currentAttributesString;
        }
    });
    
    // Handle undo
    function handleUndo() {
        if (!currentBlockId) return;
        
        const history = blockHistory.get(currentBlockId);
        if (!history || history.currentIndex <= 0) return;
        
        if (addSnapshotDebounced.cancel) {
            addSnapshotDebounced.cancel();
        }
        pendingAttributes = null;
        
        const newIndex = history.currentIndex - 1;
        const previousSnapshot = history.snapshots[newIndex];
        
        isUpdatingFromHistory = true;
        dispatch('core/block-editor').updateBlockAttributes(currentBlockId, previousSnapshot);
        
        blockHistory.set(currentBlockId, {
            ...history,
            currentIndex: newIndex
        });
        
        lastSeenAttributes = JSON.stringify(previousSnapshot);
        
        setTimeout(() => {
            isUpdatingFromHistory = false;
        }, 100);
        
        updateUI();
    }
    
    // Handle redo
    function handleRedo() {
        if (!currentBlockId) return;
        
        const history = blockHistory.get(currentBlockId);
        if (!history || history.currentIndex >= history.snapshots.length - 1) return;
        
        if (addSnapshotDebounced.cancel) {
            addSnapshotDebounced.cancel();
        }
        pendingAttributes = null;
        
        const newIndex = history.currentIndex + 1;
        const nextSnapshot = history.snapshots[newIndex];
        
        isUpdatingFromHistory = true;
        dispatch('core/block-editor').updateBlockAttributes(currentBlockId, nextSnapshot);
        
        blockHistory.set(currentBlockId, {
            ...history,
            currentIndex: newIndex
        });
        
        lastSeenAttributes = JSON.stringify(nextSnapshot);
        
        setTimeout(() => {
            isUpdatingFromHistory = false;
        }, 100);
        
        updateUI();
    }
})();
