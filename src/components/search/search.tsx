import styles from "./search.module.css";

function Search() {
  return (
    <input
      className={styles.search}
      type="search"
      name="search"
      placeholder="Поиск по объявлениям"
    />
  );
}

export default Search;
