import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, CircularProgress, Box, Chip } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  function fetchPokemon() {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) => {
      setPokemon(response.data);
    });
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (!pokemon) {
    return <CircularProgress sx={{ margin: "auto" }} />;
  }

  const imageUrl = pokemon.sprites.other["official-artwork"].front_default;

  return (
    <Box>
      <img
        src={imageUrl}
        alt={name}
        style={{ width: "100%", maxWidth: "300px", borderRadius: "8px" }}
      />

      <Typography variant="h2" gutterBottom sx={{ marginTop: 2 }}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Typography>

      <Box>
        <Typography variant="h6" gutterBottom>
          Types
        </Typography>
        <Box>
          {pokemon.types.map((typeInfo) => (
            <Chip
              key={typeInfo.type.name}
              label={typeInfo.type.name.toUpperCase()}
              sx={{ backgroundColor: "#8ecae6" }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default PokemonDetail;
