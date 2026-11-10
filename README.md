# Open Dropped Folder

把文件夹拖进编辑器时，直接用当前窗口打开它。

从 Finder 拖入文件夹时，VS Code 会先把它当成文件，并显示 “The file is not displayed in the text editor because it is a directory.”。这个扩展发现该标签是文件夹后，会在当前窗口打开这个文件夹，不再需要点击 **Open Folder**。

扩展 id：`tnotesjs.open-dropped-folder`。

```bash
npm install
npm run package
```
