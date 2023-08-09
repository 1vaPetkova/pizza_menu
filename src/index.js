import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { pizzaData } from "./data.js";

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Welcome to The Pizza Heaven!</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData.length;
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {pizzas > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaData={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>Coming soon!</p>
      )}
    </main>
  );
}

function Pizza({ pizzaData }) {
  return (
    <li className={`pizza ${pizzaData.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaData.photoName} alt={pizzaData.Name} />
      <div>
        <h3>{pizzaData.name}</h3>
        <p>{pizzaData.ingredients}</p>
        <span>
          {pizzaData.soldOut
            ? "Sold Out!"
            : `Price: ${pizzaData.price.toFixed(2)} BGN`}
        </span>
      </div>
    </li>
  );
}

function Footer() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(function () {
    setInterval(function () {
      setTime(new Date().toLocaleTimeString());
    }, 60000);
  });
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour < closeHour;

  return <Order time={time} isOpen={isOpen} />;
}

function Order({ time, isOpen }) {
  const message = isOpen ? "We are currently open!" : "Sorry we are closed!";
  return (
    <footer className="footer">
      <div className="order">
        <p>{`${time} ${message}`}</p>
        {isOpen ? <button className="btn">Order</button> : null}
      </div>
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
