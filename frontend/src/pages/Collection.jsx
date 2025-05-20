import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import { ChevronUp } from 'lucide-react';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    if (!products) return;

    let productsCopy = [...products];

    if (showSearch && search) {
      const searchTerm = search.toLowerCase();
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      );
    }

    // Apply sorting
    switch (sortType) {
      case 'low-high':
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break; // "relavent" keeps original order
    }

    setFilterProducts(productsCopy);
  }, [category, subCategory, products, search, showSearch, sortType,products]);

  return (
    <div className="pt-10 border-t flex flex-col sm:flex-row gap-1 sm:gap-10">
      {/* FILTER SECTION */}
      <div className="min-w-60 sm:w-1/5">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <ChevronUp className={`h-4 sm:hidden transition-transform ${showFilter ? 'rotate-180' : ''}`} />
        </p>

        {/* Clear Filters Button */}
        {(category.length > 0 || subCategory.length > 0 || sortType !== 'relavent') && (
          <button
            onClick={() => {
              setCategory([]);
              setSubCategory([]);
              setSortType('relavent');
            }}
            className="mt-4 text-sm underline text-blue-600 cursor-pointer"
          >
            Clear Filters
          </button>
        )}

        {/* Categories Filter */}
        <div className={`${showFilter ? 'block' : 'hidden'} sm:block border border-gray-300 pl-5 py-3 mt-6`}>
          <p className="font-medium mb-2">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Men', 'Women', 'Kids'].map((cat) => (
              <label key={cat} className="flex gap-2 items-center">
                <input
                  className="w-3 h-3"
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                  checked={category.includes(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className={`${showFilter ? 'block' : 'hidden'} sm:block border border-gray-300 pl-5 py-3 my-6`}>
          <p className="font-medium mb-2">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
              <label key={type} className="flex gap-2 items-center">
                <input
                  className="w-3 h-3"
                  type="checkbox"
                  value={type}
                  onChange={toggleSubCategory}
                  checked={subCategory.includes(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Product Listing */}
      <div className="flex-1">
        <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
          <h2 className="font-semibold">
            ALL <span className="text-gray-600">COLLECTIONS</span>
          </h2>
          <select
            className="border-2 border-gray-300 text-sm px-2 py-1"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low-High</option>
            <option value="high-low">Sort by: High-Low</option>
          </select>
        </div>

        {/* PRODUCT LIST */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {filterProducts.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">No products found.</p>
          ) : (
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
