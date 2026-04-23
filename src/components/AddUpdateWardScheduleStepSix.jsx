import SelectWardLoaders from "./SelectWardLoaders.jsx";

export default function AddUpdateWardScheduleStepSix({
  wardLoaders,
  wardLoaderProfileIds,
  setWardLoaderProfileIds
}) {
  
  return (
    <SelectWardLoaders
      wardLoaders={wardLoaders}
      wardLoaderProfileIds={wardLoaderProfileIds}
      setWardLoaderProfileIds={setWardLoaderProfileIds}/>
  );
};
