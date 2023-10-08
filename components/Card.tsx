import React, { useState } from 'react';

interface Props {
  onCardDetailsChange?: (details: CardDetails) => void;
}

interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

const CardComponent: React.FC<Props> = ({ onCardDetailsChange }) => {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedDetails = {
      ...cardDetails,
      [name]: value
    };
    setCardDetails(updatedDetails);
    onCardDetailsChange && onCardDetailsChange(updatedDetails);
  };

  return (
    <div className="border p-4">
      <input 
        type="text" 
        name="cardNumber"
        value={cardDetails.cardNumber}
        onChange={handleInputChange}
        placeholder="Card Number" 
        className="border p-2 mb-2 w-full"
      />
      <input 
        type="text"
        name="expiryDate"
        value={cardDetails.expiryDate}
        onChange={handleInputChange}
        placeholder="MM/YY" 
        className="border p-2 mb-2 w-full"
      />
      <input 
        type="text"
        name="cvc"
        value={cardDetails.cvc}
        onChange={handleInputChange}
        placeholder="CVC" 
        className="border p-2 w-full"
      />
    </div>
  );
}

export default CardComponent;
