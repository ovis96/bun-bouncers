import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
const list = ["Play a card game", "Bouncy balls", "Bouncy balls"];
const n = 30;
const speed = 3;

const dir = [...Array(n)].map(() => [
  Math.random() > 0.5 ? 1 : -1,
  Math.random() > 0.5 ? 1 : -1,
]);

const colors = ["#5585b5", "#53a8b6", "#79c2d0", "#bbe4e9"];

function App() {
  const [styles, setStyles] = useState([
    ...[...Array(n)].map((_, i) => ({
      left: Math.random() * window.innerWidth,
      top: Math.random() * window.innerHeight,
      backgroundColor: colors[i % 4],
      rotation: 0,
      scale: Math.random() * 3,
    })),
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setStyles((_styles) => {
        const styles = JSON.parse(JSON.stringify(_styles));
        for (let i = 0; i < n; i++) {
          styles[i].left += dir[i][0] * speed;
          styles[i].top += dir[i][1] * speed;
          styles[i].rotation += Math.random() * speed * 5;

          if (styles[i].left < 0 || styles[i].left > window.innerWidth) {
            dir[i][0] *= -1;
          }
          if (styles[i].top < 0 || styles[i].top > window.innerHeight) {
            dir[i][1] *= -1;
          }
        }
        return [...styles];
      });
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="app">
      {[...Array(n)].map((v, i) => (
        <div
          className="card"
          style={{
            ...styles[i],
            transform: `rotate(${styles[i].rotation}deg) scale(${styles[i].scale})`,
          }}
        ></div>
      ))}
    </div>
  );
}

export default App;
