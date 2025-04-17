import { memo } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const _Sibebar = () => {
  return (
    <div className={styles['sidebar-block']}>
      <Link className={styles['sidebar-link']} to="/create">
        Create custom sound
      </Link>
      <Link className={styles['sidebar-link']} to="/learn">
        Learn new music
      </Link>
      <Link className={styles['sidebar-link']} to="/library">
        Check users sound
      </Link>
    </div>
  )
}

export const Sidebar = memo(_Sibebar)
