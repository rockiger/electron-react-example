import { remote } from 'electron';

import React from 'react';
import {
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  Popover,
  Menu,
  MenuItem,
} from '@blueprintjs/core';

const showMessageBox = remote.dialog.showMessageBox;
const app = remote.app;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      statistic: {
        row: 0,
        col: 0,
        chars: 0,
      },
    };

    const menu = new remote.Menu();
    menu.append(new remote.MenuItem({ role: 'cut' }));
    menu.append(new remote.MenuItem({ role: 'copy' }));
    menu.append(new remote.MenuItem({ role: 'paste' }));
    menu.append(new remote.MenuItem({ role: 'delete' }));
    menu.append(new remote.MenuItem({ type: 'separator' }));
    menu.append(new remote.MenuItem({ role: 'selectall' }));
    this.menu = menu;

    this.onInput = this.onInput.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
  }

  onInput() {
    const textField = document.querySelector('#TextField');
    const textBeforCaret = textField.value.slice(0, textField.selectionStart);
    const rows = textBeforCaret.split('\n');
    const row = rows.length;
    const col = rows.pop().length;
    this.setState({ statistic: {
      row,
      col,
      chars: textField.value.length,
    } });
  }

  onContextMenu(event) {
    event.preventDefault();
    this.menu.popup({ window: remote.getCurrentWindow() });
  }

  render() {
    return (
      <div id="Layout">
        <Navbar>
          <NavbarGroup>
            <Button className={Classes.MINIMAL} icon="folder-open" />
            <Popover content={
              <Menu>
                <MenuItem
                  text="File 1"
                  onClick={() => showMessageBox({
                    type: 'info',
                    message: 'You activated action: "file1"',
                    buttons: ['Close'],
                  })}
                />
              </Menu>}
            >
              <Button className={Classes.MINIMAL} icon="chevron-down" />
            </Popover>
            <Button
              className={Classes.MINIMAL}
              icon="small-cross"
              onClick={() => app.quit()}
            />
            <NavbarDivider />
            <Button
              className={Classes.MINIMAL}
              icon="properties"
              onClick={() => showMessageBox({
                type: 'info',
                message: 'You activated action: "logo"',
                buttons: ['Close'],
              })}
            />
          </NavbarGroup>
        </Navbar>
        <textarea id="TextField" onKeyDown={this.onInput} onContextMenu={this.onContextMenu} />
        <div id="StatusBar">
          Cursor at row {this.state.statistic.row} column {this.state.statistic.col} - {this.state.statistic.chars} chars in document
        </div>
      </div>);
  }
}
