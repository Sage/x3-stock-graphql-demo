import * as React from 'react';
import { Sidebar, SidebarHeader } from 'carbon-react/lib/components/sidebar';
import { Query } from '@apollo/react-components';
import { productDetailsQuery } from '../queries';
import Loader from 'carbon-react/lib/components/loader';
import Heading from 'carbon-react/lib/components/heading';
import Button from 'carbon-react/lib/components/button';
import Card from 'carbon-react/lib/components/card';
import { Row, Column } from 'carbon-react/lib/components/row';
import Textbox from 'carbon-react/lib/__experimental__/components/textbox';
import Number from 'carbon-react/lib/__experimental__/components/number';

export interface ProductDetailsProps {
    productCode?: string;
    onClose: () => void;
}

export class ProductDetailsComponent extends React.Component<ProductDetailsProps> {
    render() {
        return (
            <Sidebar open={!!this.props.productCode} onClose={this.props.onClose}>
                <SidebarHeader>
                    <Heading title={this.props.productCode} divider={false} />
                    <Button
                        className="se-product-details-close"
                        iconType="close"
                        buttonType="tertiary"
                        onClick={this.props.onClose}
                        size="large"
                    />
                </SidebarHeader>
                <Query
                    query={productDetailsQuery}
                    variables={{
                        productFilter: `{ code: '${this.props.productCode}' }`,
                    }}
                >
                    {({ loading, data, error }) => {
                        if (loading) return <Loader size="large" style={{ textAlign: 'center' }} />;
                        if (error) return <div>error</div>;
                        if (!data) return <div>no data</div>;
                        const product = data.sage.x3Products.product.edges[0].node;
                        return (
                            <div className="se-product-details-body">
                                {product.image && product.image.value && (
                                    <Card
                                        spacing="small"
                                        cardWidth="450px"
                                        interactive={false}
                                        className="se-product-details-card"
                                    >
                                        <img
                                            className="se-product-details-picture"
                                            src={`data:image;base64,${product.image.value}`}
                                        />
                                    </Card>
                                )}
                                <div className="se-product-details-properties">
                                    <Row>
                                        <Column>
                                            <Textbox
                                                readOnly={true}
                                                label="Description"
                                                value={product.localizedDescription1}
                                            />
                                        </Column>
                                        <Column>
                                            <Textbox
                                                readOnly={true}
                                                label="Universal Product Code"
                                                value={product.upc}
                                            />
                                        </Column>
                                    </Row>
                                    <Row>
                                        <Column>
                                            <Number
                                                readOnly={true}
                                                label="Stock Unit Volume"
                                                value={product.stockVolume}
                                            />
                                        </Column>
                                        <Column>
                                            <Textbox
                                                readOnly={true}
                                                label="Volume Unit"
                                                value={product.volumeUnit.unit}
                                            />
                                        </Column>
                                    </Row>
                                    <Row>
                                        <Column>
                                            <Number
                                                readOnly={true}
                                                label="Stock Unit Weight"
                                                value={product.stockUnitWeight}
                                            />
                                        </Column>
                                        <Column>
                                            <Textbox
                                                readOnly={true}
                                                label="Weight Unit"
                                                value={product.weightUnit.unit}
                                            />
                                        </Column>
                                    </Row>
                                </div>
                            </div>
                        );
                    }}
                </Query>
            </Sidebar>
        );
    }
}
