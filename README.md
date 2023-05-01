# Angular Component File Switcher

This extension allows you to switch between a component, template and stylesheet file associated with a component.

## Features

When the extension is activated it will switch between component files in the following order, it will also wrap back around the list.

1. `ts`
2. `html`
3. `css`, `scss`, `sass`, `less`

The extension can be activated by:

- `Ctrl+K Ctrl+O` without releasing Ctrl
- `Command+K Command+O` without releasing Command

The extension can also be activated in reverse by holding shift while running the normal commands:

- `Ctrl+Shift+K Ctrl+Shift+O` without releasing Ctrl
- `Command+Shift+K Command+Shift+O` without releasing Command

## Extension Settings

This extension's key bindings can be overridden by the following commands:

- `extension.switchAngularComponentFiles`
- `extension.switchAngularComponentFilesReverse`

---

## Callouts

This extension was created based off the angular-component-file-cycler by @Fordesoft which is no longer being maintained.

- https://github.com/Josh1billion/angular-component-file-cycler/

Reverse order functionality is based off @nlko fork of angular-component-file-cycler.

- https://github.com/nlko/angular-component-file-cycler

This extension was created to solve a problem I was having where the file-cycler extension would not switch files when there was no associated stylesheet file. I noticed that @nlko had created a fork to add in reverse order which also solved the issue I was facing so I pulled his changes in.

## Contributing

https://github.com/ppetro08/angular-component-file-switcher

**Enjoy!**
