export const ProductCard = ({ product }) => {
    return (
        <div className="p-4 border rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 bg-white">
            <h3 className="font-bold text-xl">{product.title}</h3>
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover mt-2 rounded"
            />
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-lg font-semibold mt-1">${product.price}</p>
        </div>
    );
};
