import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addLinkThunk } from "../../store/links"
import { useModal } from '../../context/Modal';


import './AddLink.css';

function isURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

export default function AddLink({ setLinkChecker }) {
    const dispatch = useDispatch();
    const [linkName, setLinkName] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const { closeModal } = useModal();

    useEffect(() => {
        setLinkName('');
        setLinkUrl('');
    }, []);

    useEffect(() => {
        let newErrors = {};
        if (!linkName)
            newErrors.linkName = 'Link Name is required';
        if (!linkUrl)
            newErrors.linkUrl = 'Link URL is required';
        if (linkUrl && !isURL(linkUrl))
            newErrors.linkUrl = 'Invalid URL';

        setErrors(newErrors);
        setIsButtonDisabled(Object.keys(newErrors).length > 0);

    }, [linkName, linkUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const link = {
            name: linkName,
            link: linkUrl
        }

        return dispatch(addLinkThunk(link))
            .then(() => {
                setLinkChecker(true);
                closeModal();
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    }

    return (
        <div className='add-link-container'>
            <h1>Add Link</h1>
            <form className="add-link-form" onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='link-name'>Link Name</label>
                    <input
                        type='text'
                        id='link-name'
                        value={linkName}
                        onChange={(e) => setLinkName(e.target.value)}
                    />
                    {errors.linkName && <span className='error'>{errors.linkName}</span>}
                </div>
                <div className='form-group'>
                    <label htmlFor='link-url'>Link URL</label>
                    <input
                        type='text'
                        id='link-url'
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                    />
                    {errors.linkUrl && <span className='error'>{errors.linkUrl}</span>}
                </div>
                <div className='form-group'>
                    <button>Add Link</button>
                </div>
            </form>
        </div>
    )
}