import Button from "./Button";
import Headline from "./Headline";
import Input from "./Input";

const PLACEHOLDERS = [
  'e.g. Primary suite',
  'e.g. Room w/ private bath',
  'e.g. Room w/ twin beds',
  'e.g. Room w/ black dresser',
  'e.g. Room w/ bunk beds',
  'e.g. Room w/ green wall',
  'e.g. Room w/ floral comforter',
];

export default function BedroomsFormSection({
  bedrooms,
  onChange,
  showErrors,
}: {
  bedrooms: string[],
  onChange: (bedrooms: string[]) => void,
  showErrors: boolean,
}) {
  const handleBedroomChange = (value: string, changedIndex: number) => {
    const newBedrooms = bedrooms.map((bedroom: string, index: number) => {
      return index === changedIndex ? value : bedroom;
    });
    onChange(newBedrooms);
  };
  const handleAddBedroom = () => {
    onChange([
      ...bedrooms,
      '',
    ]);
  }
  return (
    <section className="mt-8">
      <Headline level={2}>Bedrooms</Headline>
      <p className="mt-2">
        Describe each bedroom or sleeping area.
      </p>
      <div className="grid grid-cols-1 gap-6 mt-4">
      {
        bedrooms.map((bedroom, index) => {
          return (
            <Input
              key={index}
              onChange={(event) => {handleBedroomChange(event.target.value, index)}}
              placeholder={PLACEHOLDERS[index]}
              required={showErrors && index < 2}
              value={bedroom}
            />
          )
        })
      }
      </div>
      <div className="mt-6">
        <Button onClick={handleAddBedroom} style="secondary">Add</Button>
      </div>
    </section>
  )
}