import Center from "@/components/Center";
import Headline from "@/components/Headline";
import LinkButton from "@/components/LinkButton";
import VerticalCenterLayout from "@/components/VerticalCenterLayout";

export default function CreatePage() {
  return (
    <VerticalCenterLayout>
      <Headline>Example</Headline>
      <p className="mt-4">
        A group of 3 couples are traveling together and booked a 3 bedroom, 2 bathroom Airbnb.
      </p>
      <p className="mt-2">The total price is <strong>$1,200</strong>. If the couples divide the price evenly, each couple would pay <strong>$400</strong>.</p>

      <div className="mt-6">
        <Headline level={2}>Bedrooms</Headline>
        <ul className="mt-4">
          <li><strong>Primary Suite</strong> has a king bed and private bath.</li>
          <li className="mt-2"><strong>Queen</strong> has a queen bed and shares a bathroom.</li>
          <li className="mt-2"><strong>Twin beds</strong> is the third bedroom. It has twin beds and shares a bathroom with &quot;Bedroom 2.&quot;</li>
        </ul>
      </div>

      <div className="mt-6">
        <Headline level={2}>The couples&apos; bids</Headline>
        <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="table-auto w-full">
            <thead className="bg-gray-50">
              <tr>
                <th></th>
                <th className="text-right px-2 py-3 sm:px-4">Twin beds</th>
                <th className="text-right px-2 py-3 sm:px-4">Primary Suite</th>
                <th className="text-right px-2 py-3 sm:px-4">Queen</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <th scope="row" className="text-left px-1 py-3 sm:px-4">Rory &amp; Taylor</th>
                <td className="text-right px-2 py-3 sm:px-4">Least preferred</td>
                <td className="text-right px-2 py-3 sm:px-4">+ $85</td>
                <td className="text-right px-2 py-3 sm:px-4">+ $65</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="text-left px-1 py-3 sm:px-4">Avery &amp; Blake</th>
                <td className="text-right px-2 py-3 sm:px-4">Least preferred</td>
                <td className="text-right px-2 py-3 sm:px-4">+ $100</td>
                <td className="text-right px-2 py-3 sm:px-4">+ $70</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="text-left px-1 py-3 sm:px-4">Ezra &amp; Drew</th>
                <td className="text-right px-2 py-3 sm:px-4">Least preferred</td>
                <td className="text-right px-2 py-3 sm:px-4">+ $90</td>
                <td className="text-right px-2 py-3 sm:px-4">+ $30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <Headline level={2}>The result</Headline>
        <div className="mt-4">
          <ul>
            <li>
              <strong>Avery &amp; Blake</strong> pays <strong>$440</strong> for <strong>Primary suite</strong>
            </li>
            <li className="mt-2">
              <strong>Rory &amp; Taylor</strong> pays <strong>$412</strong> for <strong>Queen</strong>
            </li>
            <li className="mt-2">
              <strong>Ezra &amp; Drew</strong> pays <strong>$348</strong> for <strong>Twin beds</strong>. 
                Although they were assigned their least preferred room, they saved <strong>$52</strong> (compared to an even split)
                and are paying <strong>$92</strong> less than the cost of <strong>Primary suite</strong>! 
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <Center>
          <LinkButton href="/create">Split Your Rental</LinkButton>
        </Center>
      </div>

    </VerticalCenterLayout>
  )
}