import { Button } from './ui/button'

const Header = () => {
  return (
    <header>
        <nav className='flex justify-end items-center bg-gray-100 px-4 py-2'>
            <Button variant="outline">Save changes</Button>
        </nav>
    </header>
  )
}

export default Header