import { ChangeEvent } from "react";
import Headline from "./Headline";
import Input from "./Input";

export default function MiscellaneousFormFields({
  onChangePrice,
  totalPrice,
}: {
  onChangePrice: (price: number) => void,
  totalPrice: number,
}) {
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangePrice(parseInt(event.currentTarget.value));
  };
  return (
    <section className="mt-8">
      <Headline level={2}>The rest</Headline>
      <label className="block mt-2">
        <span className="">Total price</span>
        <Input
          onChange={handlePriceChange} 
          type="number"
          value={totalPrice > 0 ? totalPrice : ''}
        />
      </label>
    </section>
  )
}