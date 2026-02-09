import { useState, useCallback, useEffect } from 'react';

export type VerticalFilter = 'government' | 'healthcare' | 'food-beverage' | 'finance' | 'education' | 'all';

export const verticalLabels: Record<VerticalFilter, string> = {
  'government': 'Government',
  'healthcare': 'Additional Projects',
  'food-beverage': 'Food/Bev',
  'finance': 'Finance',
  'education': 'Education',
  'all': 'All Projects'
};

export const availableVerticals: VerticalFilter[] = ['all', 'government', 'food-beverage', 'finance', 'education', 'healthcare'];

interface PortfolioFiltersState {
  vertical: VerticalFilter;
}

interface UsePortfolioFiltersReturn {
  filters: PortfolioFiltersState;
  setVertical: (vertical: VerticalFilter) => void;
}

function parseUrlParams(): PortfolioFiltersState {
  const urlParams = new URLSearchParams(window.location.search);
  
  const verticalParam = urlParams.get('vertical');
  let vertical: VerticalFilter = 'all';
  if (verticalParam === 'government') vertical = 'government';
  else if (verticalParam === 'healthcare') vertical = 'healthcare';
  else if (verticalParam === 'food-beverage') vertical = 'food-beverage';
  else if (verticalParam === 'finance') vertical = 'finance';
  else if (verticalParam === 'education') vertical = 'education';
  
  return { vertical };
}

function updateUrlParams(state: PortfolioFiltersState) {
  const url = new URL(window.location.href);
  
  url.searchParams.delete('role');
  url.searchParams.delete('lens');
  url.searchParams.delete('focus');
  url.searchParams.delete('vertical');
  
  if (state.vertical !== 'all') {
    url.searchParams.set('vertical', state.vertical);
  }
  
  window.history.replaceState({}, '', url.toString());
}

export function usePortfolioFilters(): UsePortfolioFiltersReturn {
  const [filters, setFilters] = useState<PortfolioFiltersState>(() => parseUrlParams());
  
  useEffect(() => {
    updateUrlParams(filters);
  }, [filters]);
  
  const setVertical = useCallback((vertical: VerticalFilter) => {
    setFilters(prev => ({ ...prev, vertical }));
  }, []);
  
  return {
    filters,
    setVertical
  };
}
