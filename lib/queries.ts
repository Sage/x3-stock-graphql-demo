import gql from 'graphql-tag';

export const siteListQuery = gql`
    {
        sage {
            x3System {
                site {
                    edges {
                        node {
                            description
                            _id
                        }
                    }
                }
            }
        }
    }
`;

export const siteDetailsQuery = gql`
    query GetStockDetails($siteFilter: String, $stockFilter: String) {
        sage {
            x3System {
                site(filter: $siteFilter) {
                    edges {
                        node {
                            code
                            description
                            isManufacturingSite
                            isSalesSite
                            isPurchaseSite
                            isWarehouseSite
                            isFinancialSite
                            bankIdentifier
                            legalCompany {
                                code
                                companyName
                            }
                            country {
                                country
                            }
                        }
                    }
                }
            }
            x3Stock {
                stock(filter: $stockFilter) {
                    edges {
                        node {
                            product {
                                code
                                productCategory
                                localizedDescription1
                            }
                            lot
                            stockQuantity
                        }
                    }
                }
            }
        }
    }
`;

export const productDetailsQuery = gql`
    query GetProductDetails($productFilter: String) {
        sage {
            x3Products {
                product(filter: $productFilter) {
                    edges {
                        node {
                            code
                            upc
                            productCategory
                            accountingCode
                            localizedDescription1
                            stockUnitWeight
                            image {
                                value
                            }
                            weightUnit {
                                unit
                                _id
                                _uuid
                                _updateStamp
                                _createStamp
                            }
                            stockVolume
                            volumeUnit {
                                unit
                                _id
                                _uuid
                                _updateStamp
                                _createStamp
                            }
                        }
                    }
                }
            }
        }
    }
`;
