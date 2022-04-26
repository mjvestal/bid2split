import { ChangeEvent } from "react";
import Headline from "./Headline";
import Input from "./Input";
import { useState } from "react";

export default function MiscellaneousFormFields({
  onChangeListingUrl,
  onChangePrice,
  showErrors,
  totalPrice,
  listingUrl,
}: {
  onChangeListingUrl: (url: string) => void,
  onChangePrice: (price: number) => void,
  showErrors: boolean,
  totalPrice: number,
  listingUrl: string,
}) {
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangePrice(parseInt(event.currentTarget.value));
  };
  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeListingUrl(event.currentTarget.value);
  };

  return (
    <section className="mt-8">
      <Headline level={2}>The rest</Headline>
      <label className="block mt-2">
        <span className="">Total price</span>
        <Input
          onChange={handlePriceChange} 
          required={showErrors}
          type="number"
          value={totalPrice > 0 ? totalPrice : ''}
        />
      </label>
      <label className="block mt-2">
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