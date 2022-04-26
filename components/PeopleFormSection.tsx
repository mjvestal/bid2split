import Headline from "./Headline";
import Input from "./Input";
import {useState} from 'react';

const NAMES = [
  'Alex', 
  'Blake', 
  'Drew', 
  'Taylor', 
  'Kennedy', 
  'Jordan', 
  'Avery', 
  'Cameron', 
  'Ezra', 
  'Amari', 
  'Rowan', 
  'Rory',
];

function getRandomNames(): string[] {
  let names = shuffle([...NAMES]);
  const randomNames = [];
  while (names.length > 0) {
    randomNames.push(getRandomName(names));
  }
  return randomNames;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function shuffle(names: string[]) {
  let currentIndex = names.length;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = getRandomInt(currentIndex);
    currentIndex--;

    [names[currentIndex], names[randomIndex]] = [
      names[randomIndex], names[currentIndex]];
  }

  return names;
}

function getRandomName(names: string[]): string {
  if (names.length === 0) {
    return "";
  }
  const numberOfNames = getRandomInt(Math.min(2, names.length));
  if (numberOfNames === 1) {
    return `e.g. ${names.pop()}`;
  }
  return `e.g. ${names.pop()} & ${names.pop()}`;
}

export default function PeopleFormSection({
  people,
  onChange,
  showErrors,
}: {
  people: string[],
  onChange: (people: string[]) => void,
  showErrors: boolean,
}) {
  const [randomNames, setRandomNames] = useState(getRandomNames());
  
  const handleNameChange = (value: string, changedIndex: number) => {
    const newPeople = people.map((person: string, index: number) => {
      return index === changedIndex ? value : person;
    });
    onChange(newPeople);
  };
  
  return (
    <section className="mt-8">
      <Headline level={2}>People</Headline>
      <p className="mt-2">Provide a name for each person or couple in your group.</p>
      <div className="grid grid-cols-1 gap-6 mt-4">
        {
          people.map((person: string, index: number) => {
            return (
              <Input 
                key={index}
                onChange={(event) => handleNameChange(event.target.value, index)}
                placeholder={randomNames[index]}
                required={showErrors}
                value={person}
              />
            )
          })
        }
      </div>
    </section>
  )
}