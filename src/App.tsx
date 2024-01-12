import React, {ReactElement, useState} from 'react';

//Tip: Use this when you get
// Error: error:0308010C:digital envelope routines::unsupported
// npm install react-scripts@latest

function App() {
    return <TabsComponent/>;
}

//Component composition is a fundamental concept in React, enabling developers to build complex UIs from smaller,
// reusable pieces. It's about how components fit together and work as a unit.
//
//Part 1: Understanding Component Composition
// What is Component Composition?
//
// Component composition is a design pattern in React where components are built to work together, much like functions or classes in programming.
// Compare it to building blocks, where each component serves a specific purpose and can be combined to create more complex structures.
// Benefits of Composition:
//
// Reusability: Components can be reused across different parts of the application.
// Separation of Concerns: Each component manages its own state and logic.
// Maintainability: Smaller components are easier to maintain and test.
//
//Part 2: Using Children Props
// What are Children Props?
//
// Children is a special prop, automatically passed to every component,
// that can be used to render the content included between the opening and closing tags of a component.
//Example:
interface CardProps {
    children: React.ReactNode;
}
const Card = ({ children }: CardProps) => <div className="card">{children}</div>;

const CardComponent = () => (
    <Card>
        <h2>Title</h2>
        <p>This is some card content.</p>
    </Card>
);

interface TabsProps {
    children: React.ReactNode;
}
const Tabs = ({ children }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            {React.Children.map(children, (child, index) => {
                // Ensure that child is a valid element before cloning
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as ReactElement, {
                        isActive: index === activeTab,
                        onActivate: () => setActiveTab(index)
                    });
                }
                return child;
            })}
        </div>
    );
};

interface TabProps {
    isActive?: boolean;
    onActivate?: () => void;
    children: React.ReactNode;
}
const Tab = ({ isActive, onActivate, children }: TabProps) => (
    <div onClick={onActivate} style={{ opacity: isActive ? 1 : 0.5 }}>
        {children}
    </div>
);

const TabsComponent = () => (
    <Tabs>
        <Tab>Title 1</Tab>
        <Tab>Title 2</Tab>
        <Tab>Title 3</Tab>
    </Tabs>
)

export default App;
