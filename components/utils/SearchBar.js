import { useState } from "react";
import { useEffect } from "react";
import styles from "./styles/SearchBar.module.scss";
import FastForwardIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import router from "next/router";

function SearchBar() {
  const [autocomplete, setAutocomplete] = useState([]);
  const [input, setInput] = useState("");
  //SEARCH BOX AUTOCOMPLETE

  useEffect(() => {
    if (input) {
      axios.get(`/api/autocomplete?search=${input}`).then((response) => {
        setAutocomplete(response.data);
      });
    }
  }, [input]);

  //HANDLING SEARCH

  function handleSearch(e) {
    e.preventDefault();

    router.push(`/search?search=${input}`);
  }
  return (
    <div className={styles.search}>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Search by product, category or collection "
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />

        <SearchIcon className={styles.icon} onClick={handleSearch} />
        <button hidden type="submit" onClick={handleSearch}></button>
      </form>
      <ul
        className={styles.suggestions}
        style={{ display: input ? "block" : "none" }}
      >
        {autocomplete.length ? (
          autocomplete.map((suggestion) => (
            <li
              key={suggestion._id}
              onClick={() => {
                router.push(`/product/${suggestion._id}`);
              }}
            >
              {suggestion.name}
            </li>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>Oops, No Result Found</p>
        )}
        <li
          style={{
            textAlign: "center",
            color: "grey",
            padding: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
          }}
          onClick={handleSearch}
        >
          view all results{" "}
          <FastForwardIcon
            fontSize="small"
            style={{ transform: "scale(0.7)" }}
          />
        </li>
      </ul>
    </div>
  );
}

export default SearchBar;
