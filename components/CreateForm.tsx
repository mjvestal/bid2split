import BedroomsFormSection from "./BedroomsFormSection"
import Button from "./Button";
import MiscellaneousFormFields from "./MiscellaneousFormFields";
import PeopleFormSection from "./PeopleFormSection";
import urlRegexSafe from 'url-regex-safe';
import { useRouter } from "next/router";
import { useState } from "react"

const urlRegEx = urlRegexSafe({exact: true, strict: true});

export default function CreateForm() {
  const [bedrooms, setBedrooms] = useState(['', '']);
  const [people, setPeople] = useState(['', '']);
  const [totalPrice, setTotalPrice] = useState(-1);
  const [listingUrl, setListingUrl] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleChangeBedrooms = (newBedrooms: string[]) => {
    setBedrooms(newBedrooms);
    if (people.length === newBedrooms.length) {
      return;
    }
    // Number of bedrooms changed, so update people array to match
    const newPeople = ['', ''];
    newBedrooms.filter(room => room.trim().length > 0).forEach((_, index) => {
      newPeople[index] = people[index] || '';
    });
    setPeople(newPeople);
  };

  const validateForm = () => {
    const errors = [];
    const describedRooms = bedrooms.filter(room => room.trim().length > 0);
    const namedPeople = people.filter(person => person.trim().length > 0);
    if (describedRooms.length < 2) {
      errors.push('At least 2 rooms are required');
    }
    if (namedPeople.length < 2) {
      errors.push('At least 2 people are required');
    }
    if (describedRooms.length !== namedPeople.length) {
      errors.push('The number of rooms and number of people must match.');
    }
    if (listingUrl.length > 0 && !urlRegEx.test(listingUrl)) {
      errors.push('Invalid listing URL');
    }
    if (totalPrice < 0) {
      errors.push('Price is required');
    }
    return errors;
  }

  const createGame = async () => {
    const currentErrors = validateForm();
    if (currentErrors.length > 0) {
      setErrors(currentErrors);
      return;
    }
    const response = await fetch('/api/game', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        autoChooseThreshold: 0.5,
        listingUrl: listingUrl.trim(),
        players: people,
        rooms: bedrooms,
        totalPrice,
      }),
    });
    const game = await response.json();
    if (game.gameId) {
      const url = `/split/${game.gameId}`;
      router.push(`${url}?success`, url);
    }
  }

  return (
    <div>
      <BedroomsFormSection bedrooms={bedrooms} onChange={handleChangeBedrooms} showErrors={errors.length > 0} />
      <PeopleFormSection people={people} onChange={setPeople} showErrors={errors.length > 0} />
      <MiscellaneousFormFields 
        listingUrl={listingUrl}
        showErrors={errors.length > 0}
        totalPrice={totalPrice}
        onChangeListingUrl={setListingUrl}
        onChangePrice={setTotalPrice}
      />
      <div className="mt-4 flex items-center justify-center">
        <Button onClick={createGame}>Start</Button>
      </div>
    </div>
  )
}