export default function PricedOptionRow({
  id,
  name,
  onSelect,
  price,
  selected,
}: {
  id: number, 
  name: string, 
  onSelect: (roomId: number) => void,
  price: number,
  selected: boolean,
}) {
  return (
    <tr onClick={() => {onSelect(id)}}>
      <td className="border-b border-slate-100 p-4 w-12">
        <input 
          checked={selected}
          name="price_option"
          type="radio"
          value={id}
        />
      </td>
      <td className="border-b border-slate-100 p-4 text-left text-xl font-hand">{name}</td>
      <td className="border-b border-slate-100 p-4 text-right">{price}</td>
    </tr>
  )
}