import React, { useState, useEffect } from 'react';

const skills = [
    { name: 'JavaScript', level: 'Advanced' },
    { name: 'React', level: 'Advanced' },
    { name: 'Node.js', level: 'Intermediate' },
    { name: 'HTML', level: 'Advanced' },
    { name: 'CSS', level: 'Advanced' },
    { name: 'Astro', level: 'Intermediate' },
    { name: 'Git', level: 'Intermediate' },
];

const SkillsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % skills.length);
                setFade(true);
            }, 300);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-xl mx-auto overflow-hidden py-6">
            <div className="flex flex-col items-center justify-center min-h-[160px]">
                {skills.map((skill, index) => (
                    <div
                        key={skill.name}
                        className={`absolute left-0 right-0 transition-opacity duration-300 ${index === currentIndex && fade ? 'opacity-100 animate-fade-in-up' : 'opacity-0 pointer-events-none'}`}
                    >
                        <h3 className="font-display text-3xl md:text-4xl font-bold text-primary dark:text-accent mb-2 drop-shadow-sm">{skill.name}</h3>
                        <p className="font-body text-lg text-dark/80 dark:text-light/80">{skill.level}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6 space-x-2">
                {skills.map((_, idx) => (
                    <span
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${idx === currentIndex ? 'bg-primary dark:bg-accent scale-125' : 'bg-gray-300 dark:bg-dark/40'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default SkillsCarousel;

