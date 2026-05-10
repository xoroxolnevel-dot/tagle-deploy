import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useHydrated } from "./useHydrated";

const CATEGORIES = ["general", "artists", "other", "copyright", "characters", "meta"] as const;

export type Category = (typeof CATEGORIES)[number];

type CategoryMap = Record<Category, string[]>;

const INITIAL: CategoryMap = {
  general: [],
  artists: [],
  other: [],
  copyright: [],
  characters: [],
  meta: [],
};

interface TagResponse {
  type: number;
  name: string;
}

interface AutocompleteItem {
  count?: number;
  label: string;
  value: string;
}

export function tagleRedirect(tags: string[]) {
  const tagQuery = tags.length > 0 ? tags.map(encodeURIComponent).join("+") : "all";
  window.open(`/api/search?tags=${tagQuery}`, "_blank");
}

export function useTagle() {
  const [value, setValue] = useState("");
  const [categoryMap, setCategoryMap] = useLocalStorage<CategoryMap>("tags", INITIAL);
  const [queries, setQueries] = useLocalStorage<string[][]>("queries", [] as string[][]);
  const [selectedTags, setSelectedtags] = useState<string[]>([]);
  const [exclude, setExclude] = useState(false);
  const [suggestions, setSuggestions] = useState<AutocompleteItem[]>([]);

  const hydrated = useHydrated();

  const handleSubmit = async (name?: string) => {
    const tag = name ?? value;
    if (!tag) return;
    const res = await fetch(`/api/tag?name=${tag}`);

    const data = (await res.json()) as TagResponse;
    const category = CATEGORIES[data.type] || "other";

    if (!categoryMap[category].includes(tag)) {
      setCategoryMap({
        ...categoryMap,
        [category]: [...categoryMap[category], tag],
      });
    }

    setSuggestions([]);
    setValue("");
  };

  const handleAutocomplete = async (search: string) => {
    if (!search) {
      setSuggestions([]);
      return;
    }
    const res = await fetch(`/api/autocomplete?search=${encodeURIComponent(search)}`);
    const data = (await res.json()) as AutocompleteItem[];
    setSuggestions(data.sort((a, b) => (b.count ?? 0) - (a.count ?? 0)));
  };

  const handleExclude = () => {
    setExclude(!exclude);
  };

  const handleTagClick = (tagName: string) => {
    if (selectedTags.includes(tagName)) return;
    const tag = exclude ? `-${tagName}` : tagName;
    setSelectedtags((prev) => [...prev, tag]);
  };

  const handleTagDblClick = (category: Category, tagName: string) => {
    setCategoryMap({
      ...categoryMap,
      [category]: categoryMap[category].filter((tag) => tag !== tagName),
    });
  };

  const handleSearchTagClick = (tagName: string) => {
    setSelectedtags((prev) => prev.filter((tag) => tag !== tagName));
  };

  const handleSave = () => {
    if (selectedTags.length === 0) return;
    setQueries([selectedTags, ...queries]);
  };

  const handleSearch = () => {
    tagleRedirect(selectedTags);
  };

  return {
    value,
    setValue,
    categoryMap,
    setCategoryMap,
    hydrated,
    selectedTags,
    setSelectedtags,
    suggestions,
    handleSubmit,
    handleAutocomplete,
    handleExclude,
    handleTagClick,
    handleTagDblClick,
    handleSearchTagClick,
    handleSave,
    handleSearch,
  };
}
