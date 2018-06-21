import React from 'react'
import { Link } from 'react-router-dom'
import {
  Menu,
  Icon,
} from 'semantic-ui-react'
import './Menu.css'

export default () => (
  <Menu inverted color='black' borderless stackable className='is-menu'>
    <Menu.Item header>
      IS PRISON
    </Menu.Item>
    <Menu.Item>
      <Link to='/home' href='/home'>
        <Icon name='browser' size='large' />
        <strong>Dashboard</strong>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to='/prisoners' href='/prisoners'>
        <Icon name='id badge' size='large' />
        <strong>Prisoners</strong>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to='/cells' href='/cells'>
        <Icon name='content' rotated='clockwise' size='large' />
        <strong>Cells</strong>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to='/jobs' href='/jobs'>
        <Icon name='wrench' size='large' />
        <strong>Jobs</strong>
      </Link>
    </Menu.Item>
  </Menu>
)

