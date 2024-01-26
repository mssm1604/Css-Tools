import './header.css'

export function Header() {
  return (
    <header className='navbar_wrapper'>
      <nav className='flex-row navbar'>
        <h4>CssTools</h4>

        <ul className='flex-row nav_items_wrapper'>
          <span className='current_page' data-current-page='transitions'>you&apos;re here</span>
          <li>Transitions</li>
          <li>Shadows</li>
        </ul>
      </nav>
    </header>
  )
}
