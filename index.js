// Function to load dom-to-image dynamically, gonna replace this later
function loadDomToImage() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'scripts/extensions/snapshot/dom-to-image-more.min.js';
        script.onload = () => resolve(window.domtoimage);
        script.onerror = () => reject(new Error('Failed to load dom-to-image'));
        document.head.appendChild(script);
    });
}

import { registerSlashCommand } from '/scripts/slash-commands.js';

const extensionName = "Snapshot";

async function captureChatLog(format = 'regular') {
    const chatContainer = document.getElementById('chat');
    if (!chatContainer) {
        console.error("Chat log container not found.");
        return;
    }

    try {
        const domtoimage = await loadDomToImage();

        // Creatin a new container element
        const captureContainer = document.createElement('div');
        captureContainer.style.backgroundColor = window.getComputedStyle(chatContainer).backgroundColor;
        const messageElements = chatContainer.querySelectorAll('.mes');
        let gridContainer;
        if (format === 'grid') {
            const numMessages = messageElements.length;
            const numRows = Math.ceil(Math.sqrt(numMessages));
            const numColumns = Math.ceil(numMessages / numRows);
            gridContainer = document.createElement('div');
            gridContainer.style.display = 'grid';
            gridContainer.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
            gridContainer.style.gridTemplateRows = `repeat(${numRows}, auto)`;
            gridContainer.style.gridAutoFlow = 'column';
            gridContainer.style.gridGap = '10px';
            messageElements.forEach(element => {
                const clonedElement = element.cloneNode(true);
                clonedElement.style.backgroundColor = window.getComputedStyle(element).backgroundColor;
                gridContainer.appendChild(clonedElement);
            });
            captureContainer.appendChild(gridContainer);
            // Set the capture container's styles
            captureContainer.style.width = `${chatContainer.offsetWidth * numColumns}px`;
            captureContainer.style.height = `${gridContainer.offsetHeight}px`;
            captureContainer.style.overflow = 'hidden';
        } else {
            messageElements.forEach(element => {
                const clonedElement = element.cloneNode(true);
                clonedElement.style.backgroundColor = window.getComputedStyle(element).backgroundColor;
                captureContainer.appendChild(clonedElement);
            });

            // Set the capture container's styles... again. I love ST jank.
            captureContainer.style.width = `${chatContainer.offsetWidth}px`;
            captureContainer.style.height = 'auto';
            captureContainer.style.overflow = 'hidden';
        }
        document.body.appendChild(captureContainer);
        await new Promise(resolve => setTimeout(resolve, 0));
        if (format === 'grid') {
            captureContainer.style.height = `${gridContainer.offsetHeight}px`;
        }
        const imgData = await domtoimage.toPng(captureContainer, {
            width: captureContainer.offsetWidth,
            height: captureContainer.offsetHeight,
            style: {
                transform: 'scale(1)',
                transformOrigin: 'top left',
                width: `${captureContainer.offsetWidth}px`,
                height: `${captureContainer.offsetHeight}px`
            }
        });
        document.body.removeChild(captureContainer);
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'chatlog.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error capturing chat log:", error);
    }
}

function addCaptureButtons() {
    const snapshotButtonHtml = `
    <div id="snapshot_extension" class="list-group-item flex-container flexGap5">
        <div class="fa-solid fa-camera extensionsMenuExtensionButton" title="Snapshot"></div>
        <span>Snapshot</span>
    </div>`;

    const snapshotGridButtonHtml = `
    <div id="snapshot_grid_extension" class="list-group-item flex-container flexGap5">
        <div class="fa-solid fa-camera extensionsMenuExtensionButton" title="Snapshot Grid"></div>
        <span>Snapshot Grid</span>
    </div>`;

    $("#extensionsMenu").append(snapshotButtonHtml);
    $("#extensionsMenu").append(snapshotGridButtonHtml);

    const snapshotButton = $('#snapshot_extension');
    snapshotButton.on('click', () => captureChatLog('regular'));

    const snapshotGridButton = $('#snapshot_grid_extension');
    snapshotGridButton.on('click', () => captureChatLog('grid'));
}

jQuery(function () {
    addCaptureButtons();
    registerSlashCommand('snapshot', (_, format = 'regular') => captureChatLog(format), ['snapshot'], "<span class='monospace'>(optional: 'grid' or 'regular')</span> – captures an image of the entire chat log", true, true);
    console.log(`${extensionName} extension loaded.`);
});
