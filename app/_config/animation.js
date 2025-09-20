// NavBar grows out rapidly
export const navbarVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.13,         // Much faster parent animation
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",  // Ensures children animate after
      staggerChildren: 0.045,  // Minimal wait between items
      delayChildren: 0.04,     // Short delay after nav before children
    },
  },
};

export const logoVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.18,
      type: "spring",
      stiffness: 320,
      damping: 15,
    },
  },
};

export const desktopLinksParentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.045, // Faster stagger between links
      delayChildren: 0.04,    // Only a tiny pause after nav appears
    },
  },
};

export const desktopLinkVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.17,
      type: "spring",
      stiffness: 130,
      damping: 13,
    },
  },
};


// for mobile menu 
 // *** Mobile menu variants (kept here exactly as you provided) ***
export  const menuVariants = {
    closed: {
      opacity: 0,
      y: -8,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.06,
      },
    },
  };

  // child link animation for mobile menu
 export const linkVariants = {
    closed: { opacity: 0, y: 8 },
    open: { opacity: 1, y: 0 },
  };