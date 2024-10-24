import { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useDispatch, useSelector } from 'react-redux';
import { getLinkThunk } from '../../store/links';
import { FaPen, FaTrash } from "react-icons/fa";
import './LinkDetails.css';

import moment from 'moment';

export default function LinkDetails({ linkId }) {
    const dispatch = useDispatch();
    const link = useSelector(state => state.links.currentLink);

    useEffect(() => {
        if (linkId) {
            dispatch(getLinkThunk(linkId));
        }
    }, [dispatch, linkId]);

    if (!link) {
        return (
            <div className='loading-container'>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className='link-details-container-main'>
            <div className='link-details-header'>
                <h1>{link.name}</h1>
                <div className='link-edit-delete'>
                    <button>
                        <FaPen />
                    </button>
                    <button>
                        <FaTrash />
                    </button>
                </div>
            </div>
            <div className='link-details-body'>
                <div className='qr-container'>
                    <QRCode value={link.shortLink} size={200} />
                </div>
                <div className='link-links-list'>
                    <p className='original-link'>{link.link}</p>
                    <a href={link.shortLink} target='_blank' rel='noreferrer' className='short-link'>
                        {link.shortLink}
                    </a>
                </div>
            </div>
            <section className='clicks-history-container'>
                <h2>Clicks History</h2>
                <div className='clicks-list'>
                    {
                        link.clicks.length ? (
                            link.clicks.map(click => (
                                <>
                                    <div key={click.id} className='click-history-item'>
                                        <p>{moment(click.createdAt).format("YYYY, Do MMM")}</p>
                                        <p>{moment(click.createdAt).format("HH:MM")}</p>
                                    </div>
                                    <div className='divider'></div>
                                </>
                            ))
                        ) : (
                            <span>No clicks yet.</span>
                        )
                    }
                </div>
                
            </section>
        </div>
    );
}
