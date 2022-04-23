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
  const router = useRouter();

  const handleChangeBedrooms = (newBedrooms: string[]) => {
    setBedrooms(newBedrooms);
    if (people.length === newBedrooms.length) {
      return;
    }
    // Number of bedrooms changed, so update people array to match
    const newPeople = newBedrooms.map((_, index) => {
      return people[index] || '';
    });
    setPeople(newPeople);
  };

  const validateForm = () => {
    const describedRooms = bedrooms.filter(room => room.trim().length > 0);
    const namedPeople = people.filter(person => person.trim().length > 0);
    if (describedRooms.length !== namedPeople.length) {
      return false;
    }
    return listingUrl.length === 0 || urlRegEx.test(listingUrl);
  }

  const createGame = async () => {
    if (!validateForm()) {
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
      router.push(`/split/${game.gameId}`);
    }
  }

  return (
    <div>
      <BedroomsFormSection bedrooms={bedrooms} onChange={handleChangeBedrooms} />
      <PeopleFormSection people={people} onChange={setPeople} />
      <MiscellaneousFormFields 
        listingUrl={listingUrl}
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