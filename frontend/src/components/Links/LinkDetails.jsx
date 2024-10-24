import { useEffect } from 'react';
// import QRCode from 'react-qr-code';
import { useDispatch, useSelector } from 'react-redux';
import { getLinkThunk } from '../../store/links';

export default function LinkDetails({ linkId }) {
    const dispatch = useDispatch();

    const link = useSelector(state => state.links.currentLink);

    useEffect(() => {
        if (linkId) {
            dispatch(getLinkThunk(linkId));
        }
    }, [dispatch, linkId]);

    if(!link) return (
        <div className='loading-container'>
            <h1>Loading...</h1>
        </div>
    )

    return (
        <div className='link-details-container'>
            <div className='link-details-header'>
                <h1>{link.name}</h1>
            </div>
            <div className='link-details-body'>
                <p className='original-link'>{link.link}</p>
                <a href={link.shortLink} target='_blank' rel='noreferrer' className='short-link'>
                    {link.shortLink}
                </a>
            </div>
            {/* <div className='link-details-qr'>
                <QRCode value={link.shortLink} size={200} />
            </div> */}
        </div>
    )
}