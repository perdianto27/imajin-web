import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import defaultFurniture from "../assets/sofa.jpg";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

export default function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={product.image || defaultFurniture}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {product.description}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
            Rp {product.price.toLocaleString("id-ID")}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
        >
          Beli
        </Button>
        <IconButton
          color="secondary"
          aria-label="tambah ke keranjang"
        >
          <ShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
  }).isRequired,
};