let lastClickedTime = 0;
let lastLogTime = 0;

function forceClick(element) {
    element.focus();
    element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
    element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    element.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter', keyCode: 13 }));
    element.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'Enter', keyCode: 13 }));
    element.click();
}

const autoClicker = setInterval(() => {
    const fill = document.querySelector('.progressbar__progress-background');
    const container = document.querySelector('.progressbar__progress');
    const nextButton = document.querySelector('button.navigation-controls__button_next');

    if (fill && container && nextButton) {
        const currentWidth = fill.getBoundingClientRect().width;
        const totalWidth = container.getBoundingClientRect().width;
        
        if (totalWidth > 0) {
            const percentage = currentWidth / totalWidth;
            
            if (Date.now() - lastLogTime > 2000) {
                console.log(`📈 Current Progress: ${(percentage * 100).toFixed(1)}%`);
                lastLogTime = Date.now();
            }
            
            // Trigger EXACTLY at 100% (0.999 accounts for microscopic decimal differences)
            // Also wait 10 seconds before allowing another check so it doesn't double-click
            if (percentage >= 0.999 && (Date.now() - lastClickedTime > 10000)) {
                console.log("✅ Bar is 100% full! Waiting 2 seconds for the internal timer to catch up...");
                lastClickedTime = Date.now(); // Register the event immediately
                
                // Add a 2-second buffer delay before actually clicking
                setTimeout(() => {
                    console.log("💥 Executing Precision Click!");
                    forceClick(nextButton);
                }, 2000); 
            }
        }
    }
}, 500);

console.log("🚀 PRECISION CLICKER ACTIVATED! (Waits for exactly 100% + 2 second buffer)");
