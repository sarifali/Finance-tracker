import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, MenuItem, Button, Typography, Box } from "@mui/material";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const apiKey = "b041cb3301ced4f8ff67b854"; // Replace with your actual API key
  const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`; // Corrected URL with proper format and API key

  useEffect(() => {
    // Fetch list of available currencies
    axios.get(apiURL)
      .then((response) => {
        const rates = response.data.conversion_rates;
        setCurrencies(Object.keys(rates));
      })
      .catch((error) => {
        console.error("Error fetching the currencies:", error);
      });
  }, [fromCurrency, apiURL]);

  const handleConvert = () => {
    setLoading(true);
    axios.get(apiURL)
      .then((response) => {
        const rate = response.data.conversion_rates[toCurrency];
        setConvertedAmount(amount * rate);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the exchange rates:", error);
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: 4,
        maxWidth: 400,
        margin: "auto",
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 2,
        marginTop: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Currency Converter
      </Typography>

      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
      />

      <TextField
        select
        label="From"
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        fullWidth
      >
        {currencies.map((currency) => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="To"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        fullWidth
      >
        {currencies.map((currency) => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        onClick={handleConvert}
        disabled={loading}
        fullWidth
      >
        {loading ? "Converting..." : "Convert"}
      </Button>

      {convertedAmount > 0 && (
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
        </Typography>
      )}
    </Box>
  );
};

export default CurrencyConverter;
