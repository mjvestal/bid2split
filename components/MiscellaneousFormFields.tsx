import { ChangeEvent } from "react";
import Headline from "./Headline";
import Input from "./Input";
import { useState } from "react";

export default function MiscellaneousFormFields({
  currency,
  listingUrl,
  onChangeCurrency,
  onChangeListingUrl,
  onChangePrice,
  showErrors,
  totalPrice,
}: {
  currency: string,
  listingUrl: string,
  onChangeCurrency: (currency: string) => void,
  onChangeListingUrl: (url: string) => void,
  onChangePrice: (price: number) => void,
  showErrors: boolean,
  totalPrice: number,
}) {
  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeListingUrl(event.currentTarget.value);
  };

  return (
    <section className="mt-8">
      <Headline level={2}>The rest</Headline>
      <PriceAndCurrencyInput 
        currency={currency}
        onChangeCurrency={onChangeCurrency}
        onChangePrice={onChangePrice}
        price={totalPrice}
        required={showErrors}
      />
      <label className="block mt-4">
        <span className="">(Optional) Link to listing:</span>
        <Input
          onChange={handleUrlChange} 
          placeholder="https://www.airbnb.com/rooms/12345"
          type="url"
          value={listingUrl}
        />
      </label>
    </section>
  )
}

const CURRENCIES = [
  'CAD',
  'EUR',
  'GBP',
  'JPY',
  'MXN',
  'THB',
  'TWD',
  'USD',
];

function PriceAndCurrencyInput({
  currency,
  onChangeCurrency,
  onChangePrice,
  price,
  required,
}: {
  currency: string,
  onChangeCurrency: (currency: string) => void,
  onChangePrice: (price: number) => void,
  price: number,
  required: boolean,
}) {
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangePrice(parseInt(event.currentTarget.value));
  };
  const handleChangeCurrency = (event: ChangeEvent<HTMLSelectElement>) => {
    onChangeCurrency(event.currentTarget.value);
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
    <div className="mt-2">
      <label htmlFor="price" className="block">Total price</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm"> {currencySymbol} </span>
        </div>
        <input 
          type="number" 
          name="price" 
          id="price" 
          className={`focus:ring-emerald-200 focus:border-emerald-300 focus:ring-opacity-50 invalid:border-red-500 block w-full ${currencySymbol.length === 1 ? 'pl-7' : 'pl-12'}  pr-12 border-gray-300 rounded-md`}
          onChange={handlePriceChange}
          placeholder="0"
          required={required}
          value={price > 0 ? price : ''}
        />
        <div className="absolute inset-y-0 top-1 right-2 w-20 h-8 bg-white">
          {/** Empty div to hide browser number input arrows */}
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">Currency</label>
          <select
            id="currency" 
            name="currency" 
            className="focus:ring-emerald-200 focus:border-emerald-300 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 rounded-md"
            onChange={handleChangeCurrency}
            value={currency}>
            {CURRENCIES.map((c: string) => {
              return <option key={c} value={c}>{c}</option>
            })}
          </select>
        </div>
      </div>
    </div>
  )
}