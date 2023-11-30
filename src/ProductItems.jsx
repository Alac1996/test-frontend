import test from "../src/assets/meat.png";

export default function ProductItems() {
  return (
    <div className="flex flex-col justify-center border-gray-50 bg-gray-100 rounded-xl shadow-xl">
      <img src={test} alt="mock" />
      <p>Product name</p>
      <span>Code</span>
      <p>$1000</p>
    </div>
  );
}
