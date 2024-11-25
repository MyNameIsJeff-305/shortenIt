import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { redirectThunk } from "../../store/links";

export default function RedirectHandler() {
    const { shortenLink } = useParams(); // Get the dynamic part of the URL
    const dispatch = useDispatch();

    useEffect(() => {
        const handleRedirect = async () => {
            try {
                const response = await dispatch(redirectThunk(shortenLink));
                const originalLink = response;
                console.log(originalLink, "THIS IS THE ORIGINAL LINK");
                if (originalLink) {
                    window.location.href = originalLink; // Redirect the user to the original link
                } else {
                    console.error("Invalid link");
                }
            } catch (error) {
                console.error("Error during redirection:", error);
            }
        };

        handleRedirect();
    }, [dispatch, shortenLink]);

    return (
        <div>
            <h1>Redirecting...</h1>
            <p>If you are not redirected, please check the link.</p>
        </div>
    );
}