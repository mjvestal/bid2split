import Headline from "./Headline";
import Input from "./Input";

export default function PeopleFormSection({
  people,
  onChange,
}: {
  people: string[],
  onChange: (people: string[]) => void,
}) {
  const handleNameChange = (value: string, changedIndex: number) => {
    const newPeople = people.map((person: string, index: number) => {
      return index === changedIndex ? value : person;
    });
    onChange(newPeople);
  };
  return (
    <section className="mt-8">
      <Headline level={2}>People</Headline>
      <p className="mt-2">Provide a first name for each person or couple in your group.
        This is so every one knows whose turn it is and what the final split is.</p>
      <div className="grid grid-cols-1 gap-6 mt-4">
        {
          people.map((person: string, index: number) => {
            return (
              <Input 
                key={index}
                onChange={(event) => handleNameChange(event.target.value, index)}
                required={true}
                value={person}
              />
            )
          })
        }
      </div>
    </section>
  )
}