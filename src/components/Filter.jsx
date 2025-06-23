import React, { useState, useEffect } from 'react';
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const priceRanges = [
  { label: 'Below ₹1000', min: '', max: '1000', value: 'under1000' },
  { label: '₹1000 - ₹2000', min: '1000', max: '2000', value: '1k-2k' },
  { label: 'Above ₹2000', min: '2000', max: '', value: 'above2k' },
  { label: 'Above ₹5000', min: '5000', max: '', value: 'above5k' },
  { label: 'Above ₹10000', min: '10000', max: '', value: 'above10k' },
  { label: '₹10000 - ₹20000', min: '10000', max: '20000', value: '10k-20k' },
  { label: '₹20000 - ₹30000', min: '20000', max: '30000', value: '20k-30k' },
  { label: 'Above ₹30000', min: '30000', max: '', value: 'above30k' },
];

const getMinMaxByValue = (value) => {
  const range = priceRanges.find((r) => r.value === value);
  return range ? { min: range.min, max: range.max } : { min: '', max: '' };
};

export default function Filter({ hotels, onFilter }) {
  const [boardType, setBoardType] = useState('');
  const [bedType, setBedType] = useState('');
  const [refundableOnly, setRefundableOnly] = useState(false);
  const [selectedPriceOption, setSelectedPriceOption] = useState('');

  useEffect(() => {
    const { min, max } = getMinMaxByValue(selectedPriceOption);

    const filtered = hotels.filter((hotel) => {
      const offer = hotel.offers?.[0]?.offers?.[0];
      if (!offer) return false;

      const price = parseFloat(offer.price?.total || 0);
      const board = offer.boardType || '';
      const bed = offer.room?.typeEstimated?.bedType || '';
      const isRefundable =
        offer.policies?.refundable?.cancellationRefund !== 'NON_REFUNDABLE';

      return (
        (!min || price >= parseFloat(min)) &&
        (!max || price <= parseFloat(max)) &&
        (!boardType || board === boardType) &&
        (!bedType || bed === bedType) &&
        (!refundableOnly || isRefundable)
      );
    });

    onFilter(filtered);
  }, [selectedPriceOption, boardType, bedType, refundableOnly, hotels, onFilter]);

  return (
    <Box
      className="w-full bg-white border border-gray-300 shadow-md rounded-2xl p-4 flex flex-col md:flex-row gap-4 overflow-x-auto"
      sx={{
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
      }}
    >
      {/* Price Range */}
      <FormControl size="small" className="flex-1 min-w-[150px]">
        <InputLabel>Price</InputLabel>
        <Select
          value={selectedPriceOption}
          onChange={(e) => setSelectedPriceOption(e.target.value)}
          label="Price"
        >
          <MenuItem value="">All</MenuItem>
          {priceRanges.map((range) => (
            <MenuItem key={range.value} value={range.value}>
              {range.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Board Type */}
      <FormControl size="small" className="flex-1 min-w-[150px]">
        <InputLabel>Board</InputLabel>
       <Select
  value={boardType}
  onChange={(e) => setBoardType(e.target.value)}
  label="Board"
  renderValue={(selected) => {
    if (selected === "") return "Select Board Type";
    if (selected === "ROOM_ONLY") return "Room Only";
    if (selected === "BREAKFAST") return "Breakfast";
    return selected;
  }}
>
  {/* Only show "All" if another option is selected */}
  {boardType !== "" && (
    <MenuItem value="">All</MenuItem>
  )}
  <MenuItem value="ROOM_ONLY">Room Only</MenuItem>
  <MenuItem value="BREAKFAST">Breakfast</MenuItem>
</Select>

      </FormControl>

      {/* Bed Type */}
      <FormControl size="small" className="flex-1 min-w-[150px]">
        <InputLabel>Bed</InputLabel>
      <Select
  value={bedType}
  onChange={(e) => setBedType(e.target.value)}
  label="Bed"
  renderValue={(selected) => {
    if (selected === "") return "Select Bed Type";
    if (selected === "KING") return "King";
    if (selected === "QUEEN") return "Queen";
    if (selected === "TWIN") return "Twin";
    return selected;
  }}
>
  {/* Only show "All" when some other value is selected */}
  {bedType !== "" && <MenuItem value="">All</MenuItem>}
  <MenuItem value="KING">King</MenuItem>
  <MenuItem value="QUEEN">Queen</MenuItem>
  <MenuItem value="TWIN">Twin</MenuItem>
</Select>

      </FormControl>

      {/* Refundable */}
      <FormControlLabel
        control={
          <Checkbox
            checked={refundableOnly}
            onChange={(e) => setRefundableOnly(e.target.checked)}
            color="primary"
            sx={{ p: 0.5 }}
          />
        }
        label="Refundable"
        className="flex-1 min-w-[150px] whitespace-nowrap"
        sx={{
          '.MuiFormControlLabel-label': {
            fontSize: '0.85rem',
            color: '#333',
          },
        }}
      />
    </Box>
  );
}
