/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ToolType } from './types';

// Each scoring tool is its own hash route, e.g. "#/vulnerability". Hash routing
// keeps deep links working on any static host with no server rewrites, and the
// "#/" prefix never collides with the "#tools" scroll anchor on the landing page.
export const TOOL_ROUTES: ToolType[] = ['vulnerability', 'investment', 'recovery'];

export function toolFromHash(): ToolType | null {
  const slug = window.location.hash.replace(/^#\/?/, '');
  return (TOOL_ROUTES as string[]).includes(slug) ? (slug as ToolType) : null;
}

// Navigate to a tool's page. Setting the hash is the single source of truth;
// useToolRoute maps it back to the active tool, and App swaps in the page.
export function openTool(tool: ToolType) {
  window.location.hash = `/${tool}`;
  window.scrollTo({ top: 0 });
}

// Return to the landing page, dropping the hash cleanly (no bare "#", no extra
// history entry). replaceState doesn't emit hashchange, so we notify listeners.
export function closeTool() {
  history.replaceState(null, '', window.location.pathname + window.location.search);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}

// Static content pages (e.g. the author bio) live on the same hash scheme as the
// tools — "#/about" — so they deep-link cleanly on any static host too.
export const PAGE_ROUTES = ['about'] as const;
export type PageRoute = (typeof PAGE_ROUTES)[number];

export function pageFromHash(): PageRoute | null {
  const slug = window.location.hash.replace(/^#\/?/, '');
  return (PAGE_ROUTES as readonly string[]).includes(slug) ? (slug as PageRoute) : null;
}

export function openPage(page: PageRoute) {
  window.location.hash = `/${page}`;
  window.scrollTo({ top: 0 });
}

// Resolves the current hash to the active content page (or null for the landing
// page / a tool route). Shares the close/back behaviour with the tools via closeTool.
export function usePageRoute(): PageRoute | null {
  const [page, setPage] = useState<PageRoute | null>(() => pageFromHash());

  useEffect(() => {
    const sync = () => setPage(pageFromHash());
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return page;
}

// Resolves the current hash to the active tool (or null for the landing page),
// staying in sync with the back/forward buttons and the nav's deep-link event.
export function useToolRoute(): ToolType | null {
  const [tool, setTool] = useState<ToolType | null>(() => toolFromHash());

  useEffect(() => {
    const sync = () => setTool(toolFromHash());
    window.addEventListener('hashchange', sync);

    // The nav dispatches this to deep-link straight into a specific diagnostic.
    const openFromEvent = (e: Event) => {
      const t = (e as CustomEvent<ToolType>).detail;
      if ((TOOL_ROUTES as string[]).includes(t)) openTool(t);
    };
    window.addEventListener('thaw:open-tool', openFromEvent);

    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('thaw:open-tool', openFromEvent);
    };
  }, []);

  return tool;
}
