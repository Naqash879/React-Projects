import "./dropdown.css";
import { useState } from "react";
function CustomDropdown() {
  let [selectedItem, setSelectedItem] = useState("Select an Item");
  return (
    <>
      <h1 className="heading-dropdown">Custom Dropdown</h1>
      <div className="container-Dropdown">
        <select
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          <option>{selectedItem}</option>
          <option>First Item</option>
          <option>Second Item</option>
          <option>Third Item</option>
        </select>
      </div>

      <h4 className="selected-Item">Selected: {selectedItem}</h4>
    </>
  );
}
export default CustomDropdown;
