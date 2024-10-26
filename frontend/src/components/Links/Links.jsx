import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getAllLinksThunk } from '../../store/links';

import { FaPlus } from "react-icons/fa";

import './Links.css';

import LinkCard from './LinkCard';
import LinkDetails from './LinkDetails';
import AddLink from '../AddLink/AddLink';
import OpenModalMenuItem from '../OpenModalMenuItem/OpenModalMenuItem';

export default function Links() {
    const [linkChecker, setLinkChecker] = useState(false);

    const dispatch = useDispatch();

    const links = useSelector(state => state.links.allLinks);
    const link = useSelector(state => state.links.currentLink);

    useEffect(() => {
        dispatch(getAllLinksThunk());
        setLinkChecker(false);
    }, [dispatch, linkChecker]);

    if (!links) return (
        <div className='loading-container'>
            <h1>Loading...</h1>
        </div>
    )

    return (
        <div className='links-main-container'>
            <section className='my-links-container'>
                <div className='links-main-header'>
                    <div>
                        <h1>My Links</h1>
                    </div>
                    <div>
                        <button>
                            <FaPlus />
                            <OpenModalMenuItem 
                                modalComponent={<AddLink setLinkChecker={setLinkChecker} />}
                                itemText='Add Link'
                                onModalClose={() => setLinkChecker(true)}
                            />
                        </button>
                    </div>
                </div>
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