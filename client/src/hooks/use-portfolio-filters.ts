import { useState, useCallback, useMemo, useEffect } from 'react';

export type RoleFilter = 'ux' | 'pm' | 'brand';
export type VerticalFilter = 'government' | 'healthcare' | 'food-beverage' | 'finance' | 'all';
export type TagSlug = string;

export const roleLabels: Record<RoleFilter, string> = {
  'ux': 'UX / Design',
  'pm': 'Product / PM',
  'brand': 'Brand / Strategy'
};

export const verticalLabels: Record<VerticalFilter, string> = {
  'government': 'Government',
  'healthcare': 'Healthcare',
  'food-beverage': 'Food & Beverage',
  'finance': 'Finance',
  'all': 'All'
};

export const availableVerticals: VerticalFilter[] = ['all', 'government', 'healthcare', 'food-beverage', 'finance'];

export const canonicalTags: TagSlug[] = [
  'govtech',
  'public-service',
  'award',
  'accessibility',
  'ai',
  'salesforce'
];

export const tagLabels: Record<TagSlug, string> = {
  'govtech': 'GovTech',
  'public-service': 'Public Service',
  'award': 'Award',
  'accessibility': 'Accessibility',
  'ai': 'AI',
  'salesforce': 'Salesforce'
};

interface PortfolioFiltersState {
  role: RoleFilter;
  vertical: VerticalFilter;
  tags: TagSlug[];
}

interface UsePortfolioFiltersReturn {
  filters: PortfolioFiltersState;
  setRole: (role: RoleFilter) => void;
  setVertical: (vertical: VerticalFilter) => void;
  toggleTag: (tag: TagSlug) => void;
  clearTags: () => void;
  isTagActive: (tag: TagSlug) => boolean;
}

function parseUrlParams(): PortfolioFiltersState {
  const urlParams = new URLSearchParams(window.location.search);
  
  const roleParam = urlParams.get('role') || urlParams.get('lens') || urlParams.get('focus');
  let role: RoleFilter = 'pm';
  if (roleParam === 'ux' || roleParam === 'design') role = 'ux';
  else if (roleParam === 'pm') role = 'pm';
  else if (roleParam === 'brand') role = 'brand';
  
  const verticalParam = urlParams.get('vertical');
  let vertical: VerticalFilter = 'all';
  if (verticalParam === 'government') vertical = 'government';
  else if (verticalParam === 'healthcare') vertical = 'healthcare';
  else if (verticalParam === 'food-beverage') vertical = 'food-beverage';
  else if (verticalParam === 'finance') vertical = 'finance';
  
  const tagParams = urlParams.getAll('tag');
  const tags: TagSlug[] = tagParams.filter(t => canonicalTags.includes(t));
  
  return { role, vertical, tags };
}

function updateUrlParams(state: PortfolioFiltersState) {
  const url = new URL(window.location.href);
  
  url.searchParams.delete('role');
  url.searchParams.delete('lens');
  url.searchParams.delete('focus');
  url.searchParams.delete('vertical');
  url.searchParams.delete('tag');
  
  url.searchParams.set('role', state.role);
  
  if (state.vertical !== 'all') {
    url.searchParams.set('vertical', state.vertical);
  }
  
  state.tags.forEach(tag => {
    url.searchParams.append('tag', tag);
  });
  
  window.history.replaceState({}, '', url.toString());
}

export function usePortfolioFilters(): UsePortfolioFiltersReturn {
  const [filters, setFilters] = useState<PortfolioFiltersState>(() => parseUrlParams());
  
  useEffect(() => {
    updateUrlParams(filters);
  }, [filters]);
  
  const setRole = useCallback((role: RoleFilter) => {
    setFilters(prev => ({ ...prev, role }));
  }, []);
  
  const setVertical = useCallback((vertical: VerticalFilter) => {
    setFilters(prev => ({ ...prev, vertical }));
  }, []);
  
  const toggleTag = useCallback((tag: TagSlug) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  }, []);
  
  const clearTags = useCallback(() => {
    setFilters(prev => ({ ...prev, tags: [] }));
  }, []);
  
  const isTagActive = useCallback((tag: TagSlug) => {
    return filters.tags.includes(tag);
  }, [filters.tags]);
  
  return {
    filters,
    setRole,
    setVertical,
    toggleTag,
    clearTags,
    isTagActive
  };
}
