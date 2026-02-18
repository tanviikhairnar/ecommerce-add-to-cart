import { Container, Row, Col, Button, Card } from "react-bootstrap";

function Cart({ cart, setCart, darkMode }) {
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const deleteItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container className="py-5">
      <h2 className="mb-4">Your Cart</h2>

      {cart.map((item) => (
        <Card
          key={item.id}
          className={`mb-3 p-3 ${
            darkMode ? "bg-secondary text-light" : ""
          }`}
        >
          <Row className="align-items-center">
            <Col md={2}>
              <img
                src={item.image}
                style={{ width: "100px", objectFit: "contain" }}
              />
            </Col>

            <Col md={3}>{item.title}</Col>
            <Col md={2}>${item.price}</Col>

            <Col md={2}>
              <Button
                variant="dark"
                size="sm"
                onClick={() => decreaseQty(item.id)}
              >
                -
              </Button>
              <span className="mx-2">{item.quantity}</span>
              <Button
                variant="dark"
                size="sm"
                onClick={() => increaseQty(item.id)}
              >
                +
              </Button>
            </Col>

            <Col md={2}>
              ${(item.price * item.quantity).toFixed(2)}
            </Col>

            <Col md={1}>
              <Button
                variant="danger"
                size="sm"
                onClick={() => deleteItem(item.id)}
              >
                <i class="bi bi-trash3"></i>
              </Button>
            </Col>
          </Row>
        </Card>
      ))}

      <h4 className="text-end mt-4">
        Total: ${total.toFixed(2)}
      </h4>
    </Container>
  );
}

export default Cart;


