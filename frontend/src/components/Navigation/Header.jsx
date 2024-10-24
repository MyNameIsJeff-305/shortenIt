import NavLogo from './NavLogo';
import ProfileButton from './ProfileButton';

import './Header.css';

export default function Header() {
    return (
        <div className='main-header'>
            <div>
                <NavLogo />
            </div>
            <div>
                <ProfileButton />
            </div>
        </div>
    );
}