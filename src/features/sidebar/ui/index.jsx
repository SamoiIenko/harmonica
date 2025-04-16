import { memo } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const _Sibebar = () => {
  return (
    <div className={styles['sidebar-block']}>
      <Link to="/create">Create custom sound</Link>
      <Link to="/learn">Learn new music</Link>
      <Link to="/library">Check users sound</Link>
    </div>
  )
}

export const Sidebar = memo(_Sibebar)
