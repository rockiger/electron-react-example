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
      </div>);
  }
}
