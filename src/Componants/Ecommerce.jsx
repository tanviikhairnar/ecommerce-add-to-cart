import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Button,
  Form,
} from "react-bootstrap";
import useLocalStorage from "../Hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const API_URL = "https://fakestoreapi.com/products";

function Ecommerce({ cart, setCart, darkMode, setDarkMode }) {
  const [products, setProducts] = useLocalStorage("ecommerce_products", []);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (products.length > 0) return;

      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("API fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [products, setProducts]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className={`py-5 ${darkMode ? "bg-dark" : "bg-light"}`}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2>Products</h2>
          </div>

          <Form.Control
            type="text"
            placeholder="Search product..."
            style={{ maxWidth: "250px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div>
            <Button
              variant={darkMode ? "light" : "dark"}
              className="me-2"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>

            <Button variant="dark" onClick={() => navigate("/cart")}>
              <i class="bi bi-trash3"></i> ({cart.length})
            </Button>
          </div>
        </div>

        {loading && (
          <div className="text-center mb-4">
            <Spinner animation="border" />
          </div>
        )}

        <Row>
          {filteredProducts.map((item) => (
            <Col key={item.id} md={4} sm={6} xs={12} className="mb-4">
              <Card
                className={`h-100 shadow-sm ${
                  darkMode ? "bg-secondary text-light" : ""
                }`}
              >
                <Card.Img
                  src={item.image}
                  alt={item.title}
                  style={{
                    height: "220px",
                    objectFit: "contain",
                    padding: "15px",
                  }}
                />

                <Card.Body>
                  <Card.Title style={{ fontSize: "1rem" }}>
                    {item.title}
                  </Card.Title>

                  <Card.Text style={{ fontSize: "0.9rem" }}>
                    {item.description.substring(0, 80)}...
                  </Card.Text>

                  <div className="d-flex justify-content-between mb-2">
                    <strong>${item.price}</strong>
                    <small>
                      ⭐ {item.rating?.rate}
                    </small>
                  </div>

                  <Button
                    variant="dark"
                    className="w-100"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Ecommerce;

