import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import axios from "axios";
import Pagination from "./components/Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setloading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setloading(false);
        setPokemon(res.data.results.map((p) => p.name));
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        console.log(res.data);
      });
    return () => cancel();
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return "Loading...";

  console.log(`gotoPrevPage: ${gotoPrevPage}`);
  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
