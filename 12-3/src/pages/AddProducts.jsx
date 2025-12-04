import { useState } from "react";

function AddProducts() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      title,
      price: Number(price),
      rating: Number(rating),
      thumbnail,
    };

    console.log("New Product Added:", newProduct);

    alert("Product added successfully!");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "350px",
        }}
      >
        <input
          type="text"
          placeholder="Product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "10px" }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ padding: "10px" }}
        />

        <input
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          style={{ padding: "10px" }}
        />

        <input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          required
          style={{ padding: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "black",
            color: "white",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProducts;
