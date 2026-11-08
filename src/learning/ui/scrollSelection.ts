/** Reveal a selected item inside a horizontal strip without scrolling the page. */
export function scrollSelection(container: HTMLElement | null) {
  const active = container?.querySelector<HTMLElement>('[aria-pressed="true"]');
  if (!container || !active || container.scrollWidth <= container.clientWidth) return;
  container.scrollLeft += active.getBoundingClientRect().left - container.getBoundingClientRect().left
    - (container.clientWidth - active.offsetWidth) / 2;
}
