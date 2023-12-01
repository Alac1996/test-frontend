export default function ProductItems({ productInfo }) {
  console.log(productInfo);

  return (
    <div className="transform h-64 w-80 transition duration-500 hover:scale-125 hover:opacity-90 mb-40">
      <div className="flex flex-col justify-center border-gray-50 bg-gray-100 rounded-xl shadow-xl text-gray-600">
        <img src={productInfo?.imageUrl} alt={productInfo?.name} />
        <p className="text-lg">{productInfo?.name}</p>
        <span>{productInfo?.code}</span>
        <p className="text-red-600">${productInfo?.price}</p>
      </div>
    </div>
  );
}
