/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ToolType } from './types';

// Each scoring tool is its own path route, e.g. "/vulnerability-diagnostic".
// Clean paths require the host to serve index.html for any unmatched path
// (SPA fallback) — otherwise a hard refresh or a shared link 404s.
export const TOOL_ROUTES: ToolType[] = ['vulnerability', 'investment', 'recovery'];

// Path slugs mirror each tool's full on-page title, e.g. "/recovery-index".
// The bare tool ids ("/recovery") are still accepted so old links keep working.
export const TOOL_SLUGS: Record<ToolType, string> = {
  vulnerability: 'vulnerability-diagnostic',
  investment: 'investment-analyzer',
  recovery: 'recovery-index',
};

function currentSlug(): string {
  return window.location.pathname.replace(/^\/|\/$/g, '');
}

export function toolFromPath(): ToolType | null {
  const slug = currentSlug();
  return TOOL_ROUTES.find((t) => TOOL_SLUGS[t] === slug || t === slug) ?? null;
}

// Navigate to a tool's page via the History API, then notify listeners —
// pushState alone doesn't fire popstate, so useToolRoute wouldn't otherwise
// pick up the change.
export function openTool(tool: ToolType) {
  history.pushState(null, '', `/${TOOL_SLUGS[tool]}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0 });
}

// Return to the landing page, dropping the path cleanly (no extra history
// entry beyond the one pushState already added).
export function closeTool() {
  history.replaceState(null, '', '/' + window.location.search);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

// Static content pages (e.g. the author bio) live on the same path scheme as
// the tools — "/about" — so they deep-link cleanly given SPA fallback.
export const PAGE_ROUTES = ['about'] as const;
export type PageRoute = (typeof PAGE_ROUTES)[number];

export function pageFromPath(): PageRoute | null {
  const slug = currentSlug();
  return (PAGE_ROUTES as readonly string[]).includes(slug) ? (slug as PageRoute) : null;
}

export function openPage(page: PageRoute) {
  history.pushState(null, '', `/${page}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0 });
}

// Resolves the current path to the active content page (or null for the
// landing page / a tool route). Shares the close/back behaviour with the
// tools via closeTool, and stays in sync with browser back/forward.
export function usePageRoute(): PageRoute | null {
  const [page, setPage] = useState<PageRoute | null>(() => pageFromPath());

  useEffect(() => {
    const sync = () => setPage(pageFromPath());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  return page;
}

// Resolves the current path to the active tool (or null for the landing
// page), staying in sync with the back/forward buttons and the nav's
// deep-link event.
export function useToolRoute(): ToolType | null {
  const [tool, setTool] = useState<ToolType | null>(() => toolFromPath());

  useEffect(() => {
    const sync = () => setTool(toolFromPath());
    window.addEventListener('popstate', sync);

    // The nav dispatches this to deep-link straight into a specific diagnostic.
    const openFromEvent = (e: Event) => {
      const t = (e as CustomEvent<ToolType>).detail;
      if ((TOOL_ROUTES as string[]).includes(t)) openTool(t);
    };
    window.addEventListener('thaw:open-tool', openFromEvent);

    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('thaw:open-tool', openFromEvent);
    };
  }, []);

  return tool;
}
