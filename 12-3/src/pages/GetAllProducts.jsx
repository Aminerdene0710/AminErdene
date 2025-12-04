import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GetAllProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("default");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(
      `https://dummyjson.com/products?limit=${perPage}&skip=${
        (page - 1) * perPage
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
      })
      .catch((err) => console.error(err));
  }, [page]);

  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortType === "price-asc") return a.price - b.price;
      if (sortType === "price-desc") return b.price - a.price;
      if (sortType === "rating-asc") return a.rating - b.rating;
      if (sortType === "rating-desc") return b.rating - a.rating;
      return 0;
    });

  const totalPages = Math.ceil(total / perPage);

  // DELETE product
  const deleteProduct = async (id) => {
    const sure = confirm("Энэ барааг устгах уу?");
    if (!sure) return;

    await fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    });

    setProducts(products.filter((p) => p.id !== id));

    alert("Итгэлтэй байна уу?");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "20px" }}>Products ({total})</h1>

      {/* sort, search, add products */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px", flex: 1 }}
        />

        <Link to="/product/add">
          <button style={{ padding: "10px", flex: 1 }}>Add products</button>
        </Link>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          style={{ padding: "10px" }}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="rating-asc">Rating ↑</option>
          <option value="rating-desc">Rating ↓</option>
        </select>
      </div>

      {/* grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              background: "#fff",
              textAlign: "center",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Link
              to={`/product/${p.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <img
                src={p.thumbnail}
                alt={p.title}
                style={{
                  width: "100%",
                  height: "260px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
              <h3 style={{ fontSize: "16px", marginBottom: "5px" }}>
                {p.title}
              </h3>
              <p>${p.price}</p>
              <p>{p.rating}</p>
            </Link>
            {/* Edit / Delete Buttons */}
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Link to={`/product/edit/${p.id}`}>
                <button style={{ padding: "6px 10px" }}>Edit</button>
              </Link>

              <button
                onClick={() => deleteProduct(p.id)}
                style={{
                  padding: "6px 10px",
                  background: "blue",
                  color: "white",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* huudaslalt*/}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{
            padding: "10px 15px",
            cursor: page === 1 ? "not-allowed" : "pointer",
          }}
        >
          Prev
        </button>

        <span style={{ padding: "10px 0" }}>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          style={{
            padding: "10px 15px",
            cursor: page === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default GetAllProducts;
