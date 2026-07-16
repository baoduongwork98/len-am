import React from "react";

export function scrollToSection(targetId: string, behavior: ScrollBehavior = "smooth"): boolean {
  const element = document.getElementById(targetId);
  if (!element) return false;

  const navbar = document.querySelector("nav");
  const navbarHeight = navbar ? navbar.offsetHeight : 80;
  const offsetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;

  window.scrollTo({ top: offsetPosition, behavior });
  return true;
}

function navigateHome(
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  scroll: () => boolean,
  url: string
) {
  if (typeof window === "undefined" || window.location.pathname !== "/") return;
  e.preventDefault();
  if (scroll()) window.history.pushState(null, "", url);
}

export function handleHashClick(
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  targetId: string
) {
  navigateHome(e, () => scrollToSection(targetId), `#${targetId}`);
}

export function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
  navigateHome(
    e,
    () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return true;
    },
    "/"
  );
}
