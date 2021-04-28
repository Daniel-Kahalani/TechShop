import { Helmet } from 'react-helmet'

export default function Meta({ title, description, keywords }) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome To TechShop',
    description: 'Find the best products for the cheapest prices',
    keywords: 'electronics, buy electronics, cheap electroincs',
}