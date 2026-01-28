import { FiPackage, FiCheck, FiTrendingUp } from "react-icons/fi";

const TrackedList = ({ products, setSelected, selected }) => {
  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FiTrendingUp className="text-green-500" />
          Tracked Products
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {products.length} items available
        </p>
      </div>

      {/* Product List */}
      <div className="overflow-y-auto h-[calc(100%-80px)]">
        <ul className="divide-y divide-gray-100">
          {products.map((product) => (
            <li
              key={product._id}
              onClick={() => setSelected(product)}
              className={`px-4 py-3 cursor-pointer transition-colors ${
                selected?._id === product._id
                  ? "bg-green-50 border-l-4 border-green-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <FiPackage size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 line-clamp-1">
                      {product.itemName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {/* {product.category || "Uncategorized"} */}
                    </p>
                  </div>
                </div>
                {selected?._id === product._id && (
                  <FiCheck className="text-green-500 ml-2" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="p-6 text-center">
          <div className="text-gray-400 mb-2">No products available</div>
          <div className="text-sm text-gray-500">
            Add products to track their price trends
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackedList;