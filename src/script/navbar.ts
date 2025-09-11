// navbar.ts
interface NavbarScrollConfig {
  scrollThreshold: number;
  navbarId: string;
}

class NavbarScrollBehavior {
  private lastScrollTop: number = 0;
  private isScrolling: boolean = false;
  private navbar: HTMLElement | null = null;
  private config: NavbarScrollConfig;
  private scrollHandler: (() => void) | null = null;

  constructor(config: NavbarScrollConfig = { scrollThreshold: 100, navbarId: 'navbar' }) {
    this.config = config;
  }

  public init(): () => void {
    this.navbar = document.getElementById(this.config.navbarId);

    if (!this.navbar) {
      console.warn(`Navbar with id "${this.config.navbarId}" not found`);
      return () => {};
    }

    this.scrollHandler = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.scrollHandler, { passive: true });

    // Return cleanup function
    return this.destroy.bind(this);
  }

  private handleScroll = (): void => {
    if (this.isScrolling || !this.navbar) return;

    this.isScrolling = true;

    requestAnimationFrame(() => {
      const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollPos > this.config.scrollThreshold) {
        if (this.lastScrollTop > currentScrollPos) {
          // Scrolling up - show navbar
          this.showNavbar();
        } else {
          // Scrolling down - hide navbar
          this.hideNavbar();
        }
      } else {
        // At the top - always show navbar
        this.showNavbar();
      }

      this.lastScrollTop = currentScrollPos;
      this.isScrolling = false;
    });
  };

  private showNavbar(): void {
    if (this.navbar) {
      this.navbar.style.transform = 'translateY(0)';
    }
  }

  private hideNavbar(): void {
    if (this.navbar) {
      this.navbar.style.transform = 'translateY(-100%)';
    }
  }

  public destroy(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
      this.scrollHandler = null;
    }
    this.navbar = null;
  }
}

// Export function to initialize navbar behavior
export const initNavbarScrollBehavior = (config?: NavbarScrollConfig): (() => void) => {
  const navbarBehavior = new NavbarScrollBehavior(config);
  return navbarBehavior.init();
};

// Export the class for advanced usage
export { NavbarScrollBehavior };
export type { NavbarScrollConfig };
