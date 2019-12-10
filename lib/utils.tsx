import * as React from 'react';
import Heading from 'carbon-react/lib/components/heading';
import Link from 'carbon-react/lib/components/link';

export function EmptyState() {
    return (
        <div className="se-page-placeholder">
            <Heading
                divider={false}
                title="Select a site to view the stock data"
                subheader="You can select a site using the dropdown in the top right corner"
            />
            <p>
                This application is built using the Sage's open-source{' '}
                <Link href="https://github.com/Sage/carbon">Carbon component library</Link>.
                <br />
                The data is retrieved from Sage X3's{' '}
                <Link href="https://developer.sage.com/api/x3/graphql/">GraphQL API</Link>.
            </p>
        </div>
    );
}
