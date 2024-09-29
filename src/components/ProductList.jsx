import { useEffect, useState } from 'react';
import { useGetProductsBatchQuery, useGetProductsByCategoryQuery, useSearchProductsQuery } from '../services/productApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import {SearchBar} from './SearchBar';
import {ProductCard} from './ProductCard';
import { useSearchParams } from 'react-router-dom'; 

export const ProductList = () => {
    const selectedCategory = useSelector((state) => state.categories.selected);
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams(); 

    useEffect(() => {
        const search = searchParams.get('search');
        if (search) {
            setSearchTerm(search);
        }
    }, [searchParams]);

    const { data: categoryData, isSuccess: isSuccessCategory } = useGetProductsByCategoryQuery(
        { category: selectedCategory, skip: 0 },
        { skip: !selectedCategory }
    );

    const { data: batchData, isFetching: isFetchingBatch, isSuccess: isSuccessBatch } = useGetProductsBatchQuery(skip);

    const { data: searchData, isSuccess: isSuccessSearch } = useSearchProductsQuery(searchTerm, { skip: !searchTerm });

    useEffect(() => {
        if (isSuccessCategory && categoryData && categoryData.products) {
            setProducts(categoryData.products);
            setHasMore(categoryData.products.length >= 10);
            setSkip(0);
        }
    }, [isSuccessCategory, categoryData]);

    useEffect(() => {
        if (!selectedCategory) {
            if (isSuccessBatch && batchData && batchData.products) {
                setLoading(true);
                setTimeout(() => {
                    setProducts(prev => [...prev, ...batchData.products]);
                    setHasMore(batchData.products.length >= 10);
                    setLoading(false);
                }, 500);
            }
        }
    }, [isSuccessBatch, batchData, selectedCategory]);

    useEffect(() => {
        if (isSuccessSearch && searchData && searchData.products) {
            setProducts(searchData.products);
            setHasMore(searchData.products.length >= 10);
        }
    }, [isSuccessSearch, searchData]);

    const fetchMoreProducts = () => {
        if (hasMore && !loading) {
            setSkip(prevSkip => prevSkip + 10);
        }
    };

    useEffect(() => {
        if (!selectedCategory) {
            setProducts([]);
            setSkip(0);
        }
    }, [selectedCategory]);

    if (isFetchingBatch && products.length === 0) {
        return <div className="text-center"><ClipLoader color="#000000" /></div>;
    }

    return (
        <>
        <SearchBar onSearch={(term) => {
            setSearchTerm(term);
            setSearchParams({ search: term, category: selectedCategory });
        }} />
        <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreProducts}
            hasMore={hasMore}
            loader={<div className="text-center"><ClipLoader color="#000000" /></div>}
            endMessage={<p style={{ textAlign: 'center' }}><b>No Products Found</b></p>}
        >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {loading && <div className="text-center mt-4"><ClipLoader color="#000000" size={50} /></div>}
        </InfiniteScroll>
    </>
    );
};
