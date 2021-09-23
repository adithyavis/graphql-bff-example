function Checkbox({ name, checked, toggleCheck }) {
  const handleChange = () => {
    toggleCheck(prevVal => !prevVal);
  };

  return (
    <div className="form-check mx-2">
      <input
        className="form-check-input"
        type="checkbox"
        id={name}
        checked={checked}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor={name}>
        {name}
      </label>
    </div>
  );
}

export default function FieldsFilters({
  isCapitalRequired,
  isCitiesRequired,
  isNewsRequired,
  isCovidRequired,
  setIsCapitalRequired,
  setIsCitiesRequired,
  setIsNewsRequired,
  setIsCovidRequired
}) {
  return (
    <div className="d-flex justify-content-center align-items-center p-2 w-100">
      <Checkbox
        name={"Capital"}
        checked={isCapitalRequired}
        toggleCheck={setIsCapitalRequired}
      ></Checkbox>
      <Checkbox
        name={"Cities"}
        checked={isCitiesRequired}
        toggleCheck={setIsCitiesRequired}
      ></Checkbox>
      <Checkbox
        name={"News"}
        checked={isNewsRequired}
        toggleCheck={setIsNewsRequired}
      ></Checkbox>
      <Checkbox
        name={"Covid cases"}
        checked={isCovidRequired}
        toggleCheck={setIsCovidRequired}
      ></Checkbox>
    </div>
  );
}
