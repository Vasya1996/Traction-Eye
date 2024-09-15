const tailwindFontSizes = [
    'text-2xs',
    'text-xs',    
    'text-sm',    
    'text-base',
    'text-lg',    
    'text-xl',    
    'text-2xl',   
    'text-3xl',   
    'text-4xl',   
    'text-5xl',   
    'text-6xl',   
    'text-7xl',   
    'text-8xl',   
    'text-9xl',   
];

export const downgradeFontSize = (baseFont: string, downgradeCount = 0): string => {
    // Find the index of the base font size in the array
    const baseIndex = tailwindFontSizes.indexOf(baseFont);
    

    // If the base font size is not found, return the base font size as is
    if (baseIndex === -1) {
        throw new Error(`Base font size "${baseFont}" is not valid.`);
    }
    
    // Calculate the new font size index by subtracting the downgrade count
    const newIndex = Math.max(0, baseIndex - downgradeCount);

    // Return the downgraded font size
    return tailwindFontSizes[newIndex];
};

