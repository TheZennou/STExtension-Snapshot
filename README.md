# STExtension-Snapshot
Takes a snapshot of the current chat and makes an image of it for easy sharing.
All styling is respected, and the width of the messages is decided by your chat width, for narrower/longer message blocks in the resulting image, turn up or down your chat width! 
### **Please use an up to date SillyTavern**.
***
### Tutorial:
![tutimage](https://i.imgur.com/X8EWaP2.png)
1. Open Extensions Menu
2. Open "Install Extenstion"
3. Paste the extension link: "https://github.com/TheZennou/STExtension-Snapshot"
4. Click Save, and you're done! :)
***
Has two modes, 
1. "regular" which creates a long vertical list of the messages, pretty much a giant version of what you see in SillyTavern.
2. "grid" which makes a column based grid of messages in a rectangular shape.

You can trigger a snapshot through the button in the extensions menu. Then Pressing "List Snapshot" or "Grid Snapshot".

Additonally a command version is provided: /snapshot {optional: format=grid}, {optional: range=1-10}, {optional: anonymize=true}.

(Command version was added solely to make ross happy)

Additonal features:
- Ability to specify a range of messages to be captured i.e. (11-42)
- Mobile compatibility (Even big logs!)
- Anonymize {{user}}
- Firefox support

Showcase:
![Showcase](https://i.imgur.com/WjYW3kC.gif)
Anonmyize Showcase:
![Anonymize Showcase](https://i.imgur.com/cDLJSer.gif)
Range Showcase:
![Range Showcase](https://i.imgur.com/5UMkYR9.gif)
***
### Issues?
- Biggest issues arise from having CORS policy set to strict.
- Outdated ST. The extension relies on having SillyTavern 1.12.0 or newer, please update if you're having issues.
- **Still not resolved? Reach out; [Zennou.dev](https://zennou.dev/index.html?p=1) or open an issue.** 

***
### Credits:
Thanks to html2canvas.
Fuck dom-to-image-more.

My soundtrack while making this: https://youtu.be/4koCpY4iYhI?si=1jbAnNNJeY3_ZP6E
