import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetCategoriesQuery } from '../services/productApi';
import { setSelectedCategory } from '../features/categories/CategorySlice';
import { useSearchParams } from 'react-router-dom';

export const Sidebar = () => {
    const { data: categories, error, isLoading } = useGetCategoriesQuery();
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state) => state.categories.selected);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            dispatch(setSelectedCategory(category));
        }
    }, [searchParams, dispatch]);

    const handleCategoryChange = (category) => {
        const newCategory = category.name === selectedCategory ? null : category.name;
        dispatch(setSelectedCategory(newCategory));

        if (newCategory === null) {
            searchParams.delete('category');
        } else {
            searchParams.set('category', newCategory);
        }

        setSearchParams(searchParams);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="h-full border-gray-200 p-5 shadow-custom-box-shadow max-w-xs mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl">
            <h2 className="text-lg font-semibold">Categories</h2>
            <form className="mt-4">
                {categories?.map((category, index) => (
                    <div key={index} className="mt-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selectedCategory === category.name}
                                onChange={() => handleCategoryChange(category)}
                                className="form-checkbox rounded text-blue-600"
                            />
                            <span>{category.name}</span>
                        </label>
                    </div>
                ))}
            </form>
        </div>
    );
};
