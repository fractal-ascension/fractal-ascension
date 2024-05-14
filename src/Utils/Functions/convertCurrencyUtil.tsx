import { currencyBreakdown } from "../Data/Items";

export const convertToCurrency = (value: number) => {
  if (value === 0) {
    return (
      <span style={{ color: "#b87333" }}>
        0<span>C</span>
      </span>
    );
  }

  return currencyBreakdown
    .map(({ divisor, symbol, color }) => {
      const amount = Math.floor(value / divisor);
      value %= divisor; // Update the remaining value to be broken down into smaller units

      // Only render the currency span if the amount is greater than 0
      if (amount > 0) {
        return (
          <span key={symbol} style={{ color: color }}>
            {amount}
            <span>{symbol} </span>
          </span>
        );
      }

      return null;
    })
    .filter(Boolean); // Filter out null entries (where amount is 0 and not displayed)
};
