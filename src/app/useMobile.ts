'use client';

import { useEffect, useState } from 'react';

const useMobile = () => {
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        if (window.innerWidth < 640) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile;
};

export default useMobile;
