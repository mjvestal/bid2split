import { ChangeEvent } from "react";
import Headline from "./Headline";
import Input from "./Input";
import PriceAndCurrencyInput from "./PriceAndCurrencyInput";

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
  onChangePrice: (price: number | null) => void,
  showErrors: boolean,
  totalPrice: number | null,
}) {
  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeListingUrl(event.currentTarget.value);
  };

  return (
    <section className="mt-8">
      <Headline level={2}>The rest</Headline>
      <PriceAndCurrencyInputWithSelector 
        currency={currency}
        onChangeCurrency={onChangeCurrency}
        onChangePrice={onChangePrice}
        price={totalPrice}
        required={showErrors}
      />
      <label className="block mt-4">
        <span className="">(Optional) Link to listing</span>
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
  'USD',
];

function PriceAndCurrencyInputWithSelector({
  currency,
  onChangeCurrency,
  onChangePrice,
  price,
  required,
}: {
  currency: string,
  onChangeCurrency: (currency: string) => void,
  onChangePrice: (price: number | null) => void,
  price: number | null,
  required: boolean,
}) {
  const handleChangeCurrency = (event: ChangeEvent<HTMLSelectElement>) => {
    onChangeCurrency(event.currentTarget.value);
  };
  return (
    <div className="mt-2">
      <label htmlFor="price" className="block">Total price</label>
      <PriceAndCurrencyInput
        currency={currency}
        currencySelector={(
          <>
            <label htmlFor="currency" className="sr-only">Currency</label>
            <select
              id="currency" 
              name="currency" 
              className="focus:ring-cyan-200 focus:border-cyan-300 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 rounded-md"
              onChange={handleChangeCurrency}
              value={currency}>
              {CURRENCIES.map((c: string) => {
                return <option key={c} value={c}>{c}</option>
              })}
            </select>
          </>
        )}
        inputName="price"
        onChangePrice={onChangePrice}
        price={price}
        required={required}
      />
    </div>
  )
}