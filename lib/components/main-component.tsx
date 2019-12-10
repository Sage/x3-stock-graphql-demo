import * as React from 'react';
import NavigationBar from 'carbon-react/lib/components/navigation-bar';
import { Query } from '@apollo/react-components';
import { Option, Select } from 'carbon-react/lib/__experimental__/components/select';
import Loader from 'carbon-react/lib/components/loader';
import { siteListQuery } from '../queries';
import { EmptyState } from '../utils';
import { SiteDetailsComponent } from './site-details-component';

export interface StockAppState {
    selectedSiteCode?: string;
}

export class MainComponent extends React.Component<{}, StockAppState> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    onSiteSelected = ({ target }) => {
        if (target.value && target.value.length > 0) {
            this.setState({ selectedSiteCode: target.value[0].optionValue });
        } else {
            this.setState({ selectedSiteCode: undefined });
        }
    };

    render() {
        return (
            <div className="se-page-body">
                <NavigationBar>
                    <a href="#" key={'home'} className="se-navbar-logo-link" onClick={this.onSiteSelected}>
                        <img src="/sage-logo.svg" alt="Sage" className="se-navbar-logo" />
                    </a>
                    <span className="se-navbar-product-title">X3 Stock Info</span>
                    <div className="se-navbar-site-select">
                        <Query query={siteListQuery}>
                            {({ loading, data, error }) => {
                                if (loading) return <Loader />;
                                if (error) return <div>error</div>;
                                if (!data) return <div>no data</div>;
                                return (
                                    <Select size={'small'} placeholder="Select a site" onChange={this.onSiteSelected}>
                                        {data.sage.x3System.site.edges.map((e: any) => {
                                            return (
                                                <Option key={e.node._id} value={e.node._id} text={e.node.description} />
                                            );
                                        })}
                                    </Select>
                                );
                            }}
                        </Query>
                    </div>
                </NavigationBar>
                {!this.state.selectedSiteCode && <EmptyState />}
                {this.state.selectedSiteCode && <SiteDetailsComponent selectedSiteCode={this.state.selectedSiteCode} />}
            </div>
        );
    }
}
