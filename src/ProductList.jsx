import ProductItems from "./ProductItems";

export default function ProductList() {
  return (
    <div>
      <h1>Product list</h1>
      <div className="flex w-fit gap-3">
        <div>
          <ProductItems />
        </div>
        <div>
          <ProductItems />
        </div>
        <div>
          <ProductItems />
        </div>
      </div>
    </div>
  );
}
