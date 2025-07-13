import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
    const [scroll, setScroll] = useState(0);

    const onScroll = () => {
        const scrolled = document.documentElement.scrollTop;
        const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrolled / maxHeight) * 100;
        setScroll(scrollPercent);
    };

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-secondary-200 dark:bg-secondary-700 z-50">
            <div 
                className="h-1 bg-gradient-to-r from-primary-600 to-accent-600 transition-all duration-150 ease-out" 
                style={{ width: `${scroll}%` }}
            />
        </div>
    );
};

export default ProgressBar;
