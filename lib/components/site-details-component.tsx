import { Table, TableRow, TableCell, TableHeader } from 'carbon-react/lib/components/table';
import * as React from 'react';
import Loader from 'carbon-react/lib/components/loader';
import { siteDetailsQuery } from '../queries';
import { Query } from '@apollo/react-components';
import { Row, Column } from 'carbon-react/lib/components/row';
import Heading from 'carbon-react/lib/components/heading';
import Textbox from 'carbon-react/lib/__experimental__/components/textbox';
import Button from 'carbon-react/lib/components/button';
import { Checkbox } from 'carbon-react/lib/__experimental__/components/checkbox';
import { ProductDetailsComponent } from './product-details-component';

export interface SiteDetailsProps {
    selectedSiteCode: string;
}
export interface SiteDetailsState {
    productDetailsOpen?: string;
}

export class SiteDetailsComponent extends React.Component<SiteDetailsProps, SiteDetailsState> {
    constructor(props: SiteDetailsProps) {
        super(props);
        this.state = {};
    }

    onProductSelected = (productCode?: string) => () => {
        this.setState({ productDetailsOpen: productCode });
    };

    renderTable = (products: any[]) => (
        <Table paginate={false}>
            <TableRow>
                <TableHeader>Product code</TableHeader>
                <TableHeader>Product description</TableHeader>
                <TableHeader>Product category</TableHeader>
                <TableHeader>Quantity in stock</TableHeader>
                <TableHeader></TableHeader>
            </TableRow>
            {products.map(p => (
                <TableRow>
                    <TableCell>{p.node.product.code}</TableCell>
                    <TableCell>{p.node.product.localizedDescription1 || 'N/A'}</TableCell>
                    <TableCell>{p.node.product.productCategory}</TableCell>
                    <TableCell>{p.node.stockQuantity}</TableCell>
                    <TableCell>
                        <Button
                            iconType="info"
                            buttonType="tertiary"
                            onClick={this.onProductSelected(p.node.product.code)}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </Table>
    );
    render() {
        return (
            <div className="se-site-details">
                <Query
                    query={siteDetailsQuery}
                    variables={{
                        siteFilter: `{ code: '${this.props.selectedSiteCode}' }`,
                        stockFilter: `{ stockSite: '${this.props.selectedSiteCode}' }`,
                    }}
                >
                    {({ loading, data, error }) => {
                        if (loading) return <Loader size="large" style={{ textAlign: 'center' }} />;
                        if (error) return <div>error</div>;
                        if (!data) return <div>no data</div>;
                        return (
                            <Row>
                                <Column>
                                    <Heading title={data.sage.x3System.site.edges[0].node.description} />
                                    <Row>
                                        <Column>
                                            <Textbox
                                                readOnly={true}
                                                label="Company"
                                                value={data.sage.x3System.site.edges[0].node.legalCompany.companyName}
                                                fieldHelp="The company that owns the site"
                                            />
                                        </Column>
                                        <Column>
                                            <Textbox
                                                readOnly={true}
                                                label="Country"
                                                value={data.sage.x3System.site.edges[0].node.country.country}
                                                fieldHelp="Country of location"
                                            />
                                        </Column>
                                    </Row>
                                    <Row>
                                        <Column>
                                            <Checkbox
                                                disabled={false}
                                                reverse
                                                label="Warehouse Site"
                                                size="small"
                                                checked={data.sage.x3System.site.edges[0].node.isWarehouseSite}
                                                fieldHelp="Is this site a warehouse location?"
                                            />
                                        </Column>
                                        <Column>
                                            <Checkbox
                                                disabled={false}
                                                reverse
                                                label="Manufacturing Site"
                                                size="small"
                                                checked={data.sage.x3System.site.edges[0].node.isManufacturingSite}
                                                fieldHelp="Is this site a manufacturing location?"
                                            />
                                        </Column>
                                    </Row>
                                    <Row>
                                        <Column>
                                            <Checkbox
                                                disabled={false}
                                                reverse
                                                label="Sales Site"
                                                size="small"
                                                checked={data.sage.x3System.site.edges[0].node.isSalesSite}
                                                fieldHelp="Is this site a sales location?"
                                            />
                                        </Column>
                                        <Column>
                                            <Checkbox
                                                disabled={false}
                                                reverse
                                                label="Purchase Site"
                                                size="small"
                                                checked={data.sage.x3System.site.edges[0].node.isPurchaseSite}
                                                fieldHelp="Is this site a purchase location?"
                                            />
                                        </Column>
                                    </Row>
                                </Column>
                                <Column>{this.renderTable(data.sage.x3Stock.stock.edges)}</Column>
                            </Row>
                        );
                    }}
                </Query>
                <ProductDetailsComponent
                    productCode={this.state.productDetailsOpen}
                    onClose={this.onProductSelected()}
                />
            </div>
        );
    }
}
