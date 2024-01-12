// PrivatePage.tsx
import React from 'react';
import withAuth from './HOC';
const PrivatePage: React.FC = () => (
    <div>This is a private page only for authenticated users.</div>
);

export default withAuth(PrivatePage);
