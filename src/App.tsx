import React from 'react';

//Tip: Use this when you get
// Error: error:0308010C:digital envelope routines::unsupported
// npm install react-scripts@latest

function App() {
    return <ListComponent/>;
}

//The render props pattern is a technique in React for sharing code between components using a prop whose value is a function.
//
// Part 1: Understanding Render Props
// What are Render Props?
//
// A render prop is a function prop that a component uses to know what to render.
// It's a way of passing dynamic content to a component, where the content is determined by the parent component.
// Benefits of Render Props:
//
// Reusability: Share logic across different components.
// Flexibility: More control over the rendering and composition of components.

interface ListProps<T> {
    data: T[];
    renderItem: (item: T) => React.ReactNode;
}

const List = <T, >({ data, renderItem }: ListProps<T>) => (
    <ul>
        {data.map((item, index) => (
            <li key={index}>{renderItem(item)}</li>
        ))}
    </ul>
);

// Usage
const ListComponent = () => (
    <List
        data={['Item 1', 'Item 2', 'Item 3']}
        renderItem={(item: string) => <strong>{item}</strong>}
    />
);

//Specific Use Cases
// For specific use cases like different categories or types of content, you can create specialized components
// that utilize this generic List. Each of these components can supply its own data and rendering logic.
// const AllCategoriesComponent = () => (
//     <List
//         data={allCategoriesData}
//         renderItem={(category) => <CategoryDisplay category={category} />}
//     />
// );
//
// const FoodCategoryComponent = () => (
//     <List
//         data={foodCategoryData}
//         renderItem={(foodItem) => <FoodItemDisplay foodItem={foodItem} />}
//     />
// );
//
// const NewsCategoryComponent = () => (
//     <List
//         data={newsData}
//         renderItem={(newsItem) => <NewsItemDisplay newsItem={newsItem} />}
//     />
// );

//Comparison with Kotlin's LazyColumn
// This approach is similar to defining a composable like LazyColumn in Kotlin for Jetpack Compose.
// In both cases, you're creating a flexible and reusable component (List in React, LazyColumn in Kotlin)
// that can handle various types of data and rendering logic. The key idea is to abstract the common list handling logic
// and allow for customization in how each item in the list is rendered.
//
// Benefits
// Reusability: The same List component can be used across different parts of the application, reducing code duplication.
// Flexibility: By passing different renderItem functions, the same List component can be adapted to render different types of content.
// Maintainability: With a single source of truth for the list rendering logic, maintaining and updating your UI becomes easier.
// This pattern is a powerful way to handle repeated UI elements in a clean, efficient, and maintainable manner.

export default App;
