import { useDispatch } from 'react-redux';

import QRCode from 'react-qr-code';

import './LinkCard.css';
import { getLinkThunk } from '../../store/links';

export default function LinkCard({ link }) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(getLinkThunk(link.id));
    }

    return (
        <div className='link-card' onClick={handleClick}>
            <div>
                <div className='link-card-header'>
                    <h3>{link.name}</h3>
                </div>
                <div className='link-card-body'>
                    <p className='original-link'>{link.link}</p>
                    <a href={link.shortLink} target='_blank' rel='noreferrer' className='short-link'>
                        {link.shortLink}
                    </a>
                </div>
            </div>
            <div className='link-card-qr'>
                <QRCode value={link.shortLink} size={100} />
            </div>
        </div>
    );
}