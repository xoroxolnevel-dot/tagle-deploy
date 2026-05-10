"use client";

import TagSection from "@/components/TagSection";
import Tag from "@/components/Tag";
import { useTagle } from "@/hooks/useTagle";

export default function Home() {
  const {
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
  } = useTagle();

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center gap-4 bg-white p-4">
      <h1>Tagle</h1>
      <div className="flex w-full gap-4">
        <div className="flex grow flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Register tags here"
              className="w-full"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                handleAutocomplete(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full border bg-white shadow">
                {suggestions.map((s) => (
                  <li
                    key={s.value}
                    className="flex cursor-pointer justify-between px-2 py-1 hover:bg-gray-100"
                    onClick={() => handleSubmit(s.value)}
                  >
                    <span>{s.value}</span>
                    <span className="text-gray-400 text-sm">{s.count?.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-wrap gap-2 rounded border p-2">
            {selectedTags.length > 0 ? (
              selectedTags.map((tag) => (
                <Tag key={tag} name={tag} type={"search"} tagOnClick={handleSearchTagClick} />
              ))
            ) : (
              <span className="text-gray-400">Selected tags will appear here</span>
            )}
          </div>
          <div className="flex gap-4">
            <button className="grow" onClick={(e) => handleSave()}>
              Save
            </button>
            <button className="grow-4" onClick={(e) => handleSearch()}>Go</button>
          </div>
          <button className="" onClick={(e) => handleExclude()}>
            Exclude
          </button>
        </div>
        <div className="grid grow-4 grid-cols-3 gap-4">
          {hydrated && (
            <>
              <TagSection
                name="Copyright"
                tags={categoryMap.copyright}
                query={false}
                tagOnClick={handleTagClick}
                tagOnDblClick={handleTagDblClick}
              />
              <TagSection
                name="Characters"
                tags={categoryMap.characters}
                query={false}
                tagOnClick={handleTagClick}
                tagOnDblClick={handleTagDblClick}
              />
              <TagSection
                name="Artists"
                tags={categoryMap.artists}
                query={false}
                tagOnClick={handleTagClick}
                tagOnDblClick={handleTagDblClick}
              />
              <TagSection
                name="General"
                tags={categoryMap.general}
                query={false}
                tagOnClick={handleTagClick}
                tagOnDblClick={handleTagDblClick}
              />
              <TagSection
                name="Meta"
                tags={categoryMap.meta}
                query={false}
                tagOnClick={handleTagClick}
                tagOnDblClick={handleTagDblClick}
              />
              <TagSection
                name="Other"
                tags={categoryMap.other}
                query={false}
                tagOnClick={handleTagClick}
                tagOnDblClick={handleTagDblClick}
              />
            </>
          )}
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}
