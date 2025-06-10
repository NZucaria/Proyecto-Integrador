function SearchBar({ value, onChange }) {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Buscar producto"
        value={value}
        onChange={onChange}
        className="border p-4 m-4"
      />
    </div>
  );
}

export default SearchBar;