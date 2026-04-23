import Header from "./Header.jsx";
import HeadingTwo from "./HeadingTwo.jsx";

export default function WardCollectionsHeader({
  wardName
}) {
  return (
    <Header>
      <HeadingTwo>
        {wardName} Collections
      </HeadingTwo>
    </Header>
  );
}
