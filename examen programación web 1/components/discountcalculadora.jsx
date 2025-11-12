import React, { useState, useEffect } from "react";
import InputField from "./inputfieldn";
import ResultDisplay from "./resultdisplay";

const DiscountCalculator = () => {
  const [prices, setPrices] = useState(["", "", "", "", ""]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountLabel, setDiscountLabel] = useState("Descuento 0%");
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  // Función para actualizar el precio individual
  const handleChange = (index, value) => {
    if (isNaN(value) || value < 0) {
      setError("Por favor ingrese solo valores numéricos positivos.");
      return;
    }
    setError("");
    const newPrices = [...prices];
    newPrices[index] = value;
    setPrices(newPrices);
  };

  // Cálculo automático al ingresar valores
  useEffect(() => {
    const numericPrices = prices.map(p => parseFloat(p) || 0);
    const newSubtotal = numericPrices.reduce((acc, val) => acc + val, 0);
    setSubtotal(newSubtotal);

    // Determinar descuento según el rango
    let porcentaje = 0;
    if (newSubtotal >= 1000 && newSubtotal <= 4999.99) porcentaje = 10;
    else if (newSubtotal >= 5000 && newSubtotal <= 8999.99) porcentaje = 20;
    else if (newSubtotal >= 9000 && newSubtotal <= 12999.99) porcentaje = 30;
    else if (newSubtotal >= 13000) porcentaje = 0;

    const newDiscount = (newSubtotal * porcentaje) / 100;
    const newTotal = newSubtotal - newDiscount;

    setDiscount(newDiscount);
    setTotal(newTotal);
    setDiscountLabel(`Descuento ${porcentaje}%`);
  }, [prices]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        🧾 Calculadora de Descuentos
      </h1>

      {prices.map((price, i) => (
        <InputField
          key={i}
          label={`Producto ${i + 1}`}
          value={price}
          onChange={(e) => handleChange(i, e.target.value)}
        />
      ))}

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="mt-6 border-t pt-4">
        <ResultDisplay label="Subtotal" value={subtotal} />
        <ResultDisplay label={discountLabel} value={discount} />
        <ResultDisplay label="Total a Pagar" value={total} />
      </div>
    </div>
  );
};

export default DiscountCalculator;