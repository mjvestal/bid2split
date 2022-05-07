import { ChangeEvent } from "react";

export default function PriceAndCurrencyInput({
  currency,
  currencySelector,
  inputName,
  max,
  onChangePrice,
  price,
  required,
}: {
  currency: string,
  currencySelector?: React.ReactNode,
  inputName: string,
  max?: number,
  onChangePrice: (price: number | null) => void,
  price: number | null,
  required: boolean,
}) {
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const bid = (value == null || value.length === 0 || isNaN(parseInt(value))) ? null : parseInt(value);
    onChangePrice(bid);
  };

  const DUMMY_PRICE = 1.11;
  const formattedParts = new Intl.NumberFormat(
    'en-US', 
    {
      style: 'currency',
      currency,
    }).formatToParts(DUMMY_PRICE);
  const currencySymbol = formattedParts.find(p => p.type === 'currency')?.value ?? '$';

  return (
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm"> {currencySymbol} </span>
      </div>
      <input 
        type="number" 
        name={inputName} 
        id={inputName} 
        className={`focus:border-cyan-300 focus:ring focus:ring-cyan-200 focus:ring-opacity-50  invalid:border-red-500 block w-full ${currencySymbol.length === 1 ? 'pl-7' : 'pl-12'}  ${currencySelector && 'pr-12'} border-gray-300 rounded-md`}
        max={max}
        min={0}
        onChange={handlePriceChange}
        placeholder="0"
        required={required}
        value={price ?? ''}
      />
      {
        currencySelector && (
          <>
            <div className="absolute inset-y-0 top-1 right-2 w-20 h-8 bg-white">
              {/** Empty div to hide browser number input arrows */}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              {currencySelector}
            </div>
          </>
        )
      }
    </div>
  )
}