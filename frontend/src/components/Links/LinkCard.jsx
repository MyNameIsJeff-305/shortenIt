import { useDispatch } from 'react-redux';

import QRCode from 'react-qr-code';

import './LinkCard.css';
import { getLinkThunk, redirectThunk } from '../../store/links';

export default function LinkCard({ link }) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(getLinkThunk(link.id));
    }

    const clickOnLink = (e) => {
        e.preventDefault();

        return dispatch(redirectThunk(`${link.shortLink}`));
    }

    return (
        <div className='link-card' onClick={handleClick}>
            <div>
                <div className='link-card-header'>
                    <h3>{link.name}</h3>
                </div>
                <div className='link-card-body'>
                    <p className='original-link'>{link.link}</p>
                    <p className='short-link' onClick={clickOnLink}>
                        {link.shortLink}
                    </p>
                </div>
            </div>
            <div className='link-card-qr'>
                <QRCode value={link.shortLink} size={100} />
            </div>
        </div>
    );
}