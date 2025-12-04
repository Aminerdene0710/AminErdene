import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.title}</h1>
      <img
        src={product.thumbnail}
        style={{ width: "300px", borderRadius: "12px" }}
      />
      <p>
        <b>Price:</b> ${product.price}
      </p>
      <p>
        <b>Rating:</b> {product.rating}
      </p>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetails;
