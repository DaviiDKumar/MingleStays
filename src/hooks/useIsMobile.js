import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint = 1024) => { // Default breakpoint for 'lg' in Tailwind CSS
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        checkMobile(); // Check on initial mount
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint]);

    return isMobile;
};

export default useIsMobile;