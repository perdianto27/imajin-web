import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./ProductDetail.scss";
import api from "../../services/Api";
import defaultFurniture from "../../assets/sofa.jpg";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/product/${id}`);
        console.log("Product Detail", res.data);
        setProduct(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>; // 🚀 jangan render product kalau null
  }


	return (
		<div className="product-detail">
			{product && (
				<div className="product-detail__image">
					<img src={defaultFurniture} alt={product.name} />
				</div>
			)}
			<div className="product-detail__info">
				<h1>{product.name}</h1>
				<p className="product-detail__price">Harga: Rp {product.price.toLocaleString("id-ID")}</p>
				<p className="product-detail__desc">{product.description}</p>
			</div>
		</div>
	);
}