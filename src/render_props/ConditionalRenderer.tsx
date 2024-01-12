// ConditionalRenderer.tsx
import React, { ReactNode } from 'react';

interface ConditionalRendererProps {
    condition: boolean;
    render: () => ReactNode;
}

class ConditionalRenderer extends React.Component<ConditionalRendererProps> {
    render() {
        return this.props.condition ? this.props.render() : <h3>Nothing to render</h3>;
    }
}

export default ConditionalRenderer;
