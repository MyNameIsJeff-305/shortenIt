import NavLogo from './NavLogo';
import ProfileButton from './ProfileButton';

import './Header.css';

export default function Header() {
    return (
        <header className='main-header'>
            <div>
                <NavLogo />
            </div>
            <div>
                <ProfileButton />
            </div>
        </header>
    );
}