import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getAllLinksThunk } from '../../store/links';

import './Links.css';
import LinkCard from './LinkCard';
import LinkDetails from './LinkDetails';

export default function Links() {
    const dispatch = useDispatch();

    const links = useSelector(state => state.links.allLinks);
    const link = useSelector(state => state.links.currentLink);

    useEffect(() => {
        dispatch(getAllLinksThunk());
    }, [dispatch]);

    if (!links) return (
        <div className='loading-container'>
            <h1>Loading...</h1>
        </div>
    )

    return (
        <div className='links-main-container'>
            <section className='my-links-container'>
                <h1>My Links</h1>
                <div className='link-cards-container'>
                    {
                        links.map(link => (
                            <LinkCard key={link.id} link={link} />
                        ))
                    }
                </div>
            </section>
            <section className='link-details-container'>
                {
                    link ?
                        <LinkDetails link={link.id} /> :
                        <span>Select a link to view details</span>
                }
            </section>
        </div>
    )
}