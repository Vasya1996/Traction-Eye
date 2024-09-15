import { useEffect, useState, useRef, MutableRefObject, useLayoutEffect } from 'react';

interface UseElementIntersectionReturn {
    fontSizeCounter: number;
    element1Ref: MutableRefObject<HTMLElement | null>;
    element2Ref: MutableRefObject<HTMLElement | null>;
    checkIntersection: () => void;
}

const OVERLAP_PADDING = 30;

export const useElementIntersection = (): UseElementIntersectionReturn => {
    const [fontSizeCounter, setFontSizeCounter] = useState<number>(0);
    const element1Ref = useRef<HTMLElement | null>(null);
    const element2Ref = useRef<HTMLElement | null>(null);

    const checkIntersection = () => {
        if (element1Ref.current && element2Ref.current) {
            const rect1 = element1Ref.current.getBoundingClientRect();
            const rect2 = element2Ref.current.getBoundingClientRect();
            
            const isOverlapping = !(
                (rect1.right + OVERLAP_PADDING) < rect2.left || // element1 is completely to the left of element2
                (rect1.left - OVERLAP_PADDING) > rect2.right || // element1 is completely to the right of element2
                (rect1.bottom + OVERLAP_PADDING) < rect2.top || // element1 is completely above element2
                (rect1.top - OVERLAP_PADDING) > rect2.bottom    // element1 is completely below element2
            );

            if(isOverlapping) {
                setFontSizeCounter((prevValue) => {
                    if (prevValue < 5) { // Limit the updates to prevent infinite loop
                        return prevValue + 1;
                    }
                    return prevValue;
                });
            }
        }
    };

    useLayoutEffect(() => {
        if(fontSizeCounter > 0) {
            checkIntersection();
        }
    }, [fontSizeCounter])

    useEffect(() => {
        // Listen for scroll and resize events to recalculate intersection
        window.addEventListener('scroll', checkIntersection);
        window.addEventListener('resize', checkIntersection);

        // Initial check
        checkIntersection();

        // Clean up event listeners on component unmount
        return () => {
            window.removeEventListener('scroll', checkIntersection);
            window.removeEventListener('resize', checkIntersection);
        };
    }, []);

    return { fontSizeCounter, element1Ref, element2Ref, checkIntersection };
};
