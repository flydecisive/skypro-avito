import styles from "./search.module.css";

interface SearchProps {
  onInput?: (params: any) => void;
}

function Search({ onInput }: SearchProps) {
  return (
    <input
      className={styles.search}
      type="search"
      name="search"
      placeholder="Поиск по объявлениям"
      onInput={onInput}
    />
  );
}

export default Search;
