
function Card({ product }) { 
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a className="block relative h-48 rounded overflow-hidden border border-gray-200">

        <img
          alt={product.title} 
          className="object-cover object-center w-full h-full block"
          src={product.thumbnail || "https://dummyimage.com/420x260"} 
        />
      </a>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {product.category ? product.category.toUpperCase() : 'CATEGORY'}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {product.title}
        </h2>
        <p className="mt-1">${product.price.toFixed(2)}</p> 
        {product.discountPercentage > 0 && (
          <p className="text-green-600 text-sm">
            ¡{product.discountPercentage}% off!
          </p>
        )}
      </div>
    </div>
  );
}

export default Card;


