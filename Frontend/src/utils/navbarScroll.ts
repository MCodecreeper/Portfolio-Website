export const setupNavbarScroll = () => {
  const navigation = document.querySelector('.navigation');
  const heroSection = document.querySelector('.hero');
  
  if (!navigation || !heroSection) return;

  const handleScroll = () => {
    const heroHeight = heroSection.getBoundingClientRect().height;
    const scrollPosition = window.scrollY;

    if (scrollPosition > heroHeight) {
      navigation.classList.add('scrolled');
    } else {
      navigation.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Initial check
  handleScroll();
}; 