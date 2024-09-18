import styles from './Switcher.module.scss'

const Switcher = ({active = false, label, position = null, setActive, id}) => {
  const pos = position === 'left' ? 'left' : position === 'right' ? 'right' : null
  return (
    <button type='button' 
    className={`
      ${styles.switcher} 
      ${active ? styles['switcher--active'] : ''}
      ${position ? styles[`switcher--${pos}`] : ''} 
      `}
      onClick={() => setActive(id)}
      >{label}</button>
  )
}

export default Switcher