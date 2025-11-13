import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";

import ProductCard from "./ProductCard";
import api from "../services/Api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    api.get("/product")
      .then((res) => {
          console.log("API products:", res.data);
          setProducts(res.data.data);
        })
      .catch((err) => console.error("Error produk:", err));
  }, []);

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid
          item
          key={product.id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          onClick={() => navigate(`/product/${product.id}`)}
          style={{ cursor: "pointer" }}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );

}