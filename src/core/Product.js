import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import { listRelated, read } from './apiCore';
import Card from './Card';
import { CardProvider } from './cardhandler/CardContext';

const Product = (props) => {

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setProduct(data);

                // fetch related products
                listRelated(data._id).then(data => {
                    if(data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                }).catch(err => console.warn(err))
            }
        })
    }

    const returnSingleProduct = () => {
        return product && product.description && <Card product={product} isProduct={true} showViewProductBtn={false} />
    }

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props])

    return (
        <Layout 
            title={product && product.name} 
            description={product && product.description && product.description.substring(0, 100)} 
            headerClass="" 
            className="container-fluid"
        >
            <div className="row">
                {relatedProduct.length ? (
                    <div className="col-8">
                        {returnSingleProduct()}    
                    </div>
                    ) : (
                    <div className="col-12">
                        {returnSingleProduct()}    
                    </div>
                )}
                
                {relatedProduct.length ? (<div className="col-4">
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div key={p._id} className="mb-3">
                            <CardProvider
                                key={i} 
                                product={p}
                                isProduct={false}
                            >
                                <Card key={i} product={p} isProduct={true} />
                            </CardProvider>
                        </div>
                    ))}
                </div>) : ('')}
            </div>
        </Layout>
    )
}

export default Product;
